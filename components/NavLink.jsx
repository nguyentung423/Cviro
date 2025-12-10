'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, className, activeClassName, children, ...props }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const finalClassName = typeof className === 'function' 
    ? className({ isActive })
    : `${className || ''} ${isActive && activeClassName ? activeClassName : ''}`;

  return (
    <Link href={href} className={finalClassName} {...props}>
      {children}
    </Link>
  );
}
