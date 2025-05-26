"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, FileText, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const pathname = usePathname();

  const getStepNumber = (path: string) => {
    if (path === "/") return 1;
    if (path === "/create") return 2;
    if (path === "/preview") return 3;
    return 1;
  };

  const currentStep = getStepNumber(pathname);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              MailerMaker
            </span>
          </Link>
          <Badge variant="secondary" className="px-3 py-1">
            Step {currentStep} of 3
          </Badge>
        </div>

        <nav className="flex items-center justify-center space-x-1 bg-gray-50 rounded-lg p-1">
          <Link
            href="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Welcome</span>
          </Link>
          <Link
            href="/create"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/create"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </Link>
          <Link
            href="/preview"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/preview"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
