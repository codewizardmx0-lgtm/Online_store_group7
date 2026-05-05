// src/pages/admin/Settings.jsx
import { useState } from 'react'
import { Store, Bell, CreditCard, Shield, Globe, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const settingsTabs = [
  { id: 'store', name: 'Store Details', icon: Store },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'localization', name: 'Localization', icon: Globe },
]

function StoreSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Store Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Store Name" defaultValue="My Store" />
          <Input label="Store Email" type="email" defaultValue="contact@TOPECO.com" />
          <Input label="Phone Number" defaultValue="+1 (555) 123-4567" />
          <Input label="Support Email" type="email" defaultValue="support@TOPECO.com" />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Store Address</h3>
        <div className="space-y-4">
          <Input label="Street Address" defaultValue="123 Commerce Street" />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="City" defaultValue="New York" />
            <Input label="State" defaultValue="NY" />
            <Input label="ZIP Code" defaultValue="10001" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Twitter" placeholder="https://twitter.com/TOPECO" />
          <Input label="Instagram" placeholder="https://instagram.com/TOPECO" />
          <Input label="Facebook" placeholder="https://facebook.com/TOPECO" />
          <Input label="LinkedIn" placeholder="https://linkedin.com/company/TOPECO" />
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    orderConfirmations: true,
    shippingUpdates: true,
    lowStock: true,
    newCustomers: false,
    weeklyReports: true,
    marketingEmails: false,
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const notifications = [
    { key: 'orderConfirmations', title: 'Order Confirmations', desc: 'Receive notifications when new orders are placed' },
    { key: 'shippingUpdates', title: 'Shipping Updates', desc: 'Get notified when orders are shipped' },
    { key: 'lowStock', title: 'Low Stock Alerts', desc: 'Alerts when product stock falls below threshold' },
    { key: 'newCustomers', title: 'New Customer Sign-ups', desc: 'Notifications for new customer registrations' },
    { key: 'weeklyReports', title: 'Weekly Reports', desc: 'Receive weekly sales and analytics reports' },
    { key: 'marketingEmails', title: 'Marketing Emails', desc: 'Promotional and marketing communications' },
  ]

  return (
    <div className="space-y-4">
      {notifications.map(({ key, title, desc }) => (
        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
          <div>
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
          <button
            onClick={() => toggleSetting(key)}
            className={cn(
              'w-11 h-6 rounded-full transition-colors relative',
              settings[key] ? 'bg-purple-600' : 'bg-gray-200'
            )}
          >
            <span 
              className={cn(
                'absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
                settings[key] ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        </div>
      ))}
    </div>
  )
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 border border-green-200 rounded-[10px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-[6px] flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-green-800">Stripe Connected</p>
            <p className="text-sm text-green-600">Your store is connected to Stripe for payments</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-3">
          {['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay'].map((method) => (
            <div key={method} className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px]">
              <span className="font-medium text-gray-900">{method}</span>
              <span className="text-sm text-green-600">Enabled</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Currency</h3>
        <select className="w-full h-10 px-3 rounded-[10px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
          <option value="usd">USD - US Dollar</option>
          <option value="eur">EUR - Euro</option>
          <option value="gbp">GBP - British Pound</option>
          <option value="cad">CAD - Canadian Dollar</option>
        </select>
      </div>
    </div>
  )
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('store')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your store preferences</p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-[14px] border border-gray-200 p-2 space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <tab.icon className={cn(
                  'w-4 h-4',
                  activeTab === tab.id ? 'text-purple-600' : 'text-gray-400'
                )} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[14px] border border-gray-200 p-6">
            {activeTab === 'store' && <StoreSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'payments' && <PaymentSettings />}
            {activeTab === 'security' && (
              <div className="text-center py-12 text-gray-500">
                Security settings coming soon...
              </div>
            )}
            {activeTab === 'localization' && (
              <div className="text-center py-12 text-gray-500">
                Localization settings coming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
