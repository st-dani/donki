import { ReactNode } from 'react';
import { metadata } from './metadata';

export { metadata };

export default function ServiceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
