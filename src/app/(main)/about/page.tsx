import HeroBanner from "@/components/shared/main/reusable-banner/HeroBanner";
import img from '../../../assets/home/aboutbanner.png'
const AboutPage = () => {
  return <div>
    <HeroBanner
    title="Two decades of precision. Thousands transformed. One uncompromising standard"
    subtitle="Carbon Engines was built for those who refuse to accept average. Our mission: engineer bodies that dominate under pressure inside the gym and beyond. Every system is designed to eliminate weakness, maximize strength, and create relentless performance."
    button1="Join the Legacy"
    img={img.src}
    />
  </div>;
};

export default AboutPage;
