import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, Heart, Zap } from 'lucide-react'
import SkillsShowcase from '../../components/public/SkillsShowcase'
import AwardsSection from '../../components/public/AwardsSection'

const About = () => {
  const values = [
    { icon: <Award size={32} />, title: 'Excellence', description: 'We strive for excellence in every project we undertake' },
    { icon: <Users size={32} />, title: 'Collaboration', description: 'Working closely with clients to achieve their goals' },
    { icon: <Heart size={32} />, title: 'Integrity', description: 'Honest, transparent, and ethical in all our dealings' },
    { icon: <Zap size={32} />, title: 'Innovation', description: 'Embracing new technologies and creative solutions' }
  ]

  return (
    <>
      <Helmet>
        <title>About Us - HLS Tech | Hachi Tech Solutions</title>
        <meta name="description" content="Learn about HLS Tech (Hachi Tech Solutions), founded by Luumuno Chibombya. Our mission, vision, and commitment to providing innovative technology solutions in Zambia." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6">About HTS Tech</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Hachi Tech Solutions - Innovating Technology, Empowering Solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold font-poppins mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our</span> Story
            </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded by <strong>Luumuno Chibombya</strong>, HTS Tech (Hachi Tech Solutions) was born from a passion for technology and a vision to provide innovative, reliable, and professional technology solutions in Zambia.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We started with a simple belief: that technology should empower businesses and individuals to achieve more. Today, we serve a diverse clientele including individuals, companies, students, NGOs, and tech enthusiasts across Zambia.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our comprehensive services span hardware repair and maintenance, software and web application development, graphic design and branding, and UX/UI design - making us a one-stop solution for all your technology needs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-primary mb-4">
                <Target size={48} />
              </div>
              <h3 className="text-3xl font-bold font-poppins mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide innovative, reliable, and professional technology solutions that empower our clients to achieve their goals. We are committed to delivering exceptional service, fostering creativity, and building lasting relationships based on trust and excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-primary mb-4">
                <Eye size={48} />
              </div>
              <h3 className="text-3xl font-bold font-poppins mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become a leading Zambian tech brand known for creativity, trust, and professionalism. We envision a future where HLS Tech is synonymous with innovation and quality, setting the standard for technology services across Africa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-12 text-center">Meet Our Founder & CEO</h2>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
                {/* Profile Image Placeholder */}
                <div className="md:col-span-1">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                      <span className="text-6xl font-bold">LC</span>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="md:col-span-2 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">Luumuno Chibombya</h3>
                  <p className="text-xl md:text-2xl mb-4 text-cyan-200 font-semibold">Founder & Chief Executive Officer</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Computer Scientist</span>
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Software Engineer</span>
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">System Designer</span>
                  </div>
                  <div className="text-sm opacity-90">
                    <p>📍 Luanshya, Zambia</p>
                    <p>📧 Luumunochibombya@gmail.com</p>
                    <p>📞 +260 964 682 749</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="border-t border-white/20 pt-8">
                <p className="text-lg leading-relaxed mb-6">
                  A passionate technologist and visionary entrepreneur dedicated to transforming the Zambian tech landscape. Luumuno brings a unique blend of technical expertise, creative innovation, and strategic leadership to every project.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  With a <strong>Bachelor's Degree in Computer Science from Northrise University</strong> and comprehensive technical training, Luumuno has mastered the full spectrum of technology services—from software development and system administration to networking infrastructure and UX/UI design.
                </p>
                <p className="text-lg leading-relaxed">
                  His expertise spans <strong>C and JavaScript programming, React.js development, WordPress customization, database design, networking infrastructure, server administration, and user-centered design</strong>. This diverse skill set enables HLS Tech to deliver comprehensive, end-to-end technology solutions that truly empower businesses and individuals.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-t border-white/20 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">5+</div>
                  <p className="text-sm opacity-90">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <p className="text-sm opacity-90">Projects Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <p className="text-sm opacity-90">Happy Clients</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">Who We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Providing technology solutions to diverse clients across Zambia
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Individuals', 'Companies', 'Students', 'NGOs', 'Tech Clients'].map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg text-center hover:bg-primary hover:text-white transition-colors"
              >
                <p className="font-semibold">{audience}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <SkillsShowcase />

      {/* Awards & Education */}
      <AwardsSection />
    </>
  )
}

export default About
