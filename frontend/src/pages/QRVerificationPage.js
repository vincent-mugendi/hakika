import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // To get QR data from URL
import { Container, Typography, Paper, CircularProgress, Box, Alert } from "@mui/material";

export default function QRVerificationPage() {
  const [searchParams] = useSearchParams();
  const qrData = searchParams.get("qr"); // Extract QR code data from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!qrData) {
      setError("Invalid QR code. No data found.");
      setLoading(false);
      return;
    }

    const [productName, batchNumber] = qrData.split("-").slice(0, 2);

    // Simulate fetching from a database (replace with actual backend call)
    const storedProducts = JSON.parse(localStorage.getItem("hakikaProducts")) || [];
    const matchedProduct = storedProducts.find(
      (p) => p.name === productName && p.batch === batchNumber
    );

    if (matchedProduct) {
      setProduct(matchedProduct);
    } else {
      setError("Product not found in the system.");
    }
    
    setLoading(false);
  }, [qrData]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Product Verification
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}

      {product && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 2 }}>
          <Typography variant="h6">✅ Product Verified</Typography>
          <Typography variant="body1"><strong>Product Name:</strong> {product.name}</Typography>
          <Typography variant="body1"><strong>Batch Number:</strong> {product.batch}</Typography>
          <Typography variant="body2" color="green">This product is authentic and registered in the system.</Typography>
        </Paper>
      )}
    </Container>
  );
}
