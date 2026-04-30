// src/layouts/AdminLayout.jsx
/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Store
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-[260px] bg-white border-r border-gray-200',
        'transform transition-transform duration-200 ease-in-out',
        'lg:translate-x-0 lg:static lg:z-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-200">
            <div className="w-8 h-8 bg-purple-600 rounded-[6px] flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-900">Store</span>
              <span className="text-xs text-gray-500 block -mt-0.5">Admin Panel</span>
            </div>
            <button 
              onClick={onClose}
              className="ml-auto p-1.5 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <link.icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-gray-400')} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200">
            <Link 
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Store className="w-5 h-5 text-gray-400" />
              View Store
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <LogOut className="w-5 h-5 text-gray-400" />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function Header({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 px-4 lg:px-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-[6px] transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Search */}
          <div className="hidden sm:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-9 pl-9 pr-4 rounded-[6px] border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-[6px] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-[6px] hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">JD</span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-[10px] border border-gray-200 shadow-lg py-1 z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                  <hr className="my-1 border-gray-200" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Log Out</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
