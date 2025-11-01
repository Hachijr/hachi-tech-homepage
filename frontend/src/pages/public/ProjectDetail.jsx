import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from 'lucide-react'
import { projectsAPI } from '../../utils/api'
import { format } from 'date-fns'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getById(id)
      setProject(response.data.data)
    } catch (error) {
      console.error('Error fetching project:', error)
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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="text-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - HLS Tech Projects</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <Link
            to="/projects"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={project.imageURL}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.featured && (
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-semibold">
                  Featured Project
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                  {project.category}
                </span>
                {project.status && (
                  <span className={`px-4 py-2 rounded-full font-semibold ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                {project.client && (
                  <div className="flex items-center">
                    <Tag size={20} className="mr-2" />
                    <span>Client: {project.client}</span>
                  </div>
                )}
                {project.completionDate && (
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    <span>Completed: {format(new Date(project.completionDate), 'MMMM yyyy')}</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
              </div>

              {project.techStack && project.techStack.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.projectLink || project.githubLink) && (
                <div className="flex flex-wrap gap-4 pt-8 border-t">
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors inline-flex items-center"
                    >
                      <ExternalLink size={20} className="mr-2" />
                      View Live Project
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors inline-flex items-center"
                    >
                      <Github size={20} className="mr-2" />
                      View on GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Interested in a Similar Project?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how we can help bring your ideas to life
            </p>
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all inline-block"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail
