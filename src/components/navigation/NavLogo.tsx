import Link from 'next/link';
import Logo from '../Logo';

export default function NavLogo() {
  return (
    <Link 
      href="/" 
      className="inline-block transition-transform duration-300 hover:translate-x-1"
    >
      <Logo />
    </Link>
  );
}