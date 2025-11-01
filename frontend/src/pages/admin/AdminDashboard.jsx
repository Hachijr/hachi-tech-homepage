import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FolderKanban, FileText, Briefcase, Star, Mail, Users, TrendingUp, Eye } from 'lucide-react'
import { analyticsAPI } from '../../utils/api'
import { format } from 'date-fns'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await analyticsAPI.getDashboard()
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const statCards = [
    { title: 'Total Projects', value: stats?.stats.projects || 0, icon: <FolderKanban size={32} />, color: 'bg-blue-500' },
    { title: 'Published Blogs', value: stats?.stats.blogs.published || 0, icon: <FileText size={32} />, color: 'bg-green-500' },
    { title: 'Services', value: stats?.stats.services || 0, icon: <Briefcase size={32} />, color: 'bg-purple-500' },
    { title: 'Testimonials', value: stats?.stats.testimonials.approved || 0, icon: <Star size={32} />, color: 'bg-yellow-500' },
    { title: 'New Contacts', value: stats?.stats.contacts.new || 0, icon: <Mail size={32} />, color: 'bg-red-500' },
    { title: 'Newsletter Subscribers', value: stats?.stats.newsletter || 0, icon: <Users size={32} />, color: 'bg-indigo-500' },
    { title: 'Total Blog Views', value: stats?.stats.blogs.totalViews || 0, icon: <Eye size={32} />, color: 'bg-pink-500' },
    { title: 'Total Contacts', value: stats?.stats.contacts.total || 0, icon: <TrendingUp size={32} />, color: 'bg-teal-500' },
  ]

  return (
    <>
      <Helmet>
        <title>Dashboard - HTS Tech Admin</title>
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4">Recent Contacts</h2>
            {stats?.recentContacts && stats.recentContacts.length > 0 ? (
              <div className="space-y-3">
                {stats.recentContacts.map((contact) => (
                  <div key={contact._id} className="border-b pb-3 last:border-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-500 mt-1">{contact.subject}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        contact.status === 'New' ? 'bg-red-100 text-red-700' :
                        contact.status === 'Read' ? 'bg-yellow-100 text-yellow-700' :
                        contact.status === 'Responded' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent contacts</p>
            )}
          </motion.div>

          {/* Popular Blogs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4">Popular Blog Posts</h2>
            {stats?.popularBlogs && stats.popularBlogs.length > 0 ? (
              <div className="space-y-3">
                {stats.popularBlogs.map((blog) => (
                  <div key={blog._id} className="border-b pb-3 last:border-0">
                    <p className="font-semibold line-clamp-1">{blog.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Eye size={16} className="mr-1" />
                        {blog.views} views
                      </span>
                      <span className="text-xs text-gray-400">
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No blog posts yet</p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
