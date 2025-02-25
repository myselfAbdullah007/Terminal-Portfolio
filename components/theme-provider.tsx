"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "green" | "amber" | "blue" | "pink" | "matrix" | "cyberpunk" | "light" | "dark" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "green",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "green" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("terminal-theme") as Theme) || defaultTheme
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    const isDark = theme === "dark" || theme === "matrix" || theme === "cyberpunk"

    // Remove all theme classes
    root.classList.remove(
      "theme-green",
      "theme-amber",
      "theme-blue",
      "theme-pink",
      "theme-matrix",
      "theme-cyberpunk",
      "theme-light",
      "theme-dark",
      "dark",
    )

    // Add the current theme class
    root.classList.add(`theme-${theme}`)

    // Add dark class for dark themes
    if (isDark) {
      root.classList.add("dark")
    }

    // Save theme preference
    localStorage.setItem("terminal-theme", theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
    },
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

