import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Building2,
} from "lucide-react";

const InputField = ({ icon: Icon, error, success, type = "text", ...props }) => (
  <div className="space-y-2">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
        <Icon className={`h-5 w-5 transition-colors ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-400 group-focus-within:text-green-500'}`} />
      </div>
      <input
        type={type}
        className={`w-full pl-12 pr-4 py-3.5 md:py-4 border-2 rounded-2xl transition-all duration-200 focus:outline-none text-base ${
          error 
            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
            : success
            ? "border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100"
            : "border-gray-200 bg-white hover:border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
        }`}
        {...props}
      />
      {success && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
      )}
    </div>
    {error && (
      <div className="flex items-center space-x-1.5 text-red-600 text-sm">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

const PasswordField = ({ icon: Icon, error, success, show, onToggle, ...props }) => (
  <div className="space-y-2">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
        <Icon className={`h-5 w-5 transition-colors ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-400 group-focus-within:text-green-500'}`} />
      </div>
      <input
        type={show ? "text" : "password"}
        className={`w-full pl-12 pr-12 py-3.5 md:py-4 border-2 rounded-2xl transition-all duration-200 focus:outline-none text-base ${
          error 
            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
            : success
            ? "border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-4 focus:ring-green-100"
            : "border-gray-200 bg-white hover:border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
        }`}
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
        onClick={onToggle}
      >
        {show ? (
          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
    {error && (
      <div className="flex items-center space-x-1.5 text-red-600 text-sm">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default function LoginAgency() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fieldSuccess, setFieldSuccess] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Show success for valid email
    if (name === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldSuccess((prev) => ({ ...prev, email: true }));
    } else if (name === 'email') {
      setFieldSuccess((prev) => ({ ...prev, email: false }));
    }
    
    // Show success for valid password
    if (name === 'password' && value.length >= 6) {
      setFieldSuccess((prev) => ({ ...prev, password: true }));
    } else if (name === 'password') {
      setFieldSuccess((prev) => ({ ...prev, password: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("Login Agency:", formData);
      setIsLoading(false);
      nav("/agency/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/30 animate-gradient-shift">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-green-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-lg border-b border-green-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all">
                Cviro
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Trang chủ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-md mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-500/10 p-6 sm:p-8 md:p-10 border border-green-100/50">
            {/* Icon & Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/30">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Đăng nhập Agency
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Quản lý tuyển dụng hiệu quả cho sự kiện
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <InputField
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="agency@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  success={fieldSuccess.email}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <PasswordField
                  icon={Lock}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  success={fieldSuccess.password}
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                  autoComplete="current-password"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 transition-colors cursor-pointer"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Ghi nhớ</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3.5 md:py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <span>Đăng nhập</span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500">hoặc đăng nhập với</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">Facebook</span>
                </button>
              </div>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  to="/signup/agency"
                  className="font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Switch to Candidate */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bạn là ứng viên?{" "}
              <Link
                to="/login/candidate"
                className="font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Đăng nhập tại đây
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

