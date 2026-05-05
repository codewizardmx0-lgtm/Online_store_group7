// src/pages/Register.jsx
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Register() {
    const { register, isLoggedIn } = useAuth();
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) router.visit("/", { replace: true });
    }, [isLoggedIn]);

    if (isLoggedIn) return null;

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = "Full name is required.";
        if (!formData.email.trim()) errs.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            errs.email = "Enter a valid email address.";
        if (!formData.password) errs.password = "Password is required.";
        else if (formData.password.length < 6)
            errs.password = "Password must be at least 6 characters.";
        if (formData.password !== formData.confirmPassword)
            errs.confirmPassword = "Passwords do not match.";
        return errs;
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name])
            setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        const result = register(
            formData.name,
            formData.email,
            formData.password,
        );
        setLoading(false);
        if (!result.success) {
            setErrors({ form: result.error });
        } else {
            addToast("Account created! Welcome to TOPECO.", "success");
            router.visit("/", { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <div className="w-10 h-10 bg-purple-600 rounded-[8px] flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                S
                            </span>
                        </div>
                        <span className="text-2xl font-semibold text-gray-900">
                            TOPECO
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Create your account
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Join thousands of happy customers
                    </p>
                </div>

                <div className="bg-white rounded-[14px] border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {errors.form && (
                            <div className="p-3 rounded-[10px] bg-red-50 border border-red-200">
                                <p className="text-sm text-red-600">
                                    {errors.form}
                                </p>
                            </div>
                        )}

                        <div className="relative">
                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                autoComplete="name"
                            />
                            <User className="absolute right-3 top-9 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

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
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            autoComplete="new-password"
                        />

                        <Button
                            type="submit"
                            className="w-full gap-2"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-purple-600 font-medium hover:text-purple-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
