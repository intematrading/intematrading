import { Award, BarChart3, Building2, CalendarDays, Globe, Sprout, Store, TrendingUp, Truck, Users, type LucideIcon } from "lucide-react";

// Icon for a stat by its key in Sanity (the same keys are used on Home,
// About, Team and the Services market figures), so each figure gets a fitting icon wherever it appears.
const byKey: Record<string, LucideIcon> = {
  founded: CalendarDays,
  market: Globe,
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
};

export const statIcon = (key: string): LucideIcon => byKey[key] ?? BarChart3;
