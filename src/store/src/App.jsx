// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import CustomerLayout from '@/layouts/CustomerLayout'
import AdminLayout from '@/layouts/AdminLayout'

// Customer Pages
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Product from '@/pages/Product'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard'
import AdminProducts from '@/pages/admin/Products'
import AdminOrders from '@/pages/admin/Orders'
import AdminCustomers from '@/pages/admin/Customers'
import AdminSettings from '@/pages/admin/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        } />
        <Route path="/shop" element={
          <CustomerLayout>
            <Shop />
          </CustomerLayout>
        } />
        <Route path="/product/:id" element={
          <CustomerLayout>
            <Product />
          </CustomerLayout>
        } />
        <Route path="/cart" element={
          <CustomerLayout>
            <Cart />
          </CustomerLayout>
        } />
        <Route path="/checkout" element={
          <Checkout />
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path="/admin/products" element={
          <AdminLayout>
            <AdminProducts />
          </AdminLayout>
        } />
        <Route path="/admin/orders" element={
          <AdminLayout>
            <AdminOrders />
          </AdminLayout>
        } />
        <Route path="/admin/customers" element={
          <AdminLayout>
            <AdminCustomers />
          </AdminLayout>
        } />
        <Route path="/admin/settings" element={
          <AdminLayout>
            <AdminSettings />
          </AdminLayout>
        } />

        {/* Catch-all redirect to home */}
        <Route path="*" element={
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}
