import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, X, Eye } from 'lucide-react'
import { blogsAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: '', content: '', excerpt: '', featuredImage: '', category: 'Technology',
    tags: '', published: false, readTime: 5
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll({ published: 'false' })
      setBlogs(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch blogs')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) }
    
    try {
      if (editingBlog) {
        await blogsAPI.update(editingBlog._id, data)
        toast.success('Blog updated successfully')
      } else {
        await blogsAPI.create(data)
        toast.success('Blog created successfully')
      }
      setShowModal(false)
      resetForm()
      fetchBlogs()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await blogsAPI.delete(id)
      toast.success('Blog deleted successfully')
      fetchBlogs()
    } catch (error) {
      toast.error('Failed to delete blog')
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({ ...blog, tags: blog.tags?.join(', ') || '' })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({ title: '', content: '', excerpt: '', featuredImage: '', category: 'Technology', tags: '', published: false, readTime: 5 })
    setEditingBlog(null)
  }

  return (
    <>
      <Helmet><title>Manage Blogs - HTS Tech Admin</title></Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
          <button onClick={() => { resetForm(); setShowModal(true) }}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary flex items-center">
            <Plus size={20} className="mr-2" /> Add Blog Post
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4">{blog.title}</td>
                  <td className="px-6 py-4">{blog.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4"><Eye size={16} className="inline mr-1" />{blog.views}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingBlog ? 'Edit Blog' : 'Add Blog'}</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <textarea placeholder="Excerpt (max 200 chars)" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required maxLength="200" className="w-full px-4 py-2 border rounded-lg" rows="2"></textarea>
                <textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" rows="8"></textarea>
                <input type="url" placeholder="Featured Image URL" value={formData.featuredImage} onChange={(e) => setFormData({...formData, featuredImage: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  {['Technology', 'Web Development', 'Hardware', 'Design', 'Business', 'Tutorial', 'News'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <div className="flex items-center space-x-4">
                  <label className="flex items-center"><input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} className="mr-2" /> Publish</label>
                  <input type="number" placeholder="Read Time (min)" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})} className="px-4 py-2 border rounded-lg w-32" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary">
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminBlogs
