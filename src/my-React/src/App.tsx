import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">

      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          تسجيل الدخول
        </h1>

        <p className="text-center text-gray-500 mb-6">
          مرحباً بك مجدداً 👋
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md"
        >
          تسجيل الدخول
        </button>

        {/* Extra */}
        <div className="text-center mt-4 text-sm text-gray-500">
          ليس لديك حساب؟{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            إنشاء حساب
          </span>
        </div>

      </div>
    </div>
  );
}