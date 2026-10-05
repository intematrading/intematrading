import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const base = createNavigation(routing);

/** Pages that open in the drawer over the home page. */
export const drawerRoutes = ["/about", "/services"] as const;
export const isDrawerPath = (path: string) =>
  drawerRoutes.some((r) => path.startsWith(r) && (path.length === r.length || "/?#".includes(path[r.length])));
