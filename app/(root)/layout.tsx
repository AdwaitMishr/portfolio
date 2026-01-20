import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";

export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
            <Header />
            <Navbar />

            <main className="w-full max-w-2xl px-4 py-8 md:py-12">
                {children}
            </main>
        </div>
    )
}