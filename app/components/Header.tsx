'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Header() {
    const pathname = usePathname()

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/students', label: 'Students' },
        { href: '/schedule', label: 'Schedule' }
    ]

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname?.startsWith(href)
    }

    const getLinkClasses = (href: string) => {
        const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors"
        const activeClasses = "text-blue-600 bg-blue-50"
        const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        
        return `${baseClasses} ${isActive(href) ? activeClasses : inactiveClasses}`
    }

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        Tutor App
                    </Link>

                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={getLinkClasses(link.href)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}