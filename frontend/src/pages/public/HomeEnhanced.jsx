import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Award, TrendingUp, Star, Sparkles, Zap, Shield, Clock } from 'lucide-react'
import { servicesAPI, projectsAPI, testimonialsAPI } from '../../utils/api'
import ProjectShowcase from '../../components/public/ProjectShowcase'
import ServiceCard from '../../components/public/ServiceCard'
import TestimonialCard from '../../components/public/TestimonialCard'

const HomeEnhanced = () => {
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [servicesRes, projectsRes, testimonialsRes] = await Promise.all([
        servicesAPI.getAll({ limit: 4 }),
        projectsAPI.getAll({ featured: true, limit: 3 }),
        testimonialsAPI.getAll({ featured: true, limit: 3 })
      ])
      setServices(servicesRes.data.data)
      setProjects(projectsRes.data.data)
      setTestimonials(testimonialsRes.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const stats = [
    { icon: <Users size={40} />, value: '100+', label: 'Happy Clients', color: 'from-blue-500 to-blue-600' },
    { icon: <Award size={40} />, value: '50+', label: 'Projects Completed', color: 'from-green-500 to-green-600' },
    { icon: <TrendingUp size={40} />, value: '5+', label: 'Years Experience', color: 'from-purple-500 to-purple-600' },
    { icon: <Star size={40} />, value: '4.9', label: 'Average Rating', color: 'from-yellow-500 to-yellow-600' }
  ]

  const features = [
    { icon: <Zap size={32} />, title: 'Fast Delivery', description: 'Quick turnaround times without compromising quality' },
    { icon: <Shield size={32} />, title: 'Quality Assured', description: 'Every project meets our high standards' },
    { icon: <Clock size={32} />, title: '24/7 Support', description: 'We\'re here whenever you need us' },
    { icon: <Sparkles size={32} />, title: 'Innovation', description: 'Cutting-edge solutions for modern challenges' }
  ]

  return (
    <>
      <Helmet>
        <title>Hachi Tech Solutions (HTS Tech) | Innovating Technology, Empowering Solutions</title>
        <meta name="description" content="Professional technology services in Zambia including hardware repair, web development, graphic design, and UX/UI design. Founded by Luumuno Chibombya." />
      </Helmet>

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full text-sm font-semibold border border-white/30">
                🚀 Professional Tech Solutions in Zambia
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Hachi Tech Solutions
              </span>
            </h1>

            {/* Logo Badge */}
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 backdrop-blur-lg px-6 py-3 rounded-xl font-bold text-2xl border border-cyan-300/50 shadow-2xl shadow-cyan-500/50 animate-glow">
                <span className="text-white">HTS</span> <span className="text-yellow-300">Tech</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl mb-8 font-light">
              Innovating Technology, Empowering Solutions
            </p>

            {/* Description */}
            <p className="text-base md:text-lg mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Transform your business with cutting-edge technology services. From hardware repair to custom software development, we deliver excellence in every project.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-cyan-500 hover:to-blue-600 transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70"
              >
                Get Started Today
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
              </Link>
              <Link
                to="/projects"
                className="group border-2 border-pink-400/80 backdrop-blur-sm bg-pink-500/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-pink-500 hover:border-pink-500 transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-lg shadow-pink-500/30"
              >
                View Our Work
                <Sparkles className="ml-2 group-hover:rotate-12 transition-transform" size={24} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} text-white mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-poppins">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - New */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-gray-900">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">HTS Tech</span>?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine expertise, innovation, and dedication to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl hover:shadow-purple-200 transition-all duration-500 transform hover:-translate-y-2 group border border-purple-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-lg mb-2 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-gray-900">
              What We <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-cyan-600 hover:to-blue-700 shadow-xl shadow-cyan-500/50 transition-all transform hover:scale-105 group"
            >
              View All Services
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-lg mb-2 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-gray-900">
              Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Showcasing our best work and successful collaborations
            </p>
          </motion.div>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <ProjectShowcase key={project._id} project={project} index={index} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/projects"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/50 transition-all transform hover:scale-105 group"
            >
              View All Projects
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-300 font-semibold text-lg mb-2 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
              What Our <span className="text-transparent bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text">Clients Say</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-cyan-500/30"
          >
            {/* Background Decorations */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 text-white">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with innovative technology solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-purple-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-pink-50 transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-xl group"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default HomeEnhanced
