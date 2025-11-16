import { useState } from "react";
import { mockAgencyProfile } from "../../data/mockData";

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    companyName: mockAgencyProfile.companyName,
    companyType: mockAgencyProfile.companyType,
    website: mockAgencyProfile.website,
    address: mockAgencyProfile.address,
    contactPerson: mockAgencyProfile.contactPerson,
    phone: mockAgencyProfile.phone,
    email: mockAgencyProfile.email,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Đã cập nhật hồ sơ (mock data).");
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hồ sơ công ty (mock)</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <ProfileField
          label="Tên công ty"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <ProfileField
          label="Loại hình"
          name="companyType"
          value={formData.companyType}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <ProfileField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <ProfileField
          label="Địa chỉ"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <ProfileField
          label="Người liên hệ"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <ProfileField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <ProfileField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div className="flex justify-end space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Chỉnh sửa
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ ...mockAgencyProfile });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Huỷ
              </button>
              <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Lưu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, name, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
      />
    </div>
  );
}
