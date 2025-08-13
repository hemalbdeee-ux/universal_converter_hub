import React from 'react';
import { Users } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & Chief Technology Officer",
      credentials: "PhD in Applied Mathematics, Stanford University",
      bio: "15 years of experience in measurement science and educational technology",
      image: "/assets/images/no_image.png"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Engineering Manager",
      credentials: "MS Computer Science, MIT",
      bio: "Former Google engineer specializing in precision algorithms and data accuracy",
      image: "/assets/images/no_image.png"
    },
    {
      name: "Dr. Emily Watson",
      role: "Director of Educational Content",
      credentials: "PhD in Physics Education, Harvard University",
      bio: "Expert in curriculum development and scientific communication",
      image: "/assets/images/no_image.png"
    },
    {
      name: "James Kim",
      role: "Quality Assurance Director",
      credentials: "MS Metrology, NIST Certified",
      bio: "20 years in measurement standards and quality control systems",
      image: "/assets/images/no_image.png"
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="h-8 w-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Our Expert Team</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers?.map((member, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img 
                src={member?.image} 
                alt={member?.name}
                className="w-16 h-16 rounded-full object-cover bg-gray-100"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member?.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{member?.role}</p>
                <p className="text-xs text-gray-500 mb-2">{member?.credentials}</p>
                <p className="text-sm text-gray-600">{member?.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;