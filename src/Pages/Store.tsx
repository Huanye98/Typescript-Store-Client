import { useEffect, useState, useContext } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import service from "../service/service.config";
import StoreFilters from "../Components/StoreFilters";
import { AuthContext } from "../context/auth.contex";
import { Box, Button, Container, Grid2 } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { Product } from "../Types/Types";


function Store() {
  const { loggedUserId, loggedUserCartId, addToCart } = useContext(AuthContext);
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
          if (value !== "") params[key] = value; // Only add non-empty filters
        });
      }
      console.log(params)
      const response = await service.get("/products", { params });

      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.totalCount / 10));
      setIsLoading(false)
    } catch (error) {
      console.log("was not able to get products", error);
    }
  };

  if (isLoading) {
    return <h2>Loading</h2>;
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
          "& img": { width: "100%", maxWidth: "1920", left: "0", zIndex: 2 },
        }}
      >
        <img src="/Sin título-1.webp" alt="" />
      </Box>
      <Container sx={{ postiion: "relative" }}>
        <Box>
          <StoreFilters
            setProducts={setProducts}
            filterData={filterData}
            setFilterData={setFilterData}
            setPage={setPage}
          />

          {/* Cards and container */}
          <Grid2 container sx={{ padding: 2 }}>
            {products.map((product: Product, index) => {
              return (
                <Grid2 key={index} sx={{}}>
                  <ProductCard
                    product={product}
                    addtoCart={addToCart}
                    loggedUserCartId={loggedUserCartId}
                    loggedUserId={loggedUserId}
                  />
                </Grid2>
              );
            })}
          </Grid2>

          {/* Pagination */}
          <Box
            sx={{
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
