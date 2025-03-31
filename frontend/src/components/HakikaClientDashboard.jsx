import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Container, Box, Divider } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import MenuIcon from "@mui/icons-material/Menu";

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
  };

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", minWidth: "100vw" }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)", boxShadow: "none" }}>
        <Toolbar>
          <IconButton edge="start" color="default" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#333", fontWeight: "600" }}>
            Hakika
          </Typography>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Products</Button>
          <Button color="inherit">Uploads</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Register Product */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Register Product
          </Typography>
          <TextField label="Product Name" fullWidth margin="normal" variant="outlined" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <TextField label="Batch Number" fullWidth margin="normal" variant="outlined" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
          <Button variant="contained" sx={{ mt: 2, borderRadius: 2 }} onClick={generateQR} fullWidth>
            Generate QR Code
          </Button>
        </Paper>

        {/* CSV Upload */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Bulk QR Code Upload
          </Typography>
          <input type="file" accept=".csv" onChange={handleCSVUpload} />
          {csvFile && <Typography variant="body2" sx={{ mt: 1 }}>File uploaded: {csvFile.name}</Typography>}
        </Paper>

        {/* QR Code Table */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated QR Codes
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>QR Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.batch}</TableCell>
                    <TableCell>
                      <QRCodeCanvas value={product.qrData} size={50} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}

export { HakikaDashboard };
