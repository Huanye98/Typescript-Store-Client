import service from "./service/service.config";

const addToCart = async (itemId, quantity,userId,cartId) => {
  const payload = {
    product_id: itemId,
    quantity:quantity,
    user_id: userId,
    cart_id: cartId
  };
  console.log(payload)
  try {
    const response = await service.post("/users/cart", payload);
    console.log("product added")
    return { success: true, data: response.data }
  } catch (error) {
    console.log("was not able to add to cart", error);
    return { success: false, error: error.response?.data || error.message }
  }
};

const doPasswordsMatch = (password: string,repeatPassword:string)=>{

  if(password === repeatPassword){
    return true
  }else{
    return false
  }
  
}

const utils = {addToCart, doPasswordsMatch}
export default utils;
