"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Get theme colors
    const getThemeColors = () => {
      switch (theme) {
        case "green":
          return { primary: "#10b981", bg: "#121212" }
        case "amber":
          return { primary: "#f59e0b", bg: "#121212" }
        case "blue":
          return { primary: "#3b82f6", bg: "#121212" }
        case "pink":
          return { primary: "#ec4899", bg: "#121212" }
        case "matrix":
          return { primary: "#00ff41", bg: "#000000" }
        case "cyberpunk":
          return { primary: "#f9a8d4", bg: "#0f172a" }
        case "light":
          return { primary: "#6366f1", bg: "#f8fafc" }
        case "dark":
          return { primary: "#94a3b8", bg: "#0f172a" }
        default:
          return { primary: "#10b981", bg: "#121212" }
      }
    }

    // Matrix rain effect
    const createMatrixRain = () => {
      const colors = getThemeColors()

      // Matrix characters
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~"

      // Create drops
      const fontSize = 14
      const columns = Math.floor(canvas.width / fontSize)
      const drops: number[] = []

      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100)
      }

      // Draw matrix rain
      const draw = () => {
        // Semi-transparent black background to create fade effect
        ctx.fillStyle = `rgba(${theme === "light" ? "248, 250, 252" : "0, 0, 0"}, 0.05)`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = colors.primary
        ctx.font = `${fontSize}px monospace`

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = chars[Math.floor(Math.random() * chars.length)]

          // Draw character
          const x = i * fontSize
          const y = drops[i] * fontSize

          // Vary opacity for depth effect
          const opacity = Math.random() * 0.5 + 0.5
          ctx.fillStyle =
            theme === "matrix"
              ? `rgba(0, 255, 65, ${opacity})`
              : `rgba(${theme === "light" ? "99, 102, 241" : "255, 255, 255"}, ${opacity * 0.3})`

          ctx.fillText(char, x, y)

          // Move drop
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      // Animation loop
      let animationId: number

      const animate = () => {
        draw()
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => cancelAnimationFrame(animationId)
    }

    // Grid effect
    const createGrid = () => {
      const colors = getThemeColors()

      // Grid properties
      const gridSize = 30
      const lineWidth = 0.5

      // Draw grid
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw grid lines
        ctx.beginPath()
        ctx.strokeStyle = `${colors.primary}20`
        ctx.lineWidth = lineWidth

        // Vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
        }

        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
        }

        ctx.stroke()

        // Draw moving dots at intersections
        const time = Date.now() * 0.001

        for (let x = 0; x <= canvas.width; x += gridSize) {
          for (let y = 0; y <= canvas.height; y += gridSize) {
            // Calculate dot size based on sine wave
            const distX = x - canvas.width / 2
            const distY = y - canvas.height / 2
            const dist = Math.sqrt(distX * distX + distY * distY)

            const size = Math.sin(dist * 0.01 - time) * 1.5 + 1.5

            if (size > 0) {
              ctx.fillStyle = `${colors.primary}40`
              ctx.beginPath()
              ctx.arc(x, y, size, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      }

      // Animation loop
      let animationId: number

      const animate = () => {
        draw()
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => cancelAnimationFrame(animationId)
    }

    // Particles effect
    const createParticles = () => {
      const colors = getThemeColors()

      // Particles
      const particleCount = 100
      const particles: {
        x: number
        y: number
        radius: number
        color: string
        speedX: number
        speedY: number
      }[] = []

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `${colors.primary}${Math.floor(Math.random() * 50 + 20)}`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        })
      }

      // Draw particles
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (const particle of particles) {
          // Move particle
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        }

        // Draw connections
        ctx.strokeStyle = `${colors.primary}10`
        ctx.lineWidth = 0.5

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 100) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Animation loop
      let animationId: number

      const animate = () => {
        draw()
        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => cancelAnimationFrame(animationId)
    }

    // Choose animation based on theme
    let cleanup: () => void

    if (theme === "matrix") {
      cleanup = createMatrixRain()
    } else if (theme === "cyberpunk") {
      cleanup = createGrid()
    } else {
      cleanup = createParticles()
    }

    return () => {
      cleanup()
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" aria-hidden="true" />
}

