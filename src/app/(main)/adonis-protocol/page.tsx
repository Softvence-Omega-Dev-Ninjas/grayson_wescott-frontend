import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import React from "react";
import logo from "../../../assets/home/adonis.png";

function AdonisProtocolPage() {
  return (
    <div>
      <HeroBanner
        title="A complete body and mind recalibration—built for those unwilling to settle for less than apex form."
        subtitle="Physique, grooming, social mastery, discipline. Built for men who refuse average."
        img={logo.src}
        button1="Apply for Adonis Protocol"
      />
    </div>
  );
}

export default AdonisProtocolPage;
