import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Eye } from 'lucide-react'
import { blogsAPI } from '../../utils/api'
import { format } from 'date-fns'

const BlogPost = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const response = await blogsAPI.getBySlug(slug)
      setBlog(response.data.data)
    } catch (error) {
      console.error('Error fetching blog:', error)
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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <Link to="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{blog.seo?.metaTitle || blog.title} - HLS Tech Blog</title>
        <meta name="description" content={blog.seo?.metaDescription || blog.excerpt} />
        {blog.seo?.keywords && <meta name="keywords" content={blog.seo.keywords.join(', ')} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.featuredImage} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={blog.featuredImage} />
      </Helmet>

      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto"
          >
            {/* Featured Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold">
                {blog.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
                {blog.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 text-gray-600 pb-6 border-b">
                <div className="flex items-center">
                  <User size={20} className="mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} className="mr-2" />
                  <span>{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  <span>{blog.readTime} min read</span>
                </div>
                <div className="flex items-center">
                  <Eye size={20} className="mr-2" />
                  <span>{blog.views} views</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-gray-700 font-medium mb-6">{blog.excerpt}</p>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-8 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Need Professional Tech Services?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how we can help with your technology needs
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

export default BlogPost
