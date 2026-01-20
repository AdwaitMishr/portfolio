"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sunrise, Sunset } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const navLinks = [
    { href: "/", label: "[h] home", key:"h" },
    { href: "/projects", label: "[p] projects", key:"p" },
    { href: "/stats", label: "[s] stats", key:"s" },
    { href: "/contact", label: "[c] contact", key:"c" },
]

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const link = navLinks.find(k => k.key === e.key.toLowerCase());
            if(link) router.push(link.href);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    },[router]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <nav className="w-full py-4 px-4 ">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-6 border-b border-border pb-4">
        
        <Button
        variant='ghost'
        size='icon'
        onClick={toggleTheme}
        className="relative w-9 h-9 overflow-hidden"
        aria-label="Toggle Theme"
        >
            <Sunset className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"/>
            <Sunrise className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>


        {navLinks.map((link) => (
            <Link
            key={link.href}
            href={link.href}
            prefetch={true}
            className={`text-sm transition-colors duration-300 ${pathname === link.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
            >
                {link.label}
            </Link>
        ))}        
        </div>
        </nav>
    )
}