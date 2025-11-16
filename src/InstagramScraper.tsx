import { useState } from 'react';

interface ScrapedUsername {
  id: string;
  username: string;
  scrapedAt: string;
}

export default function InstagramScraper() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernames, setUsernames] = useState<ScrapedUsername[]>([]);
  const [error, setError] = useState('');

  const scrapeUsernames = async () => {
    setLoading(true);
    setError('');

    try {
      // Backend API aufrufen, um Instagram zu scrapen (Hashtag oder Trending)
      const response = await fetch('http://localhost:3001/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          searchTerm: searchTerm.trim() || undefined 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scrape usernames');
      }

      const data = await response.json();
      
      // Konvertiere die gescrapten Usernames in das erwartete Format
      const scrapedUsernames: ScrapedUsername[] = data.usernames.map((item: { username: string }, index: number) => ({
        id: `${Date.now()}_${index}`,
        username: item.username,
        scrapedAt: new Date().toISOString(),
      }));

      if (scrapedUsernames.length === 0) {
        setError('No usernames found. Try again or use a different search term.');
      } else {
        setUsernames(prev => [...scrapedUsernames, ...prev]);
        setSearchTerm('');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to scrape usernames. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearUsernames = () => {
    setUsernames([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Instagram Username Scraper
          </h1>
          <p className="text-gray-600">
            Enter an Instagram URL to scrape usernames
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
                Suchbegriff (z.B. "generation_deutschland")
              </label>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="generation_deutschland"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Tipp: Gib einen Suchbegriff ein, um Accounts mit diesem Namen zu finden
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={scrapeUsernames}
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Scraping...
                  </span>
                ) : (
                  'Scrape Usernames'
                )}
              </button>
              
              {usernames.length > 0 && (
                <button
                  onClick={clearUsernames}
                  disabled={loading}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {usernames.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Scraped Usernames
              </h2>
              <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                {usernames.length} {usernames.length === 1 ? 'username' : 'usernames'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {usernames.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">@{user.username}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(user.scrapedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://www.instagram.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Hinweis:</strong> Gib einen Suchbegriff ein (z.B. "generation_deutschland"), 
            um alle Instagram-Accounts zu finden, die diesen Begriff im Namen haben. 
            Das Scraping kann einige Sekunden dauern.
          </p>
        </div>
      </div>
    </div>
  );
}
