import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
}

// Blogs API
export const blogsAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/slug/${slug}`),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`)
}

// Services API
export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`)
}

// Testimonials API
export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getAllAdmin: () => api.get('/testimonials/all'),
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  approve: (id) => api.patch(`/testimonials/${id}/approve`),
  delete: (id) => api.delete(`/testimonials/${id}`)
}

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
  subscribeNewsletter: (data) => api.post('/contact/newsletter', data),
  getNewsletterSubscribers: () => api.get('/contact/newsletter/all')
}

// Admin API
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  getProfile: () => api.get('/admin/me'),
  getAll: () => api.get('/admin/all'),
  register: (data) => api.post('/admin/register', data)
}

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard')
}

export default api
