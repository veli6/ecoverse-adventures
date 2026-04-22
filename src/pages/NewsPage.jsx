import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

// Fallback news in case RSS fails
const FALLBACK_NEWS = [
  {
    title: 'Global Coral Reefs Show Signs of Recovery',
    description: 'Scientists report coral reef recovery in several regions thanks to conservation efforts and reduced pollution.',
    link: 'https://news.google.com/search?q=coral+recovery',
    image: '🪸'
  },
  {
    title: 'Electric Vehicles Outsell Gas Cars for First Time',
    description: 'EV sales have surpassed traditional combustion engine vehicles in multiple European countries.',
    link: 'https://news.google.com/search?q=ev+sales',
    image: '🚗'
  }
];

export default function NewsPage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsModes = ["trending", "india", "user"];
      const mode = newsModes[Math.floor(Math.random() * newsModes.length)];
      const selectedTheme = userData?.selectedTheme || "environment";

      let query = "environment";
      if (mode === "trending") {
        query = "climate change OR global warming OR sustainability";
      } else if (mode === "india") {
        query = "environment India pollution air quality Delhi climate India";
      } else if (mode === "user") {
        query = selectedTheme + " environment";
      }

      const RSS_URL = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
      const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const items = data.items || [];

      if (items.length > 0) {
        setNews(items.slice(0, 8));
      } else {
        setNews(FALLBACK_NEWS);
      }
    } catch (err) {
      console.error('RSS Fetch error:', err);
      setNews(FALLBACK_NEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [userData?.selectedTheme]); // Refresh if theme changes

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#22c55e',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            marginBottom: '30px',
            padding: 0
          }}
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '42px', fontWeight: '800', margin: 0 }}>
              <span style={{ color: '#22c55e' }}>Eco</span> News 📰
            </h1>
            <p style={{ color: '#94a3b8', marginTop: '10px', fontSize: '18px' }}>
              Dynamic updates from Google News RSS.
            </p>
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: '#1e293b',
              color: '#22c55e',
              border: '1px solid #334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} /> {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '24px', color: '#22c55e' }}>Fetching latest news...</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {news.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid #334155',
                  transition: 'transform 0.2s',
                  cursor: 'default'
                }}
              >
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ fontSize: '40px' }}>{item.image || '🌍'}</div>
                  <div style={{ flex: 1 }}>
                    {item.author && (
                      <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {item.author}
                      </span>
                    )}
                    <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '8px 0', lineHeight: '1.3' }}>
                      {item.title}
                    </h3>
                    <p
                      style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.5', margin: '0 0 20px 0' }}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#22c55e',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      Read Full Article <FiExternalLink />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
