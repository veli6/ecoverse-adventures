import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiBookmark, FiExternalLink } from 'react-icons/fi';

const NEWS = [
  { id:'n1', title:'Global Coral Reefs Show Signs of Recovery', summary:'Scientists report coral reef recovery in several regions thanks to conservation efforts and reduced pollution.', category:'Wildlife', image:'🪸', whyMatters:'Coral reefs support 25% of marine life. Recovery means healthier oceans for millions of species.', simple:'Corals are coming back to life in some places because people are taking better care of the oceans!' },
  { id:'n2', title:'Electric Vehicles Outsell Gas Cars for First Time', summary:'EV sales have surpassed traditional combustion engine vehicles in multiple European countries.', category:'Energy', image:'🚗', whyMatters:'Transportation accounts for 29% of emissions. Mass EV adoption significantly reduces carbon output.', simple:'More people are buying electric cars than gas cars now, which means less pollution!' },
  { id:'n3', title:'Amazon Deforestation Drops 40% This Year', summary:'New satellite data shows a significant decrease in Amazon rainforest deforestation rates.', category:'Wildlife', image:'🌳', whyMatters:'The Amazon produces 20% of world oxygen. Less deforestation means more carbon absorption.', simple:'People are cutting down fewer trees in the Amazon forest, which is great for animals and clean air!' },
  { id:'n4', title:'Ocean Plastic Cleanup Removes 10 Million kg', summary:'The Ocean Cleanup project has successfully removed over 10 million kilograms of plastic from the Pacific.', category:'Pollution', image:'♻️', whyMatters:'Removing ocean plastic protects marine life and prevents microplastic contamination of seafood.', simple:'A big cleanup project pulled tons of plastic out of the ocean, making it safer for sea animals!' },
  { id:'n5', title:'Solar Energy Now Cheapest Power Source Globally', summary:'Solar has become the cheapest form of electricity generation in history, beating coal and gas.', category:'Energy', image:'☀️', whyMatters:'Cheap solar accelerates the transition away from fossil fuels, reducing emissions dramatically.', simple:'Making electricity from sunlight is now cheaper than burning coal or gas!' },
  { id:'n6', title:'New Species of Deep-Sea Fish Discovered', summary:'Marine biologists have discovered three new species of bioluminescent fish in the Mariana Trench.', category:'Wildlife', image:'🐟', whyMatters:'Discovering new species highlights how much we still need to learn and protect in our oceans.', simple:'Scientists found amazing glowing fish living deep in the ocean that nobody knew about before!' },
  { id:'n7', title:'City Bans Single-Use Plastics Completely', summary:'San Francisco becomes the first major US city to completely ban all single-use plastic items.', category:'Pollution', image:'🚫', whyMatters:'City-level bans create models for other cities and reduce millions of plastic items from entering waste streams.', simple:'A big city said NO to all throwaway plastic items like bags, straws, and containers!' },
  { id:'n8', title:'Global Tree Planting Initiative Hits 1 Billion', summary:'The worldwide reforestation campaign has planted its billionth tree across 50 countries.', category:'Climate', image:'🌲', whyMatters:'Trees absorb CO2 and produce oxygen. A billion new trees significantly impact global carbon levels.', simple:'People around the world planted ONE BILLION trees together!' },
  { id:'n9', title:'Arctic Ice Shows Unexpected Growth Pattern', summary:'New measurements show certain Arctic ice formations are thicker than predicted by climate models.', category:'Climate', image:'🧊', whyMatters:'Understanding ice behavior helps us better predict sea level changes and plan for the future.', simple:'Some ice in the Arctic is growing thicker than scientists expected, which gives a bit of hope!' },
  { id:'n10', title:'Wind Farms Power Entire Country for 48 Hours', summary:'Denmark ran entirely on wind power for two consecutive days, setting a new world record.', category:'Energy', image:'💨', whyMatters:'This proves that renewable energy can fully replace fossil fuels for extended periods.', simple:'A whole country used ONLY wind power for two days straight!' },
  { id:'n11', title:'Endangered Tiger Population Doubles', summary:'Conservation efforts in India have led to a doubling of the Bengal tiger population since 2010.', category:'Wildlife', image:'🐯', whyMatters:'Tigers are keystone species. Their recovery indicates healthier forest ecosystems overall.', simple:'There are now twice as many tigers in India because people worked hard to protect them!' },
  { id:'n12', title:'New Biodegradable Packaging Replaces Styrofoam', summary:'A startup has developed mushroom-based packaging that decomposes in 45 days, replacing styrofoam.', category:'Pollution', image:'🍄', whyMatters:'Styrofoam takes 500 years to decompose. This alternative could eliminate billions of containers from landfills.', simple:'Someone made packaging from mushrooms that turns back into dirt in just 45 days!' },
  { id:'n13', title:'Countries Agree to Protect 30% of Oceans by 2030', summary:'UN treaty signed by 190 nations commits to protecting 30% of the world\'s oceans.', category:'Climate', image:'🌊', whyMatters:'Protected ocean areas allow marine ecosystems to recover and fish populations to rebound.', simple:'Almost every country agreed to protect a big part of the ocean so sea life can thrive!' },
  { id:'n14', title:'Air Quality Improves in 80% of Major Cities', summary:'WHO data shows significant air quality improvements in most of the world\'s largest cities.', category:'Pollution', image:'🌬️', whyMatters:'Better air quality reduces respiratory diseases and saves millions of lives annually.', simple:'The air in most big cities is getting cleaner, which means healthier lungs for everyone!' },
  { id:'n15', title:'Students Lead Largest Climate March in History', summary:'Over 6 million students worldwide participated in the global climate strike demanding action.', category:'Climate', image:'✊', whyMatters:'Youth activism drives policy changes and raises awareness about climate urgency.', simple:'Millions of students skipped school to march and ask world leaders to save the planet!' },
];

const CATEGORIES = ['All', 'Climate', 'Wildlife', 'Energy', 'Pollution'];

export default function NewsPage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { readNews } = useGame();
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [showSimple, setShowSimple] = useState({});
  const [bookmarks, setBookmarks] = useState([]);

  const readIds = userData?.readNewsIds || [];
  const selectedTheme = userData?.selectedTheme;

  let filtered = filter === 'All' ? NEWS : NEWS.filter(n => n.category === filter);
  // Prioritize by user's theme
  if (selectedTheme) {
    const themeMap = { plastic: 'Pollution', water: 'Wildlife', climate: 'Climate', energy: 'Energy', wildlife: 'Wildlife' };
    const preferredCat = themeMap[selectedTheme];
    filtered.sort((a, b) => (b.category === preferredCat ? 1 : 0) - (a.category === preferredCat ? 1 : 0));
  }

  const handleRead = async (id) => {
    if (!readIds.includes(id)) await readNews(id);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page-container max-w-4xl mx-auto min-h-screen py-8">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-eco-600 hover:text-eco-700 font-medium mb-6 bg-transparent border-none p-0">
        <FiArrowLeft size={22} /> Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold mb-2"><span className="eco-gradient-text">Eco News</span> 📰</h1>
        <p className="text-gray-500 mb-6">Stay informed, earn +5 points per article!</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-5 py-3 rounded-xl font-semibold transition-all ${filter === c ? 'bg-eco-500 text-white shadow-eco' : 'bg-white text-gray-600 border border-gray-200 hover:bg-eco-50'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-5">
        {filtered.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="eco-card p-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">{n.image}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-eco-100 text-eco-700 font-medium" style={{ fontSize: '14px' }}>{n.category}</span>
                  {readIds.includes(n.id) && <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-medium" style={{ fontSize: '14px' }}>✓ Read +5pts</span>}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{n.title}</h3>
                <p className="text-gray-600">{n.summary}</p>

                <AnimatePresence>
                  {expandedId === n.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-3 overflow-hidden">
                      <div className="p-4 bg-eco-50 rounded-xl border border-eco-200">
                        <p className="font-bold text-eco-700 mb-1">🌍 Why This Matters</p>
                        <p className="text-gray-700">{n.whyMatters}</p>
                      </div>
                      {showSimple[n.id] && (
                        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                          <p className="font-bold text-indigo-700 mb-1">🤖 In Simple Terms</p>
                          <p className="text-gray-700">{n.simple}</p>
                        </div>
                      )}
                      <button onClick={() => setShowSimple(s => ({ ...s, [n.id]: !s[n.id] }))}
                        className="text-indigo-600 hover:text-indigo-700 font-medium bg-transparent border-none p-0">
                        {showSimple[n.id] ? 'Hide simple explanation' : '🤖 Explain in simple terms'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-4 mt-4">
                  <button onClick={() => handleRead(n.id)}
                    className="text-eco-600 hover:text-eco-700 font-medium flex items-center gap-1 bg-transparent border-none p-0">
                    <FiExternalLink size={18} /> {expandedId === n.id ? 'Collapse' : 'Read More'}
                  </button>
                  <button onClick={() => setBookmarks(b => b.includes(n.id) ? b.filter(x => x !== n.id) : [...b, n.id])}
                    className={`flex items-center gap-1 font-medium bg-transparent border-none p-0 ${bookmarks.includes(n.id) ? 'text-amber-500' : 'text-gray-400 hover:text-gray-600'}`}>
                    <FiBookmark size={18} /> {bookmarks.includes(n.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
