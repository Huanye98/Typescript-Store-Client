import { useState } from "react";
import service from "../service/service.config";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
type FilterData = {
  sort: "price:asc" | "price:desc" | "name:asc" | "name:desc" | "popular:asc" | "popular:desc" | "created_at:asc" | "created_at:desc";
  category: string;
  isavaliable: string;
}

type StorefilersProps = {
  filterData: FilterData;
}

const StoreFilters:React.FC<StorefilersProps> =({ setProducts,filterData, setFilterData, setPage })=> {
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >
  ) => {
    const { name, value, type } = e.target;

    setFilterData((prevData:FilterData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? value === "true"
          : type === "number"
          ? +value
          : value,
    }));
  };

  const handleFilterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(filterData);
    sendFilters();
  };
  const sendFilters = async () => {
    if (!filterData) {
      console.error("No filters were found");
    }
    const queryParams = Object.entries(filterData)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const url = `/products?${queryParams}`;
    console.log(url);
    try {
      const response = await service.get(url,{params:{limit:9,page:1}});
      setPage(1)
      console.log("filtered products", response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.log("failed to get filtered products", error);
    }
  };

  const selectStyles = {
    width: {
      xs: "100%",
      sm: "150px",
    },
    height: "80%",
    top: "5px",
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "5%",
        margin: 1,
      }}
    >
        <Box
        component={"form"}
        onSubmit={handleFilterFormSubmit}
          sx={{
            display: "flex",
            gap: {
              xs:1,
              sm:3
            },
            justifyContent: "space-evenly",
            backgroundColor: "primary.main",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          {/* Sort by Dropdown */}
          <FormControl>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              name="sort"
              id="sort"
              value={filterData.sort}
              onChange={handleInputChange}
              label="Sort by"
              sx={selectStyles}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="price:asc">Price ascending</MenuItem>
              <MenuItem value="price:desc">Price descending</MenuItem>
              <MenuItem value="name:asc">Name ascending</MenuItem>
              <MenuItem value="name:desc">Name descending</MenuItem>
              <MenuItem value="popular:asc">Popular ascending</MenuItem>
              <MenuItem value="popular:desc">Popular descending</MenuItem>
              <MenuItem value="created_at:asc">Recency ascending</MenuItem>
              <MenuItem value="created_at:desc">Recency descending</MenuItem>
            </Select>
          </FormControl>

          {/* Category Dropdown */}
          <FormControl >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              id="category"
              value={filterData.category}
              onChange={(e: SelectChangeEvent<string>) => handleInputChange(e)}
              label="Category"
              sx={selectStyles}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="Apparel">Apparel</MenuItem>
              <MenuItem value="Home goods">Home goods</MenuItem>
              <MenuItem value="Digital goods">Digital goods</MenuItem>
              <MenuItem value="Print">Print</MenuItem>
            </Select>
          </FormControl>

          {/* Availability Dropdown */}
          <FormControl >
            <InputLabel id="availability-label">Availability</InputLabel>
            <Select
              labelId="availability-label"
              name="isavaliable"
              value={filterData.isavaliable}
              onChange={handleInputChange}
              label="Availability"
              sx={selectStyles}
            >
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Not Available</MenuItem>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: "center" ,margin:{xs:1.5}}}
          >
            Search
          </Button>
        </Box>
    </Box>
  );
}

export default StoreFilters;
