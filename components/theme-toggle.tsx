"use client"

import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Terminal, Palette } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
          {theme === "light" && <Sun className="h-4 w-4" />}
          {theme === "dark" && <Moon className="h-4 w-4" />}
          {theme !== "light" && theme !== "dark" && <Terminal className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("green")}>
          <Terminal className="mr-2 h-4 w-4" />
          <span>Green</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("amber")}>
          <Terminal className="mr-2 h-4 w-4" />
          <span>Amber</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("blue")}>
          <Terminal className="mr-2 h-4 w-4" />
          <span>Blue</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("pink")}>
          <Terminal className="mr-2 h-4 w-4" />
          <span>Pink</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("matrix")}>
          <Palette className="mr-2 h-4 w-4" />
          <span>Matrix</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
          <Palette className="mr-2 h-4 w-4" />
          <span>Cyberpunk</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

