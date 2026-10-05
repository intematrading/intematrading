import { PageDrawer } from "@/components/PageDrawer";

// One drawer shell for all the drawer pages, so switching between them swaps
// the content without sliding the drawer out and in again.
export default function DrawerLayout({ children }: { children: React.ReactNode }) {
  return <PageDrawer>{children}</PageDrawer>;
}
