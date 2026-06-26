import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import ElixirHelloWorld from './pages/posts/ElixirHelloWorld'
import NotFound from './pages/NotFound'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/elixir-hello-world" element={<ElixirHelloWorld />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
