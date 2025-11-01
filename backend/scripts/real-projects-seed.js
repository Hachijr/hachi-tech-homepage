// Real Projects from Luumuno's CV
// Run this after the main seed to add real projects

import mongoose from 'mongoose';
import Project from '../models/Project.js';
import dotenv from 'dotenv';

dotenv.config();

const realProjects = [
  {
    title: 'Farmer Marketplace Appointment System',
    slug: 'farmer-marketplace-appointment-system',
    description: 'A comprehensive web platform enabling farmers to book appointments, view crop prices, and receive payments via mobile money or bank transfer. Features include admin access for companies to manage purchases, pricing, and generate detailed reports.',
    category: 'Web Development',
    technologies: ['React.js', 'Node.js', 'Payment Integration', 'Mobile Money API', 'User Roles', 'Report Generation'],
    images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800'],
    featured: true,
    client: 'Agricultural Sector',
    duration: '3 months',
    completionDate: new Date('2024-06-01'),
    challenges: 'Integrating multiple payment gateways (mobile money and bank transfers) while ensuring secure transactions and real-time price updates.',
    solution: 'Developed a robust API layer to handle various payment methods, implemented role-based access control for farmers and companies, and created an intuitive dashboard for price management and report generation.',
    results: [
      'Streamlined appointment booking process for farmers',
      'Enabled real-time crop price viewing',
      'Integrated secure payment processing',
      'Automated report generation for companies',
      'Improved market transparency'
    ],
    testimonial: {
      text: 'The platform has revolutionized how we connect with farmers and manage our agricultural purchases.',
      author: 'Agricultural Company Representative',
      position: 'Operations Manager'
    },
    liveUrl: '',
    githubUrl: '',
    status: 'completed'
  },
  {
    title: 'Travel Advisor System for Zambia Group Project',
    slug: 'travel-advisor-system-zambia',
    description: 'A user-friendly travel recommendation system providing comprehensive listings for hotels, car rentals, and restaurants across Zambia. Built with HCI principles and usability testing to ensure optimal user experience.',
    category: 'Web Development',
    technologies: ['React.js', 'Think-Aloud Protocol', 'HCI Design', 'Usability Testing', 'Responsive Design'],
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'],
    featured: true,
    client: 'Tourism Sector',
    duration: '2 months',
    completionDate: new Date('2024-09-01'),
    challenges: 'Creating an intuitive interface that caters to both local and international tourists while ensuring accessibility and ease of navigation.',
    solution: 'Conducted extensive usability testing using Think-Aloud Protocol, implemented user-centered design principles, and created a responsive interface that works seamlessly across all devices.',
    results: [
      'Enhanced user navigation and interface design',
      'Improved accessibility for diverse user groups',
      'Positive feedback from usability testing',
      'Comprehensive travel information in one platform',
      'Mobile-responsive design'
    ],
    testimonial: {
      text: 'The system makes it incredibly easy for tourists to find and book accommodations and services in Zambia.',
      author: 'Tourism Board Representative',
      position: 'Digital Marketing Manager'
    },
    liveUrl: '',
    githubUrl: '',
    status: 'completed'
  },
  {
    title: 'Portfolio Website – Hachi Tech Solutions',
    slug: 'portfolio-website-hachi-tech',
    description: 'A modern, responsive portfolio website showcasing comprehensive technology services including software development, hardware repair, and UX/UI design. Built with cutting-edge technologies and stunning animations.',
    category: 'Web Development',
    technologies: ['React.js', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Express.js'],
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
    featured: true,
    client: 'HTS Tech',
    duration: '1 month',
    completionDate: new Date('2025-01-01'),
    challenges: 'Creating a visually stunning, highly functional website that effectively showcases diverse services while maintaining excellent performance and user experience.',
    solution: 'Implemented modern design patterns with Framer Motion animations, created reusable components, integrated a full-stack backend for content management, and optimized for SEO and performance.',
    results: [
      'Professional online presence',
      'Improved client engagement',
      'Showcase of technical capabilities',
      'Full content management system',
      'Mobile-first responsive design'
    ],
    testimonial: {
      text: 'Our new website perfectly represents our brand and has significantly increased client inquiries.',
      author: 'Luumuno Chibombya',
      position: 'Founder & CEO'
    },
    liveUrl: '',
    githubUrl: '',
    status: 'completed'
  },
  {
    title: 'Network Infrastructure Setup - Northrise University',
    slug: 'network-infrastructure-northrise',
    description: 'Comprehensive network infrastructure project including server administration, Active Directory configuration, CCTV system setup, and hands-on lab network creation during technical internship.',
    category: 'Hardware & Networking',
    technologies: ['Active Directory', 'Server Administration', 'Network Configuration', 'CCTV Systems', 'Router & Switch Setup', 'Structured Cabling'],
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'],
    featured: true,
    client: 'Northrise University IT Department',
    duration: '2 months',
    completionDate: new Date('2025-07-01'),
    challenges: 'Setting up a complete network infrastructure from scratch, configuring user roles and permissions, and ensuring security and reliability.',
    solution: 'Implemented Active Directory for centralized user management, configured routers and switches for optimal network performance, set up CCTV surveillance system, and created a functional lab network with proper security measures.',
    results: [
      'Fully functional network infrastructure',
      'Centralized user management system',
      'Secure CCTV surveillance integration',
      'Improved network performance and reliability',
      'Hands-on practical experience gained'
    ],
    testimonial: {
      text: 'Luumuno demonstrated exceptional technical skills and professionalism during the internship.',
      author: 'IT Department Head',
      position: 'Northrise University'
    },
    liveUrl: '',
    githubUrl: '',
    status: 'completed'
  }
];

async function seedRealProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hls-tech');
    console.log('Connected to MongoDB');

    // Add real projects
    for (const projectData of realProjects) {
      const existingProject = await Project.findOne({ slug: projectData.slug });
      if (!existingProject) {
        await Project.create(projectData);
        console.log(`✓ Created project: ${projectData.title}`);
      } else {
        console.log(`- Project already exists: ${projectData.title}`);
      }
    }

    console.log('\n✅ Real projects seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding real projects:', error);
    process.exit(1);
  }
}

seedRealProjects();
