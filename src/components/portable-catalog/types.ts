export type DeviceTech = 'NRF' | 'ESP';

export type DeviceCategory = 'universal' | 'solar' | 'boards';

export type DeviceBadge = {
  label: string;
  off?: boolean;
};

export type DeviceItem = {
  title: string;
  image: string;
  alt: string;
  badges: DeviceBadge[];
  descriptionLines: [string, string];
  price: string;
  href: string;
  ctaLabel?: string;
  tech: DeviceTech;
  popular?: boolean;
  videoHref?: string;
  videoLabel?: string;
};
