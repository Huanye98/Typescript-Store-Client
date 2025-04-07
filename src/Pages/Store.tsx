import { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import service from "../service/service.config";
import StoreFilters from "../Components/StoreFilters";
import { Box, Button, Container } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { Product } from "../Types/Types";
import CircularProgress from '@mui/material/CircularProgress';

function Store() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterData, setFilterData] = useState({
    sort: "",
    collection: "",
    category: "",
    isavaliable: "",
  });
  useEffect(() => {
    getProducts(page);
  }, [page]);

  const fetchPage = (value: number) => {
    setPage((prevPage) => prevPage + value);
  };

  const getProducts = async (pagination: number) => {
    try {
      setIsLoading(true);

      let params: Record<string, any> = { limit: 9, page: pagination };
      if (filterData) {
        Object.entries(filterData).forEach(([key, value]) => {
          if (value !== "") params[key] = value;
        });
      }
      const response = await service.get("/products", { params });

      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.totalCount / 10));
      setIsLoading(false);
    } catch (error) {
      console.error("was not able to get products", error);
    }
  };

  if (isLoading) {
    return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <h2>Loading</h2>
    <CircularProgress color="secondary" />
    </Box>)
  }
  if (!products) {
    return <h2>no products</h2>;
  }

  return (
    <>
      <Nav />
      <Box
        className="StoreHeader"
        sx={{
          "& img": { width: "100%", left: "0", zIndex: 2 },
        }}
      >
        <img
          rel="preload"
          src="/storeBanner.webp"
          alt="wide banner with pastel colors"
        />
      </Box>
      <Container sx={{ postiion: "relative" }}>
        <Box>
          <StoreFilters
            setProducts={setProducts}
            setFilterData={setFilterData}
            setPage={setPage}
            filterData={filterData}
          />

          {/* Cards and container */}
          <Box
            sx={{
              maxWidth: "100%",
              display: "grid",
              gap: "5px",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              },
            }}
          >
            {products.map((product: Product, index) => {
              return <ProductCard product={product} key={index} />;
            })}
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              mt:3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              backgroundColor: "primary.main",
              borderRadius: "5%",
            }}
          >
            {page > 1 && (
              <Button
                variant="outlined"
                onClick={() => fetchPage(-1)}
                sx={{
                  border: "3px solid #eb712a ",
                  backgroundColor: "secondary.main",
                  borderRadius: 50,
                  color: "black",
                }}
              >
                Prev
              </Button>
            )}
            <p>{page}</p>
            {page < totalPages && (
              <Button
                variant="outlined"
                onClick={() => fetchPage(1)}
                sx={{
                  border: "3px solid #eb712a ",
                  backgroundColor: "secondary.main",
                  color: "black",
                  borderRadius: 50,
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Store;
