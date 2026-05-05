// src/pages/admin/Products.jsx
import { useState, Fragment } from 'react'
import { Plus, Pencil, Trash2, X, Check, Package, Search } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { useToast } from '@/context/ToastContext'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

function ProductForm({ initial = {}, catalogs, onSave, onCancel }) {
  const [form, setForm] = useState({
    name:        initial.name        || '',
    price:       initial.price       || '',
    image:       initial.image       || '',
    category:    initial.category    || catalogs[0]?.name || '',
    description: initial.description || '',
    stock:       initial.stock       ?? '',
    colors: Array.isArray(initial.colors) ? initial.colors.join(', ') : '',
    sizes:  Array.isArray(initial.sizes)  ? initial.sizes.join(', ')  : '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Valid price required.'
    if (!form.category.trim()) e.category = 'Category required.'
    if (form.stock === '' || isNaN(Number(form.stock))) e.stock = 'Valid stock required.'
    return e
  }

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave({
      ...form,
      price:  parseFloat(form.price),
      stock:  parseInt(form.stock, 10),
      colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
      sizes:  form.sizes.split(',').map(s => s.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Input label="Product Name" placeholder="e.g. Classic Sneakers" value={form.name} onChange={set('name')} error={errors.name} />
      <Input label="Price ($)" type="number" min="0" step="0.01" placeholder="99.99" value={form.price} onChange={set('price')} error={errors.price} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
        <select value={form.category} onChange={set('category')}
          className="w-full h-10 px-3 rounded-[10px] border border-gray-200 bg-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
          {catalogs.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
      </div>

      <Input label="Stock" type="number" min="0" placeholder="50" value={form.stock} onChange={set('stock')} error={errors.stock} />
      <Input label="Colors (comma-separated)" placeholder="White, Black, Gray" value={form.colors} onChange={set('colors')} />
      <Input label="Sizes (comma-separated)" placeholder="S, M, L, XL" value={form.sizes} onChange={set('sizes')} />

      <div className="sm:col-span-2">
        <Input label="Image URL" placeholder="https://images.unsplash.com/..." value={form.image} onChange={set('image')} />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
        <textarea rows={3} value={form.description} onChange={set('description')}
          placeholder="Product description..."
          className="w-full px-3 py-2 rounded-[10px] border border-gray-200 bg-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" />
      </div>
      <div className="sm:col-span-2 flex gap-3 justify-end border-t border-gray-100 pt-4">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm" className="gap-1.5"><Check className="w-4 h-4" />Save Product</Button>
      </div>
    </form>
  )
}

export default function AdminProducts() {
  const { products, catalogs, addProduct, updateProduct, deleteProduct } = useStore()
  const { addToast } = useToast()
  const [showAdd, setShowAdd]   = useState(false)
  const [editId, setEditId]     = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [search, setSearch]     = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd    = (data) => { addProduct(data);          addToast(`"${data.name}" added.`, 'success'); setShowAdd(false) }
  const handleUpdate = (data) => { updateProduct(editId, data); addToast('Product updated.', 'success');      setEditId(null) }
  const handleDelete = (id)   => {
    const p = products.find(p => p.id === id)
    deleteProduct(id)
    addToast(`"${p?.name}" deleted.`, 'info')
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">{products.length} total products</p>
        </div>
        <Button className="gap-2 self-start" onClick={() => { setShowAdd(true); setEditId(null) }}>
          <Plus className="w-4 h-4" />Add Product
        </Button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-[14px] border border-purple-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-5">New Product</h3>
          <ProductForm catalogs={catalogs} onSave={handleAdd} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-[10px] border border-gray-200 bg-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-[14px] border border-gray-200 p-12 text-center">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-900">No products found</p>
        </div>
      ) : (
        <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Product</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Category</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Price</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Stock</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(product => (
                  <Fragment key={product.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image
                            ? <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-[6px] bg-gray-100" />
                            : <div className="w-10 h-10 bg-gray-100 rounded-[6px] flex items-center justify-center"><Package className="w-4 h-4 text-gray-400" /></div>
                          }
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4">
                        <span className={product.stock === 0 ? 'text-red-600 font-medium' : product.stock <= 10 ? 'text-orange-600' : 'text-gray-900'}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => { setEditId(editId === product.id ? null : product.id); setShowAdd(false) }}
                            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-[6px] transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {deleteId === product.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-red-600 mr-1">Delete?</span>
                              <button onClick={() => handleDelete(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-[6px]"><Check className="w-4 h-4" /></button>
                              <button onClick={() => setDeleteId(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-[6px]"><X className="w-4 h-4" /></button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteId(product.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[6px] transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {editId === product.id && (
                      <tr>
                        <td colSpan={5} className="px-6 py-5 bg-purple-50/50 border-b border-purple-100">
                          <p className="text-sm font-semibold text-gray-900 mb-4">Editing: {product.name}</p>
                          <ProductForm initial={product} catalogs={catalogs} onSave={handleUpdate} onCancel={() => setEditId(null)} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
