import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import ProductDashboard from "./pages/ProductDashboard";
import Custom from "./pages/Custom";
import PopupDemo from "./pages/PopupDemo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import LandingPageUseCase from "./pages/LandingPageUseCase";
import OnlineStoreUseCase from "./pages/OnlineStoreUseCase";
import Popups from "./pages/Popups";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import StubPage from "./pages/StubPage";

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:slug" element={<ProductDetail />} />
            <Route path="/dashboard/products/:slug" element={<ProductDashboard />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/popup-demo" element={<PopupDemo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/landing-page" element={<LandingPageUseCase />} />
            <Route path="/online-store" element={<OnlineStoreUseCase />} />
            <Route path="/popups" element={<Popups />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<StubPage title="Pricing" />} />
            <Route path="/terms" element={<StubPage title="Terms of service" />} />
            <Route path="/privacy" element={<StubPage title="Privacy policy" />} />
            <Route path="/cookies" element={<StubPage title="Cookies" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<StubPage title="Page not found" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
