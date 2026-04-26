import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../store/cartStore';

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/catalog', label: 'Shop' },
    { to: '/configurator', label: 'Configurator' },
    { to: '/quote', label: 'Quote' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#2D6A4F] tracking-tight">
          Kubico
        </Link>
        <nav className="hidden md:flex gap-8" aria-label="Main navigation">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-medium transition-colors text-sm ${isActive ? 'text-[#2D6A4F]' : 'text-[#374151] hover:text-[#2D6A4F]'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] rounded-md text-[#374151] hover:text-[#2D6A4F] transition-colors"
            aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#8B5E3C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] rounded-md text-[#374151]"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              {open
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4" aria-label="Mobile navigation">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-medium text-base ${isActive ? 'text-[#2D6A4F]' : 'text-[#374151]'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `font-medium text-base ${isActive ? 'text-[#2D6A4F]' : 'text-[#374151]'}`
            }
          >
            Cart{totalItems > 0 && (
              <span className="ml-2 bg-[#8B5E3C] text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      )}
    </header>
  );
}
