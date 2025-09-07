"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { Home, User, Briefcase, Code, Mail, LayoutDashboard, Award } from "lucide-react"

export default function Navbar() {
  const router = useRouter()

  const links = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <User className="w-4 h-4" /> },
    { name: "Projects", path: "/projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Skills", path: "/skills", icon: <Code className="w-4 h-4" /> },
    { name: "Certifications", path: "/certifications", icon: <Award className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4" /> },
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
  ]

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-blue-700/30">
      {/* Premium top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>

      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between text-gray-100">
        {/* Enhanced Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-3 text-3xl font-bold text-white tracking-wider transition-all duration-500 hover:scale-110"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:rotate-6">
              <span className="text-white font-bold text-xl">AJ</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          </div>
        </Link>

        {/* Enhanced Navigation */}
        <div className="flex items-center space-x-2">
          {links.map((link) => {
            const isActive = link.path === "/" ? router.pathname === "/" : router.pathname.startsWith(link.path)

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`group relative flex items-center space-x-2 px-5 py-3 rounded-2xl font-medium text-sm transition-all duration-500 overflow-hidden backdrop-blur-sm
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-blue-800/50 text-blue-100 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                  }`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Icon with enhanced animation */}
                <span className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  {link.icon}
                </span>

                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-0.5">
                  {link.name}
                </span>

                {/* Premium hover indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-500 group-hover:w-3/4"></div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
