import React from 'react';

export default function Link({
  to,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}
