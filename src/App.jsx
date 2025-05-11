"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CookieIcon } from "./components/CookieIcon"
import { Trash2, Save, Edit } from "lucide-react" // Import icons from lucide-react
import "./App.css"

function App() {
  const [blessings, setBlessings] = useState([])
  const [newBlessing, setNewBlessing] = useState("")
  const [isJarOpen, setIsJarOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingText, setEditingText] = useState("")

  // Load blessings from localStorage when the component mounts
  useEffect(() => {
    const savedBlessings = localStorage.getItem('cookieJarBlessings');
    if (savedBlessings) {
      try {
        const parsedBlessings = JSON.parse(savedBlessings);
        setBlessings(parsedBlessings);
      } catch (error) {
        console.error("Error parsing blessings from localStorage:", error);
      }
    }
  }, []);

// Save blessings to localStorage whenever the blessings array changes
  useEffect(() => {
    if (blessings.length > 0) {
      localStorage.setItem('cookieJarBlessings', JSON.stringify(blessings));
    }
  }, [blessings]);

  const handleAddBlessing = (e) => {
    e.preventDefault();
    if (newBlessing.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setBlessings((prevBlessings) => [...prevBlessings, newBlessing]);
        setNewBlessing("");
        setIsAnimating(false);
        setIsJarOpen(true); // Ensure the jar opens when a blessing is added
      }, 1000);
    }
  };

  const handleEditBlessing = (index) => {
    setEditingIndex(index)
    setEditingText(blessings[index])
  }

  const handleSaveEdit = () => {
    const updatedBlessings = [...blessings]
    updatedBlessings[editingIndex] = editingText
    setBlessings(updatedBlessings)
    setEditingIndex(null)
    setEditingText("")
  }

  const handleDeleteBlessing = (index) => {
    setBlessings(blessings.filter((_, i) => i !== index))
  }

  return (
      <main className="app-container">
        <div className="content">
          <div className="header">
            <h1>Cookie Jar Blessings</h1>
            <p>Add your blessings to the cookie jar</p>
          </div>

          <div className="jar-container">
            <AnimatePresence>
              {isAnimating && (
                  <motion.div
                      className="cookie-animation"
                      initial={{ top: -50, right: -100 }}
                      animate={{ top: 50, right: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                  >
                    <div className="cookie">
                      <CookieIcon />
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>

            <div className="cookie-jar" onClick={() => setIsJarOpen(!isJarOpen)}>
              <div className="jar-body">
                <div className="jar-neck"></div>
                <div className="jar-main">
                  <div className="jar-contents">
                    <div className="cookie-detail cookie-1"></div>
                    <div className="cookie-detail cookie-2"></div>
                    <div className="cookie-detail cookie-3"></div>
                    <div className="cookie-detail cookie-4"></div>
                    <div className="cookie-detail cookie-5"></div>
                  </div>
                  <div className="jar-shine"></div>
                </div>
                <div className="blessing-counter">
                  {blessings.length} {blessings.length === 1 ? "blessing" : "blessings"}
                </div>
              </div>

              <motion.div
                  className="jar-lid"
                  animate={{
                    rotateZ: isJarOpen ? 30 : 0,
                    x: isJarOpen ? 40 : -12,
                    y: isJarOpen ? -10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "bottom right" }}
              >
                <div className="lid-base">
                  <div className="lid-top"></div>
                  <div className="lid-bottom"></div>
                  <div className="lid-knob"></div>
                </div>
              </motion.div>
            </div>
          </div>

          <form onSubmit={handleAddBlessing} className="blessing-form">
            <div className="form-group">
              <label htmlFor="blessing">Your Blessing</label>
              <input
                  id="blessing"
                  value={newBlessing}
                  onChange={(e) => setNewBlessing(e.target.value)}
                  placeholder="I'm grateful for..."
                  disabled={isAnimating}
              />
            </div>
            <button type="submit" className="add-button" disabled={isAnimating || !newBlessing.trim()}>
              Add to Jar
            </button>
          </form>

          <AnimatePresence>
            {isJarOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="blessings-display"
                >
                  <div className="blessings-card">
                    <h2>Your Blessings</h2>
                    {blessings.length > 0 ? (
                        <ul className="blessing-items">
                          {blessings.map((blessing, index) => (
                              <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="blessing-item"
                              >
                                {editingIndex === index ? (
                                    <div className="edit-container">
                                      <input
                                          value={editingText}
                                          onChange={(e) => setEditingText(e.target.value)}
                                          className="form-group input"
                                      />
                                      <button
                                          onClick={handleSaveEdit}
                                          className="icon-button save-button"
                                          aria-label="Save"
                                      >
                                        <Save size={16} />
                                      </button>
                                    </div>
                                ) : (
                                    <>
                                      <CookieIcon size={16} />
                                      <span onClick={() => handleEditBlessing(index)}>{blessing}</span>
                                      <div className="blessing-actions">
                                        <button
                                            onClick={() => handleEditBlessing(index)}
                                            className="icon-button edit-button"
                                            aria-label="Edit"
                                        >
                                          <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBlessing(index)}
                                            className="icon-button delete-button"
                                            aria-label="Delete"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    </>
                                )}
                              </motion.li>
                          ))}
                        </ul>
                    ) : (
                        <p className="empty-state">No blessings yet. Add some!</p>
                    )}
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
  )
}

export default App