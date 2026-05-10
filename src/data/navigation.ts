export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/explorations', label: 'Explorations' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];

export const socialLinks: SocialLink[] = [
  { href: 'mailto:phatjam98@gmail.com', label: 'EMAIL' },
  { href: 'https://github.com/phatjam98', label: 'GITHUB', external: true },
  { href: 'https://www.linkedin.com/in/travis-carter/', label: 'LINKEDIN', external: true },
  { href: '/rss.xml', label: 'RSS' },
];
