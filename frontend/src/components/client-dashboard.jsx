import { useState } from "react";

export default function HakikaDashboard() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hakika Business Dashboard</h1>
    </div>
  );
}
