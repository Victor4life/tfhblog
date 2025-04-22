import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-2 py-8 md:px-10 md:py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:uid" element={<Article />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
