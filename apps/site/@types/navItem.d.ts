import type { getNavItems } from "../api";

type NavItem = Awaited<ReturnType<typeof getNavItems>>[number];
export default NavItem;
