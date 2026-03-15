"use client";

import { ChevronLeft, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type SidebarTypeProps = {
  children: React.ReactNode;
};

type SidebarContentTypeProps = {
  children: React.ReactNode;
  setIsSidebarOpen: (prevState: boolean) => void;
};

export const Sidebar = ({ children }: SidebarTypeProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsSidebarOpen(!isMobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile (overlay) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-3/4 max-w-sm bg-gray-50 transition-transform duration-300 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent setIsSidebarOpen={setIsSidebarOpen}>
          {children}
        </SidebarContent>
      </aside>

      {/* Sidebar toggle button - Mobile */}
      <div className="absolute top-25 right-5 z-30 block rounded-full border border-zinc-400 p-2 backdrop-blur-[5px] md:hidden">
        <Button
          onClick={toggleSidebar}
          type="button"
          variant="ghost"
          className="cursor-pointer rounded-lg p-2 py-5 transition-colors hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop/Tablet */}
      <aside
        className={`hidden border-r border-gray-200 bg-gray-50 transition-all duration-300 md:block ${
          isSidebarOpen ? "w-80" : "w-0"
        } overflow-hidden`}
      >
        <SidebarContent setIsSidebarOpen={setIsSidebarOpen}>
          {children}
        </SidebarContent>
      </aside>

      {/* Sidebar toggle button - Desktop/Tablet */}
      <div className="sticky top-0 z-30 hidden border-b border-gray-200 bg-white p-4 md:block">
        <Button
          onClick={toggleSidebar}
          type="button"
          variant="ghost"
          className="cursor-pointer rounded-lg p-2 py-5 transition-colors hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  );
};

const SidebarContent = ({
  setIsSidebarOpen,
  children,
}: SidebarContentTypeProps) => {
  return (
    <div className="p-4 whitespace-nowrap">
      {/* Przycisk zamykania na mobile */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="rounded-lg p-2 hover:bg-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="space-y-2">{children}</nav>
    </div>
  );
};
