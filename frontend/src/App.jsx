import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HakikaClientDashboard from "./components/HakikaClientDashboard";
import VerifyProduct from "./pages/QRVerificationPage"; // Adjust if the path is different

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HakikaClientDashboard />} />
        <Route path="/verify" element={<VerifyProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
