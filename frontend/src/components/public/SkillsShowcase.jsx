import { motion } from 'framer-motion'
import { Code, Database, Palette, Layout, Server, Globe, Shield, Zap } from 'lucide-react'

const SkillsShowcase = () => {
  const skillCategories = [
    {
      title: 'Software Development',
      icon: <Code size={32} />,
      color: 'from-cyan-500 to-blue-600',
      skills: [
        { name: 'C Programming', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'React.js', level: 92 },
        { name: 'WordPress', level: 88 }
      ]
    },
    {
      title: 'Networking',
      icon: <Server size={32} />,
      color: 'from-purple-500 to-pink-600',
      skills: [
        { name: 'IP Addressing & DNS', level: 85 },
        { name: 'Firewall Configuration', level: 82 },
        { name: 'Network Troubleshooting', level: 90 },
        { name: 'CCTV Systems', level: 88 }
      ]
    },
    {
      title: 'System Administration',
      icon: <Shield size={32} />,
      color: 'from-blue-500 to-indigo-600',
      skills: [
        { name: 'Active Directory', level: 85 },
        { name: 'Server Administration', level: 87 },
        { name: 'Access Point Setup', level: 90 },
        { name: 'Network Drive Mapping', level: 92 }
      ]
    },
    {
      title: 'Web Design & UX/UI',
      icon: <Layout size={32} />,
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'User-Centered Design', level: 90 },
        { name: 'Responsive Design', level: 95 },
        { name: 'Framer Motion', level: 88 },
        { name: 'UX/UI Principles', level: 92 }
      ]
    },
    {
      title: 'Database Management',
      icon: <Database size={32} />,
      color: 'from-green-500 to-emerald-600',
      skills: [
        { name: 'Database Design', level: 85 },
        { name: 'SQL', level: 82 },
        { name: 'MongoDB', level: 88 },
        { name: 'Data Modeling', level: 85 }
      ]
    },
    {
      title: 'Additional Expertise',
      icon: <Zap size={32} />,
      color: 'from-yellow-500 to-orange-600',
      skills: [
        { name: 'System Design', level: 88 },
        { name: 'Software Engineering', level: 90 },
        { name: 'HCI & Usability Testing', level: 85 },
        { name: 'Payment Integration', level: 87 }
      ]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Technical <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive skills across software development, networking, system administration, and design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-900">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{skill.name}</span>
                      <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-center mb-6">
            <Globe className="text-purple-600 mr-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">Languages</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                EN
              </div>
              <p className="font-semibold text-gray-700">English</p>
              <p className="text-sm text-gray-500">Fluent</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                BE
              </div>
              <p className="font-semibold text-gray-700">Bemba</p>
              <p className="text-sm text-gray-500">Native</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                TO
              </div>
              <p className="font-semibold text-gray-700">Tonga</p>
              <p className="text-sm text-gray-500">Fluent</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsShowcase
