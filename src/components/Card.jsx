export default function Card({ title, description }) {
  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50/20 to-white border border-blue-100/60 rounded-3xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-700 hover:scale-[1.03] cursor-pointer overflow-hidden backdrop-blur-sm">
      {/* Premium glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/3 to-blue-600/8 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl"></div>

      {/* Animated glow border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-25 blur-xl transition-all duration-700 -z-10 animate-pulse"></div>

      {/* Enhanced Card Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Premium title with gradient */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent transition-all duration-500 group-hover:from-blue-700 group-hover:via-blue-800 group-hover:to-blue-900 group-hover:scale-105">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg max-w-sm group-hover:text-gray-800 transition-all duration-500 group-hover:translate-y-1">
          {description}
        </p>
      </div>

      {/* Premium bottom accent with pulse animation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-700 group-hover:w-5/6 group-hover:animate-pulse"></div>

      {/* Corner decorative elements */}
      <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"></div>
      <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-700 animate-pulse delay-200"></div>
    </div>
  )
}
