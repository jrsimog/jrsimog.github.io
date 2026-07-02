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
