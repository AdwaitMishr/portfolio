import { PopCard } from "@/components/pop-card";
import { TechPill } from "@/components/tech-pill";
import { projects } from "@/data/projects"; 
const skills = [
  // Frontend & Core
  "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS",
  
  // Backend & Server
  "Node.js", "Express", 
  
  // Database & ORM
  "PostgreSQL", "MongoDB", "MySQL", "Prisma", "Drizzle",
  
  // Services (Auth/Media)
  "Better Auth", "Clerk", "Cloudinary",
  
  // DevOps & Tools
  "Docker", "Git", "Github",
  
  // General Programming Languages
  "Python", "Java", "C++"
];
export default function Project() {
    return(
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-semibold text-primary mb-8">
                    All Projects
                </h2>
                <div className="grid gap-4 mb-16">
                    {projects.map((project, index) => (
                        <PopCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                <h2 className="text-2xl font-semibold text-primary mb-8">
                    Technologies & Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <TechPill
                            key={skill} 
                            tag={skill}
                            className="text-sm px-4 py-2 rounded-full"
                        />
                    ))}
                    
                </div>
            </div>
        </main>
    )
}