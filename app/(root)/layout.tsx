import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
}
