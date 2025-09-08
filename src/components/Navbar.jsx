"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Home, User, Briefcase, Code, Mail, LayoutDashboard, Award, Menu, X } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <User className="w-4 h-4" /> },
    { name: "Projects", path: "/projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Skills", path: "/skills", icon: <Code className="w-4 h-4" /> },
    { name: "Certifications", path: "/certifications", icon: <Award className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4" /> },
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-blue-700/30">
      {/* Premium top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between text-gray-100">
        {/* Logo */}
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <span className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">{link.icon}</span>
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-0.5">{link.name}</span>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-500 group-hover:w-3/4"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-blue-800/50 transition-all duration-300"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900/95 backdrop-blur-md px-4 py-4 border-t border-blue-700/30">
          <div className="flex flex-col space-y-3">
            {links.map((link) => {
              const isActive = link.path === "/" ? router.pathname === "/" : router.pathname.startsWith(link.path)
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "text-blue-100 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 hover:text-white"
                    }`}
                >
                  <span className="w-4 h-4">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
