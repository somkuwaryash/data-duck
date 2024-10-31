// src/components/ThemeSwitcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light')

    const handleChange = () => {
      setTheme(darkModeMediaQuery.matches ? 'dark' : 'light')
    }
    darkModeMediaQuery.addListener(handleChange)

    return () => {
      darkModeMediaQuery.removeListener(handleChange)
    }
  }, [setTheme])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  )
}