import React from 'react';

export default function Link({
  to,
  children,
  autoAddBaseUrl,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  autoAddBaseUrl?: boolean;
}) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}
