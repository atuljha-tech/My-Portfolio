import Link from "next/link"
import {
  SparklesIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-100/30"></div>
        <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left px-2 sm:px-4">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs sm:text-sm font-medium">
                <SparklesIcon className="w-4 h-4 mr-1.5 sm:mr-2" />
                Passionate about learning
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Atul
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-medium">
                Aspiring Full-Stack Developer
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-2xl leading-relaxed mx-auto lg:mx-0 px-1 sm:px-0">
                I’m a passionate student exploring the world of web development.
                Currently learning modern stacks like React, NestJS, and MongoDB
                for backend. Eager to build full-stack projects and grow into a
                skilled backend developer.
              </p>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="flex justify-center lg:justify-end px-2 sm:px-0">
            <div className="relative w-full max-w-[14rem] sm:max-w-sm md:max-w-md lg:w-96">
              {/* Main Image Container */}
              <div className="relative w-full aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200">
                <img
                  src="/images/atuljha.jpeg"
                  alt="Atul - Front-End Developer"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl border border-blue-100">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <CheckBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                    Passionate Student
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl border border-blue-100">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <RocketLaunchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                    Ready to Launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
