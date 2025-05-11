"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CookieIcon } from "lucide-react"

export default function Home() {
  const [blessings, setBlessings] = useState<string[]>([])
  const [newBlessing, setNewBlessing] = useState("")
  const [isJarOpen, setIsJarOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddBlessing = (e: React.FormEvent) => {
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-amber-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">Cookie Jar Blessings</h1>
          <p className="text-amber-700 mt-2">Add your blessings to the cookie jar</p>
        </div>

        <div className="relative flex justify-center py-10 mt-10">
          {/* Cookie being added animation */}
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                className="absolute z-30"
                initial={{ top: -50, right: -100 }}
                animate={{ top: 50, right: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="bg-amber-200 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                  <CookieIcon className="text-amber-700" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cookie Jar Container */}
          <div className="relative cursor-pointer" onClick={() => setIsJarOpen(!isJarOpen)}>
            {/* Jar Body */}
            <div className="relative w-64 h-72">
              {/* Jar Neck */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-amber-200 rounded-t-lg border-2 border-amber-300 z-10"></div>

              {/* Jar Body */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-56 h-64 bg-amber-100 bg-opacity-70 rounded-2xl border-2 border-amber-300 overflow-hidden">
                {/* Jar Contents (Cookies) */}
                <div className="absolute bottom-0 w-full h-1/2 bg-amber-300 rounded-b-xl">
                  {/* Cookie Details */}
                  <div className="absolute top-4 left-8 w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="absolute top-10 left-20 w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="absolute top-6 left-36 w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="absolute top-14 left-12 w-6 h-6 rounded-full bg-amber-700"></div>
                  <div className="absolute top-16 left-28 w-6 h-6 rounded-full bg-amber-700"></div>
                </div>

                {/* Jar Shine */}
                <div className="absolute top-4 left-4 w-2 h-40 bg-white bg-opacity-30 rounded-full"></div>
              </div>

              {/* Cookie count indicator */}
              <div className="absolute top-12 right-8 bg-amber-100 rounded-full px-2 py-1 text-xs font-bold text-amber-800 z-20">
                {blessings.length} {blessings.length === 1 ? "blessing" : "blessings"}
              </div>
            </div>

            {/* Jar Lid */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
              animate={{
                rotateZ: isJarOpen ? 30 : 0,
                x: isJarOpen ? 40 : -4,
                y: isJarOpen ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ transformOrigin: "bottom right" }}
            >
              {/* Lid Base */}
              <div className="relative">
                <div className="w-48 h-6 bg-amber-700 rounded-t-full"></div>
                <div className="w-48 h-4 bg-amber-800 rounded-b-full"></div>

                {/* Lid Knob */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-amber-800 rounded-t-full"></div>
              </div>
            </motion.div>
          </div>
        </div>

        <form onSubmit={handleAddBlessing} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="blessing" className="text-amber-800">
              Your Blessing
            </Label>
            <Input
              id="blessing"
              value={newBlessing}
              onChange={(e) => setNewBlessing(e.target.value)}
              placeholder="I'm grateful for..."
              className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
              disabled={isAnimating}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isAnimating || !newBlessing.trim()}
          >
            Add to Jar
          </Button>
        </form>

        {/* Blessings Display */}
        <AnimatePresence>
          {isJarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <Card className="p-4 bg-amber-100 border-amber-300">
                <h2 className="text-xl font-bold text-amber-800 mb-4">Your Blessings</h2>
                {blessings.length > 0 ? (
                  <ul className="space-y-2">
                    {blessings.map((blessing, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-2 bg-white rounded-lg shadow-sm flex items-center gap-2"
                      >
                        <CookieIcon className="text-amber-600 h-4 w-4" />
                        <span className="text-amber-800">{blessing}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-amber-700 text-center italic">No blessings yet. Add some!</p>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
