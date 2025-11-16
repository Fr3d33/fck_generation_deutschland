import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

interface ScrapedUsername {
  username: string;
  profileUrl: string;
}

// Funktion zum Scrapen von Usernames aus Instagram (Explore/Trending)
async function scrapeInstagramUsernames(searchTerm?: string): Promise<ScrapedUsername[]> {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // User Agent setzen, um wie ein echter Browser zu erscheinen
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Zu Instagram navigieren
    console.log('Navigating to Instagram...');
    await page.goto('https://www.instagram.com/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Login-Versuch wenn Credentials vorhanden
    const username = process.env.INSTAGRAM_USERNAME;
    const password = process.env.INSTAGRAM_PASSWORD;

    if (username && password) {
      console.log('Attempting to login...');
      try {
        // Warte auf Login-Formular
        await page.waitForSelector('input[name="username"]', { timeout: 10000 });
        
        // Eingabe Username
        await page.type('input[name="username"]', username, { delay: 50 });
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Eingabe Password
        await page.type('input[name="password"]', password, { delay: 50 });
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Login-Button klicken
        await page.click('button[type="submit"]');
        console.log('Login submitted, waiting for navigation...');
        
        // Warte auf Navigation nach Login
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // "Save Login Info" Dialog überspringen falls vorhanden
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const notNowButtons = await page.$$('button');
          for (const button of notNowButtons) {
            const text = await page.evaluate(el => el.textContent, button);
            if (text && (text.includes('Not Now') || text.includes('Jetzt nicht') || text.includes('Nicht jetzt'))) {
              await button.click();
              await new Promise(resolve => setTimeout(resolve, 1000));
              break;
            }
          }
        } catch (e) {
          console.log('No "Save Login" dialog found');
        }
        
        // "Turn on Notifications" Dialog überspringen falls vorhanden
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const notNowButtons2 = await page.$$('button');
          for (const button of notNowButtons2) {
            const text = await page.evaluate(el => el.textContent, button);
            if (text && (text.includes('Not Now') || text.includes('Jetzt nicht') || text.includes('Nicht jetzt'))) {
              await button.click();
              await new Promise(resolve => setTimeout(resolve, 1000));
              break;
            }
          }
        } catch (e) {
          console.log('No "Notifications" dialog found');
        }
        
        console.log('Login successful!');
      } catch (loginError) {
        console.error('Login failed:', loginError);
        console.log('Continuing without login...');
      }
    } else {
      console.log('No Instagram credentials found in .env file. Continuing without login...');
      console.log('Note: Many features require login. Please create .env file with INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD');
    }

    // URL bestimmen basierend auf searchTerm
    let targetUrl = 'https://www.instagram.com/explore/';
    let isSearchMode = false;
    
    if (searchTerm && searchTerm.trim()) {
      isSearchMode = true;
      const cleanTerm = searchTerm.trim().replace(/^[@#]/, '');
      
      // Wenn searchTerm ein Hashtag ist
      if (searchTerm.startsWith('#')) {
        targetUrl = `https://www.instagram.com/explore/tags/${cleanTerm}/`;
      } else if (searchTerm.startsWith('@')) {
        // Wenn es ein Username ist
        targetUrl = `https://www.instagram.com/${cleanTerm}/`;
      } else {
        // Instagram Web-Suche - wird dann mit JavaScript im Browser durchgeführt
        targetUrl = `https://www.instagram.com/`;
      }
    }

    console.log(`Navigating to: ${targetUrl}`);
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Warten auf den Inhalt
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Wenn Suchbegriff vorhanden, versuche über Search-Box zu suchen
    if (isSearchMode && searchTerm && !searchTerm.startsWith('#') && !searchTerm.startsWith('@')) {
      const cleanTerm = searchTerm.trim().replace(/^[@#]/, '');
      console.log(`Attempting to search for: ${cleanTerm}`);
      
      try {
        // Klicke auf Search-Input (verschiedene Selektoren probieren)
        const searchSelectors = [
          'input[placeholder*="Search"]',
          'input[placeholder*="Suchen"]',
          'input[aria-label*="Search"]',
          'input[type="text"]'
        ];
        
        let searchClicked = false;
        for (const selector of searchSelectors) {
          try {
            await page.waitForSelector(selector, { timeout: 5000 });
            await page.click(selector);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.keyboard.type(cleanTerm, { delay: 100 });
            await new Promise(resolve => setTimeout(resolve, 2000));
            searchClicked = true;
            console.log('Search executed successfully');
            break;
          } catch (e) {
            // Nächsten Selector probieren
            continue;
          }
        }
        
        if (!searchClicked) {
          console.log('Could not find search input, falling back to explore');
          await page.goto('https://www.instagram.com/explore/', { waitUntil: 'networkidle2' });
        }
      } catch (error) {
        console.log('Search failed, using explore page:', error);
      }
    }

    // Scrollen, um mehr Inhalte zu laden
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Usernames extrahieren - verschiedene Selektoren probieren
    const usernames = await page.evaluate(() => {
      const users = new Set<string>();
      
      // Blacklist für System-Links
      const blacklist = [
        'explore', 'reels', 'stories', 'accounts', 'direct', 'p',
        'legalterms', 'weblite', 'legalcookies', 'terms', 'privacy',
        'help', 'about', 'press', 'api', 'jobs', 'blog', 'status',
        'hashtag', 'location', 'directory', 'profiles', 'tags',
        'challenge', 'tv', 'shopping', 'fundraiser', 'messenger'
      ];
      
      // Profile Links finden
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Nur Profile-Links (format: /username/)
        const match = href.match(/^\/([a-zA-Z0-9._]+)\/?$/);
        if (match && match[1]) {
          const username = match[1].toLowerCase();
          
          // Filter: gültiger Username und nicht in Blacklist
          if (username.length >= 1 && 
              username.length <= 30 && 
              !blacklist.includes(username) &&
              username.match(/^[a-z0-9._]+$/)) {
            users.add(match[1]); // Original-Case behalten
          }
        }
      });

      // Auch nach @mentions im Text suchen
      const textElements = document.querySelectorAll('span, div, h2, h3');
      textElements.forEach(el => {
        const text = el.textContent || '';
        const mentionRegex = /@([a-zA-Z0-9._]+)/g;
        let match;
        while ((match = mentionRegex.exec(text)) !== null) {
          const username = match[1];
          if (username && 
              username.length >= 1 && 
              username.length <= 30 &&
              !blacklist.includes(username.toLowerCase())) {
            users.add(username);
          }
        }
      });

      return Array.from(users);
    });

    console.log(`Found ${usernames.length} usernames`);

    await browser.close();

    // Wenn Suchbegriff vorhanden, nur relevante Usernames zurückgeben
    let filteredUsernames = usernames;
    if (isSearchMode && searchTerm) {
      const searchLower = searchTerm.replace(/^[@#]/, '').toLowerCase();
      filteredUsernames = usernames.filter(username => 
        username.toLowerCase().includes(searchLower)
      );
      console.log(`Filtered to ${filteredUsernames.length} usernames matching search term`);
    }

    // Limit auf 50 Usernames
    const limitedUsernames = filteredUsernames.slice(0, 50);

    return limitedUsernames.map(username => ({
      username,
      profileUrl: `https://www.instagram.com/${username}`
    }));

  } catch (error) {
    console.error('Error scraping Instagram:', error);
    if (browser) {
      await browser.close();
    }
    throw new Error('Failed to scrape Instagram usernames');
  }
}

app.post('/api/scrape', async (req, res) => {
  try {
    const { searchTerm } = req.body;

    console.log('Starting Instagram scrape with search term:', searchTerm || 'Explore/Trending');
    const usernames = await scrapeInstagramUsernames(searchTerm);

    res.json({ 
      success: true, 
      usernames,
      count: usernames.length
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ 
      error: 'Failed to scrape usernames',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Instagram Scraper API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
