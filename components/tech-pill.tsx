import React from "react";
import { 
  SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiTailwindcss,SiMongoose,SiGooglegemini,SiTrpc,
  SiPython, SiNodedotjs, SiMongodb, SiPostgresql, SiDocker,SiMysql,
  SiCplusplus, SiGit, SiClerk, SiPrisma, SiOpenai, SiAuthentik,
  SiFramer, SiStripe, SiFirebase, SiSupabase, SiExpress,SiDrizzle,SiApachemaven,SiCloudinary,SiCodesandbox
} from "react-icons/si";
import { Hash } from "lucide-react"; 
import { FaGithub } from "react-icons/fa";
import { FaJava } from "react-icons/fa6";


const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  "Next.js": { icon: SiNextdotjs, color: "default" }, 
  "React": { icon: SiReact, color: "#61DAFB" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Prisma": { icon: SiPrisma, color: "default" },
  "Clerk": { icon: SiClerk, color: "#6C47FF" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "Java": { icon: FaJava, color: "#007396" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "Git": { icon: SiGit, color: "#F05032" },
  "OpenAI": { icon: SiOpenai, color: "#412991" },
  "Framer Motion": { icon: SiFramer, color: "default" },
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Express": { icon: SiExpress, color: "default" },
  "Drizzle": { icon: SiDrizzle, color: "#00FF00" },
  "Maven": { icon: SiApachemaven, color: "#F05032" },
  "Cloudinary": { icon: SiCloudinary, color: "#0000FF" },
  "Mongoose": { icon: SiMongoose, color: "#F05032" },
  "Generative AI": { icon: SiGooglegemini, color: "#4169E1" },
  "Better Auth": { icon: SiAuthentik, color: "default" },
  "tRPC": { icon: SiTrpc, color: "#06B6D4" },
  "E2B": { icon: SiCodesandbox, color: "default" },
  "Github": {icon: FaGithub, color: "default"},
  "MySQL": {icon: SiMysql, color: "#F05032"}
};

interface TechPillProps {
  tag: string;
  className?: string;
}

export function TechPill({ tag, className }: TechPillProps) {
  
  const tech = iconMap[tag];
  
  const Icon = tech ? tech.icon : Hash;
  const color = tech ? tech.color : "default";

  return (
    <div 
      className={`
        group inline-flex items-center gap-1.5 px-2.5 py-1 
        rounded-md bg-secondary/50 border border-border/50 
        hover:bg-secondary hover:border-primary/30 
        transition-all duration-300 cursor-default select-none
        ${className}
      `}
    >
      <Icon 
        className="w-3.5 h-3.5 transition-transform group-hover:scale-110" 
        style={{ 
           color: color === "default" ? "currentColor" : color 
        }}
      />
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {tag}
      </span>
    </div>
  );
}