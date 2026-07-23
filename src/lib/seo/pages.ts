import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from './site'

export type SeoPageId =
  | 'home'
  | 'software'
  | '3d-printing'
  | 'steam-education'
  | 'products'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'

export interface SeoPageDefinition {
  id: SeoPageId
  path: string
  title: string
  description: string
  focusKeyphrase: string
  headings: string[]
  /** Approximate HTML used for content / readability analysis */
  contentHtml: string
  internalLinks: string[]
  externalLinks: string[]
  images?: Array<{ src: string; alt?: string; isAboveFold?: boolean; loading?: string }>
  priority: number
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  /** Include in public sitemap (exclude legal/internal-only pages if needed) */
  includeInSitemap: boolean
  wordCount: number
}

export const SEO_PAGES: SeoPageDefinition[] = [
  {
    id: 'home',
    path: '/',
    title: `${SITE_NAME} - Software Development & 3D Printing`,
    description: SITE_DESCRIPTION,
    focusKeyphrase: 'software development',
    headings: [
      'h1:Welcome to EKLab',
      'h2:Why Choose EKLab',
      'h3:Expert Team',
      'h3:Innovative Solutions',
      'h3:Client-Centric Approach',
      'h3:Quality Assurance',
      'h3:Proven Track Record',
      'h3:Comprehensive Support',
      'h3:Our Clients',
    ],
    contentHtml: `
      <h1>Welcome to EKLab</h1>
      <p>Specializing in software development, 3D printing design, and STEAM education. We bring innovative solutions to life.</p>
      <h2>Why Choose EKLab</h2>
      <p>We combine expertise, innovation, and dedication to deliver exceptional results.</p>
      <h3>Expert Team</h3>
      <p>Our team consists of experienced professionals in software development, 3D printing, and education, ensuring high-quality results across all our services.</p>
      <h3>Innovative Solutions</h3>
      <p>We stay at the forefront of technology, using cutting-edge tools and methodologies to deliver innovative solutions that drive your business forward.</p>
      <h3>Client-Centric Approach</h3>
      <p>We prioritize your needs and goals, working closely with you to understand your requirements and deliver solutions that exceed your expectations.</p>
      <h3>Quality Assurance</h3>
      <p>Every project undergoes rigorous testing and quality checks to ensure reliability, performance, and user satisfaction.</p>
      <h3>Proven Track Record</h3>
      <p>Our successful partnerships with leading companies demonstrate our ability to deliver results and build lasting relationships.</p>
      <h3>Comprehensive Support</h3>
      <p>From initial consultation to post-implementation support, we are with you every step of the way to ensure your success.</p>
      <h3>Our Clients</h3>
      <p>Scotiabank, SevenVista, Aaron Consulting Inc, Sparkle.</p>
    `,
    internalLinks: ['/software', '/3d-printing', '/steam-education', '/products', '/faq', '/contact'],
    externalLinks: [
      'https://www.scotiabank.com',
      'https://www.sevenvista.com',
      'https://aaronconsulting.ca/',
      'https://www.linkedin.com/company/sparkle-edu/',
    ],
    priority: 1,
    changeFrequency: 'weekly',
    includeInSitemap: true,
    wordCount: 220,
  },
  {
    id: 'software',
    path: '/software',
    title: `Software Design & Development | ${SITE_NAME}`,
    description:
      'Custom software design and development for scalable, secure, and user-friendly applications. Schedule a free consultation with EKLab.',
    focusKeyphrase: 'custom software development',
    headings: ['h2:Software Design & Development', 'h3:Schedule a Free Consultation'],
    contentHtml: `
      <h2>Software Design & Development</h2>
      <p>We create custom software solutions tailored to your business needs. Our team of experienced developers specializes in building scalable, secure, and user-friendly applications.</p>
      <h3>Schedule a Free Consultation</h3>
      <p>Let's discuss how we can help bring your software ideas to life. Fill out the form below and we will get back to you within 24 hours.</p>
    `,
    internalLinks: ['/contact', '/products', '/faq'],
    externalLinks: [],
    priority: 0.9,
    changeFrequency: 'monthly',
    includeInSitemap: true,
    wordCount: 90,
  },
  {
    id: '3d-printing',
    path: '/3d-printing',
    title: `3D Printing Design & Product Retail | ${SITE_NAME}`,
    description:
      'Custom 3D printing design, prototyping, material consultation, and curated 3D printed products from EKLab.',
    focusKeyphrase: '3D printing design',
    headings: ['h2:3D Printing Design & Product Retail', 'h3:Our Services'],
    contentHtml: `
      <h2>3D Printing Design & Product Retail</h2>
      <p>We offer custom 3D printing services and a curated selection of 3D printed products. Our team of designers and engineers can help bring your ideas to life with high-quality materials and precision printing technology.</p>
      <h3>Our Services</h3>
      <ul>
        <li>Custom 3D printing design and prototyping</li>
        <li>High-quality 3D printed products</li>
        <li>Material selection and consultation</li>
        <li>Bulk printing services</li>
      </ul>
    `,
    internalLinks: ['/products', '/contact', '/steam-education'],
    externalLinks: [],
    priority: 0.9,
    changeFrequency: 'monthly',
    includeInSitemap: true,
    wordCount: 110,
  },
  {
    id: 'steam-education',
    path: '/steam-education',
    title: `STEAM Education Programs | ${SITE_NAME}`,
    description:
      'Hands-on STEAM education programs in partnership with Sparkle Toronto, including adult and children 3D printing classes.',
    focusKeyphrase: 'STEAM education',
    headings: [
      'h2:STEAM Education',
      'h3:3D Printing Classes',
      'h3:SparkleInnovate 3D - Adult',
      'h3:SparkleInnovate 3D - Children',
    ],
    contentHtml: `
      <h2>STEAM Education</h2>
      <p>In partnership with Sparkle, Toronto, we are developing innovative STEAM education programs to inspire the next generation of innovators and problem solvers.</p>
      <h3>3D Printing Classes</h3>
      <h3>SparkleInnovate 3D - Adult</h3>
      <p>An innovative 3D printing course designed for adults, focusing on advanced design techniques, material selection, and practical applications of 3D printing technology.</p>
      <h3>SparkleInnovate 3D - Children</h3>
      <p>A fun and engaging 3D printing course for children, introducing them to the exciting world of 3D design and printing through hands-on projects and creative exploration.</p>
    `,
    internalLinks: ['/3d-printing', '/contact', '/faq'],
    externalLinks: ['https://www.linkedin.com/company/sparkle-edu/'],
    images: [
      {
        src: '/classes/SparkleInnovate 3D adult.jpeg',
        alt: 'SparkleInnovate 3D printing class for adults',
        isAboveFold: true,
        loading: 'eager',
      },
      {
        src: '/classes/SparkleInnovate 3D children.jpeg',
        alt: 'SparkleInnovate 3D printing class for children',
        isAboveFold: false,
        loading: 'lazy',
      },
    ],
    priority: 0.8,
    changeFrequency: 'monthly',
    includeInSitemap: true,
    wordCount: 140,
  },
  {
    id: 'products',
    path: '/products',
    title: `Open Source Products & Tools | ${SITE_NAME}`,
    description:
      'Explore EKLab open-source TypeScript libraries and tools on npm, including logging, concurrency, regex utilities, and more.',
    focusKeyphrase: 'open source TypeScript libraries',
    headings: ['h2:Our Products', 'h3:Open Source Libraries', 'h3:Tools'],
    contentHtml: `
      <h2>Our Products</h2>
      <p>Discover EKLab open-source libraries and developer tools built for modern TypeScript and JavaScript workflows.</p>
      <h3>Open Source Libraries</h3>
      <p>@eklabdev/regexid, @eklabdev/loggerts4, @eklabdev/blingts4, @eklabdev/gochan, @eklabdev/bling, @eklabdev/dotjson, @eklabdev/superset, and @eklabdev/logger provide utilities for pattern generation, logging, concurrency, and data manipulation.</p>
      <h3>Tools</h3>
      <p>EKTool and related developer tooling support productive engineering workflows across our product suite.</p>
    `,
    internalLinks: ['/software', '/contact'],
    externalLinks: [
      'https://www.npmjs.com/package/@eklabdev/regexid',
      'https://ektool.eklab.xyz',
    ],
    priority: 0.8,
    changeFrequency: 'weekly',
    includeInSitemap: true,
    wordCount: 120,
  },
  {
    id: 'faq',
    path: '/faq',
    title: `Frequently Asked Questions | ${SITE_NAME}`,
    description:
      'Answers to common questions about EKLab software development, 3D printing, STEAM education, and how to get in touch.',
    focusKeyphrase: 'EKLab FAQ',
    headings: ['h2:Frequently Asked Questions'],
    contentHtml: `
      <h2>Frequently Asked Questions</h2>
      <p>Find answers to common questions about our services and offerings.</p>
      <p>What services does EKLab offer? EKLab specializes in software design and development, 3D printing design and product retail, and STEAM education.</p>
      <p>How can I get started with software development services? Schedule a free consultation through our Software Development page.</p>
      <p>What types of 3D printing services do you offer? Custom design, prototyping, material consultation, and bulk printing.</p>
      <p>What is STEAM Education? Science, Technology, Engineering, Arts, and Mathematics programs in partnership with Sparkle.</p>
      <p>How can I contact EKLab? Call 416-837-2344 or email edward.wong@eklab.xyz.</p>
    `,
    internalLinks: ['/software', '/3d-printing', '/steam-education', '/contact'],
    externalLinks: [],
    priority: 0.7,
    changeFrequency: 'monthly',
    includeInSitemap: true,
    wordCount: 180,
  },
  {
    id: 'contact',
    path: '/contact',
    title: `Contact Us | ${SITE_NAME}`,
    description:
      'Contact EKLab for software development, 3D printing, or STEAM education inquiries. Email edward.wong@eklab.xyz or call 416-837-2344.',
    focusKeyphrase: 'contact EKLab',
    headings: ['h2:Contact Us', 'h3:Contact Information', 'h3:Send us a message'],
    contentHtml: `
      <h2>Contact Us</h2>
      <p>Get in touch with us for any inquiries or to schedule a consultation.</p>
      <h3>Contact Information</h3>
      <p>Email edward.wong@eklab.xyz or call 416-837-2344.</p>
      <h3>Send us a message</h3>
      <p>Use the contact form to send project details and we will respond promptly.</p>
    `,
    internalLinks: ['/software', '/faq', '/privacy'],
    externalLinks: [],
    priority: 0.8,
    changeFrequency: 'yearly',
    includeInSitemap: true,
    wordCount: 70,
  },
  {
    id: 'privacy',
    path: '/privacy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'Learn how EKLab collects, uses, and protects your personal information.',
    focusKeyphrase: 'privacy policy',
    headings: ['h2:Privacy Policy'],
    contentHtml: `
      <h2>Privacy Policy</h2>
      <p>This Privacy Policy describes how EKLab collects, uses, and protects your personal information including contact details, company information, and project requirements.</p>
    `,
    internalLinks: ['/terms', '/contact'],
    externalLinks: [],
    priority: 0.3,
    changeFrequency: 'yearly',
    includeInSitemap: true,
    wordCount: 80,
  },
  {
    id: 'terms',
    path: '/terms',
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'Terms of Service for using the EKLab website and services.',
    focusKeyphrase: 'terms of service',
    headings: ['h2:Terms of Service'],
    contentHtml: `
      <h2>Terms of Service</h2>
      <p>Welcome to EKLab. By accessing our website and using our services, you agree to be bound by these Terms of Service.</p>
    `,
    internalLinks: ['/privacy', '/contact'],
    externalLinks: [],
    priority: 0.3,
    changeFrequency: 'yearly',
    includeInSitemap: true,
    wordCount: 70,
  },
]

export function getSeoPage(id: SeoPageId): SeoPageDefinition {
  const page = SEO_PAGES.find((entry) => entry.id === id)
  if (!page) throw new Error(`Unknown SEO page: ${id}`)
  return page
}

export function getPageUrl(page: SeoPageDefinition): string {
  return absoluteUrl(page.path)
}

export const FAQ_ITEMS = [
  {
    question: 'What services does EKLab offer?',
    answer:
      'EKLab specializes in three main areas: Software Design and Development, 3D Printing Design and Product Retail, and STEAM Education. We provide custom software solutions, 3D printing services, and educational programs in partnership with Sparkle.',
  },
  {
    question: 'How can I get started with software development services?',
    answer:
      'You can schedule a free consultation through our Software Development page. Simply fill out the consultation form with your details and requirements, and our team will get back to you within 24 hours to discuss your project.',
  },
  {
    question: 'What types of 3D printing services do you offer?',
    answer:
      'We offer custom 3D printing design and prototyping, high-quality 3D printed products, material selection consultation, and bulk printing services. Our store will be launching soon with a curated selection of 3D printed products.',
  },
  {
    question: 'What is STEAM Education?',
    answer:
      'STEAM stands for Science, Technology, Engineering, Arts, and Mathematics. Our STEAM education programs, developed in partnership with Sparkle, aim to provide hands-on learning experiences that combine these disciplines to foster innovation and problem-solving skills.',
  },
  {
    question: 'How can I contact EKLab?',
    answer:
      'You can reach us by phone at 416-837-2344, by email at edward.wong@eklab.xyz, or by visiting our office at 1908 15 Greenview Ave. You can also use the contact form on our website for general inquiries.',
  },
]
