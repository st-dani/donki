import Link from 'next/link';
import Logo from '../Logo';

export default function NavLogo() {
  return (
    <Link 
      href="/" 
      className="group hover:opacity-80 transition-opacity"
    >
      <Logo />
    </Link>
  );
} 