import { useState } from "react";
import Nav from "../../Components/Nav";
import service from "../../service/service.config";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Select, MenuItem, Button, FormControl, InputLabel, CircularProgress,Typography, Container } from '@mui/material';

function Admin() {
  const defaultFormData = {
    name: "",
    price: 0,
    description: "",
    isavaliable: "false",
    discountvalue: 0,
    imageurl: "",
    category: "",
    collection_id: 1,
    is_featured: "false",
    stock: 0,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const postFormData = async () => {
    try {
      const response = await service.post("/products/create", formData);
      console.log("product created successfully", response.data);
      setFormData(defaultFormData);
    } catch (error) {
      console.log("failed to upload response", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "number" && name !== "price"
          ? +value 
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted", formData);
    postFormData();
  };

  const handleFileUpload = async (event:React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) {
      return;
    }
    const file = files[0]
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", file);
    console.log(file)
    try {
      const response = await service.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload/`,
        uploadData
      );
      setImageUrl(response.data.imageUrl);
      setFormData((prev) => ({
        ...prev,
        imageurl: response.data.imageUrl,
      }));
    } catch (error) {
      console.error("Error during file upload:", error);
      navigate("/error");
    }finally{
      setIsUploading(false);
    }
  };

  return (
    <>
      <Nav />
      <Typography variant="h3">Create new product</Typography>
      <Container >
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Product Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>

          {/* Product Price */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Product Price"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>

          {/* Description */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Description"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          {/* Availability */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="isavaliable-label">Availability</InputLabel>
              <Select
                labelId="isavaliable-label"
                id="isavaliable"
                name="isavaliable"
                value={formData.isavaliable}
                onChange={()=>handleInputChange}
                label="Availability"
              >
                <MenuItem value="true">Available</MenuItem>
                <MenuItem value="false">Not Available</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Featured */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="is_featured-label">Featured</InputLabel>
              <Select
                labelId="is_featured-label"
                id="is_featured"
                name="is_featured"
                value={formData.is_featured}
                onChange={()=>handleInputChange}
                label="Featured"
              >
                <MenuItem value="true">Featured</MenuItem>
                <MenuItem value="false">Not Featured</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Category */}
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={()=>handleInputChange}
                label="Category"
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Apparel">Apparel</MenuItem>
                <MenuItem value="Home goods">Home goods</MenuItem>
                <MenuItem value='Digital goods'>Digital goods</MenuItem>
                <MenuItem value="Print">Print</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Discount Value */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography sx={{color:"grey"}}> *Discount example: 0.2 = 20% off</Typography>
            <TextField
              label="Discount Value"
              type="number"
              id="discountvalue"
              name="discountvalue"
              value={formData.discountvalue}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          {/* Collection ID */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Collection ID"
              type="number"
              id="collection_id"
              name="collection_id"
              value={formData.collection_id}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          {/* Stock */}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Stock"
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ marginBottom: 2 }}>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {isUploading && <CircularProgress size={24} />}
            {imageUrl && (
              <Box sx={{ marginTop: 2 }}>
                <img src={imageUrl} alt="img" width={200} />
              </Box>
            )}
          </Box>

          {/* Submit Button */}
          <Button variant="contained" type="submit" fullWidth>Submit</Button>
        </form>
      </Container>
    </>
  );
}

export default Admin;
