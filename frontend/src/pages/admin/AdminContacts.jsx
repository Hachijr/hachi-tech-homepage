import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, Trash2, Eye } from 'lucide-react'
import { contactAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll()
      setContacts(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch contacts')
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status)
      toast.success('Status updated')
      fetchContacts()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await contactAPI.delete(id)
      toast.success('Contact deleted')
      fetchContacts()
      setSelectedContact(null)
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const handleView = async (contact) => {
    setSelectedContact(contact)
    if (contact.status === 'New') {
      await handleStatusChange(contact._id, 'Read')
    }
  }

  const filteredContacts = filter === 'All' ? contacts : contacts.filter(c => c.status === filter)

  return (
    <>
      <Helmet><title>Manage Contacts - HLS Tech Admin</title></Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <div className="flex gap-2">
            {['All', 'New', 'Read', 'Responded', 'Archived'].map(status => (
              <button key={status} onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg ${filter === status ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div key={contact._id} onClick={() => handleView(contact)}
                className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-gray-50 ${selectedContact?._id === contact._id ? 'bg-blue-50 border-2 border-primary' : 'border border-gray-200'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                  {contact.status === 'New' && <span className="w-3 h-3 bg-red-500 rounded-full"></span>}
                </div>
                <p className="text-sm font-semibold mb-1">{contact.subject}</p>
                <p className="text-xs text-gray-500">{format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            {selectedContact ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedContact.subject}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span><Mail size={16} className="inline mr-1" />{selectedContact.email}</span>
                      {selectedContact.phone && <span>📞 {selectedContact.phone}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(selectedContact._id)}
                    className="text-red-600 hover:text-red-800"><Trash2 size={20} /></button>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">From: <strong>{selectedContact.name}</strong></p>
                  <p className="text-sm text-gray-600 mb-2">Date: {format(new Date(selectedContact.createdAt), 'MMMM dd, yyyy HH:mm')}</p>
                  {selectedContact.serviceInterest && <p className="text-sm text-gray-600 mb-2">Service Interest: <strong>{selectedContact.serviceInterest}</strong></p>}
                  <p className="text-sm text-gray-600">Status: 
                    <select value={selectedContact.status} onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                      className="ml-2 px-3 py-1 border rounded">
                      {['New', 'Read', 'Responded', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Message:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Eye size={48} className="mx-auto mb-4" />
                  <p>Select a contact to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminContacts
