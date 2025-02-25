export type CommandResponse = {
  content: string | string[]
  type: "text" | "error" | "success" | "system" | "clear"
}

export const COMMAND_LIST = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "clear",
  "neofetch",
  "theme",
  "ls",
  "echo",
  "date",
  "whoami",
  "uname",
  "exit",
]

export function processCommand(input: string): CommandResponse {
  const [command, ...args] = input.trim().split(" ")

  switch (command.toLowerCase()) {
    case "help":
      return {
        content: [
          "Available commands:",
          "",
          "help        - Show this help message",
          "about       - About me",
          "skills      - My technical skills",
          "projects    - View my projects",
          "contact     - How to reach me",
          "neofetch    - Display system info",
          "theme       - Change terminal theme (green, amber, blue, pink, matrix, cyberpunk, light, dark)",
          "clear       - Clear the terminal",
          "ls          - List directory contents",
          "cat        - View file contents",
          "date       - Display current date and time",
          "echo       - Print text to terminal",
          "whoami     - Display current user",
          "uname      - Display system information",
          "exit       - Close the terminal",
        ],
        type: "text",
      }

    case "neofetch":
      return {
        content: [
          "                   ..,                     muhammad@portfolio",
          "                 .PLTJ.                    -----------------",
          "                <><><><>                   OS: Portfolio OS 1.0.0 LTS",
          "       KKSSV' 4KKK LJ KKKL.'VSSKK         Host: GitHub Pages",
          "       KKV' 4KKKKK LJ KKKKAL 'VKK         Kernel: Next.js 14.0.4",
          "       V' ' 'VKKKK LJ KKKKV' ' 'V         Uptime: 5 years",
          "       .4MA.' 'VKK LJ KKV' '.4Mb.         Packages: 42 (npm)",
          "     . KKKKKA.' 'V LJ V' '.4KKKKK .       Shell: React.js",
          "   .4D KKKKKKKA.'' LJ ''.4KKKKKKK FA.     Resolution: 1920x1080",
          "  <QDD ++++++++++++  ++++++++++++ GFD>    DE: Terminal UI",
          "   'VD KKKKKKKK'.. LJ ..'KKKKKKKK FV      Theme: Green (default)",
          "     ' VKKKKK'. .4 LJ K. .'KKKKKV '       CPU: JavaScript V8",
          "        'VK'. .4KK LJ KKA. .'KV'          GPU: WebGL 2.0",
          "       A. . .4KKKK LJ KKKKA. . .4         Memory: 512MB / 1024MB",
          "       KKA. 'KKKKK LJ KKKKK' .4KK         ",
          "       KKSSA. VKKK LJ KKKV .4SSKK         ",
          "                <><><><>                   ",
          "                 'MKKM'                    ",
          "                   ''                      ",
        ],
        type: "system",
      }

    case "about":
      return {
        content: [
          "┌───────────────────────────────────────────┐",
          "│               ABOUT ME                    │",
          "└───────────────────────────────────────────┘",
          "",
          "Hi there! I'm Muhammad Abdullah Chaudhary, a software developer with a passion for",
          "creating elegant solutions to complex problems. I specialize in",
          "web development with a focus on modern JavaScript frameworks.",
          "",
          "I have a background in computer science and have been coding",
          "for over 5 years professionally. When I'm not coding, you can",
          "find me exploring new technologies, contributing to open source,",
          "or enjoying the outdoors.",
          "",
          "Type 'skills' to see my technical expertise or 'projects' to",
          "view some of my work.",
        ],
        type: "text",
      }

    case "skills":
      return {
        content: [
          "┌───────────────────────────────────────────┐",
          "│               SKILLS                      │",
          "└───────────────────────────────────────────┘",
          "",
          "Frontend:",
          "  • React, Next.js, Vue.js",
          "  • TypeScript, JavaScript",
          "  • HTML5, CSS3, Tailwind CSS",
          "  • Redux, React-Native",
          "",
          "Backend:",
          "  • Node.js, Express",
          "  • Python, Django",
          "  • RESTful APIs, GraphQL",
          "",
          "Database:",
          "  • PostgreSQL, MongoDB, MySQL",
          "  • Prisma, Mongoose",
          "",
          "DevOps & Tools:",
          "  • Git, GitHub Actions",
          "  • Docker, Kubernetes",
          "  • AWS, Vercel, Netlify",
          "  • Jest, Cypress",
        ],
        type: "text",
      }

    case "projects":
      return {
        content: [
          "┌───────────────────────────────────────────┐",
          "│               PROJECTS                    │",
          "└───────────────────────────────────────────┘",
          "",
          "1. Portfolio Terminal",
          "   A unique terminal-based portfolio website built with Next.js",
          "   and TypeScript. Features command-line navigation and retro",
          "   terminal aesthetics.",
          "   [Technologies: Next.js, TypeScript, Framer Motion]",
          "",
          "2. E-commerce Platform",
          "   Full-stack e-commerce solution with product management,",
          "   cart functionality, and payment processing.",
          "   [Technologies: React, Node.js, MongoDB, Stripe]",
          "",
          "3. Task Management App",
          "   Collaborative task management tool with real-time updates",
          "   and team collaboration features.",
          "   [Technologies: Vue.js, Firebase, Tailwind CSS]",
          "",
          "4. Weather Dashboard",
          "   Interactive weather application with location-based forecasts",
          "   and historical weather data visualization.",
          "   [Technologies: React, D3.js, OpenWeather API]",
          "",
          "5. RentLink (Final Year Project)",
          "   A web-based platform for tenants and landlords with role-based",
          "   access control (RBAC), ticketing systems, financial management,",
          "   and contract customization. Implemented DevOps practices,",
          "   including CI/CD pipelines, Docker, and cloud hosting.",
          "   [Technologies: MERN Stack, Docker, CI/CD, Cloud Hosting]",
          "",
          "6. Mock Interview & CV Tracking System",
          "   A MERN stack-based platform that enables career service officers",
          "   to schedule mock interviews and track student CVs, helping",
          "   students prepare for job applications.",
          "   [Technologies: MERN Stack, Authentication, Role-Based Access]",
          "",
          "7. Arcade Machine",
          "   A web-based arcade platform showcasing classic games with a",
          "   responsive design, dynamic interactions, and engaging UI/UX.",
          "   [Technologies: JavaScript, HTML/CSS, Game Development]",
          "",
          "8. Encyclopedia of Arabic Poetry",
          "   A Java-based interactive application that explores pre-Islamic",
          "   Arabic poetry, analyzing word origins and linguistic roots.",
          "   [Technologies: Java, MySQL, Swing]",
          "",
          "9. Inventory Management System",
          "   A C++-based application utilizing Object-Oriented Programming",
          "   and Data Structures concepts for efficient inventory tracking.",
          "   [Technologies: C++, File Handling, OOP]",
          "",
          "10. Cinema Ticketing Application",
          "    A Java and MySQL-based system for cinema ticket bookings,",
          "    enhancing user experience with an intuitive interface.",
          "    [Technologies: Java, MySQL, Swing]",
          "",
          "Type 'cat project1' to view more details about a specific project.",
        ],
        type: "text",
      }

    case "contact":
      return {
        content: [
          "┌───────────────────────────────────────────┐",
          "│               CONTACT                     │",
          "└───────────────────────────────────────────┘",
          "",
          "Email:    myselfabdullah007@gmail.com",
          "GitHub:   github.com/myselfabdullah007",
          "LinkedIn: linkedin.com/in/myselfabdullah007",
          "Instagram: instagram.com/chaudharyabdullah0",
          "",
          "Feel free to reach out for collaborations, job opportunities,",
          "or just to say hello!",
        ],
        type: "text",
      }

    case "clear":
      return {
        content: "",
        type: "clear",
      }

    case "theme":
      if (args.length === 0) {
        return {
          content: "Usage: theme [green|amber|blue|pink|matrix|cyberpunk|light|dark]",
          type: "text",
        }
      }

      const theme = args[0].toLowerCase()
      if (!["green", "amber", "blue", "pink", "matrix", "cyberpunk", "light", "dark"].includes(theme)) {
        return {
          content: `Error: Unknown theme '${theme}'. Available themes: green, amber, blue, pink, matrix, cyberpunk, light, dark`,
          type: "error",
        }
      }

      return {
        content: `Theme changed to ${theme}`,
        type: "success",
      }

    case "ls":
      return {
        content: ["about.txt", "skills.md", "projects/", "contact.json", "resume.pdf", "themes/", ".config"],
        type: "text",
      }

    case "date":
      return {
        content: new Date().toString(),
        type: "text",
      }

    case "echo":
      return {
        content: args.join(" ") || "",
        type: "text",
      }

    case "whoami":
      return {
        content: "muhammad Abdullah Chaudhary",
        type: "text",
      }

    case "uname":
      return {
        content: "Portfolio OS 1.0.0 LTS Muhammad-Abdullah-Chaudhary_terminal",
        type: "text",
      }

    default:
      return {
        content: `Command not found: ${command}. Type 'help' for available commands.`,
        type: "error",
      }
  }
}
//end of file

