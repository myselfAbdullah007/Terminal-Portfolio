"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./theme-provider"
import { COMMAND_LIST, type CommandResponse, processCommand } from "@/lib/commands"
import { ThemeToggle } from "./theme-toggle"
import { X, Minus, Square } from "lucide-react"

interface TerminalLine {
  id: number
  content: string | string[]
  type: "input" | "output"
  outputType?: CommandResponse["type"]
}

interface TerminalProps {
  onClose?: () => void
}

export function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [bootSequence, setBootSequence] = useState(true)
  const [cursorBlink, setCursorBlink] = useState(true)
  const [typingLine, setTypingLine] = useState<number | null>(null)
  const [typingIndex, setTypingIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputWrapperRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  // Calculate cursor position
  const calculateCursorPosition = () => {
    if (!inputWrapperRef.current) return 0
    const textWidth = getTextWidth(input, getComputedStyle(inputWrapperRef.current).font)
    return textWidth
  }

  // Get text width helper
  const getTextWidth = (text: string, font: string) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) return 0
    context.font = font
    return context.measureText(text).width
  }

  // Boot sequence
  useEffect(() => {
    const bootMessages = [
      "Initializing system...",
      "Loading kernel modules...",
      "Starting Portfolio OS v1.0.0",
      "[OK] Mounted root filesystem",
      "[OK] Started System Logging Service",
      "[OK] Reached target Basic System",
      "[OK] Started Portfolio Service Manager",
      "Portfolio OS 1.0.0 LTS muhammad-terminal",
      "",
      "Welcome to Portfolio OS!",
      "Type 'help' for available commands.",
      "",
      "muhammad@portfolio:~$ neofetch",
    ]

    let delay = 0
    bootMessages.forEach((message, index) => {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            id: Date.now() + index,
            content: message,
            type: "output",
            outputType: "text",
          },
        ])
        if (index === bootMessages.length - 1) {
          executeCommand("neofetch")
          setBootSequence(false)
        }
      }, delay)
      delay += 100 // Faster boot sequence
    })
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [])

  // Focus input on mount and click
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus()
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Typing effect for command outputs
  useEffect(() => {
    if (typingLine !== null && lines[lines.length - 1]) {
      const content = lines[lines.length - 1].content
      const text = Array.isArray(content) ? content.join("\n") : content

      if (typingIndex < text.length) {
        const typingTimeout = setTimeout(() => {
          setTypingIndex(typingIndex + 1)
        }, 5)
        return () => clearTimeout(typingTimeout)
      }
    }
  }, [typingLine, typingIndex, lines])

  // Handle command execution
  const executeCommand = (command: string) => {
    if (command.toLowerCase() === "exit") {
      onClose?.()
      return
    }

    setLines((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: `muhammad@portfolio:~$ ${command}`,
        type: "input",
      },
    ])
    setCommandHistory((prev) => [command, ...prev])
    setHistoryIndex(-1)

    if (command.trim()) {
      const response = processCommand(command.trim())

      if (command.startsWith("theme ")) {
        const theme = command.split(" ")[1]
        if (["green", "amber", "blue", "pink", "matrix", "cyberpunk", "light", "dark"].includes(theme)) {
          setTheme(theme as any)
        }
      }

      if (response.type === "clear") {
        setLines([])
        return
      }

      setTypingLine(lines.length)
      setTypingIndex(0)

      setLines((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          content: response.content,
          type: "output",
          outputType: response.type,
        },
      ])
    }
  }

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (bootSequence) return

    switch (e.key) {
      case "Enter":
        executeCommand(input)
        setInput("")
        break
      case "ArrowUp":
        e.preventDefault()
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
        break
      case "ArrowDown":
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        } else {
          setHistoryIndex(-1)
          setInput("")
        }
        break
      case "Tab":
        e.preventDefault()
        const matchingCommands = COMMAND_LIST.filter((cmd) => cmd.startsWith(input.toLowerCase()))
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0])
        }
        break
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-mono text-sm">
      <div className="fixed inset-0 pointer-events-none">
        <div className="retro-scanline absolute inset-0 z-10" />
        <div className="background-animation absolute inset-0" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto z-20">
        <div className="flex items-center bg-terminal-header p-2 rounded-t-lg border-b border-primary/20">
          <div className="flex space-x-2 mr-4">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors group"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group"
              aria-label="Minimize"
            >
              <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors group"
              aria-label="Maximize"
            >
              <Square className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <div className="text-xs text-center flex-1 text-primary/80">muhammad@portfolio: ~/terminal</div>
          <ThemeToggle />
        </div>

        <div
          ref={containerRef}
          className="relative h-[70vh] md:h-[80vh] overflow-auto border border-primary/20 p-4 rounded-b-lg bg-background/80 backdrop-blur-sm terminal-shadow"
        >
          <AnimatePresence mode="popLayout">
            {lines.map((line, index) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                {line.type === "input" ? (
                  <div className="text-primary font-medium">{line.content}</div>
                ) : (
                  <div
                    className={`${
                      line.outputType === "error"
                        ? "text-destructive"
                        : line.outputType === "success"
                          ? "text-primary"
                          : line.outputType === "system"
                            ? "ascii-art text-primary"
                            : "command-output text-foreground"
                    }`}
                  >
                    {Array.isArray(line.content) ? (
                      line.content.map((text, i) => (
                        <div key={i}>
                          {typingLine === index && i === line.content.length - 1
                            ? text.substring(0, typingIndex)
                            : text}
                        </div>
                      ))
                    ) : (
                      <div>
                        {typingLine === index ? line.content.toString().substring(0, typingIndex) : line.content}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {!bootSequence && (
            <div className="flex items-center">
              <span className="text-primary font-medium mr-2">muhammad@portfolio:~$</span>
              <div ref={inputWrapperRef} className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-foreground caret-transparent"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  disabled={bootSequence}
                />
                {/* Custom blinking cursor */}
                <span
                  className="absolute top-0 left-0 h-full pointer-events-none"
                  style={{
                    left: `${calculateCursorPosition()}px`,
                    opacity: cursorBlink ? 1 : 0,
                    transition: "opacity 0.1s",
                  }}
                >
                  <span className="inline-block w-[0.6ch] h-[1.2em] bg-primary"></span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

