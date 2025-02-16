
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/sonner";
import { WalletProvider } from "./contexts/WalletContext";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </WalletProvider>
  );
}

export default App;
