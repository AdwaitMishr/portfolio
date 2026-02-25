import { MapPin, Mail, Github, Linkedin } from "lucide-react";
import { SiCodeforces } from "react-icons/si";
import { SpotifyVinyl } from "@/components/spotify-vinyl";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-2xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-semibold text-primary mb-8">
                    Get in Touch
                </h2>

                <div className="space-y-6">
                    <p className="text-muted-foreground">
                        I&apos;m always open to discussing new projects, creative ideas,
                        or opportunities to be part of your vision.
                    </p>

                    <div className="p-6 rounded-xl bg-card border border-border space-y-4">
                        <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-muted-foreground" />
                            <span className="text-primary">Based in India</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-muted-foreground" />
                            <a
                                href="mailto:mishraadwait456@gmail.com"
                                className="text-primary hover:underline"
                            >
                                mishraadwait456@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="pt-6">
                        <h3 className="text-lg font-medium text-primary mb-4">
                            Connect with me
                        </h3>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/AdwaitMishr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-muted-foreground/50 transition-all"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/adwait7/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-muted-foreground/50 transition-all"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://codeforces.com/profile/monke7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-muted-foreground/50 transition-all"
                            >
                                <SiCodeforces size={20} />
                            </a>

                        </div>
                    </div>

                    {/* Spotify Now Playing */}
                    <div className="pt-4">
                        <SpotifyVinyl />
                    </div>
                </div>
            </div>
        </main>
    );
}
