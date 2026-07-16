import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ProjectDetail from "./pages/ProjectDetail";
import ElixirHelloWorld from "./pages/posts/ElixirHelloWorld";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { trackEvent } from "./utils/analytics";

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", { page_path: location.pathname });

    let hasReachedBottom = false;
    let readTimer = null;
    const isArticle = location.pathname.startsWith("/blog/") && location.pathname !== "/blog";

    if (isArticle) {
      readTimer = setTimeout(() => {
        trackEvent("article_read_time", { 
          page_path: location.pathname, 
          duration_sec: 30 
        });
      }, 30000);
    }

    const handleScroll = () => {
      if (hasReachedBottom) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight > windowHeight && scrollTop + windowHeight >= docHeight * 0.9) {
        hasReachedBottom = true;
        
        trackEvent("scroll_to_bottom", { 
          page_path: location.pathname,
          is_article: isArticle
        });

        if (isArticle) {
          trackEvent("article_read_complete", { page_path: location.pathname });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (readTimer) clearTimeout(readTimer);
    };
  }, [location.pathname]);

  return null;
};

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <PageTracker />
      <div key={location.pathname} className="route-transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/elixir-hello-world" element={<ElixirHelloWorld />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ScrollToTop />
    </Layout>
  );
};

export default App;
