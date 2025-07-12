"use client"
import { Typography } from "@/components/ui/typography"

export function Footer({ sticky }: { sticky?: boolean }) {
    return (
        <footer className={`${sticky ? "sticky bottom-0 w-full z-40" : "w-full z-40"} bg-transparent backdrop-blur-none`}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-center mb-3">
                    <Typography variant={"muted"} className="font-medium text-[9px] md:text-[11px] rounded-lg px-3 py-1 backdrop-blur-md border border-border">
                        MusiChar 網站使用 
                        <a href="https://react.dev/">React</a>, 
                        <a href="https://ui.shadcn.com/">Shadcn UI</a>, 
                        <a href="https://tailwindcss.com/">TailwindCSS</a>, 
                        <a href="https://vitejs.dev/">Vite</a>, 和 
                        <a href="https://www.typescriptlang.org/">TypeScript</a> 建立.
                    </Typography>
                </div>
            </div>
        </footer>
    )
}