import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1B4332] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight block mb-3">
              Kubico
            </Link>
            <p className="text-green-200 text-sm leading-relaxed max-w-xs">
              Modular garden planters crafted from sustainably sourced timber.
              Grow your world, block by block.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/catalog?category=Raised+Beds" className="hover:text-white transition-colors">Raised Beds</Link></li>
              <li><Link to="/catalog?category=Wall+Planters" className="hover:text-white transition-colors">Wall Planters</Link></li>
              <li><Link to="/catalog?category=Corner+Units" className="hover:text-white transition-colors">Corner Units</Link></li>
              <li><Link to="/catalog?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Help</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/configurator" className="hover:text-white transition-colors">Build Your Planter</Link></li>
              <li><Link to="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Your Cart</Link></li>
              <li><a href="mailto:hello@kubico.com" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-300">
          <p>© {year} Kubico. All rights reserved.</p>
          <p>Sustainably sourced &middot; Carbon neutral delivery &middot; Made with care</p>
        </div>
      </div>
    </footer>
  );
}
