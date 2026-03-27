import React from 'react';

export default function Navbar(props: { label?: string }) {
  return <div data-testid="original-navbar">{props.label ?? 'navbar'}</div>;
}
