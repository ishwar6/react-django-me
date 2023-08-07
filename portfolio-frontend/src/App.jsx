import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { Toaster } from 'react-hot-toast';
import Error404 from "./pages/Error404";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:listType" element={<ListPage />} />
          <Route path="/blogs/:params" element={<BlogDetailsPage />} />
          <Route path="/projects/:params" element={<ProjectDetailsPage />} />
          <Route path="/error/404" element={<Error404 />} />
        </Routes>
        <Toaster/>
    </BrowserRouter>
  );
}

export default App;
