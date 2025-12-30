import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollAndLayoutReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.offsetHeight;
  }, [pathname]);
  return null;
}

export default ScrollAndLayoutReset;
