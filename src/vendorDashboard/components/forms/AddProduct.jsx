import React, {useState} from 'react'
import { API_URL } from '../../APICREATIONS/ApiPath';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");


  const handleCategoryChange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value));
    }
    else{
      setCategory([...category, value])
    }
  }
  const handleBestSeller = (event)=>{
    const value = event.target.value ==='true'
    setBestSeller(value)

  }
  const handlerImageUpload= (event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage)

  }
  const handleAddProduct = async(e)=>{
    e.preventDefault()
    try{
      const loginToken =localStorage.getItem('loginToken')
      const firmId = localStorage.getItem('firmId')
      if(!loginToken || !firmId){
        console.error('user not autheticated')
      }
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      category.forEach((value)=>{
        formData.append('category', value)
      });
      const response = await fetch(`${API_URL}/products/add-product/${firmId}`, {
    method: 'POST',
    body: formData
});


const contentType = response.headers.get("content-type");
if (contentType && contentType.includes("application/json")) {

const data = await response.json()
      if(response.ok){
        alert('product added successfully')
        console.log(data);
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setDescription("");
        setImage(null);
      }
    }
    else {
     const errorText = await response.text();
      console.error("Unexpected response:", errorText);
      alert("Server returned an unexpected response");
}   }catch(error){
      //console.error(error);
      alert('failed to add product')

    }
  }
  return (
    <div className="productSection">
      <form className="productForm" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label>Product Name</label><br />
        <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} /><br />
        <label>Price</label><br />
        <input type="number" placeholder='Enter product price' value={price} onChange={(e)=>setPrice(e.target.value)} /><br />
        <div className="check-inp">
        <label>Category</label>
        <div className="radioContainer">
        <label><input type="checkbox" name="category" value="veg" checked={category.includes("veg")} onChange={handleCategoryChange}  /> Veg</label>
        <label><input type="checkbox" name="category" value="non-veg" checked={category.includes("non-veg")} onChange={handleCategoryChange} /> Non-Veg</label>
        <label><input type="checkbox" name="category" value="both" checked={category.includes("both")} onChange={handleCategoryChange} /> Both</label>
        </div>
        </div>
        <div className="sellerInp">
          <label>Best Seller</label>
          <div className="sellerContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input type="radio" value="true" checked={bestSeller=== true} onChange={handleBestSeller} />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input type="radio" value="false" checked={bestSeller=== false} onChange={handleBestSeller} />
            </div>
          </div>
        </div><br />
        <label>Description</label><br />
        <input type="text" placeholder='Enter product description' value={description} onChange={(e)=>setDescription(e.target.value)} /><br />
        <label>Product Image</label><br />
        <input type="file" onChange={handlerImageUpload} /><br />
        <div className="btnSubmit"><br />
          <button type="submit">Submit</button>
        </div>


      </form>
    </div>
  )
}

export default AddProduct