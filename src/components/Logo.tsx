import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-2xl font-bold text-primary">돈키호테</span>
      <span className="text-xl font-medium ml-2">푸드트럭</span>
    </Link>
  );
} 