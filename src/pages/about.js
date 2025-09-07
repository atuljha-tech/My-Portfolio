"use client"

import { motion } from "framer-motion"

const bulletVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.8, ease: "easeOut" },
  }),
}

export default function About() {
  const bullets = [
    <div key="0">
      Hello! I am <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Atul Jha</span>, a
      passionate Computer Science Engineer specializing in{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
        IoT, Blockchain, and Cybersecurity
      </span>
      . I am currently in my 2nd year at{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
        Heritage Institute of Technology
      </span>{" "}
      and will graduate in{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">2028</span>. My journey in
      technology is driven by curiosity, problem-solving, and creating projects that combine efficiency with creativity.
    </div>,
    <div key="1">
      Academics: I completed my 10th grade at{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
        National Gems High Secondary School
      </span>{" "}
      scoring an outstanding{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">95%</span>. For 12th grade, I
      secured <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">91%</span>. In my 1st
      year of CSE, I achieved an active CGPA of{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">8.9</span>. These
      accomplishments reflect my dedication, consistency, and ability to excel in challenging environments.
    </div>,
    <div key="2">
      Skills: My technical expertise spans{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
        Java, DSA, Web Development, React, Next.js, Tailwind CSS
      </span>
      . I continuously explore emerging technologies and frameworks to expand my knowledge and build projects that solve
      real-world problems. Hands-on practice and academic learning together help me stay at the forefront of innovation.
    </div>,
    <div key="3">
      Specialization & Projects: I am actively working on projects that demonstrate my proficiency in{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
        IoT systems, blockchain applications, and full-stack web development
      </span>
      . These projects aim to combine practicality with creativity, delivering solutions that are efficient, scalable,
      and visually engaging. My portfolio reflects the diversity and depth of my work.
    </div>,
    <div key="4">
      Hobbies & Sports: Beyond technology, I am a passionate sportsman. I play{" "}
      <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">cricket</span> and have
      represented my college in various competitions. Sports have taught me discipline, teamwork, leadership, and
      resilience. I strongly believe that maintaining a balance between academics and physical activity is key to
      overall growth.
    </div>,
    <div key="5">
      Philosophy & Vision: My personal philosophy is to continually learn, experiment, and challenge myself. I aim to
      combine technical skills with creativity to build innovative solutions. This portfolio is a reflection of my
      journey, showcasing both my accomplishments and aspirations, highlighting my commitment to excellence and lifelong
      learning.
    </div>,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-blue-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto py-20 px-6 flex flex-col lg:flex-row items-start gap-16">
        {/* Left: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0 lg:sticky lg:top-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full p-1 shadow-2xl">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden bg-white p-2">
                <img src="/profile.jpg" alt="Atul Jha" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full shadow-lg"
            ></motion.div>
          </div>
        </motion.div>

        {/* Right: About Content */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30 pointer-events-none"></div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-16"
              >
                <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 mb-4 leading-tight">
                  About Me
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </motion.div>

              <div className="space-y-10">
                {bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={bulletVariants}
                    initial="hidden"
                    animate="visible"
                    className="group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mt-3 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                      <p className="text-lg lg:text-xl leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {bullet}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
