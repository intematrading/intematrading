import { Award, BarChart3, CalendarDays, Globe, Store, Truck, Users, type LucideIcon } from "lucide-react";

// Icon for a stat by its key in Sanity (the same keys are used on Home,
// About and Team), so each figure gets a fitting icon wherever it appears.
const byKey: Record<string, LucideIcon> = {
  founded: CalendarDays,
  market: Globe,
  reps: Users,
  accounts: Store,
  fleet: Truck,
  experience: Award,
};

export const statIcon = (key: string): LucideIcon => byKey[key] ?? BarChart3;
