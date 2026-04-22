import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    console.log('Email:', email);
    console.log('Password:', password);
    alert('محاولة تسجيل الدخول');
  };

  return (
    <section className="login-card">
      <div className="login-heading">
        <h2 className="login-title">تسجيل الدخول</h2>
        <p className="login-subtitle">
          ادخل بياناتك للمتابعة إلى حسابك
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@domain.com"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="input-field"
        />
      </div>

      <button onClick={handleLogin} className="submit-btn">
        تسجيل الدخول
      </button>
    </section>
  );
};

export default LoginForm;