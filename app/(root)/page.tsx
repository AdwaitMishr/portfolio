import Link from "next/link";
import { Download } from "lucide-react";
import { projects } from "@/data/projects";
import { PopCard } from "@/components/pop-card";

export default function Home() {
    const featuredProjects = projects.slice(0,2);
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <section className="mb-16">
                    <p className="text-lg text-primary mb-4">
                        Adwait / CSE Undergrad @ VIT Chennai
                    </p>
                    <p className="text-muted-foreground mb-4">
                        Full-stack developer. Competitive programmer.
                    </p>
                    <p className="text-muted-foreground">
                        I use Next.js, TypeScript, and Cloud-native tools to build software that works. Focused on writing maintainable code and solving hard problems.
                    </p>
                </section>
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-primary">
                            Featured Projects
                        </h2>
                        <Link
                        href="/projects"
                        prefetch={true}
                        className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors">
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {featuredProjects.map((project,index) => (
                            <PopCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </section>
                <section className="text-center py-8 border-t border-border">
                    <a
                    href="https://drive.google.com/file/d/1cZWuqfSVMQPGjjxIsQprA-fj9Q3foBbW/view?usp=drive_link"
                    download
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-seconday border border-border text-primary hover:border-muted-foreground/50 transition-all"
                    >
                        <Download size={18} />
                        Resume 
                    </a>
                </section>
            </div>
        </main>
    )
}