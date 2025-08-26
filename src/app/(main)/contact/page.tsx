import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import logo from "../../../assets/home/contact.png";
const ContactPage = () => {
  return (
    <div>
      <HeroBanner
        title="Your next step starts with one message."
        subtitle="No bots. No templates. Just real strategy for real performance."
        img={logo.src}
        button1="Start Now"
      />
    </div>
  );
};

export default ContactPage;
