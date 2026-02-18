import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import image from '/2.png'

export default function Landing() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/login"); 
    }, 3000); 

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(redirectTimer);
    };

  }, [navigate]);

  return (
    <div className="container">
      <div className={`logo ${animate ? "move-up" : ""}`}>
        <img src={image} alt="" />
      </div>

      <div className={`content ${animate ? "fade-in" : ""}`}>
        <h1>Welcome to NextMove</h1>
      </div>
    </div>
  );
}
