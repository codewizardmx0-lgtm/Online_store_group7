// src/pages/Login.jsx
import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Mail, Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function Login() {
  const { login, isLoggedIn, isAdmin } = useAuth()
  const { addToast } = useToast()
  const { url } = usePage()
  const from = '/' // simplified for Inertia

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Already logged in — go to appropriate dashboard
  useEffect(() => {
    if (isLoggedIn) {
      router.visit(isAdmin ? '/admin/dashboard' : from, { replace: true })
    }
  }, [isLoggedIn, isAdmin, from])

  if (isLoggedIn) return null

  const validate = () => {
    const errs = {}
    if (!formData.email.trim()) errs.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address.'
    if (!formData.password) errs.password = 'Password is required.'
    return errs
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const result = login(formData.email, formData.password)
    setLoading(false)
    if (!result.success) {
      setErrors({ form: result.error })
    } else {
      addToast('Welcome back! You are now signed in.', 'success')
      // Role-based redirect
      router.visit(result.role === 'admin' ? '/admin/dashboard' : from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-[8px] flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900">TOPECO</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-[14px] border border-gray-200 p-8">
          {/* Quick-fill hint */}
          <div className="mb-6 p-3 bg-purple-50 border border-purple-100 rounded-[10px]">
            <p className="text-xs text-purple-700 font-medium mb-1">Admin demo credentials:</p>
            <p className="text-xs text-purple-600">Email: admin@TOPECO.com &nbsp;|&nbsp; Password: admin123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.form && (
              <div className="p-3 rounded-[10px] bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{errors.form}</p>
              </div>
            )}

            <div className="relative">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />
              <Mail className="absolute right-3 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
              ) : (
                <><LogIn className="w-4 h-4" />Sign In</>
              )}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-purple-600 font-medium hover:text-purple-700">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
