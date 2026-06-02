"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "@/components/features/chatbot/Chatbot";
import InitialLoader from "./InitialLoader";
import { LazyMotion, domAnimation } from "motion/react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const shouldShowInitialLoader = pathname === "/";

  return (
    <LazyMotion features={domAnimation}>
      {shouldShowInitialLoader && <InitialLoader />}
      {!isAdminPage && <Navbar />}
      <main className="flex-1">{children}</main>
      <div className="fixed bottom-6 right-6 z-50">
        {!isAdminPage && <Chatbot />}
      </div>
      {!isAdminPage && <Footer />}
    </LazyMotion>
  );
}
