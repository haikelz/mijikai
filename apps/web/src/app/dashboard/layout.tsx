import { ChildrenProps } from "@types";
import { DashboardSidebar } from "~components/dashboard/sidebar";

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
}
