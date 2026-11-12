// Project list (migrated from Airtable). Order here = order on the /project page;
// the first project is shown as the large featured card.
// Screenshots live in /public/assets/project/screens (landscape, ~1600px wide WebP).
export const projects = [
  {
    id: 'nikahin',
    name: 'Nikah.in',
    type: 'Web App',
    description:
      'A digital wedding invitation platform with Balinese, Javanese, Sundanese and modern themes. Each invitation is one shareable link with background music, photo gallery, countdown, RSVP, map and a digital gift envelope.',
    stack: ['Next.js', 'TypeScript', 'Tailwindcss', 'MUI', 'GSAP', 'Zustand'],
    demo: 'https://nikahin.marst.my.id/',
    code: null, // private repository
    image: {
      src: '/assets/project/screens/nikahin-adat.webp',
      width: 900,
      height: 1087,
    },
    // Portrait screenshot: anchor the crop to the top so the cover photos stay visible in wide frames.
    imagePosition: 'object-top',
  },
  {
    id: 'imgconv',
    name: 'Imgconv',
    type: 'Web App',
    description: 'An all-in-one image toolkit: convert images to PNG, JPG or WEBP, compress files without losing quality, and crop, resize or rotate them. React frontend with a Go backend.',
    stack: ['React', 'TypeScript', 'Tailwindcss', 'Golang'],
    demo: 'https://image-convert-marst.netlify.app/',
    code: 'https://github.com/Marst313/image-converter-fe',
    image: {
      src: '/assets/project/screens/imgconv.webp',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    type: 'Web App',
    description:
      'Weather Marst provides accurate and real-time weather information. Stay informed about current conditions, forecasts, and more. Plan your day with confidence using our user-friendly interface. Explore weather details for any location. Your go-to source for precise weather updates.',
    stack: ['Tailwindcss', 'HTML', 'Javascript'],
    demo: 'https://weather-marst-kappa.netlify.app/',
    code: 'https://github.com/Marst313/Weather',
    image: {
      src: '/assets/project/screens/weather-app.webp',
      width: 1600,
      height: 777,
    },
  },
  {
    id: 'computer-store',
    name: 'Computer Store',
    type: 'Landing Page',
    description:
      'Computer Store MarsT offers a diverse selection of high-quality computer hardware and accessories. Explore top-notch laptops, desktops, peripherals, and more. Elevate your computing experience with our reliable products and excellent customer service. Shop now for cutting-edge technology at competitive prices.',
    stack: ['Tailwindcss', 'HTML', 'Javascript'],
    demo: 'https://computerstoremarst.netlify.app',
    code: 'https://github.com/Marst313/computerstore',
    image: {
      src: '/assets/project/screens/computer-store.webp',
      width: 1482,
      height: 822,
    },
  },
  {
    id: 'digital-wedding-invitation',
    name: 'Digital Wedding Invitation',
    type: 'Landing Page',
    description: 'A digital wedding invitation website.',
    stack: ['Tailwindcss', 'Javascript', 'React'],
    demo: 'https://romadhoni.netlify.app',
    code: 'https://github.com/Marst313/Wedding',
    image: {
      src: '/assets/project/screens/digital-wedding-invitation.webp',
      width: 1600,
      height: 805,
    },
  },
  {
    id: 'beauty-marst',
    name: 'Beauty Marst',
    type: 'Online Store',
    description:
      'Unleash your beauty potential with our curated collection of skincare, makeup, and wellness products. Elevate your self-care routine with premium beauty essentials that enhance your natural radiance. Discover the art of self-expression and embrace your unique beauty at Beauty Marst.',
    stack: ['Tailwindcss', 'React', 'Redux'],
    demo: 'https://beautymarst.netlify.app/',
    code: 'https://github.com/Marst313/BeautyShop',
    image: {
      src: '/assets/project/screens/beauty-marst.webp',
      width: 1600,
      height: 737,
    },
  },
  {
    id: 'happy-cooking',
    name: 'Happy Cooking',
    type: 'Web App',
    description:
      'Your culinary adventure begins here. Unlock a world of delicious recipes, cooking tips, and culinary inspiration. Elevate your kitchen skills and embark on a joyful journey of flavors. Join us in creating delightful meals and making every cooking experience a happy one!',
    stack: ['HTML', 'Javascript', 'CSS'],
    demo: 'https://marst-happy-cooking.netlify.app/',
    code: 'https://github.com/Marst313/Happy-Cooking',
    image: {
      src: '/assets/project/screens/happy-cooking.webp',
      width: 1600,
      height: 788,
    },
  },
  {
    id: 'marst-job',
    name: 'Marst Job',
    type: 'Web App',
    description:
      'Streamline your job search with our user-friendly platform. Organize applications, track interviews, and manage your career journey efficiently. Empower your job hunt with personalized tools, helping you stay focused and achieve career success. Elevate your job search experience with Marst Job Tracker.',
    stack: ['StyledComponent', 'React'],
    demo: 'https://marstjob.netlify.app/',
    code: 'https://github.com/Marst313/Marst-Job',
    image: {
      src: '/assets/project/screens/marst-job.webp',
      width: 1480,
      height: 731,
    },
  },
  {
    id: 'reskrimsus',
    name: 'Reskrimsus',
    type: 'Web App',
    description:
      "The dedicated platform for monitoring and reporting criminal data within the Police Department's Reskrimsus division. Enhance law enforcement efficiency by seamlessly tracking and managing crime reports. Empower investigations and streamline communication for a safer community. Reskrimsus, advancing crime monitoring for a secure society.",
    stack: ['Tailwindcss', 'React', 'NodeJs', 'MongoDb', 'Redux', 'ExpressJs'],
    demo: null,
    code: null,
    image: {
      src: '/assets/project/screens/reskrimsus.webp',
      width: 1600,
      height: 805,
    },
  },
  {
    id: 'summarize-ai',
    name: 'Summarize Ai',
    type: 'Web App',
    description: 'Summerize ai for meeting and conversation ',
    stack: ['HTML', 'Tailwindcss', 'React', 'Redux', 'Javascript', 'NodeJs', 'ExpressJs', 'MySql'],
    demo: null,
    code: null,
    image: {
      src: '/assets/project/screens/summarize-ai.webp',
      width: 777,
      height: 496,
    },
  },
  {
    id: 'caretakers',
    name: 'Caretakers',
    type: 'Web App',
    description:
      'Report bad roads effortlessly with our user-friendly platform. Help improve community infrastructure by submitting road condition feedback. Join us in fostering safer, well-maintained roads. Your reports contribute to creating a smoother and safer travel experience for everyone.',
    stack: ['Tailwindcss', 'React'],
    demo: 'https://il-caretakers.netlify.app/',
    code: 'https://github.com/Marst313/Macro-InfiniteLearning',
    image: {
      src: '/assets/project/screens/caretakers.webp',
      width: 1600,
      height: 788,
    },
  },
  {
    id: 'our-islam',
    name: 'Our Islam',
    type: 'Web App',
    description:
      'A platform offering insights into Islamic teachings, culture, and community. Discover a wealth of knowledge, religious resources, and articles. Engage in a diverse and inclusive space that fosters understanding and unity within the Islamic world. Join us on the journey of faith and enlightenment.',
    stack: ['React', 'Tailwindcss'],
    demo: 'https://ourislam.netlify.app/',
    code: 'https://github.com/Marst313/MyIslam',
    image: {
      src: '/assets/project/screens/our-islam.webp',
      width: 1600,
      height: 768,
    },
  },
  {
    id: 'dewata-petshop',
    name: 'Dewata Petshop',
    type: 'Web App',
    description: 'Management system for dewata petshop',
    stack: ['HTML', 'Tailwindcss', 'ExpressJs', 'TypeScript', 'Postgresql', 'Vue JS'],
    demo: null,
    code: null,
    image: {
      src: '/assets/project/screens/dewata-petshop.webp',
      width: 1600,
      height: 802,
    },
  },
  {
    id: 'posanak',
    name: 'Posanak',
    type: 'Web App',
    description:
      'Empowering child healthcare with our child health post (Posyandu) platform. Simplify growth tracking and health record-keeping for children. Seamlessly input and manage developmental data, fostering proactive child well-being. Join us in promoting healthier futures for children. Posanak, nurturing growth, one entry at a time.',
    stack: ['Tailwindcss', 'Javascript', 'Redux', 'React', 'Firebase'],
    demo: 'https://posanak.netlify.app',
    code: 'https://github.com/Marst313/Massive-InfiniteLearning',
    image: {
      src: '/assets/project/screens/posanak.webp',
      width: 1600,
      height: 788,
    },
  },
  {
    id: 'marst-fashion',
    name: 'Marst Fashion',
    type: 'Online Store',
    description:
      'Your destination for chic and trendy styles. Explore our curated collection of modern clothing, accessories, and footwear. Elevate your wardrobe with fashionable pieces that blend comfort and style effortlessly. Shop the latest trends at Marst Fashion today.',
    stack: ['React', 'Tailwindcss'],
    demo: 'https://marst-fashion.netlify.app/',
    code: 'https://github.com/Marst313/Marst-Furniture',
    image: {
      src: '/assets/project/screens/marst-fashion.webp',
      width: 1600,
      height: 777,
    },
  },
];
