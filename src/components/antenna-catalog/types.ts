export type AntennaCategory = 'portable' | 'stationary' | 'directional';

export type AntennaItem = {
  title: string;
  image: string;
  alt: string;
  category: AntennaCategory;
  badges: [string, string, string];
  descriptionLines: [string, string];
  price: string;
  href: string;
  hrefLabel?: string;
};
