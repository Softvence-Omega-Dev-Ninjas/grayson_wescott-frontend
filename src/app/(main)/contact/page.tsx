import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import logo from "../../../assets/home/contact.png";
import ContactForm from "./_components/ContactForm/ContactForm";

const ContactPage = () => {
  return (
    <div>
      <HeroBanner
        title="Your next step starts with one message."
        subtitle="No bots. No templates. Just real strategy for real performance."
        img={logo.src}
        button1="Start Now"
      />

      <div className="md:py-12">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
