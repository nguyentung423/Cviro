import { Users, Building2, Briefcase, Calendar, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";



export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Chào mừng đến với Cviro
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Kết nối tài năng và cơ hội trong ngành sự kiện
          </p>
          <p className="text-gray-500">
            Chọn vai trò phù hợp để bắt đầu hành trình của bạn
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Candidate Card */}
          <Link to="/signup/candidate" className="group block">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-orange-300 group-hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                  <Users className="w-8 h-8 text-orange-600 group-hover:text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Người tìm việc
              </h3>
              <p className="text-gray-600 mb-6">
                Khám phá cơ hội nghề nghiệp trong ngành tổ chức sự kiện, từ kế hoạch sự kiện đến nhân viên kỹ thuật.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Tìm kiếm việc làm phù hợp</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Xây dựng hồ sơ chuyên nghiệp</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Kết nối với nhà tuyển dụng</span>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-4 group-hover:bg-orange-600 transition-colors duration-300">
                <p className="text-orange-800 font-semibold group-hover:text-white">
                  Bắt đầu tìm việc ngay →
                </p>
              </div>
            </div>
          </Link>

          {/* Agency Card */}
          <Link to="/signup/agency" className="group block">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-green-300 group-hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <Building2 className="w-8 h-8 text-green-600 group-hover:text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Nhà tuyển dụng
              </h3>
              <p className="text-gray-600 mb-6">
                Tìm kiếm và tuyển dụng nhân tài cho các dự án sự kiện, từ freelancer đến nhân viên toàn thời gian.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Đăng tin tuyển dụng</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Quản lý ứng viên</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Tìm nhân tài chất lượng</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 group-hover:bg-green-600 transition-colors duration-300">
                <p className="text-green-800 font-semibold group-hover:text-white">
                  Bắt đầu tuyển dụng ngay →
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Tại sao chọn Cviro?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Chuyên ngành Sự kiện</h4>
              <p className="text-gray-600 text-sm">
                Nền tảng tuyển dụng dành riêng cho ngành tổ chức sự kiện
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Chất lượng cao</h4>
              <p className="text-gray-600 text-sm">
                Kết nối với các nhà tuyển dụng và ứng viên uy tín
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Dễ dàng sử dụng</h4>
              <p className="text-gray-600 text-sm">
                Giao diện thân thiện, quy trình đơn giản và hiệu quả
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Đã có tài khoản?{" "}
            <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}