import React from 'react'
import Link from 'next/link'
// import { ThemeSwitcher } from './ThemeSwitcher'

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-primary-200 transition-colors">
          <span className="text-primary-200">Data</span>Duck
        </Link>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><NavLink href="/upload">Upload</NavLink></li>
            <li><NavLink href="/analyze">Analyze</NavLink></li>
            <li><NavLink href="/documents">Documents</NavLink></li>
          </ul>
          {/* <ThemeSwitcher /> */}
        </div>
      </nav>
    </header>
  )
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="hover:text-primary-200 transition-colors font-medium text-sm uppercase tracking-wider">
    {children}
  </Link>
)

export default Header