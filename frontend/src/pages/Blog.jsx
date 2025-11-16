import { useState } from 'react';
import { Search, Calendar, User, TrendingUp, Users, Briefcase, Clock, ArrowRight, ChevronRight, Eye, MessageSquare, Share2, BookOpen, Star, Filter, Tag } from 'lucide-react';

const BlogPost = ({ post, featured = false }) => (
  <article className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
    <div className="relative overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title}
        className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${featured ? 'h-64 md:h-80' : 'h-48'}`}
      />
      <div className="absolute top-4 left-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${post.category.color} backdrop-blur-sm`}>
          {post.category.icon}
          {post.category.name}
        </span>
      </div>
      <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Share2 className="h-4 w-4 text-white" />
      </div>
    </div>
    
    <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {post.date}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </div>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {post.views}
        </div>
      </div>
      
      <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-[#ab3f20] transition-colors line-clamp-2 ${featured ? 'text-2xl md:text-3xl mb-4' : 'text-xl'}`}>
        {post.title}
      </h3>
      
      <p className={`text-gray-600 mb-4 line-clamp-3 ${featured ? 'text-lg leading-relaxed' : ''}`}>
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">{post.author.role}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {post.comments}
          </span>
          <ArrowRight className="h-5 w-5 text-[#ab3f20] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </article>
);

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap gap-2 mb-8">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onCategoryChange(category.id)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === category.id
            ? 'bg-[#ab3f20] text-white shadow-lg scale-105'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {category.icon}
        {category.name}
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          activeCategory === category.id ? 'bg-white/20' : 'bg-gray-300'
        }`}>
          {category.count}
        </span>
      </button>
    ))}
  </div>
);

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: <BookOpen className="h-4 w-4" />, count: 24 },
    { id: 'trends', name: 'Xu hướng ngành', icon: <TrendingUp className="h-4 w-4" />, count: 8 },
    { id: 'tips', name: 'Tips ứng viên', icon: <User className="h-4 w-4" />, count: 12 },
    { id: 'employer', name: 'Nhà tuyển dụng', icon: <Briefcase className="h-4 w-4" />, count: 6 },
    { id: 'success', name: 'Câu chuyện thành công', icon: <Star className="h-4 w-4" />, count: 4 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Event Staffing Trends 2025: What Every Part-Time Worker Should Know",
      excerpt: "Khám phá những xu hướng mới nhất trong ngành tuyển dụng nhân sự sự kiện, từ công nghệ AI trong tuyển dụng đến những kỹ năng được săn đón nhất...",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      category: { name: 'Xu hướng ngành', color: 'bg-purple-100 text-purple-800', icon: <TrendingUp className="h-3 w-3 mr-1" /> },
      author: {
        name: "Sarah Chen",
        role: "Industry Expert",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=40&h=40&fit=crop&crop=face"
      },
      date: "21 Sep 2025",
      readTime: "8 min read",
      views: "2.1k",
      comments: 45
    }
  ];

  const blogPosts = [
    {
      id: 2,
      title: "5 Essential Skills Every Event Staff Member Needs",
      excerpt: "Master these key skills to stand out in the competitive event staffing market and land your dream part-time positions.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
      category: { name: 'Tips ứng viên', color: 'bg-green-100 text-green-800', icon: <User className="h-3 w-3 mr-1" /> },
      author: {
        name: "Michael Rodriguez",
        role: "Career Coach",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      date: "19 Sep 2025",
      readTime: "6 min read",
      views: "1.8k",
      comments: 32
    },
    {
      id: 3,
      title: "How to Create the Perfect Event Staff Profile",
      excerpt: "Step-by-step guide to building a standout profile that gets you noticed by top event organizers and brands.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
      category: { name: 'Tips ứng viên', color: 'bg-green-100 text-green-800', icon: <User className="h-3 w-3 mr-1" /> },
      author: {
        name: "Lisa Park",
        role: "HR Specialist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      date: "17 Sep 2025",
      readTime: "10 min read",
      views: "2.5k",
      comments: 58
    },
    {
      id: 4,
      title: "Top Event Companies Hiring in Q4 2025",
      excerpt: "Exclusive insights into the biggest event companies actively recruiting part-time staff this quarter.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
      category: { name: 'Nhà tuyển dụng', color: 'bg-blue-100 text-blue-800', icon: <Briefcase className="h-3 w-3 mr-1" /> },
      author: {
        name: "David Kim",
        role: "Industry Analyst",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      date: "15 Sep 2025",
      readTime: "7 min read",
      views: "3.2k",
      comments: 67
    },
    {
      id: 5,
      title: "From Part-Time to Full-Time: Success Stories",
      excerpt: "Real stories from event staff who turned their part-time gigs into successful full-time careers in the industry.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      category: { name: 'Câu chuyện thành công', color: 'bg-yellow-100 text-yellow-800', icon: <Star className="h-3 w-3 mr-1" /> },
      author: {
        name: "Emma Thompson",
        role: "Success Coach",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
      },
      date: "13 Sep 2025",
      readTime: "12 min read",
      views: "1.9k",
      comments: 41
    },
    {
      id: 6,
      title: "Salary Guide: Event Staff Compensation 2025",
      excerpt: "Comprehensive breakdown of event staff salaries across different roles, locations, and experience levels.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      category: { name: 'Xu hướng ngành', color: 'bg-purple-100 text-purple-800', icon: <TrendingUp className="h-3 w-3 mr-1" /> },
      author: {
        name: "Alex Johnson",
        role: "Compensation Analyst",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
      },
      date: "11 Sep 2025",
      readTime: "9 min read",
      views: "4.1k",
      comments: 89
    }
  ];

  const trendingTopics = [
    "AI trong tuyển dụng",
    "Event marketing",
    "Kỹ năng soft skills",
    "Remote event staff",
    "Sustainable events"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ab3f20] to-[#d4543a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Event Staffing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                Insights & Trends
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Nền tảng thông tin hàng đầu cho ngành tuyển dụng nhân sự sự kiện part-time tại Việt Nam
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết, chủ đề..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-200 text-lg"
                />
              </div>
              
              {/* Trending Topics */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-orange-200">Trending:</span>
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Featured & Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post) => (
            <BlogPost key={post.id} post={post} featured={true} />
          ))}
          {blogPosts.slice(0, 4).map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>

        {/* More Articles Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bài viết khác</h2>
            <button className="flex items-center gap-2 text-[#ab3f20] hover:text-[#8b321a] font-semibold transition-colors">
              Xem tất cả
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-[#ab3f20] to-[#d4543a] rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức</h3>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Nhận những insights mới nhất về ngành event staffing và cơ hội việc làm hấp dẫn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-200"
            />
            <button className="bg-white text-[#ab3f20] px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}