import CTA from "@/components/shared/main/CTA/CTA";
import React from "react";
import img from "../../../../../assets/adonisProtocol/adonisCta.png";

function AdonisCtaSection() {
  return (
    <div>
      <CTA
        title="Ready to Peak?"
        description="Join thousands who've transformed their strength"
        btn2="Add to Cart"
        img={img.src}
        btn1="Buy Now"
      />
    </div>
  );
}

export default AdonisCtaSection;
