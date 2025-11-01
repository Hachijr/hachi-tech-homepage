import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Quote Icon Background */}
      <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
        <Quote size={80} />
      </div>

      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Stars Rating */}
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className="text-yellow-400 fill-current"
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
          "{testimonial.review}"
        </p>

        {/* Service Used Badge */}
        {testimonial.serviceUsed && (
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
            {testimonial.serviceUsed}
          </span>
        )}

        {/* Client Info */}
        <div className="flex items-center pt-4 border-t border-gray-200">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
          />
          <div className="ml-4">
            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600">
              {testimonial.position}
              {testimonial.company && ` at ${testimonial.company}`}
            </p>
          </div>
        </div>

        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-accent to-accent-dark text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
    </motion.div>
  )
}

export default TestimonialCard
