import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ngăn trình duyệt tự động khôi phục vị trí scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll lên đầu trang
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
