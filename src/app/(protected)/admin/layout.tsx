import Page403 from "@/app/forbidden";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/sonner";
import { requireAdmin } from "@/actions";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await requireAdmin();

  if (!result.success) {
    return <Page403 />;
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <AdminSidebar />
      <main className="mx-auto max-w-7xl flex-1 overflow-y-auto px-4 py-12">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
