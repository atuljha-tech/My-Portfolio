import Link from "next/link"
import {
  SparklesIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-blue-300/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-300/15 to-indigo-300/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-200/15 to-blue-200/10 rounded-full blur-xl animate-float delay-1500"></div>

        {/* Floating Icons */}
        <SparklesIcon className="absolute top-32 left-20 w-6 h-6 text-blue-400/40 animate-pulse delay-300" />
        <SparklesIcon className="absolute bottom-32 right-20 w-5 h-5 text-indigo-400/30 animate-pulse delay-700" />
        <RocketLaunchIcon className="absolute top-40 right-40 w-5 h-5 text-blue-300/40 animate-bounce delay-500" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Side - Enhanced Content */}
          <div className="space-y-8 text-center lg:text-left px-2">
            <div className="space-y-6">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl text-blue-700 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <SparklesIcon className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                Passionate Computer Science Student
              </div>

              {/* Enhanced Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent relative">
                    Atul
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-700 font-medium">
                  Aspiring{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                    Full-Stack Developer
                  </span>
                </p>
              </div>

              {/* Enhanced Description */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                I'm a passionate Computer Science student exploring the world of web development.
                Currently learning modern stacks like{" "}
                <span className="font-semibold text-blue-600">React, Next.js, Blockchain and MongoDB</span>.
                Eager to build full-stack projects and grow into a skilled developer.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/projects"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                >
                  <span>View My Work</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <Link
                  href="/about"
                  className="group bg-white/80 backdrop-blur-sm border border-blue-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Learn About Me</span>
                </Link>
              </div>
            </div>

            
          </div>

          {/* Right Side - Fixed Hero Image */}
          <div className="flex justify-center lg:justify-end px-2">
            <div className="relative w-full max-w-sm md:max-w-md">
              {/* Fixed Image Container */}
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl p-2 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-white p-3">
                    <img
                      src="/images/atuljha.jpeg"
                      alt="Atul Jha - Full-Stack Developer"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                
                {/* Floating Elements - Positioned relative to image container */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                      Passionate Student
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-blue-100 group-hover:scale-110 transition-transform duration-300 delay-100">
                  <div className="flex items-center gap-2">
                    <RocketLaunchIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                      Ready to Launch
                    </span>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500 delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}