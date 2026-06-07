import Page404 from "@/app/not-found";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/utils/actions";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getUser();

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const {
    data: { role },
  } = result;

  if (role !== "admin") {
    return <Page404 />;
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <AdminSidebar />
      {children}
      <Toaster />
    </div>
  );
}
