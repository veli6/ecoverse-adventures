import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';

const THEMES = [
  { id: 'plastic', label: 'Plastic Pollution', icon: '♻️', desc: 'Fight single-use plastic waste', color: 'border-orange-300 bg-orange-50' },
  { id: 'water', label: 'Water Conservation', icon: '💧', desc: 'Save every precious drop', color: 'border-blue-300 bg-blue-50' },
  { id: 'climate', label: 'Climate Change', icon: '🌡️', desc: 'Understand our warming world', color: 'border-amber-300 bg-amber-50' },
  { id: 'energy', label: 'Energy Saving', icon: '⚡', desc: 'Power up with clean energy', color: 'border-yellow-300 bg-yellow-50' },
  { id: 'wildlife', label: 'Wildlife Protection', icon: '🦁', desc: 'Protect endangered species', color: 'border-green-300 bg-green-50' },
];

const AGE_GROUPS = [
  { id: 'kids', label: 'Kids', icon: '🧒', desc: 'Ages 6–12 · Fun & simple', color: 'border-pink-300 bg-pink-50' },
  { id: 'teens', label: 'Teens / College', icon: '🎓', desc: 'Ages 13–22 · Challenging', color: 'border-indigo-300 bg-indigo-50' },
  { id: 'adults', label: 'Adults', icon: '👨‍💼', desc: 'Ages 23+ · Expert level', color: 'border-slate-300 bg-slate-50' },
];

export default function PersonalizationPage() {
  const { userData } = useAuth();
  const { selectTheme, selectAgeGroup } = useGame();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState(userData?.selectedTheme || null);
  const [selectedAge, setSelectedAge] = useState(userData?.selectedAgeGroup || null);
  const [saving, setSaving] = useState(false);

  async function handleContinue() {
    if (step === 1 && selectedTheme) {
      await selectTheme(selectedTheme);
      setStep(2);
    } else if (step === 2 && selectedAge) {
      setSaving(true);
      await selectAgeGroup(selectedAge);
      navigate(`/levels/${selectedTheme}`);
    }
  }

  return (
    <div className="page-container max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${step >= 1 ? 'bg-eco-500' : 'bg-gray-300'}`}>1</div>
          <div className={`w-20 h-1 rounded ${step >= 2 ? 'bg-eco-500' : 'bg-gray-300'}`}></div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${step >= 2 ? 'bg-eco-500' : 'bg-gray-300'}`}>2</div>
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          {step === 1 && (
            <>
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">🎯 Choose Your Theme</h2>
              <p className="text-center text-gray-500 mb-8">What environmental topic interests you most?</p>
              <div className="grid gap-4">
                {THEMES.map((t) => (
                  <motion.button
                    key={t.id}
                    onClick={() => setSelectedTheme(t.id)}
                    className={`eco-card flex items-center gap-5 p-6 border-2 text-left transition-all ${selectedTheme === t.id ? 'border-eco-500 bg-eco-50 shadow-eco' : t.color}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-4xl">{t.icon}</span>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{t.label}</h4>
                      <p className="text-gray-500">{t.desc}</p>
                    </div>
                    {selectedTheme === t.id && <span className="ml-auto text-eco-500 text-3xl">✓</span>}
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">👤 Select Age Group</h2>
              <p className="text-center text-gray-500 mb-8">This adjusts difficulty and language</p>
              <div className="grid gap-4">
                {AGE_GROUPS.map((a) => (
                  <motion.button
                    key={a.id}
                    onClick={() => setSelectedAge(a.id)}
                    className={`eco-card flex items-center gap-5 p-6 border-2 text-left transition-all ${selectedAge === a.id ? 'border-eco-500 bg-eco-50 shadow-eco' : a.color}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-4xl">{a.icon}</span>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{a.label}</h4>
                      <p className="text-gray-500">{a.desc}</p>
                    </div>
                    {selectedAge === a.id && <span className="ml-auto text-eco-500 text-3xl">✓</span>}
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </motion.div>

        <div className="flex justify-between mt-8">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="eco-btn-outline">← Back</button>
          )}
          <motion.button
            onClick={handleContinue}
            disabled={saving || (step === 1 && !selectedTheme) || (step === 2 && !selectedAge)}
            className="eco-btn ml-auto disabled:opacity-40"
            whileHover={{ scale: 1.03 }}
          >
            {saving ? 'Saving...' : step === 1 ? 'Next →' : '🚀 Start Mission'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
