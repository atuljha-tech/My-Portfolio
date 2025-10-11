export default function Card({ title, description }) {
  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50/30 to-white/90 border border-blue-200/40 rounded-3xl shadow-2xl hover:shadow-3xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden backdrop-blur-lg">
      
      {/* Enhanced glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>

      {/* Subtle animated glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-blue-500/15 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 group-hover:animate-pulse-slow"></div>

      {/* Premium Card Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full">
        
        {/* Elegant title section */}
        <div className="flex flex-col items-center space-y-4 w-full">
          {/* Sophisticated divider line */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-70 group-hover:opacity-100 group-hover:w-16 transition-all duration-500"></div>
          
          {/* Premium gradient title */}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-900 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 tracking-tight">
            {title}
          </h3>
        </div>

        {/* Enhanced description */}
        <p className="text-slate-600 leading-relaxed text-base max-w-sm group-hover:text-slate-800 transition-colors duration-500 font-medium">
          {description}
        </p>
      </div>

      {/* Refined bottom accent */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 group-hover:w-3/4 group-hover:opacity-80"></div>

      {/* Subtle corner accents */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>

      {/* Add to your global CSS */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}