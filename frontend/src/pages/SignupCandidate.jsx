import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  MapPin,
  Check,
  X
} from "lucide-react";

const InputField = ({ icon: Icon, error, success, type = "text", ...props }) => (
  <div className="space-y-2">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
        <Icon className={`h-5 w-5 transition-colors ${error ? 'text-red-500' : success ? 'text-orange-500' : 'text-gray-400 group-focus-within:text-orange-500'}`} />
      </div>
      <input
        type={type}
        className={`w-full pl-12 pr-4 py-3.5 md:py-4 border-2 rounded-2xl transition-all duration-200 focus:outline-none text-base ${
          error 
            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
            : success
            ? "border-orange-300 bg-orange-50/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            : "border-gray-200 bg-white hover:border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        }`}
        {...props}
      />
      {success && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <CheckCircle2 className="h-5 w-5 text-orange-500" />
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

const PasswordField = ({ icon: Icon, error, success, show, onToggle, showStrength, ...props }) => (
  <div className="space-y-2">
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
        <Icon className={`h-5 w-5 transition-colors ${error ? 'text-red-500' : success ? 'text-orange-500' : 'text-gray-400 group-focus-within:text-orange-500'}`} />
      </div>
      <input
        type={show ? "text" : "password"}
        className={`w-full pl-12 pr-12 py-3.5 md:py-4 border-2 rounded-2xl transition-all duration-200 focus:outline-none text-base ${
          error 
            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
            : success
            ? "border-orange-300 bg-orange-50/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            : "border-gray-200 bg-white hover:border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
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

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength();
  const percentage = (strength / 5) * 100;
  
  const getColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (strength <= 2) return 'Yếu';
    if (strength <= 3) return 'Trung bình';
    return 'Mạnh';
  };

  const requirements = [
    { met: password.length >= 6, text: 'Ít nhất 6 ký tự' },
    { met: /[a-z]/.test(password) && /[A-Z]/.test(password), text: 'Chữ hoa và thường' },
    { met: /[0-9]/.test(password), text: 'Chứa số' },
  ];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${getColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${
          strength <= 2 ? 'text-red-600' : strength <= 3 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {getLabel()}
        </span>
      </div>
      <div className="space-y-1">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <X className="w-3 h-3 text-gray-400" />
            )}
            <span className={req.met ? 'text-green-600' : 'text-gray-500'}>{req.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SignupCandidate() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldSuccess, setFieldSuccess] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Show success for valid fields
    if (name === 'fullName' && value.trim().length >= 3) {
      setFieldSuccess((prev) => ({ ...prev, fullName: true }));
    } else if (name === 'fullName') {
      setFieldSuccess((prev) => ({ ...prev, fullName: false }));
    }

    if (name === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldSuccess((prev) => ({ ...prev, email: true }));
    } else if (name === 'email') {
      setFieldSuccess((prev) => ({ ...prev, email: false }));
    }

    if (name === 'phone' && /^[0-9]{10,11}$/.test(value)) {
      setFieldSuccess((prev) => ({ ...prev, phone: true }));
    } else if (name === 'phone') {
      setFieldSuccess((prev) => ({ ...prev, phone: false }));
    }

    if (name === 'password' && value.length >= 6) {
      setFieldSuccess((prev) => ({ ...prev, password: true }));
    } else if (name === 'password') {
      setFieldSuccess((prev) => ({ ...prev, password: false }));
    }

    if (name === 'confirmPassword' && value === formData.password && value.length >= 6) {
      setFieldSuccess((prev) => ({ ...prev, confirmPassword: true }));
    } else if (name === 'confirmPassword') {
      setFieldSuccess((prev) => ({ ...prev, confirmPassword: false }));
    }

    if (name === 'location' && value.trim().length >= 3) {
      setFieldSuccess((prev) => ({ ...prev, location: true }));
    } else if (name === 'location') {
      setFieldSuccess((prev) => ({ ...prev, location: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Signup Candidate:", formData);
      setIsSubmitting(false);
      nav("/login/candidate");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50/30 animate-gradient-shift">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-lg border-b border-orange-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-amber-700 transition-all">
                Cviro
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Trang chủ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-md mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-500/10 p-6 sm:p-8 md:p-10 border border-orange-100/50">
            {/* Icon & Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Tạo tài khoản ứng viên
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Bắt đầu tìm kiếm cơ hội việc làm ngay hôm nay
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <InputField
                  icon={User}
                  type="text"
                  name="fullName"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                  success={fieldSuccess.fullName}
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <InputField
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  success={fieldSuccess.email}
                  autoComplete="email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <InputField
                  icon={Phone}
                  type="tel"
                  name="phone"
                  placeholder="0901234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  success={fieldSuccess.phone}
                  autoComplete="tel"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <InputField
                  icon={MapPin}
                  type="text"
                  name="location"
                  placeholder="Hà Nội, Việt Nam"
                  value={formData.location}
                  onChange={handleInputChange}
                  success={fieldSuccess.location}
                  autoComplete="address-level1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu <span className="text-red-500">*</span>
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
                  autoComplete="new-password"
                />
                <PasswordStrength password={formData.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <PasswordField
                  icon={Lock}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  success={fieldSuccess.confirmPassword}
                  show={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  autoComplete="new-password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3.5 md:py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang tạo tài khoản...</span>
                  </>
                ) : (
                  <span>Tạo tài khoản</span>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-center text-gray-500">
                Bằng việc đăng ký, bạn đồng ý với{" "}
                <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                  Chính sách bảo mật
                </Link>
              </p>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/login/candidate"
                  className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Switch to Agency */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bạn là nhà tuyển dụng?{" "}
              <Link
                to="/signup/agency"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Đăng ký tại đây
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
