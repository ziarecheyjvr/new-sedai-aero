
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface ComparisonPoint {
  feature: string;
  competitors: string;
  sedai: string;
}
