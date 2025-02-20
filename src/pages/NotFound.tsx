import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ripple.css";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = "mouse-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 1000);

      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="ripple-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
      </div>
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent animate-fadeIn">404</h1>
        <p className="text-2xl text-muted-foreground mb-8 animate-fadeIn">页面未找到</p>
        <Link to="/" className="px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 animate-fadeIn">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
