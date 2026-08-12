const profileLinks = {
  email: "mailto:enriquehmsb@gmail.com",
  github: "https://github.com/EnriqueHernandezM",
  linkedin: "https://www.linkedin.com/in/enrique-hernandez-684a2323a",
};

const homeIntro = {
  role: "Backend Engineer",
  title:
    "Construyo sistemas backend para productos reales: pagos, automatizacion, integraciones y plataformas multitenant.",
  stack: ["Node.js", "TypeScript", "NestJS"],
  links: [
    {
      label: "LinkedIn",
      href: profileLinks.linkedin,
      kind: "primary",
    },
    {
      label: "GitHub",
      href: profileLinks.github,
      kind: "secondary",
    },
  ],
};

const knowMeCopy = {
  en: {
    greeting: "Hi, I'm Enrique",

    sections: [
      {
        id: "about",
        title: "About me",
        content:
          "I'm a Backend Engineer focused on building real-world systems with Node.js, TypeScript and NestJS. I started by developing complete applications from frontend to deployment, which gave me a broad view of how products come together, but over time I found my strongest interest on the backend.",
      },
      {
        id: "experience",
        title: "Experience",
        content:
          "Today I work on production systems involving payments, transactional flows, multitenant architectures, external integrations, notifications and security. I also continue building independent projects where I can take ideas from an initial requirement to a working product.",
      },
      {
        id: "approach",
        title: "How I work",
        content:
          "I enjoy understanding the problem before choosing the technology. I care about maintainability, traceability and building systems that remain understandable as they grow.",
      },
    ],

    closing:
      "This portfolio is part of that evolution: it started as a learning project and I now use it to show not only what I build, but how I approach engineering problems.",
  },

  es: {
    greeting: "Hola, soy Enrique",

    sections: [
      {
        id: "about",
        title: "Sobre mí",
        content:
          "Soy Backend Engineer enfocado en construir sistemas reales con Node.js, TypeScript y NestJS. Comencé desarrollando aplicaciones completas, desde la interfaz hasta el despliegue, lo que me dio una visión amplia de cómo se construye un producto; con el tiempo encontré mi mayor interés en el backend.",
      },
      {
        id: "experience",
        title: "Experiencia",
        content:
          "Actualmente trabajo con sistemas en producción que incluyen pagos, flujos transaccionales, arquitecturas multitenant, integraciones externas, notificaciones y seguridad. También continúo desarrollando proyectos independientes donde puedo llevar una idea desde sus requerimientos hasta un producto funcional.",
      },
      {
        id: "approach",
        title: "Cómo trabajo",
        content:
          "Me interesa entender el problema antes de elegir la tecnología. Busco construir sistemas mantenibles, trazables y que sigan siendo comprensibles conforme crecen.",
      },
    ],

    closing:
      "Este portafolio también forma parte de esa evolución: comenzó como un proyecto de aprendizaje y hoy lo utilizo para mostrar no solo lo que construyo, sino cómo abordo los problemas de ingeniería.",
  },
};

const profileContact = {
  title: "Contact me I think I can contribute to your team",
  emailLabel: "enriquehmsb@gmail.com ",
  emailHref: profileLinks.email,
};

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: profileLinks.github,
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profileLinks.linkedin,
    icon: "linkedin",
  },
];

export {
  profileLinks,
  homeIntro,
  knowMeCopy,
  profileContact,
  socialLinks,
};
