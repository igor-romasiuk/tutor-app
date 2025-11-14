'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Calendar, Users, Home } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

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
    const active = "text-primary bg-primary/10 dark:text-primary dark:bg-primary/20"
    const inactive = "text-muted-foreground hover:text-primary hover:bg-primary/5 dark:text-muted-foreground dark:hover:text-primary dark:hover:bg-primary/10"
    return `${base} ${isActive(href) ? active : inactive}`
  }

  return (
    <header className="sticky top-0 z-30 bg-background/90 dark:bg-background/90 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Tutor<span className="text-primary">App</span>
        </Link>

        <nav className="flex items-center gap-3">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={getLinkClasses(href)}>
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
