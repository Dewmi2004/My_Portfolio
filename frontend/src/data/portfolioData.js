export const profile = {
  name: "Imasha Dewmi",
  roles: ["Full-Stack Developer", "AI/ML Engineer", "Software Engineer"],
  tagline:
    "I build scalable web applications and intelligent, data-driven systems — from React interfaces to Spring Boot APIs to trained neural networks.",
  location: "Panadura, Sri Lanka",
  email: "imashadewmi557@gmail.com",
  phone: "+94 77 577 1003",
  linkedin: "https://www.linkedin.com/in/imasha-dewmi-a464212b9",
  github: "https://github.com/Dewmi2004",
  summary:
    "Motivated and self-driven Full-Stack Developer with a solid foundation in designing and building scalable backend systems, RESTful APIs, and web applications. Skilled in Node.js, TypeScript, Express.js, React, and Spring Boot, with a strong understanding of SQL/NoSQL databases. Detail-oriented and analytical, with practical knowledge in Artificial Intelligence and Machine Learning, including data preprocessing, model evaluation, and supervised learning using Python. Passionate about building intelligent, user-centric applications through data-driven approaches and clean, efficient code.",
  cvFile: "/Imasha_Dewmi_CV.pdf",
};

export const skills = {
  Backend: ["Node.js", "TypeScript", "Express.js", "Spring Boot", "REST APIs", "Microservices"],
  Frontend: ["React.js", "React Native", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  Databases: ["MySQL", "MongoDB", "SQL Server", "Firebase"],
  "AI / ML": [
    "Supervised & Unsupervised Learning",
    "Deep Learning",
    "CNN",
    "Neural Networks",
    "LLMs",
    "RAG Systems",
    "Bias Mitigation",
  ],
  Tools: ["Git", "GitHub", "Docker", "Postman", "Figma", "Google Colab", "Kaggle"],
  Languages: ["TypeScript", "JavaScript", "Java", "Python", "C++"],
};

export const softSkills = ["Teamwork", "Leadership", "Problem Solving", "Critical Thinking"];

export const spokenLanguages = [
  { name: "Sinhala", level: "Native" },
  { name: "English", level: "Advanced" },
  { name: "Tamil", level: "Intermediate" },
];

import dewcodeImg from "../assets/projects/dewcode.jpg";
import eventTicketingImg from "../assets/projects/event-ticketing.jpg";
import novaxImg from "../assets/projects/novax.jpg";
import fairvisionImg from "../assets/projects/fairvision.jpg";
import estategoImg from "../assets/projects/estatego.jpg";

export const projects = [
  {
    title: "DewCode — AI-Powered Developer Collaboration Platform",
    image: dewcodeImg,
    description:
      "A full-stack, browser-based IDE combining AI-assisted development, secure Docker execution and real-time collaboration. Built with the Monaco editor, an integrated terminal and multi-language support, with AI code generation, debugging and review powered by locally hosted Ollama models.",
    highlights: [
      "Docker-based sandbox execution with isolated containers and resource limits",
      "JWT authentication with Free/Premium subscription plans via PayHere",
      "Real-time multi-user editing, live cursor tracking and chat over Socket.IO",
    ],
    tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Ollama", "Docker"],
    github: "https://github.com/Dewmi2004/DewCode",
  },
  {
    title: "Smart Event Ticketing & Reservation System",
    image: eventTicketingImg,
    description:
      "A full-stack event management and ticketing system with secure reservations, real-time seat locking, digital QR tickets and refund management, built end-to-end on Spring Boot.",
    highlights: [
      "Temporary seat locking to prevent double bookings",
      "PayHere payment integration with QR-code e-tickets and scanning",
      "JWT-based admin/user roles with a full analytics dashboard",
    ],
    tech: ["Spring Boot", "Spring Security", "JWT", "MySQL", "JavaScript", "PayHere"],
    github: "https://github.com/Dewmi2004/Smart_Event_Ticketing_System",
  },
  {
    title: "NovaX — Credit Card Default Risk Analysis",
    image: novaxImg,
    description:
      "Led a 5-member data science team analyzing 30,000 credit card customer records to identify default-risk patterns and support data-driven lending decisions.",
    highlights: [
      "Built the Business Strategy & API Integration module using external economic indicators",
      "Defined segment-based lending recommendations for four risk tiers",
      "Coordinated methodology, insights and the final presentation as team leader",
    ],
    tech: ["Python", "Pandas", "NumPy", "REST APIs", "SciPy", "Matplotlib", "Seaborn"],
    github: "https://github.com/Dewmi2004/NovaX--Group-project-of-Python-for-DS-AI",
  },
  {
    title: "FairVision — CNN-Based Age Classification & Fairness Audit",
    image: fairvisionImg,
    description:
      "A 9-class age-group classification system built on a custom, VGG-inspired CNN trained from scratch on the FairFace dataset, with demographic fairness evaluation across race and gender.",
    highlights: [
      "58.07% test accuracy across nine age categories",
      "Reduced the race performance gap by 36% using Focal Loss and soft class weighting",
      "Deployed as a Streamlit app with Top-3 predictions and confidence scores",
    ],
    tech: ["Python", "PyTorch", "CNN", "FairFace", "Scikit-learn", "Streamlit"],
    github: "https://github.com/Dewmi2004/FairVision-CNN_Age_Group_Classification_Fairness_Audit",
    link: "https://fairvision-cnnagegroupclassificationfairnessaudit-dzdo3brxbvn6.streamlit.app",
  },
  {
    title: "EstateGo — Real Estate Property Listing Mobile App",
    image: estategoImg,
    description:
      "A cross-platform React Native app for browsing, managing and listing properties, with favorites, payments, maps and multi-language support.",
    highlights: [
      "Property listing, search, filtering, CRUD, favorites and image upload",
      "PayHere payment integration with a simulated checkout flow",
      "Rule-based EstateBot assistant with English / Sinhala / Tamil support",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Express.js"],
    github: "https://github.com/Dewmi2004/EstateGo",
  },
];

export const education = [
  {
    school: "Institute of Software Engineering (IJSE)",
    program: "BSc (Hons) in Software Engineering",
    period: "Aug 2024 – Present",
  },
  {
    school: "Sri Sumangala Girls' School, Panadura",
    program: "G.C.E. Advanced Level — Science Stream (Biology, Chemistry, Physics)",
    period: "2023 (Jan 2024)",
  },
];

export const certifications = [
  { name: "Certified AI & Machine Learning Engineering (CAME)", issuer: "Institute of Software Engineering", year: "In Progress" },
  { name: "Cisco IT Essentials", issuer: "Cisco Networking Academy", year: "2025" },
  { name: "Java Fundamental to Intermediate Course", issuer: "Academy of Future Robotics", year: "2025" },
  { name: "C++ Fundamental to Intermediate Course", issuer: "Academy of Future Robotics", year: "2025" },
];

export const socials = [
  { name: "GitHub", url: "https://github.com/Dewmi2004", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/imasha-dewmi-a464212b9", icon: "linkedin" },
  { name: "Email", url: "mailto:imashadewmi557@gmail.com", icon: "mail" },
];
