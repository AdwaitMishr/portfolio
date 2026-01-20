"use client";

import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    const getSubtitle = () => {
        switch (pathname) {
            case "/":
                return "Last updated: January xx, 2026";
            case "/projects":
                return "Projects";
            case "/skills":
                return "Skills";
            case "/coding":
                return "Coding";
            case "/contact":
                return "Contact";
            default:
                return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
        }
    };

    return (
        <header className="pt-16 pb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">
                Adwait Mishra
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
                {getSubtitle()}
            </p>
        </header>
    );
}