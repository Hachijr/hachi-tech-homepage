// Professional Testimonials Seed Data
import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';
import dotenv from 'dotenv';

dotenv.config();

const testimonials = [
  {
    name: 'Prisca Phillips Tembo',
    position: 'Chief Operations Officer',
    company: 'Gospel Envoys Church',
    avatar: 'https://ui-avatars.com/api/?name=Prisca+Phillips+Tembo&background=007BFF&color=fff&size=200',
    review: 'Working with Luumuno and HLS Tech has been an absolute pleasure. Their professionalism, technical expertise, and dedication to delivering quality solutions is unmatched. They transformed our digital presence and streamlined our operations.',
    rating: 5,
    serviceUsed: 'Web Development',
    featured: true,
    date: new Date('2024-11-01')
  },
  {
    name: 'Derek S. Mudeba',
    position: 'IT Coordinator',
    company: 'NAPSA',
    avatar: 'https://ui-avatars.com/api/?name=Derek+Mudeba&background=6366F1&color=fff&size=200',
    review: 'HLS Tech provided exceptional networking solutions for our organization. Luumuno\'s deep understanding of system administration and network infrastructure helped us achieve a robust and secure IT environment. Highly recommended!',
    rating: 5,
    serviceUsed: 'Hardware & Networking',
    featured: true,
    date: new Date('2024-10-15')
  },
  {
    name: 'Choolwe M. Choolwe',
    position: 'Managing Consultant',
    company: 'Success Practitioners',
    avatar: 'https://ui-avatars.com/api/?name=Choolwe+Choolwe&background=EC4899&color=fff&size=200',
    review: 'The level of creativity and attention to detail in the design work is outstanding. HLS Tech delivered a beautiful, user-friendly interface that our clients love. The UX/UI expertise really shows in the final product.',
    rating: 5,
    serviceUsed: 'UX/UI Design',
    featured: true,
    date: new Date('2024-12-01')
  },
  {
    name: 'Ranjan Arulanandham',
    position: 'IT Coordinator',
    company: 'Northrise University',
    avatar: 'https://ui-avatars.com/api/?name=Ranjan+Arulanandham&background=10B981&color=fff&size=200',
    review: 'During the internship, Luumuno demonstrated exceptional technical skills in server administration and networking. His ability to quickly learn and apply complex concepts was impressive. A valuable asset to any tech team.',
    rating: 5,
    serviceUsed: 'Technical Training',
    featured: true,
    date: new Date('2025-07-20')
  },
  {
    name: 'Sarah Mwansa',
    position: 'Business Owner',
    company: 'Mwansa Enterprises',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mwansa&background=F59E0B&color=fff&size=200',
    review: 'HLS Tech repaired our office computers and set up our network infrastructure. The service was prompt, professional, and affordable. Our systems have been running smoothly ever since. Thank you!',
    rating: 5,
    serviceUsed: 'Hardware Repair',
    featured: false,
    date: new Date('2024-09-10')
  },
  {
    name: 'John Banda',
    position: 'Marketing Director',
    company: 'Zambia Tourism Board',
    avatar: 'https://ui-avatars.com/api/?name=John+Banda&background=8B5CF6&color=fff&size=200',
    review: 'The Travel Advisor System developed by HLS Tech has been a game-changer for promoting tourism in Zambia. The platform is intuitive, comprehensive, and has received excellent feedback from users.',
    rating: 5,
    serviceUsed: 'Web Development',
    featured: false,
    date: new Date('2024-09-15')
  },
  {
    name: 'Grace Phiri',
    position: 'Operations Manager',
    company: 'Agricultural Cooperative',
    avatar: 'https://ui-avatars.com/api/?name=Grace+Phiri&background=06B6D4&color=fff&size=200',
    review: 'The Farmer Marketplace system has revolutionized how we connect with farmers. The payment integration works flawlessly, and the reporting features have made our operations much more efficient.',
    rating: 5,
    serviceUsed: 'Web Development',
    featured: false,
    date: new Date('2024-06-20')
  },
  {
    name: 'Michael Zulu',
    position: 'School Administrator',
    company: 'Masaiti Boarding School',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Zulu&background=EF4444&color=fff&size=200',
    review: 'HLS Tech helped us modernize our school\'s computer lab and network infrastructure. The team was knowledgeable, patient, and ensured everything was set up properly. Excellent service!',
    rating: 5,
    serviceUsed: 'Hardware & Networking',
    featured: false,
    date: new Date('2024-08-05')
  },
  {
    name: 'Patricia Lungu',
    position: 'Graphic Designer',
    company: 'Creative Studio Zambia',
    avatar: 'https://ui-avatars.com/api/?name=Patricia+Lungu&background=F97316&color=fff&size=200',
    review: 'I collaborated with HLS Tech on a branding project and was impressed by their design skills and professionalism. They understand both aesthetics and functionality perfectly.',
    rating: 5,
    serviceUsed: 'Graphic Design',
    featured: false,
    date: new Date('2024-07-12')
  },
  {
    name: 'David Mulenga',
    position: 'CEO',
    company: 'Tech Startups Zambia',
    avatar: 'https://ui-avatars.com/api/?name=David+Mulenga&background=14B8A6&color=fff&size=200',
    review: 'HLS Tech built our company website and it exceeded all expectations. The modern design, smooth animations, and responsive layout have significantly improved our online presence. Worth every kwacha!',
    rating: 5,
    serviceUsed: 'Web Development',
    featured: false,
    date: new Date('2024-11-20')
  }
];

async function seedTestimonials() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hls-tech');
    console.log('Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials');

    // Add new testimonials
    await Testimonial.insertMany(testimonials);
    console.log(`✓ Created ${testimonials.length} testimonials`);

    console.log('\n✅ Testimonials seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();
