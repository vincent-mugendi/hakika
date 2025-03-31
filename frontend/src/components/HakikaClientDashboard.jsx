import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

export default function HakikaDashboard() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  const generateQR = () => {
    if (!productName || !batchNumber) return;
    const qrData = `${productName}-${batchNumber}-${Date.now()}`;
    setProducts([...products, { name: productName, batch: batchNumber, qrData }]);
    setProductName("");
    setBatchNumber("");
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
    // Process CSV file (Placeholder for backend integration)
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        Hakika Business Dashboard
      </Typography>
      
      <Card style={{ padding: "16px", marginBottom: "16px" }}>
        <CardContent>
          <Typography variant="h6">Register Product</Typography>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Batch Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={generateQR}>
            Generate QR Code
          </Button>
        </CardContent>
      </Card>

      <Card style={{ padding: "16px", marginBottom: "16px" }}>
        <CardContent>
          <Typography variant="h6">Bulk QR Code Upload</Typography>
          <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ marginTop: "8px" }} />
          {csvFile && <Typography variant="body2" color="textSecondary">File uploaded: {csvFile.name}</Typography>}
        </CardContent>
      </Card>

      <Card style={{ padding: "16px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Generated QR Codes
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Product</b></TableCell>
                <TableCell><b>Batch</b></TableCell>
                <TableCell><b>QR Code</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.batch}</TableCell>
                  <TableCell>
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


export { HakikaDashboard };