import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const ProjectShowcase = ({ project, index }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Project Image */}
      <div className={`relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          
          {/* Image */}
          <img
            src={project.imageURL}
            alt={project.title}
            className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Hover Links */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary p-4 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg"
              >
                <ExternalLink size={24} />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary p-4 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg"
              >
                <Github size={24} />
              </a>
            )}
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg z-20 animate-pulse-slow">
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-10"></div>
      </div>

      {/* Project Details */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Category Badge */}
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-gray-900">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-primary/10 to-accent/10 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Client Info */}
          {project.client && (
            <p className="text-gray-600 mb-6">
              <span className="font-semibold">Client:</span> {project.client}
            </p>
          )}

          {/* CTA Button */}
          <Link
            to={`/projects/${project._id}`}
            className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-glow-lg transition-all transform hover:scale-105 group"
          >
            View Full Project
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectShowcase
