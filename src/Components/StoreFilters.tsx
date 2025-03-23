import service from "../service/service.config";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
type FilterData = {
  sort: string;
  category: string;
  isavaliable: string;
};

type StorefilersProps = {
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const StoreFilters: React.FC<StorefilersProps> = ({
  setProducts,
  filterData,
  setFilterData,
  setPage,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setFilterData((prevData: FilterData) => ({
      ...prevData,
      [name]: value,
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
      const response = await service.get(url, {
        params: { limit: 9, page: 1 },
      });
      setPage(1);
      console.log("filtered products", response.data);
      setProducts(response.data.products);
      setFilterData({
        sort: "", category: "", isavaliable: ""
      });
    } catch (error) {
      console.log("failed to get filtered products", error);
    }
  };

  const selectStyles = {
    width: {
      xs: "100%",
      sm: "auto",
    },
    minWidth: {sm: "100px"},
    height: "80%",
    top: "5px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  };

  return (
    <Box
      sx={{
        borderRadius: "5%",
        margin: "10px 15px",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleFilterFormSubmit}
        sx={{
          display: "flex",
          gap: {
            xs: 2,
            sm: 3,
          },
          justifyContent: "space-evenly",
          backgroundColor: "primary.main",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          padding: 2,
        }}
      >
        {/* Sort by Dropdown */}
        <FormControl>
          <InputLabel id="sort-label" shrink sx={{ "&.Mui-focused": {color: "#eb851e"}}}>
            Sort by
          </InputLabel>
          <Select
            labelId="sort-label"
            name="sort"
            id="sort"
            value={filterData.sort}
            onChange={handleInputChange}
            label="Sort by"
            displayEmpty
            sx={selectStyles}
          >
            <MenuItem value="">Select</MenuItem>
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
        <FormControl>
          <InputLabel id="category-label" shrink sx={{ "&.Mui-focused": {color: "#eb851e"}}}>
            Category
          </InputLabel>
          <Select
            labelId="category-label"
            name="category"
            id="category"
            value={filterData.category}
            onChange={handleInputChange}
            label="Category"
            displayEmpty
            sx={selectStyles}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Apparel">Apparel</MenuItem>
            <MenuItem value="Home goods">Home goods</MenuItem>
            <MenuItem value="Digital goods">Digital goods</MenuItem>
            <MenuItem value="Print">Print</MenuItem>
          </Select>
        </FormControl>

        {/* Availability Dropdown */}
        <FormControl>
          <InputLabel id="availability-label" shrink sx={{ "&.Mui-focused": {color: "#eb851e"}}}>
            Availability
          </InputLabel>
          <Select
            labelId="availability-label"
            name="isavaliable"
            value={filterData.isavaliable}
            onChange={handleInputChange}
            label="Availability"
            sx={selectStyles}
            displayEmpty
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Not Available</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "auto",
            height: "80%",
            alignSelf: "center",
          }}
          onClick={sendFilters}
        >
          Search
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "auto",
            height: "80%",
            alignSelf: "center",
          }}
          onClick={() => {
            setFilterData({
              sort: "", category: "", isavaliable: ""
            });
            setTimeout(() => {
              sendFilters();
            }, 100);
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default StoreFilters;
