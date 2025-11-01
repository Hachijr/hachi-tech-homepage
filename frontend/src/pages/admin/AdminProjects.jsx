import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { projectsAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '', description: '', imageURL: '', category: 'Web Development',
    techStack: '', projectLink: '', githubLink: '', client: '', featured: false, status: 'Completed'
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      setProjects(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch projects')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...formData, techStack: formData.techStack.split(',').map(t => t.trim()) }
    
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data)
        toast.success('Project updated successfully')
      } else {
        await projectsAPI.create(data)
        toast.success('Project created successfully')
      }
      setShowModal(false)
      resetForm()
      fetchProjects()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      await projectsAPI.delete(id)
      toast.success('Project deleted successfully')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      techStack: project.techStack?.join(', ') || ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '', description: '', imageURL: '', category: 'Web Development',
      techStack: '', projectLink: '', githubLink: '', client: '', featured: false, status: 'Completed'
    })
    setEditingProject(null)
  }

  return (
    <>
      <Helmet><title>Manage Projects - HLS Tech Admin</title></Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <button onClick={() => { resetForm(); setShowModal(true) }}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center">
            <Plus size={20} className="mr-2" /> Add Project
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-6 py-4">{project.title}</td>
                  <td className="px-6 py-4">{project.category}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">{project.status}</span></td>
                  <td className="px-6 py-4">{project.featured ? '⭐ Yes' : 'No'}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-800 mr-3"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
                <input type="url" placeholder="Image URL" value={formData.imageURL} onChange={(e) => setFormData({...formData, imageURL: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                  {['Web Development', 'Mobile App', 'Hardware Repair', 'Graphic Design', 'UX/UI Design', 'Other'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="text" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="url" placeholder="Project Link" value={formData.projectLink} onChange={(e) => setFormData({...formData, projectLink: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="url" placeholder="GitHub Link" value={formData.githubLink} onChange={(e) => setFormData({...formData, githubLink: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Client Name" value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <div className="flex items-center space-x-4">
                  <label className="flex items-center"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="mr-2" /> Featured</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="px-4 py-2 border rounded-lg">
                    {['Completed', 'In Progress', 'Planned'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminProjects
