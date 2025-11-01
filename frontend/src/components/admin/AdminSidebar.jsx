import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, FileText, Briefcase, Star, Mail } from 'lucide-react'

const AdminSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <FolderKanban size={20} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Star size={20} /> },
    { name: 'Contacts', path: '/admin/contacts', icon: <Mail size={20} /> },
  ]

  return (
    <aside className="w-64 bg-dark text-white min-h-screen p-6">
      <div className="mb-8">
        <div className="bg-gradient-to-br from-primary to-secondary text-white px-3 py-2 rounded-lg font-bold text-sm shadow-lg inline-block mb-2">
          HLS Tech
        </div>
        <h1 className="text-lg font-bold font-poppins text-white">
          Hachi Tech Solutions
        </h1>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
