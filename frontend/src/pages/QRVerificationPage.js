import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Paper, Typography, CircularProgress, Box } from "@mui/material";

export default function VerifyProduct() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFake, setIsFake] = useState(false);
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const qrCode = searchParams.get("qr");

    if (qrCode) {
      // Retrieve stored products
      const storedProducts = JSON.parse(localStorage.getItem("hakikaProducts")) || [];

      // Find the product using the QR data
      const foundProduct = storedProducts.find((p) => p.qrData === qrCode);

      if (foundProduct) {
        setProduct(foundProduct);

        // Check scan count to detect potential fakes
        let scanHistory = JSON.parse(localStorage.getItem("scanHistory")) || {};
        scanHistory[qrCode] = (scanHistory[qrCode] || 0) + 1;
        setScanCount(scanHistory[qrCode]);

        localStorage.setItem("scanHistory", JSON.stringify(scanHistory));

        // If the product has been scanned more than 3 times, flag as suspicious
        if (scanHistory[qrCode] > 3) {
          setIsFake(true);
        }
      } else {
        setIsFake(true);
      }
    }

    setLoading(false);
  }, [searchParams]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        {loading ? (
          <CircularProgress />
        ) : product ? (
          <>
            <Typography variant="h5" gutterBottom color={isFake ? "error" : "primary"}>
              {isFake ? "⚠️ Potential Fake Product" : "✅ Product is Authentic"}
            </Typography>
            <Typography variant="h6">Product Name: {product.name}</Typography>
            <Typography variant="h6">Batch Number: {product.batch}</Typography>
            <Typography variant="body2" color="textSecondary">
              Scanned {scanCount} {scanCount === 1 ? "time" : "times"}
            </Typography>
            {isFake && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: "#ffdddd", borderRadius: 2 }}>
                <Typography variant="body1" color="error">
                  This QR code has been scanned multiple times. It may be a counterfeit product.
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Typography variant="h5" color="error">❌ Invalid Product - Possible Counterfeit</Typography>
        )}
      </Paper>
    </Container>
  );
}
