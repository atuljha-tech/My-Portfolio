export default function ProjectCard({ title, description }) {
  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50/30 to-white border border-blue-100/50 rounded-3xl shadow-lg hover:shadow-2xl p-8 flex flex-col transition-all duration-700 hover:scale-[1.02] cursor-pointer overflow-hidden backdrop-blur-sm">
      {/* Premium gradient overlay with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl"></div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10"></div>

      {/* Card Content */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent transition-all duration-500 group-hover:from-blue-700 group-hover:to-blue-900">
            {title}
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg transition-all duration-500 group-hover:text-gray-800 group-hover:translate-x-1">
          {description}
        </p>
      </div>

      {/* Premium bottom accent with animated width */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-700 group-hover:w-4/5"></div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
    </div>
  )
}
