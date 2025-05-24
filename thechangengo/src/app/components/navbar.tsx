import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-between items-center bg-white px-6 py-4 shadow-sm">
      <div className="mb-4 sm:mb-0">
        <Image 
          src="/logo.webp" 
          alt="logo" 
          width={120} 
          height={60}
          className="hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <NavLink href="/donate" accent>Donate</NavLink>
        <NavLink href="/volunteer" accent>Volunteer</NavLink>
        <NavLink href="/login">Login</NavLink>
      </div>
    </nav>
  );
}

// Reusable NavLink component for consistent styling
function NavLink({ href, children, accent = false }: { href: string, children: React.ReactNode, accent?: boolean }) {
  return (
    <Link
      href={href}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${accent ? 
          'bg-teal-600 text-white hover:bg-teal-700 shadow-md' : 
          'text-slate-700 hover:text-teal-800 hover:bg-aliceblue-200'
        }
      `}
    >
      {children}
    </Link>
  );
}