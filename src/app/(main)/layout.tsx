
import Footer from "@/components/shared/main/footer/Footer";
import Header from "@/components/shared/main/header/Header";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div>
    <Header/>
    {children}
    <Footer/>
    </div>;
};

export default MainLayout;


