import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";

function App() {
  return (
    <Router basename="/tfhblog">
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8 md:px-20 md:py-12">
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
