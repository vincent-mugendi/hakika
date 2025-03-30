import { useState } from "react";

export default function HakikaDashboard() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [csvFile, setCsvFile] = useState(null)
  
  
//   QR CODE GENERATION
  const generateQR = () => {
    if (!productName || !batchNumber) return;
    const qrData = `${productName}-${batchNumber}-${Date.now()}`;
    setProducts([...products, { name: productName, batch: batchNumber, qrData }]);
    setProductName("");
    setBatchNumber("");
  };

  
  
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hakika Client Dashboard</h1>
    </div>
  );
}
