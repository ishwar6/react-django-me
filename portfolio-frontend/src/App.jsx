import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import Layout from "./components/Layout";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:listType" element={<ListPage />} />
          <Route path="/blogs/:params" element={<BlogDetailsPage />} />
          <Route path="/projects/:params" element={<ProjectDetailsPage />} />
        </Routes>
        <Toaster/>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
