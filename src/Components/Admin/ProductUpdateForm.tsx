import { useState } from "react";
import service from "../../service/service.config";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function ProductUpdateForm({ productId, handleDelete }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    discountValue: "",
    category: "",
    collection_Id: "",
    stock: "",
    is_Featured: "",
    isAvaliable: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendUpdateData();
    navigate(`/store`);
  };

  const sendUpdateData = async () => {
    if (!formData) {
      console.error("No update data was found");
      return;
    }
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    try {
      const response = await service.patch(
        `/products/${productId}`,
        sanitizedData
      );
      console.log("Product updated", response);
    } catch (error) {
      console.log("was not able to update products", error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    console.log(event.target.files[0]);
    try {
      const response = await service.post(
        "http://localhost:5005/api/upload/",
        uploadData
      );
      setImageUrl(response.data.imageUrl);
      setFormData((prev) => ({
        ...prev,
        imageurl: response.data.imageUrl,
      }));
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <Container sx={{display: "flex", maxWidth:"600px", flexDirection:"column", mx:"auto", gap:1, mb:3}} >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          maxWidth: "400px",
          mx: "auto", // Center the form horizontally
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 4,
        }}
      >
        <TextField
          label="name"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          fullWidth
          label="price"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <TextField
          label="despription"
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="discount value ie: 0.5"
          type="number"
          id="discountValue"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="category"
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="collection ID"
          type="text"
          id="collection_id"
          name="collection_id"
          value={formData.collection_Id}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="stock"
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Featured"
          type="text"
          id="is_Featured"
          name="is_Featured"
          value={formData.is_Featured}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Avaliability"
          type="text"
          id="isAvaliable"
          name="isAvaliable"
          value={formData.isAvaliable}
          onChange={handleInputChange}
          fullWidth
        />
        <Box>
          <Typography variant="body1">Image Url: </Typography>
          <TextField
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
            fullWidth
          />
        </Box>
        {isUploading ? <h3>... uploading image</h3> : null}
        {imageUrl ? (
          <Box>
            <img src={imageUrl} alt="img" width={200} />
          </Box>
        ) : null}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      <Button variant="contained" color="warning" onClick={handleDelete} sx={{ width:"400px", mx:"auto"}}>
        Delete product
      </Button>
    </Container>
  );
}

export default ProductUpdateForm;
