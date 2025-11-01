import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { blogsAPI } from '../../utils/api'
import { format } from 'date-fns'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Technology', 'Web Development', 'Hardware', 'Design', 'Business', 'Tutorial', 'News']

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs(blogs.filter(b => b.category === selectedCategory))
    }
  }, [selectedCategory, blogs])

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll({ published: true })
      setBlogs(response.data.data)
      setFilteredBlogs(response.data.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
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
        <title>Tech Blog - HLS Tech | Insights, Tutorials & News</title>
        <meta name="description" content="Read the latest tech insights, tutorials, and industry news from HLS Tech. Stay updated with technology trends and best practices." />
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
            <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-6">Tech Insights</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Latest articles, tutorials, and industry insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-3">
            <Tag size={20} className="text-gray-600" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">No blog posts found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <Link to={`/blog/${blog.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {blog.category}
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {blog.readTime} min read
                      </div>
                    </div>

                    <Link to={`/blog/${blog.slug}`}>
                      <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">By {blog.author}</span>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-primary font-semibold hover:underline inline-flex items-center"
                      >
                        Read More <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Blog
