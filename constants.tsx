
import { Product, StatItem, ComparisonPoint } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'sedai-aero',
    name: 'Sedai Aero',
    category: 'Luxury Ultralight Hybrid eVTOL',
    description: 'Luxury ultralight hybrid eVTOL — sleek, safe, affordable flying car. The world’s first luxury ultralight HPEV.',
    specs: ['462 HP Total Output', 'V-Twin Hybrid System', 'Advanced e-Motor', 'Proprietary power delivery'],
    imageUrl: '/assets/images/sedai-fleet.png'
  },
  {
    id: 'sedai-cropduster',
    name: 'Sedai CropDuster',
    category: 'Industrial Drone Platform',
    description: 'Industrial agriculture and surveying drone platform. Built for performance and precision.',
    specs: ['Industrial Scale', 'Surveying Platform', 'Heavy Payload', 'Automated Flight'],
    imageUrl: '/assets/images/crop-duster.jpg'
  }
];

export const CORE_STATS: StatItem[] = [
  { label: 'HORSEPOWER', value: '462 shp', description: 'V-Twin Hybrid + Advanced e-Motor' },
  { label: 'CRUISE SPEED', value: '140 kt', description: 'Maximum efficient velocity' },
  { label: 'MAX RANGE', value: '700 nm', description: 'Hybrid endurance capabilities' },
  { label: 'PAYLOAD', value: '250 lb', description: 'Ultralight commuter capacity' },
  { label: 'BASE PRICE', value: '$175,000', description: 'Starting configuration' }
];

export const TIMELINE = [
  { date: 'MAY 2024', event: 'First Full Engine Run' },
  { date: 'DECEMBER 2025', event: 'First Test Flight' },
  { date: 'DECEMBER 2026', event: 'Production Start' }
];

export const PRESS_LOGOS = [
  'AIN', 'AVweb', 'Flight Global', 'Flyer', 'Helicopter Investor', 'HeliHub',
  'Robb Report', 'BOAT', 'T3', 'Elite Traveler', 'WIRED'
];

export const NAVIGATION_LINKS = [
  { name: 'WHO WE ARE', href: '#origins' },
  { name: 'WHAT WE DO', href: '#execution' },
  { name: 'PERFORMANCE', href: '#performance' },
  { name: 'INFRASTRUCTURE', href: '#infrastructure' }
];

export const MARKET_PROBLEM = [
  { issue: 'Safety', detail: 'Most eVTOLs lack redundancy and are overly complex.' },
  { issue: 'Flight Time', detail: 'Most ultralight eVTOLs fly under 20 minutes.' },
  { issue: 'Affordability', detail: 'Many exceed $200,000.' },
  { issue: 'Payload', detail: 'Most ultralights carry under 200 lbs.' },
  { issue: 'Design', detail: 'Few approach true luxury standards.' }
];

export const SEDAI_SOLUTION = [
  { sol: 'Six-times redundant safety' },
  { sol: '50+ mile flight range' },
  { sol: '250 lb payload capacity' },
  { sol: 'Hybrid power for endurance' },
  { sol: 'Luxury automotive-inspired design' },
  { sol: 'Water-based launch infrastructure' }
];

export const COMPARISON_DATA: ComparisonPoint[] = [
  { feature: 'Safety', competitors: 'Lack redundancy, overly complex', sedai: 'Six-times redundant safety' },
  { feature: 'Flight Time', competitors: 'Usually under 20 minutes', sedai: '50+ mile flight range' },
  { feature: 'Affordability', competitors: 'Often exceed $200,000', sedai: 'Affordable by Design' },
  { feature: 'Payload', competitors: 'Under 200 lbs', sedai: '250 lb payload capacity' },
  { feature: 'Infrastructure', competitors: 'Multi-million dollar vertiports', sedai: 'Water-based / Marina infrastructure' }
];

export const DESIGN_FEATURES = [
  { title: 'Supercar Aesthetic', desc: 'A clean, futuristic silhouette engineered to “make flying cool again.”' },
  { title: 'Aerospace Fuselage', desc: 'Enhances aerodynamic efficiency, improves structural integrity, and reduces drag.' },
  { title: 'Amphibious Freedom', desc: 'Drive out of the fairway to open water, taxi in harbors, and land on water.' }
];
