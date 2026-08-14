"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Logo } from "./ui/logo";
import Link from "next/link";
import { logout } from "@/actions";

interface NavigationTypeProps {
  firstname: string;
  isAdmin?: boolean;
}

function Navigation({ firstname, isAdmin }: NavigationTypeProps) {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/home" className="flex items-center">
            <Logo heigth={48} width={48} />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:ring-2 focus:ring-brand focus:outline-none">
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarFallback className="bg-brand text-white">
                    {firstname[0].toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Ustawienia</span>
                </Link>
              </DropdownMenuItem>

              {isAdmin && (
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/admin/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Panel Kursu</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Wyloguj się</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
