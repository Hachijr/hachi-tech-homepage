import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Testimonial.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Create super admin
    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: 'admin@hlstech.co.zm',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      fullName: 'Luumuno Chibombya',
      role: 'super-admin'
    });
    console.log('👤 Super admin created');

    // Create services
    const services = await Service.insertMany([
      {
        title: 'Hardware Repair & Maintenance',
        description: 'Professional computer and laptop repair services. We diagnose and fix hardware issues, upgrade components, and provide maintenance to keep your devices running smoothly.',
        icon: '💻',
        features: [
          'Computer & Laptop Repair',
          'Hardware Upgrades',
          'Data Recovery',
          'Preventive Maintenance',
          'Component Replacement'
        ],
        pricing: { startingPrice: 150, currency: 'ZMW', pricingModel: 'Custom' },
        bookingAvailable: true,
        popular: true,
        order: 1
      },
      {
        title: 'Software & Web Application Development',
        description: 'Custom software solutions and modern web applications built with cutting-edge technologies. From concept to deployment, we create scalable and efficient digital solutions.',
        icon: '🧠',
        features: [
          'Custom Web Applications',
          'E-commerce Solutions',
          'API Development',
          'Database Design',
          'Cloud Integration'
        ],
        pricing: { startingPrice: 2000, currency: 'ZMW', pricingModel: 'Project-based' },
        bookingAvailable: true,
        popular: true,
        order: 2
      },
      {
        title: 'Graphic Design & Branding',
        description: 'Creative graphic design services to elevate your brand. We create stunning visuals, logos, marketing materials, and complete brand identities.',
        icon: '🎨',
        features: [
          'Logo Design',
          'Brand Identity',
          'Marketing Materials',
          'Social Media Graphics',
          'Print Design'
        ],
        pricing: { startingPrice: 500, currency: 'ZMW', pricingModel: 'Fixed' },
        bookingAvailable: true,
        popular: false,
        order: 3
      },
      {
        title: 'UX/UI Design & User Experience',
        description: 'User-centered design that creates intuitive and engaging digital experiences. We focus on usability, accessibility, and beautiful interfaces.',
        icon: '🧩',
        features: [
          'User Research',
          'Wireframing & Prototyping',
          'Interface Design',
          'Usability Testing',
          'Design Systems'
        ],
        pricing: { startingPrice: 1500, currency: 'ZMW', pricingModel: 'Project-based' },
        bookingAvailable: true,
        popular: false,
        order: 4
      }
    ]);
    console.log('🛠️  Services created');

    // Create sample projects
    const projects = await Project.insertMany([
      {
        title: 'E-Commerce Platform for Local Business',
        description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and customer analytics.',
        imageURL: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        category: 'Web Development',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        projectLink: 'https://example.com',
        featured: true,
        completionDate: new Date('2024-09-15'),
        client: 'Local Retail Store',
        status: 'Completed'
      },
      {
        title: 'Corporate Brand Identity Design',
        description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines for a tech startup.',
        imageURL: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        category: 'Graphic Design',
        techStack: ['Adobe Illustrator', 'Photoshop', 'Figma'],
        featured: true,
        completionDate: new Date('2024-08-20'),
        client: 'Tech Startup',
        status: 'Completed'
      },
      {
        title: 'Mobile-First Web Application',
        description: 'Responsive web application with modern UI/UX, optimized for mobile devices and progressive web app capabilities.',
        imageURL: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
        category: 'UX/UI Design',
        techStack: ['React', 'Tailwind CSS', 'PWA'],
        projectLink: 'https://example.com',
        featured: false,
        completionDate: new Date('2024-10-01'),
        status: 'Completed'
      }
    ]);
    console.log('📁 Sample projects created');

    // Create sample testimonials
    const testimonials = await Testimonial.insertMany([
      {
        name: 'John Mwansa',
        position: 'CEO',
        company: 'Tech Innovations Ltd',
        review: 'HLS Tech delivered an exceptional e-commerce platform that exceeded our expectations. Their professionalism and technical expertise are outstanding!',
        rating: 5,
        serviceUsed: 'Web Development',
        approved: true,
        featured: true
      },
      {
        name: 'Sarah Banda',
        position: 'Marketing Director',
        company: 'Creative Agency',
        review: 'The branding work they did for us was phenomenal. Our new brand identity perfectly captures our vision and has received amazing feedback from clients.',
        rating: 5,
        serviceUsed: 'Graphic Design',
        approved: true,
        featured: true
      },
      {
        name: 'Michael Phiri',
        position: 'Business Owner',
        company: 'Local Retail',
        review: 'Quick and reliable hardware repair service. They fixed my laptop in no time and explained everything clearly. Highly recommended!',
        rating: 5,
        serviceUsed: 'Hardware Repair',
        approved: true,
        featured: false
      }
    ]);
    console.log('⭐ Sample testimonials created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log(`   Username: ${admin.username}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
