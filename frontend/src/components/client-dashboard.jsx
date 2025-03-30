import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HakikaDashboard() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [csvFile, setCsvFile] = useState(null);

//   QR CODE GENERATION
  const generateQR = () => {
    if (!productName || !batchNumber) return;
    const qrData = `${productName}-${batchNumber}-${Date.now()}`;
    setProducts([...products, { name: productName, batch: batchNumber, qrData }]);
    setProductName("");
    setBatchNumber("");
  };

//   CSV UPLOAD FEATURE
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
    // Process CSV file (Placeholder for backend integration)
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Hakika Client Dashboard</h1>
      

      {/* PRODUCT REGISTRATION */}
      <Card className="p-4">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Register Product</h2>
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            placeholder="Batch Number"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <Button onClick={generateQR}>Generate QR Code</Button>
        </CardContent>
      </Card>
    </div>
  );
}
