export interface NavItem {
  label: string;
  href: string;
  order: number;
}

export const navItems: NavItem[] = [
  { label: 'Inicio',     href: '/',          order: 1 },
  { label: 'Servicios',  href: '/servicios', order: 2 },
  { label: 'Proyectos',  href: '/proyectos', order: 3 },
  { label: 'Blog',       href: '/blog',      order: 4 },
  { label: 'Contacto',   href: '/contacto',  order: 5 },
];

export function getNavItems(): NavItem[] {
  return [...navItems].sort((a, b) => a.order - b.order);
}
