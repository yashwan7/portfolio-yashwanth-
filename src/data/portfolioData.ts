export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Backend' | 'Cloud' | 'AI / ML' | 'Full Stack';
  techStack: string[];
  githubUrl: string;
  liveDemoUrl: string;
  demoVideoUrl?: string; // YouTube or MP4 link
  image: string; // Add project image
  screenshots: string[];
  status: 'Production' | 'Active Development' | 'Hackathon Winner' | 'Completed';
  highlights: string[];
  // Replace project comments:
  // Upload project image here
  // Add project video here
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Hackathons' | 'Cloud' | 'AI' | 'Programming' | 'Competitive Coding';
  thumbnail: string;
  credentialUrl: string;
  downloadUrl?: string;
  // Upload certificate here
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  type: 'Award' | 'Hackathon' | 'Competition' | 'Recognition';
  description: string;
  image?: string;
  // Upload award image here
}

export interface TechItem {
  name: string;
  category: 'Backend' | 'Frontend' | 'AI' | 'Cloud' | 'DevOps' | 'Database' | 'Programming Languages' | 'Tools';
  icon: string;
  level: string; // e.g. 'Advanced', 'Proficient', 'Experienced'
  experience: string; // e.g. '2+ Years', 'Built Production API'
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Awards' | 'Speaking' | 'Winning Moments';
  image: string;
  date: string;
  description: string;
  // Upload photo here
}

export const PERSONAL_INFO = {
  name: "Yashwanth S N",
  roles: ["Backend Engineer", "Cloud Native Developer", "AI Enthusiast"],
  tagline: "I build scalable backend systems, cloud-native applications and AI-powered products.",
  bio: "Computer & Communication Engineering student with a core focus on high-throughput backend architecture, resilient cloud infrastructure, and intelligent AI system integration.",
  email: "yashwanth.gowda.sn7@gmail.com",
  phone: "+91 8310033121",
  location: "Bangalore, India",
  degree: "B.E. Computer & Communication Engineering (KSIT)",
  github: "https://github.com/yashwan7",
  leetcode: "https://leetcode.com/u/yashwanth_sn/",
  linkedin: "https://www.linkedin.com/in/yashwanthgowdasn",
  instagram: "https://www.instagram.com/yashwanth_sn777/",
  twitter: "https://x.com/yashwanth07_02",
  resumeUrl: "/resume.pdf",
};

export const STATS = [
  { id: 1, label: "LeetCode Solved", value: 100, suffix: "+", highlight: "Problem Solving" },
  { id: 2, label: "EcoSpark 2026", value: 3, suffix: "rd Place", highlight: "Hackathon Podia" },
  { id: 3, label: "GDG TechSprint", value: 10, suffix: " Top", highlight: "National Rank" },
  { id: 4, label: "Suzlon Award", value: 2026, suffix: " Winner", highlight: "Young Brilliance" },
  { id: 5, label: "GitHub Repos", value: 15, suffix: "+", highlight: "Open Source" },
  { id: 6, label: "Academic CGPA", value: 8.52, suffix: "/10", isDecimal: true, highlight: "Engineering Excellence" },
];

export const TECH_STACK: TechItem[] = [
  // Backend
  { name: "Java", category: "Programming Languages", icon: "SiOpenjdk", level: "Advanced", experience: "Core OOP, Concurrency & High Performance Architecture" },
  { name: "Python", category: "Programming Languages", icon: "SiPython", level: "Advanced", experience: "AI Pipeline scripting, Data Processing & FastAPI" },
  { name: "JavaScript", category: "Programming Languages", icon: "SiJavascript", level: "Proficient", experience: "ES6+, Async I/O, Node & Frontend Logic" },
  { name: "SQL", category: "Programming Languages", icon: "SiPostgresql", level: "Advanced", experience: "Complex Queries, Indexing & Performance Tuning" },
  
  { name: "Spring Boot", category: "Backend", icon: "SiSpringboot", level: "Advanced", experience: "Enterprise Microservices, REST APIs & Security" },
  { name: "Spring Cloud Gateway", category: "Backend", icon: "SiSpring", level: "Advanced", experience: "Rate limiting, Circuit Breaking & Service Routing" },
  { name: "FastAPI / Node.js", category: "Backend", icon: "SiFastapi", level: "Proficient", experience: "High concurrency microservices & WebSockets" },

  // AI
  { name: "LangChain", category: "AI", icon: "SiLangchain", level: "Proficient", experience: "LLM Agentic workflows & Vector DB integration" },
  { name: "RAG & Vector DBs", category: "AI", icon: "SiOpenai", level: "Proficient", experience: "ChromaDB, Pinecone, Hybrid Search & Embeddings" },
  { name: "PyTorch / ML", category: "AI", icon: "SiPytorch", level: "Intermediate", experience: "Fine-tuning models & Predictive Analytics" },

  // Cloud & DevOps
  { name: "Docker", category: "DevOps", icon: "SiDocker", level: "Advanced", experience: "Multi-stage builds, Containerization & Orchestration" },
  { name: "Kubernetes", category: "Cloud", icon: "SiKubernetes", level: "Proficient", experience: "Cluster management, Helm charts & Ingress Routing" },
  { name: "Git", category: "Tools", icon: "SiGit", level: "Advanced", experience: "Branching strategies, Actions & CI/CD Pipelines" },
  { name: "Linux / Unix", category: "Tools", icon: "SiLinux", level: "Advanced", experience: "Shell scripting, System Performance & Server Admin" },

  // Databases
  { name: "Redis", category: "Database", icon: "SiRedis", level: "Advanced", experience: "Caching, Pub/Sub, Distributed Locking & Rate Limiting" },
  { name: "MongoDB", category: "Database", icon: "SiMongodb", level: "Proficient", experience: "Document modeling, Aggregations & Clustering" },
  { name: "MySQL / PostgreSQL", category: "Database", icon: "SiMysql", level: "Advanced", experience: "Schema design, Transactions & ACID compliance" },

  // Frontend
  { name: "React.js", category: "Frontend", icon: "SiReact", level: "Proficient", experience: "State management, Tailwind CSS & Framer Motion" },
  { name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss", level: "Advanced", experience: "Responsive glassmorphism & Modern UI Design Systems" },
];

export const PROJECTS: Project[] = [
  {
    id: "cloud-native-gateway",
    title: "Cloud Native API Gateway",
    shortDescription: "Secure, scalable, and observable cloud native API Gateway platform to manage, secure, and route microservices with ease.",
    fullDescription: "Architected an enterprise-grade Cloud Native API Gateway platform built on Spring Cloud Gateway, Reactive Netty, Redis, and Kubernetes. Features JWT/RBAC authentication, Redis rate limiting, dynamic routing & load balancing, circuit breaking, and full distributed tracing & observability with Prometheus, Grafana, and Jaeger.",
    category: "Cloud",
    techStack: ["Spring Cloud Gateway", "Redis", "Kubernetes", "Kafka", "Prometheus", "Grafana", "Jaeger"],
    githubUrl: "https://github.com/yashwan7/cloud-native-api-gateway",
    liveDemoUrl: "https://github.com/yashwan7/cloud-native-api-gateway",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    image: "/images/api-gateway-cover.jpg",
    screenshots: [
      "/images/api-gateway-cover.jpg"
    ],
    status: "Production",
    highlights: [
      "JWT / RBAC Authentication & Authorization security layer",
      "Redis sliding-window rate limiting & distributed caching",
      "Circuit breaking resilience & dynamic microservice route load balancing",
      "Full observability with Prometheus, Grafana & Jaeger distributed tracing"
    ]
  },
  {
    id: "persistent-memory-ai",
    title: "Persistent Memory AI Assistant",
    shortDescription: "An AI assistant that remembers your conversations across sessions using LangChain, ChromaDB RAG, and Gemini/OpenAI APIs.",
    fullDescription: "Engineered an intelligent AI assistant that remembers conversations across multiple sessions and devices. Built with Python, FastAPI, LangChain orchestration, ChromaDB vector store, RAG context retrieval, and Gemini/OpenAI APIs to deliver contextual, intelligent, and persistent conversations containerized in Docker.",
    category: "AI / ML",
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "RAG", "Gemini API", "OpenAI API", "Docker"],
    githubUrl: "https://github.com/yashwan7/persistent-memory-ai-contextual-assistant",
    liveDemoUrl: "https://github.com/yashwan7/persistent-memory-ai-contextual-assistant",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    image: "/images/persistent-memory-ai-cover.jpg",
    screenshots: [
      "/images/persistent-memory-ai-cover.jpg"
    ],
    status: "Active Development",
    highlights: [
      "Persistent Memory across multiple sessions and devices",
      "Semantic Search using embeddings & ChromaDB vector store",
      "RAG Powered knowledge retrieval & context-aware answers",
      "Dockerized deployment with Gemini / OpenAI API integration"
    ]
  },
  {
    id: "ecosync-ai",
    title: "EcoSync AI — Smart Composting Platform",
    shortDescription: "IoT + AI based smart composting platform that monitors waste, predicts compost readiness, and helps build a sustainable future.",
    fullDescription: "EcoSync AI won 3rd Place at EcoSpark 2026. It pairs ESP32 sensor hardware with a React.js frontend, Spring Boot backend, MySQL, and Gemini API intelligence to monitor compost status, temperature, moisture, and gas levels in real-time while predicting compost readiness.",
    category: "AI / ML",
    techStack: ["ESP32", "React.js", "Spring Boot", "MySQL", "Gemini API", "Python"],
    githubUrl: "https://github.com/yashwan7/EcoSync-AI",
    liveDemoUrl: "https://github.com/yashwan7/EcoSync-AI",
    demoVideoUrl: "https://youtu.be/OuUeNGgdDLM",
    image: "/images/ecosync-cover.jpg",
    screenshots: [
      "/images/ecosync-cover.jpg",
      "/images/cert-ecospark.png"
    ],
    status: "Hackathon Winner",
    highlights: [
      "3rd Place Winner at EcoSpark 2026 Hackathon",
      "Real-time Temperature, Moisture & Gas telemetry monitoring",
      "AI compost readiness prediction powered by Gemini API",
      "Live hardware sensor OLED & dashboard visualization"
    ]
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-suzlon",
    title: "Suzlon Young Brilliance National Award 2026",
    issuer: "Suzlon Group (The Wind Man Shri Tulsi Tanti Awards)",
    date: "Feb 2026",
    category: "Hackathons",
    thumbnail: "/images/cert-suzlon.png",
    credentialUrl: "https://www.linkedin.com/posts/yashwanthgowdasn_pune-suzlon-pune-ugcPost-7449179125510193152-iYuD/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyQEkQBSJNZwSE70FSJYOewImmJ5FfTVe0",
  },
  {
    id: "cert-ecospark",
    title: "3rd Place Podium Winner — EcoSpark 2026",
    issuer: "KSIT Department of ECE & IEEE Bangalore",
    date: "April 2026",
    category: "Hackathons",
    thumbnail: "/images/cert-ecospark.png",
    credentialUrl: "https://www.linkedin.com/posts/yashwanthgowdasn_iot-esp32-innovation-ugcPost-7449174539848142848-yfiO/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyQEkQBSJNZwSE70FSJYOewImmJ5FfTVe0",
  },
  {
    id: "cert-gdg",
    title: "Top 10 Finalist — GDG TechSprint Hackathon",
    issuer: "Google Developer Groups (GDG) On Campus RV University",
    date: "2025",
    category: "Hackathons",
    thumbnail: "/images/cert-gdg.png",
    credentialUrl: "https://www.linkedin.com/posts/yashwanthgowdasn_ai-hackathon-gdg-ugcPost-7487487333701693442-qIt8/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyQEkQBSJNZwSE70FSJYOewImmJ5FfTVe0",
  },
  {
    id: "cert-impetus",
    title: "IMPETUS 26.0 — Mock Placements Participation",
    issuer: "IEEE UVCE & Powered by HAL (26th Annual National Tech Extravaganza)",
    date: "March 2026",
    category: "Competitive Coding",
    thumbnail: "/images/cert-impetus.png",
    credentialUrl: "https://www.linkedin.com/posts/yashwanthgowdasn_impetus-260-mock-placement-participant-share-7451648726349299712-3Ztk/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyQEkQBSJNZwSE70FSJYOewImmJ5FfTVe0",
  },
  {
    id: "cert-kalpavikas",
    title: "Kalpavikas 1.0 — Ideathon Participation",
    issuer: "RV University (School of Computer Science & Engineering)",
    date: "Oct 2025",
    category: "Hackathons",
    thumbnail: "/images/cert-kalpavikas.png",
    credentialUrl: "https://www.linkedin.com/posts/yashwanthgowdasn_ideathon-innovation-engineering-share-7451657409984507906-VEAJ/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyQEkQBSJNZwSE70FSJYOewImmJ5FfTVe0",
  },
  {
    id: "cert-leetcode-100",
    title: "100+ LeetCode Milestone & Contest Rating",
    issuer: "LeetCode",
    date: "2026",
    category: "Competitive Coding",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    credentialUrl: "https://leetcode.com/u/yashwanth_sn/",
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Suzlon Young Brilliance National Award 2026",
    subtitle: "National Winner (₹15,000 Cash Prize)",
    organization: "Suzlon Energy Group",
    date: "2026",
    type: "Award",
    description: "Awarded top national honor and ₹15,000 cash prize for outstanding engineering innovation, sustainable system design, and technical excellence.",
    image: "/images/stage-suzlon.jpg"
  },
  {
    id: "ach-2",
    title: "3rd Place — EcoSpark 2026 Hackathon",
    subtitle: "National Sustainability Ideathon",
    organization: "KSIT & IEEE Bangalore Section",
    date: "2026",
    type: "Hackathon",
    description: "Secured 3rd place out of competing teams by engineering EcoSync AI, an intelligent ML grid power optimization platform.",
    image: "/images/cert-ecospark.png"
  },
  {
    id: "ach-3",
    title: "Top 10 Rank — GDG TechSprint 2025",
    subtitle: "Google Developer Groups Hackathon",
    organization: "GDG On Campus RV University",
    date: "2025",
    type: "Competition",
    description: "Ranked in the top 10 finalists nationwide for building cloud-native infrastructure tooling and resilient microservice backend systems.",
    image: "/images/cert-gdg.png"
  },
  {
    id: "ach-4",
    title: "100+ LeetCode Solved & Algorithmic Proficiency",
    subtitle: "Data Structures & Algorithms",
    organization: "LeetCode",
    date: "Continuous",
    type: "Recognition",
    description: "Consistently solved complex algorithmic challenges spanning Dynamic Programming, Graph Theory, and Distributed Systems.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  }
];

export const GALLERY_ITEMS: PhotoGalleryItem[] = [
  {
    id: "gal-1",
    title: "Suzlon Young Brilliance 2026 Stage Award Ceremony",
    category: "Winning Moments",
    image: "/images/stage-suzlon.jpg",
    date: "2026",
    description: "Receiving the Suzlon Young Brilliance Award trophy & ₹15,000 cash prize on stage during the grand finale ceremony."
  },
  {
    id: "gal-2",
    title: "Suzlon Young Brilliance National Certificate",
    category: "Awards",
    image: "/images/cert-suzlon.png",
    date: "Feb 2026",
    description: "Official Suzlon Young Brilliance Award Certificate presented by Chairman & Managing Director Vinod Tanti."
  },
  {
    id: "gal-3",
    title: "EcoSpark 2026 3rd Place Certificate",
    category: "Hackathons",
    image: "/images/cert-ecospark.png",
    date: "April 2026",
    description: "Certificate of Achievement for securing 3rd Place in 5 Hrs Ideathon at EcoSpark 2026 organized by KSIT ECE & IEEE."
  },
  {
    id: "gal-4",
    title: "GDG TechSprint Hackathon Top 10 Certificate",
    category: "Hackathons",
    image: "/images/cert-gdg.png",
    date: "2025",
    description: "Certificate of Merit for Top 10 Finalist placement at TechSprint Hackathon organized by GDG On Campus RV University."
  }
];
