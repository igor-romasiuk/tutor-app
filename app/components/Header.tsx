'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Calendar, Users, Home } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/students', label: 'Students', icon: Users },
    { href: '/calendar', label: 'Calendar', icon: Calendar }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  const getLinkClasses = (href: string) => {
    const base = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    const active = "text-blue-600 bg-blue-50"
    const inactive = "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    return `${base} ${isActive(href) ? active : inactive}`
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* ЛОГО */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
        >
          Tutor<span className="text-blue-600">App</span>
        </Link>

        {/* НАВІГАЦІЯ */}
        <nav className="flex items-center gap-3">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={getLinkClasses(href)}>
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
