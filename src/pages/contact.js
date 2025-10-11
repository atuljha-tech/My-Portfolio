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
      url: "https://www.instagram.com/atul277777?igsh=OTVsZjh2NmVpb29n",
      bg: "from-pink-500 to-rose-500",
      hover: "hover:from-pink-600 hover:to-rose-600",
      border: "border-pink-200/30",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://facebook.com/",
      bg: "from-blue-500 to-indigo-500",
      hover: "hover:from-blue-600 hover:to-indigo-600",
      border: "border-blue-200/30",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/",
      bg: "from-sky-500 to-blue-500",
      hover: "hover:from-sky-600 hover:to-blue-600",
      border: "border-sky-200/30",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/in/atuljha275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      bg: "from-blue-600 to-blue-700",
      hover: "hover:from-blue-700 hover:to-blue-800",
      border: "border-blue-300/30",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/ATULJHAgh",
      bg: "from-gray-700 to-gray-800",
      hover: "hover:from-gray-800 hover:to-gray-900",
      border: "border-gray-400/30",
    },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-blue-200/20 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-300/15 to-indigo-300/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-indigo-200/15 to-blue-200/10 rounded-full blur-xl animate-float delay-1000"></div>

        {/* Floating Icons */}
        <SparklesIcon className="absolute top-20 right-20 w-5 h-5 text-blue-400/40 animate-pulse delay-300" />
        <SparklesIcon className="absolute bottom-20 left-20 w-4 h-4 text-indigo-400/30 animate-pulse delay-700" />
        <HeartIcon className="absolute top-1/3 left-10 w-5 h-5 text-blue-300/30 animate-bounce delay-500" />
        <SparklesIcon className="absolute bottom-1/4 right-10 w-6 h-6 text-indigo-300/40 animate-pulse delay-1200" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 w-full relative z-10">
        {/* Contact Form - Left Side */}
        <div className="flex-1 flex flex-col items-center lg:items-start w-full max-w-2xl">
          {/* Enhanced Header */}
          <div className="text-center lg:text-left mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                Get In Touch
              </h1>
              <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            </div>
            <p className="text-slate-600 text-lg max-w-md mx-auto lg:mx-0">
              Let's discuss your next project or just say hello
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">
            <div className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-lg hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <PhoneIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Phone</p>
                <p className="text-base text-blue-700 font-semibold">+6290475584</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-lg hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MapPinIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Location</p>
                <p className="text-base text-blue-700 font-semibold">Kolkata, West-Bengal</p>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <form className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-blue-100/30 border border-white/20 flex flex-col space-y-6 w-full group hover:shadow-3xl hover:shadow-blue-100/40 transition-all duration-500">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <UserIcon className="w-5 h-5 text-blue-500/70" />
                </div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/50 text-slate-800 font-medium border border-blue-100/50 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-300 transition-all duration-300 placeholder-slate-500 hover:shadow-lg hover:shadow-blue-100/30 backdrop-blur-sm"
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
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/50 text-slate-800 font-medium border border-blue-100/50 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-300 transition-all duration-300 placeholder-slate-500 hover:shadow-lg hover:shadow-blue-100/30 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-5 z-10">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500/70" />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/50 text-slate-800 font-medium border border-blue-100/50 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-300 transition-all duration-300 placeholder-slate-500 resize-none hover:shadow-lg hover:shadow-blue-100/30 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group/btn overflow-hidden flex items-center justify-center gap-3 shadow-lg"
            >
              <span className="relative z-10">Send Message</span>
              <PaperAirplaneIcon className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Social Links - Right Side */}
        <div className="w-full lg:w-96 flex flex-col items-center lg:items-start">
          {/* Social Header */}
          <div className="text-center lg:text-left mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 bg-clip-text text-transparent tracking-tight">
                Connect With Me
              </h2>
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-slate-600 text-base">
              Let's stay connected across platforms
            </p>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between text-white font-semibold px-6 py-4 rounded-2xl bg-gradient-to-r ${link.bg} ${link.hover} border ${link.border} transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] relative overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Icon className="text-xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="relative z-10">{link.name}</span>
                  </div>
                  <SparklesIcon className="w-4 h-4 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              )
            })}
          </div>

          {/* Quote Card */}
          <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-lg max-w-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg">
                <SparklesIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-700 font-medium italic leading-relaxed">
                  "Great collaborations start with meaningful conversations. Let's build something extraordinary together."
                </p>
                <p className="text-blue-600 font-semibold mt-3 text-sm">- Excited to connect</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}