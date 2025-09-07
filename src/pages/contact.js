import { FaTwitter, FaInstagram, FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa"
import {
  UserIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline"

export default function Contact() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/",
      bg: "from-pink-400 to-pink-600",
      hover: "hover:from-pink-500 hover:to-pink-700",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://facebook.com/",
      bg: "from-blue-300 to-blue-400",
      hover: "hover:from-blue-400 hover:to-blue-500",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/",
      bg: "from-blue-400 to-blue-500",
      hover: "hover:from-blue-500 hover:to-blue-600",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://linkedin.com/",
      bg: "from-blue-600 to-blue-700",
      hover: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/",
      bg: "from-gray-700 to-gray-900",
      hover: "hover:from-gray-600 hover:to-gray-800",
    },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-300/10 to-blue-400/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/15 to-blue-300/15 rounded-full blur-xl animate-pulse delay-500"></div>

        {/* Floating sparkle icons */}
        <SparklesIcon className="absolute top-32 right-1/4 w-6 h-6 text-blue-300/40 animate-pulse delay-300" />
        <SparklesIcon className="absolute bottom-32 left-1/4 w-4 h-4 text-blue-400/30 animate-bounce delay-700" />
        <HeartIcon className="absolute top-1/2 right-12 w-5 h-5 text-blue-300/30 animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16 w-full relative z-10">
        {/* Contact Form - Left */}
        <div className="flex-1 flex flex-col items-center justify-center lg:items-start lg:justify-start">
          <div className="relative mb-12 flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl backdrop-blur-sm border border-blue-200/30">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-center lg:text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative">
                Contact Me
              </h1>
              <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-lg">
            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100/50 hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300">
              <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl">
                <PhoneIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-sm text-blue-700 font-semibold">+6290475584</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100/50 hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300">
              <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl">
                <MapPinIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-sm text-blue-700 font-semibold">Kolkata, West-Bengal</p>
              </div>
            </div>
          </div>

          <form className="bg-white/70 backdrop-blur-xl p-8 lg:p-12 rounded-3xl shadow-[0_25px_50px_rgba(59,130,246,0.15)] border border-white/20 flex flex-col space-y-6 w-full max-w-lg group hover:shadow-[0_35px_60px_rgba(59,130,246,0.2)] transition-all duration-500">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <UserIcon className="w-5 h-5 text-blue-500/70" />
                </div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-12 pr-5 py-5 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50/50 text-gray-800 font-medium border border-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-300 placeholder-gray-500 hover:shadow-lg hover:shadow-blue-100/50"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <EnvelopeIcon className="w-5 h-5 text-blue-500/70" />
                </div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-12 pr-5 py-5 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50/50 text-gray-800 font-medium border border-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-300 placeholder-gray-500 hover:shadow-lg hover:shadow-blue-100/50"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-6 z-10">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500/70" />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows="6"
                  className="w-full pl-12 pr-5 py-5 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50/50 text-gray-800 font-medium border border-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-300 placeholder-gray-500 resize-none hover:shadow-lg hover:shadow-blue-100/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] active:scale-[0.98] group overflow-hidden flex items-center justify-center gap-3"
            >
              <span className="relative z-10">Send Message</span>
              <PaperAirplaneIcon className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Connect with Me - Right */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:items-start lg:justify-start">
          <div className="relative mb-10 flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl backdrop-blur-sm border border-blue-200/30">
              <HeartIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-center lg:text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
                Connect with Me
              </h2>
              <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-4 text-white font-semibold px-8 py-4 rounded-2xl bg-gradient-to-r ${link.bg} ${link.hover} transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] active:scale-[0.98] relative overflow-hidden border border-white/10 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Icon className="text-2xl relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <SparklesIcon className="w-4 h-4 text-white/70" />
                  </div>
                </a>
              )
            })}
          </div>

          <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100/50 max-w-md">
            <div className="flex items-start gap-3">
              <SparklesIcon className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium italic leading-relaxed">
                  "Let's create something amazing together. Every great project starts with a simple conversation."
                </p>
                <p className="text-blue-600 font-semibold mt-2 text-sm">- Ready to collaborate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
