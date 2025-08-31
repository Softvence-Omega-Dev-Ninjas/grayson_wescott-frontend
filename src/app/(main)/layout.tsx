import Footer from "@/components/shared/main/Footer/Footer";
import Header from "@/components/shared/main/Header/Header";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
