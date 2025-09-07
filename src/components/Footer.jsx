import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-gray-100 overflow-hidden">
      {/* Premium background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-400/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">AJ</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Atul Jha
              </h2>
            </div>
            <p className="text-blue-100 max-w-sm leading-relaxed text-lg">
              Crafting exceptional digital experiences through innovative web development and creative problem-solving.
            </p>
            <div className="flex space-x-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Skills", href: "/skills" },
                { name: "Certifications", href: "/certifications" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
              Get In Touch
            </h3>
            <div className="space-y-4">
              {[
                { label: "Email", value: "atuljha275@gmail.com" },
                { label: "Phone", value: "+91-6290475584" },
                { label: "Location", value: "India" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col space-y-1 group">
                  <span className="text-blue-300 text-sm font-medium">{item.label}</span>
                  <span className="text-blue-100 group-hover:text-white transition-colors duration-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-blue-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm">
              © {new Date().getFullYear()} Atul's Portfolio. Crafted with passion.
            </p>
            <div className="flex items-center space-x-2 text-blue-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
