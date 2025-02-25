"use client"

import { useState } from "react"

import { Terminal } from "./terminal"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TerminalIcon, 
  ChevronRightIcon, 
  CodeIcon, 
  GlobeIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MailIcon
} from "lucide-react"
const socialLinks = [
  { name: "GitHub", icon: <GithubIcon className="h-5 w-5" />, url: "https://github.com/myselfAbdullah007", ariaLabel: "GitHub Profile" },
  { name: "LinkedIn", icon: <LinkedinIcon className="h-5 w-5" />, url: "www.linkedin.com/in/myselfabdullah007", ariaLabel: "LinkedIn Profile" },
  { name: "Instagram", icon: <InstagramIcon className="h-5 w-5" />, url: "https://www.instagram.com/chaudharyabdullah0/", ariaLabel: "Instagram Profile" },
  { name: "Email", icon: <MailIcon className="h-5 w-5" />, url: "mailto:myselfabdullah007@gmail.com", ariaLabel: "Email Me" },
  
]
export function Intro() {
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <div className="min-h-screen w-full relative">
      <AnimatePresence mode="wait">
        {!showTerminal ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
          > <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <Badge variant="outline" className="px-4 py-1 text-sm font-medium mb-8">
            Software Engineer & Full-Stack Developer
          </Badge>
        </motion.div>
            <motion.h1
            
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-primary"
            >
              Muhammad Abdullah Chaudhary
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-foreground/90"
            >
              Chaudhary
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-8 max-w-2xl text-foreground/80"
            >
             Crafting digital experiences through elegant code. Dive into my interactive portfolio 
             via command line to discover my projects, technical expertise, and professional journey.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button size="lg" className="text-lg px-8" onClick={() => setShowTerminal(true)}>
                <TerminalIcon className="mr-2 h-5 w-5" />
                Launch Terminal
              </Button>
            </motion.div>
            {/* Social Media Icons */}
               
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute bottom-8 flex flex-col items-center gap-4"
            >
              <div className="flex items-center text-foreground/60 text-sm">
                <GlobeIcon className="h-4 w-4 mr-2" />
                <span>Based in Faisalabad, Pakistan</span>
              </div>
              
              {/* Social Media Icons */}
              <TooltipProvider>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={social.url}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 text-foreground/70 hover:text-primary hover:bg-foreground/10 transition-colors duration-200"
                            aria-label={social.ariaLabel}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {social.icon}
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </div>
              </TooltipProvider>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="w-full h-full absolute inset-0"
          >
            <Terminal onClose={() => setShowTerminal(false)} />
          </motion.div>
          
          
        )}
      </AnimatePresence>
    </div>
  )
}

