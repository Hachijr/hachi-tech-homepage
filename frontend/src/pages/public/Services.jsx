import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { servicesAPI } from '../../utils/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll()
      setServices(response.data.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Our Services - HLS Tech | Professional Technology Solutions</title>
        <meta name="description" content="Explore our comprehensive technology services: hardware repair, web development, graphic design, and UX/UI design. Professional solutions in Zambia." />
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
            <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Comprehensive technology solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">What's Included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={20} />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.pricing && service.pricing.startingPrice && (
                    <div className="mb-6">
                      <p className="text-gray-600">
                        Starting from{' '}
                        <span className="text-2xl font-bold text-primary">
                          {service.pricing.currency} {service.pricing.startingPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({service.pricing.pricingModel})
                        </span>
                      </p>
                    </div>
                  )}

                  {service.bookingAvailable && (
                    <Link
                      to="/contact"
                      className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition-colors inline-flex items-center"
                    >
                      Book This Service <ArrowRight className="ml-2" size={20} />
                    </Link>
                  )}
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">{service.icon}</div>
                      {service.popular && (
                        <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Popular Service
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 text-white rounded-2xl p-12 text-center shadow-2xl shadow-cyan-500/30 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold font-poppins mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                We offer tailored technology solutions to meet your specific needs. Let's discuss your project!
              </p>
              <Link
                to="/contact"
                className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-all transform hover:scale-105 inline-flex items-center shadow-xl"
              >
                Get in Touch <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services
