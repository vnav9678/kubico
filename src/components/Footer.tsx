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
              Jardineras modulares fabricadas con madera de origen sostenible.
              Cultiva tu mundo, bloque a bloque.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Tienda</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/catalog?category=Camas+de+cultivo" className="hover:text-white transition-colors">Camas de cultivo</Link></li>
              <li><Link to="/catalog?category=Jardineras+de+pared" className="hover:text-white transition-colors">Jardineras de pared</Link></li>
              <li><Link to="/catalog?category=Unidades+de+esquina" className="hover:text-white transition-colors">Unidades de esquina</Link></li>
              <li><Link to="/catalog?category=Accesorios" className="hover:text-white transition-colors">Accesorios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Ayuda</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/configurator" className="hover:text-white transition-colors">Diseña tu jardinera</Link></li>
              <li><Link to="/quote" className="hover:text-white transition-colors">Obtener presupuesto</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Tu carrito</Link></li>
              <li><a href="mailto:hello@kubico.com" className="hover:text-white transition-colors">Contáctanos</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-300">
          <p>© {year} Kubico. Todos los derechos reservados.</p>
          <p>Madera sostenible &middot; Entrega con huella de carbono cero &middot; Hecho con cuidado</p>
        </div>
      </div>
    </footer>
  );
}
