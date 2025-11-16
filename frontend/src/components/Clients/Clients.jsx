import { useState } from 'react';

// Separate data for agencies and brands
const agencies = [
  {
    id: 1,
    name: "Coming soon",
    logo: "br.svg",
    category: "Coming soon"
  },
  {
    id: 2,
    name: "Coming soon", 
    logo: "br.svg",
    category: "Coming soon"
  },
  {
    id: 3,
    name: "Coming soon",
    logo: "br.svg",
    category: "Coming soon"
  },
  {
    id: 4,
    name: "Coming soon",
    logo: "br.svg",
    category: "Coming soon"
  },
  {
    id: 5,
    name: "Coming soon",
    logo: "br.svg", 
    category: "Coming soon"
  },
  {
    id: 6,
    name: "Coming soon",
    logo: "br.svg",
    category: "Coming soon"
  }
];

const brands = [
  {
    id: 1,
    name: "Coming soon",
    logo: "br.svg",
    industry: "Coming soon"
  },
  {
    id: 2,
    name: "Coming soon",
    logo: "br.svg",
    industry: "Coming soon"
  },
  {
    id: 3,
    name: "Coming soon", 
    logo: "br.svg",
    industry: "Coming soon"
  },
  {
    id: 4,
    name: "Coming soon",
    logo: "br.svg",
    industry: "Coming soon"
  },
  {
    id: 5,
    name: "Coming soon",
    logo: "br.svg",
    industry: "Coming soon"
  },
  {
    id: 6,
    name: "Coming soon",
    logo: "br.svg",
    industry: "Coming soon"
  }
];

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      active 
        ? 'bg-[#ab3f20] text-white' 
        : 'bg-[#F5F5F5] text-gray-700 hover:bg-[#536b4e] hover:text-white'
    }`}
  >
    {children}
  </button>
);

const ClientCard = ({ client }) => (
  <div className="group bg-white border border-[#E0E0E0] rounded-lg p-4 hover:shadow-md hover:border-[#ab3f20] transition-all duration-200">
    <div className="flex h-12 items-center justify-center mb-3 rounded bg-[#F5F5F5] group-hover:bg-white">
      <img
        src={client.logo}
        alt={client.name}
        className="h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-200"
        loading="lazy"
      />
    </div>
    <h3 className="font-semibold text-gray-900 text-center text-sm">
      {client.name}
    </h3>
  </div>
);

export default function Clients() {
  const [activeTab, setActiveTab] = useState('all');

  const renderClients = () => {
    switch (activeTab) {
      case 'agencies':
        return agencies.map((client) => (
          <ClientCard key={`agency-${client.id}`} client={client} />
        ));
      case 'brands':
        return brands.map((client) => (
          <ClientCard key={`brand-${client.id}`} client={client} />
        ));
      default:
        return [
          ...agencies.map((client) => (
            <ClientCard key={`agency-${client.id}`} client={client} />
          )),
          ...brands.map((client) => (
            <ClientCard key={`brand-${client.id}`} client={client} />
          ))
        ];
    }
  };

  return (
    <section className="bg-white py-16" aria-label="Khách hàng & đối tác">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Được tin tưởng bởi <span className="text-[#ab3f20]">hàng trăm đối tác</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cviro đã đồng hành cùng các thương hiệu lớn và agency hàng đầu tại Việt Nam
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ab3f20]">200+</div>
            <div className="text-xs text-gray-600">Dự án</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#f0b33a]">50+</div>
            <div className="text-xs text-gray-600">Thương hiệu</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#536b4e]">30+</div>
            <div className="text-xs text-gray-600">Agency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ab3f20]">98%</div>
            <div className="text-xs text-gray-600">Hài lòng</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-[#F5F5F5] p-1 rounded-lg">
            <TabButton
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </TabButton>
            <TabButton
              active={activeTab === 'agencies'}
              onClick={() => setActiveTab('agencies')}
            >
              Agency
            </TabButton>
            <TabButton
              active={activeTab === 'brands'}
              onClick={() => setActiveTab('brands')}
            >
              Thương hiệu
            </TabButton>
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {renderClients()}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-[#F5F5F5] rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Sẵn sàng trở thành đối tác tiếp theo?
            </h3>
            <p className="text-gray-600 mb-4">
              Hãy để Cviro đồng hành cùng bạn tạo nên sự kiện thành công
            </p>
            <button className="bg-[#ab3f20] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#536b4e] transition-colors duration-200">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}