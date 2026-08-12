import logoFirebase from "../icons/logoFirebase.png";
import logoSql from "../icons/sqlLogo.png";

const skillsIntro = {
  eyebrow: "Skills",
  title: "Backend-focused stack",
  description:
    "Tecnologias y herramientas que utilizo para construir APIs, sistemas transaccionales, automatizaciones e integraciones.",
};

const skillGroups = [
  {
    id: "backend",
    title: "Core Backend",
    description: "Tecnologias principales para construccion de APIs y servicios.",
    skills: [
      { name: "Node.js", shortName: "Node", featured: true },
      { name: "TypeScript", shortName: "TS", featured: true },
      { name: "NestJS", shortName: "Nest", featured: true },
      { name: "Express", shortName: "Ex" },
    ],
  },
  {
    id: "data",
    title: "Data",
    skills: [
      { name: "MySQL", shortName: "SQL", icon: logoSql },
      { name: "MongoDB", shortName: "MDB" },
      { name: "Firestore", shortName: "FS", icon: logoFirebase },
      { name: "SQLite", shortName: "Lite", icon: logoSql },
    ],
  },
  {
    id: "integrations",
    title: "Integrations & Messaging",
    description: "Sistemas externos, eventos y comunicaciones.",
    skills: [
      { name: "Stripe", shortName: "Pay" },
      { name: "WhatsApp Cloud API", shortName: "WA" },
      { name: "RabbitMQ", shortName: "MQ" },
      { name: "Firebase / FCM", shortName: "FCM", icon: logoFirebase },
      { name: "Cloudinary", shortName: "CDN" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Tools",
    skills: [
      { name: "AWS", shortName: "AWS" },
      { name: "Docker", shortName: "Dc" },
      { name: "Fly.io", shortName: "Fly" },
      { name: "Git", shortName: "Git" },
    ],
  },
];

const backendPractices = [
  "REST APIs",
  "Webhooks",
  "Multitenancy",
  "Transactions",
  "Idempotency",
  "Authentication / JWT",
  "Validation",
  "Async processing",
  "Logging",
  "Error handling",
];

export { skillsIntro, skillGroups, backendPractices };
