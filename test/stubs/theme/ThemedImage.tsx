import React from 'react';

export default function ThemedImage({
  alt,
  className,
  sources,
}: {
  alt: string;
  className?: string;
  sources: { light: string; dark: string };
}) {
  return (
    <img
      alt={alt}
      className={className}
      data-light-src={sources.light}
      data-dark-src={sources.dark}
    />
  );
}
