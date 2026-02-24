import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "let-him-code",
    title: "Let Him Code",
    description:
      "AI-native prototyping engine for generating and visualizing sandboxed web applications.",
    longDescription:
      "Engineered a Generative AI platform that synthesizes complex web application structures from natural language. Features a high-performance virtual file system for traversing generated artifacts, immutable syntax-highlighted code visualization, and a sandboxed preview environment. Streamlines the rapid prototyping lifecycle by converting prompts into navigable, deployable codebases.",
    image: "/projects/let-him-code.png",
    tags: ["Next.js", "TypeScript", "Generative AI", "E2B", "Prisma", "Clerk"],
    githubUrl: "https://github.com/AdwaitMishr/letHimCode",
    liveUrl: "https://let-him-code.adwaitmishra.me",
  },
  {
    id: "birbal",
    title: "Birbal",
    description:
      "Multi-model AI chat assistant supporting real-time streaming, smart history grouping, and OAuth authentication.",
    longDescription:
      "Developed a multi-model AI chat interface leveraging the Vercel AI SDK and OpenRouter for real-time, streaming responses with granular control. Engineered a persistent state management system using Zustand to handle chat history with smart temporal grouping (Today, Yesterday). Integrated secure OAuth authentication via Better Auth and type-safe data persistence using Prisma and PostgreSQL.",
    image: "/projects/birbal.png",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Vercel AI SDK",
      "OpenRouter",
      "Prisma",
      "Better Auth",
      "Zustand",
    ],
    githubUrl: "https://github.com/AdwaitMishr/birbal",
    liveUrl: "https://birbal.adwaitmishra.me",
  },
  {
    id: "aura-parking",
    title: "Aura Parking",
    description: "Intelligent, real-time parking spot booking system.",
    longDescription:
      "Parking, Simplified. A comprehensive platform to find, book, and pay for parking spots in seconds. Features real-time availability tracking, secure user authentication, and an intuitive dashboard for managing bookings. Built with the T3 stack for high performance and reliability.",
    image: "/projects/aura-parking.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "Better Auth",
      "PostgreSQL",
      "tRPC",
    ],
    githubUrl: "https://github.com/AdwaitMishr/aura-parking",
    liveUrl: "",
  },
  {
    id: "teletv",
    title: "TeleTV",
    description:
      "A robust YouTube clone platform for video sharing and streaming.",
    longDescription:
      "TeleTV is a full-stack video hosting application that replicates core YouTube features. It utilizes a scalable backend built with Node.js, Express, and MongoDB, handling complex data relationships with Mongoose. The platform supports secure user authentication, video uploads via Cloudinary, and features a responsive, dynamic frontend interface with React.",
    image: "/projects/teletv.png",
    tags: ["React", "Express", "MongoDB", "Node.js", "Cloudinary", "Mongoose"],
    githubUrl: "https://github.com/AdwaitMishr/backend-learning",
    liveUrl: "",
  },
];
