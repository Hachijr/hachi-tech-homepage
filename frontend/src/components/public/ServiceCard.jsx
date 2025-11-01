import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative Circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative p-8">
        {/* Icon */}
        <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          {service.icon}
        </div>

        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-accent-dark text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
            🔥 Popular
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold font-poppins mb-4 text-gray-900 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <Check className="text-success mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Pricing */}
        {service.pricing && service.pricing.startingPrice && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
            <p className="text-sm text-gray-600">Starting from</p>
            <p className="text-2xl font-bold text-primary">
              {service.pricing.currency} {service.pricing.startingPrice.toLocaleString()}
            </p>
          </div>
        )}

        {/* CTA Button */}
        {service.bookingAvailable && (
          <Link
            to="/contact"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-glow transition-all transform group-hover:scale-105"
          >
            Book Service
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  )
}

export default ServiceCard
