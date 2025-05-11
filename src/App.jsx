"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CookieIcon } from "./components/CookieIcon"
import "./App.css"

function App() {
  const [blessings, setBlessings] = useState([])
  const [newBlessing, setNewBlessing] = useState("")
  const [isJarOpen, setIsJarOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddBlessing = (e) => {
    e.preventDefault()
    if (newBlessing.trim()) {
      setIsAnimating(true)
      // Add the blessing after the animation completes
      setTimeout(() => {
        setBlessings([...blessings, newBlessing])
        setNewBlessing("")
        setIsAnimating(false)
      }, 1000)
    }
  }

  return (
    <main className="app-container">
      <div className="content">
        <div className="header">
          <h1>Cookie Jar Blessings</h1>
          <p>Add your blessings to the cookie jar</p>
        </div>

        <div className="jar-container">
          {/* Cookie being added animation */}
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

          {/* Cookie Jar Container */}
          <div className="cookie-jar" onClick={() => setIsJarOpen(!isJarOpen)}>
            {/* Jar Body */}
            <div className="jar-body">
              {/* Jar Neck */}
              <div className="jar-neck"></div>

              {/* Jar Body */}
              <div className="jar-main">
                {/* Jar Contents (Cookies) */}
                <div className="jar-contents">
                  {/* Cookie Details */}
                  <div className="cookie-detail cookie-1"></div>
                  <div className="cookie-detail cookie-2"></div>
                  <div className="cookie-detail cookie-3"></div>
                  <div className="cookie-detail cookie-4"></div>
                  <div className="cookie-detail cookie-5"></div>
                </div>

                {/* Jar Shine */}
                <div className="jar-shine"></div>
              </div>

              {/* Cookie count indicator */}
              <div className="blessing-counter">
                {blessings.length} {blessings.length === 1 ? "blessing" : "blessings"}
              </div>
            </div>

            {/* Jar Lid */}
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
              {/* Lid Base */}
              <div className="lid-base">
                <div className="lid-top"></div>
                <div className="lid-bottom"></div>

                {/* Lid Knob */}
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

        {/* Blessings Display */}
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
                        <CookieIcon size={16} />
                        <span>{blessing}</span>
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
