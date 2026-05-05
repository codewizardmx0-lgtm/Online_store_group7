import './bootstrap'
import '../css/app.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

// Layouts
import CustomerLayout from '@/Layouts/CustomerLayout'
import AdminLayout from '@/Layouts/AdminLayout'

// Context Providers
import { StoreProvider } from '@/context/StoreContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ToastProvider } from '@/context/ToastContext'
import { AuthProvider } from '@/context/AuthContext'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,

  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')).then(
      (module) => {
        const page = module.default

        if (!page.layout) {
          if (name.startsWith('admin/')) {
            page.layout = (page) => <AdminLayout>{page}</AdminLayout>
          } else if (
            name === 'Login' ||
            name === 'Register' ||
            name === 'Checkout' ||
            name === 'OrderSuccess' ||
            name.startsWith('Auth/')
          ) {
            page.layout = (page) => page
          } else {
            page.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
          }
        }

        return module
      },
    ),

  setup({ el, App, props }) {
    // انتبه: حسب نسخة Inertia، قد تكون props.page.props أو props.initialPage.props
    // جرّب هذا الشكل أولاً:
    const inertiaProps = props.initialPage?.props || props.page?.props || props.props || {}
    const initialUser = inertiaProps.auth?.user || null

    createRoot(el).render(
      <React.StrictMode>
        <AuthProvider initialUser={initialUser}>
          <StoreProvider>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <App {...props} />
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </StoreProvider>
        </AuthProvider>
      </React.StrictMode>,
    )
  },

  progress: {
    color: '#9333ea',
  },
})