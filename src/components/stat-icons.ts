import { Award, BarChart3, Building2, CalendarDays, Globe, Map as MapIcon, MapPin, Sprout, Store, TrendingUp, Truck, Users, Warehouse, type LucideIcon } from "lucide-react";

// Icon for a stat by its key in Sanity (the same keys are used on Home,
// About, Team and the Services market figures), so each figure gets a fitting icon wherever it appears.
const byKey: Record<string, LucideIcon> = {
  founded: CalendarDays,
  market: Globe,
  countries: Globe,
  reps: Users,
  team: Users,
  accounts: Store,
  fleet: Truck,
  experience: Award,
  // Why Ethiopia? (Services)
  population: Users,
  growth: TrendingUp,
  youth: Sprout,
  urban: Building2,
  // We Distribute figures (Services)
  warehouse: Warehouse,
  points: MapPin,
  regions: MapIcon,
};

export const statIcon = (key: string): LucideIcon => byKey[key] ?? BarChart3;
