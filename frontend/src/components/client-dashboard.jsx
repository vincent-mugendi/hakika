import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { QRCodeCanvas } from "qrcode.react";

export default function HakikaDashboard() {
  // State for storing registered products
  const [products, setProducts] = useState([]);
  
  // State for user input fields
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  
  // State for storing uploaded CSV file
  const [csvFile, setCsvFile] = useState(null);

  // Function to generate a QR code and save product details
  const generateQR = () => {
    // Ensure product name and batch number are provided
    if (!productName || !batchNumber) return;
    
    // Create QR data string based on product details
    const qrData = `${productName}-${batchNumber}-${Date.now()}`;
    
    // Update the products list with the new entry
    setProducts([...products, { name: productName, batch: batchNumber, qrData }]);
    
    // Clear input fields after adding the product
    setProductName("");
    setBatchNumber("");
  };

  // Function to handle CSV file upload
  const handleCSVUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setCsvFile(file); // Store file in state (for future processing)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Header */}
      <h1 className="text-2xl font-bold">Hakika Business Dashboard</h1>

      {/* Section to display generated QR codes */}
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Generated QR Codes</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>QR Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.batch}</TableCell>
                  <TableCell>
                    {/* Generate QR code using the QRCodeCanvas component */}
                    <QRCodeCanvas value={product.qrData} size={50} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
