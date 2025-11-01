import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, X, Check, Star } from 'lucide-react'
import { testimonialsAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState({
    name: '', position: '', company: '', review: '', rating: 5, avatar: '', serviceUsed: '', approved: false, featured: false
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAllAdmin()
      setTestimonials(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch testimonials')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTestimonial) {
        await testimonialsAPI.update(editingTestimonial._id, formData)
        toast.success('Testimonial updated')
      } else {
        await testimonialsAPI.create(formData)
        toast.success('Testimonial created')
      }
      setShowModal(false)
      resetForm()
      fetchTestimonials()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleApprove = async (id) => {
    try {
      await testimonialsAPI.approve(id)
      toast.success('Testimonial approved')
      fetchTestimonials()
    } catch (error) {
      toast.error('Failed to approve')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await testimonialsAPI.delete(id)
      toast.success('Testimonial deleted')
      fetchTestimonials()
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData(testimonial)
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({ name: '', position: '', company: '', review: '', rating: 5, avatar: '', serviceUsed: '', approved: false, featured: false })
    setEditingTestimonial(null)
  }

  return (
    <>
      <Helmet><title>Manage Testimonials - HLS Tech Admin</title></Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Testimonials</h1>
          <button onClick={() => { resetForm(); setShowModal(true) }}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary flex items-center">
            <Plus size={20} className="mr-2" /> Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current" />)}
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">"{testimonial.review}"</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {testimonial.approved ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Approved</span> : <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Pending</span>}
                  {testimonial.featured && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Featured</span>}
                </div>
                <div className="flex gap-2">
                  {!testimonial.approved && <button onClick={() => handleApprove(testimonial._id)} className="text-green-600 hover:text-green-800"><Check size={18} /></button>}
                  <button onClick={() => handleEdit(testimonial)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(testimonial._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Position" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <textarea placeholder="Review" value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" rows="4"></textarea>
                <input type="url" placeholder="Avatar URL" value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Service Used" value={formData.serviceUsed} onChange={(e) => setFormData({...formData, serviceUsed: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <div className="flex items-center space-x-4">
                  <label>Rating: <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} className="px-4 py-2 border rounded-lg w-20 ml-2" /></label>
                  <label className="flex items-center"><input type="checkbox" checked={formData.approved} onChange={(e) => setFormData({...formData, approved: e.target.checked})} className="mr-2" /> Approved</label>
                  <label className="flex items-center"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="mr-2" /> Featured</label>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary">
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminTestimonials
