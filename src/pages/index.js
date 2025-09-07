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
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-100/30"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Passionate about learning
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Atul</span>
              </h1>

              <p className="text-2xl lg:text-3xl text-gray-600 font-medium">Aspiring Full-Stack Developer</p>

              <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                I’m a passionate student exploring the world of web development.
                Currently learning modern stacks like React, NestJS, and MongoDB for backend.
                Eager to build full-stack projects and grow into a skilled backend developer.
              </p>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-96 h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200">
                <img
                  src="/images/atuljha.jpeg"
                  alt="Atul - Front-End Developer"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Passionate Student</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-blue-100">
                <div className="flex items-center space-x-2">
                  <RocketLaunchIcon className="w-6 h-6 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Ready to Launch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
