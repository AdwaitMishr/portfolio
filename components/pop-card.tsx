"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "./ui/link-preview";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types";
import { TechPill } from "./tech-pill";

interface PopCardProps {
    project: Project,
    index?: number
}

export function PopCard({project, index = 0}: PopCardProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="w-full p-4"
        >   
            <div className="
                group relative w-full h-full
                transition-all duration-200 ease-out delay-[800ms]
                hover:-translate-y-2 hover:-translate-x-2
                hover:shadow-[8px_8px_0px_0px_hsl(var(--primary))]
                rounded-xl
                
            ">
               
                <div className="
                    relative flex flex-col h-full 
                    bg-card text-card-foreground
                    border border-border/50 rounded-xl
                    transition-colors duration-200 delay-[800ms]
                    group-hover:border-primary
                ">
                    
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-0">
                         {/* Top: Left -> Right */}
                        <span className="absolute top-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 delay-500 ease-linear group-hover:w-full" />
                        
                        {/* Right: Top -> Bottom */}
                        <span className="absolute top-0 right-0 w-0.5 h-0 bg-primary transition-all duration-300 delay-500 ease-linear group-hover:h-full" />
                        
                        {/* Bottom: Right -> Left */}
                        <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-primary transition-all duration-300 delay-500 ease-linear group-hover:w-full" />
                        
                        {/* Left: Bottom -> Top */}
                        <span className="absolute bottom-0 left-0 w-0.5 h-0 bg-primary transition-all duration-300 delay-500 ease-linear group-hover:h-full" />
                    </div>


                    
                    <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                        
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold font-serif tracking-tight text-foreground transition-colors delay-[800ms] group-hover:text-primary">
                                {project.title}
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <TechPill key={tag} tag={tag} />
                            ))}
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {project.description}
                        </p>

                       
                        <div className="flex items-center gap-6 pt-4 border-t border-border/40">
                            {project.githubUrl && (
                                <LinkPreview
                                    url={project.githubUrl}
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group-hover:text-primary"
                                >
                                    <Github size={16} />
                                    <span className="underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-primary">
                                        Source
                                    </span>
                                </LinkPreview>
                            )}
                            {project.liveUrl && (
                                <LinkPreview 
                                    url={project.liveUrl}
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group-hover:text-primary"
                                >
                                    <ExternalLink size={16} />
                                    <span className="underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-primary">
                                        Live Demo
                                    </span>
                                </LinkPreview>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}