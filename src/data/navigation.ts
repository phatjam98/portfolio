export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/explorations', label: 'Explorations' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];
