import { motion } from 'framer-motion'
import { Award, Trophy, Star, BookOpen } from 'lucide-react'

const AwardsSection = () => {
  const awards = [
    {
      year: '2025',
      title: 'Success Practitioners Strategic and Personal Development Certificate',
      icon: <Trophy size={40} />,
      color: 'from-yellow-500 to-orange-600',
      description: 'Recognition for excellence in strategic planning and personal development'
    },
    {
      year: '2020',
      title: 'The School of Ministry Gospel Envoys Foundation Certificate',
      icon: <BookOpen size={40} />,
      color: 'from-blue-500 to-indigo-600',
      description: 'Completed comprehensive ministry and leadership training'
    },
    {
      year: '2017',
      title: 'Scripture Union Chairperson Certificate',
      icon: <Star size={40} />,
      color: 'from-purple-500 to-pink-600',
      description: 'Leadership recognition for outstanding service and dedication'
    }
  ]

  const certifications = [
    {
      title: 'ECZ Grade 12 Certificate',
      institution: 'Masaiti Boarding School',
      year: '2013 - 2017',
      icon: <Award size={32} />
    },
    {
      title: 'Bachelor of Degree in Computer Science',
      institution: 'Northrise University, Ndola',
      year: '2020 - 2025',
      icon: <Award size={32} />
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100">
      <div className="container mx-auto px-4">
        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Awards & <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Recognition</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating achievements and milestones in professional development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${award.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative z-10">
                {/* Year Badge */}
                <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                  {award.year}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${award.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mx-auto`}>
                  {award.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {award.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {award.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${award.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </motion.div>
          ))}
        </div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Education & <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Academic excellence and professional qualifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg flex-shrink-0">
                  {cert.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-700 font-semibold mb-1">{cert.institution}</p>
                  <p className="text-gray-500 text-sm">{cert.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Training */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Award className="mr-3" size={40} />
              <h3 className="text-3xl font-bold">Technical Training & Internship</h3>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-xl font-semibold mb-2">Northrise University - IT Department | Ndola, Zambia</p>
              <p className="text-cyan-200 font-medium">June & July 2025</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3 text-cyan-300">Server Administration</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Active Directory Users & Computers</li>
                  <li>• Organizational Units (OUs)</li>
                  <li>• PC renaming, domain joining</li>
                  <li>• File access & permission control</li>
                  <li>• Network drive mapping</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3 text-pink-300">Networking Infrastructure</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Cabinet mounting & structured cabling</li>
                  <li>• Router and switch configuration</li>
                  <li>• Access Point (AP) setup</li>
                  <li>• Bandwidth control</li>
                  <li>• Network troubleshooting</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3 text-purple-300">CCTV Systems</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Camera setup & configuration</li>
                  <li>• System integration</li>
                  <li>• Practical experience</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3 text-yellow-300">Hands-On Projects</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Lab network from scratch</li>
                  <li>• Configured user roles</li>
                  <li>• Server and network tasks</li>
                  <li>• Real-world simulation</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AwardsSection
