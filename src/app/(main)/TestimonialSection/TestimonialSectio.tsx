import React from "react";
import img1 from "../../../assets/testimonial/test1.png";
import Testimonial from "@/components/shared/main/Testimonial/Testimonial";

function TestimonialSectio() {
  const data = [
    {
      image: img1,
      quote:
        "Carbon Engines didn't just change my physique—it rebuilt my entire approach to performance. The precision is unmatched.",
      name: "JOHN B.",
      title: "Professional MMA Fighter",
      details: "Lost 25 lbs, Gained 15 lbs Muscle in 16 Weeks",
    },
    {
      image: img1,
      quote:
        "The program's focus on functional strength completely transformed my training. I've never felt more powerful and stable.",
      name: "MIKE R.",
      title: "CrossFit Athlete",
      details: "Improved 1RM Squat by 40 lbs, Deadlift by 55 lbs",
    },
    {
      image: img1,
      quote:
        "As a busy professional, I needed a structured plan that was both effective and efficient. This program delivered on all fronts.",
      name: "CHRIS P.",
      title: "Software Engineer",
      details: "Reduced Body Fat by 5%, Increased Lean Muscle Mass",
    },
    {
      image: img1,
      quote:
        "I was stuck in a rut with my training until I found this. The guidance and community support are incredible.",
      name: "DAVID L.",
      title: "Fitness Enthusiast",
      details: "Broke multiple plateaus, now training pain-free",
    },
  ];
  return (
    <div>
      <Testimonial testimonials={data} />
    </div>
  );
}

export default TestimonialSectio;
