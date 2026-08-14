import { cn } from "@/lib/utils";

function ErrorMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-8 text-red-500", className)}>{children}</div>;
}

export { ErrorMessage };
