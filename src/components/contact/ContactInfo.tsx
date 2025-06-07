import { contactInfo } from '@/types/contact';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-2xl text-theme-mint-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">주소</h3>
                <p className="text-gray-600">{contactInfo.address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaPhone className="text-2xl text-theme-mint-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">전화</h3>
                <p className="text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-2xl text-theme-mint-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">이메일</h3>
                <p className="text-gray-600">{contactInfo.email}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-4">
              <FaClock className="text-2xl text-theme-mint-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">영업시간</h3>
                <ul className="space-y-2">
                  {contactInfo.businessHours.map((hours, index) => (
                    <li key={index} className="text-gray-600">{hours}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 