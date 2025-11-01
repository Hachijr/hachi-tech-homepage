import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { servicesAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const AdminServices = () => {
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    title: '', description: '', icon: '', features: '', bookingAvailable: true, popular: false, order: 0
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll()
      setServices(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch services')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...formData, features: formData.features.split(',').map(f => f.trim()) }
    
    try {
      if (editingService) {
        await servicesAPI.update(editingService._id, data)
        toast.success('Service updated successfully')
      } else {
        await servicesAPI.create(data)
        toast.success('Service created successfully')
      }
      setShowModal(false)
      resetForm()
      fetchServices()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await servicesAPI.delete(id)
      toast.success('Service deleted successfully')
      fetchServices()
    } catch (error) {
      toast.error('Failed to delete service')
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({ ...service, features: service.features?.join(', ') || '' })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: '', features: '', bookingAvailable: true, popular: false, order: 0 })
    setEditingService(null)
  }

  return (
    <>
      <Helmet><title>Manage Services - HLS Tech Admin</title></Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <button onClick={() => { resetForm(); setShowModal(true) }}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary flex items-center">
            <Plus size={20} className="mr-2" /> Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {service.popular && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Popular</span>}
                  {service.bookingAvailable && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Bookable</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
                <input type="text" placeholder="Icon (emoji)" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Features (comma separated)" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <div className="flex items-center space-x-4">
                  <label className="flex items-center"><input type="checkbox" checked={formData.bookingAvailable} onChange={(e) => setFormData({...formData, bookingAvailable: e.target.checked})} className="mr-2" /> Booking Available</label>
                  <label className="flex items-center"><input type="checkbox" checked={formData.popular} onChange={(e) => setFormData({...formData, popular: e.target.checked})} className="mr-2" /> Popular</label>
                  <input type="number" placeholder="Order" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="px-4 py-2 border rounded-lg w-24" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary">
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminServices
