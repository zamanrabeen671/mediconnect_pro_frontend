"use client"

import type { ReactNode } from "react"
import { FiMenu, FiX, FiLogOut } from "react-icons/fi"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { logout } from "../../store/slices/auth-slice"
import { Link, useLocation } from "react-router"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl font-semibold text-foreground">MediConnect Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to={`/${user?.role}`}
                  className="hidden text-sm font-medium text-foreground transition-colors hover:text-primary lg:block"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-4 lg:flex">
                <Link
                  to="/sign-in"
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button type="button" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6 text-foreground" />
              ) : (
                <FiMenu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 border-t border-border px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to={`/${user?.role}`}
                    className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-md bg-destructive px-3 py-2 text-base font-medium text-destructive-foreground"
                  >
                    <FiLogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="block rounded-md bg-primary px-3 py-2 text-base font-medium text-primary-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xl font-bold text-primary-foreground">M</span>
                </div>
                <span className="text-xl font-semibold text-foreground">MediConnect Pro</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Connecting patients with healthcare professionals for better health outcomes.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MediConnect Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
