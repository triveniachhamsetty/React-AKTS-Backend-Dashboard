import React,{useState,useEffect} from 'react'
import { API_URL } from '../APICREATIONS/ApiPath';

const AllProducts= () => {
  const [products, setProducts] = useState([]);
  const productHandler = async()=>{
    const firmId = localStorage.getItem('firmId');
    try{
      const response = await fetch(`${API_URL}/products/${firmId}/products`);
      //Assign response to assign new response using json
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log(newProductsData);
    }
    catch(error){
      console.error("failed to featch products", error);
      alert("failed to featch products");

    }
  }
  //useEffect is upadate documents. jarigina changes ni update manam chasina changes mana page refresh chastundi.execution ni control lo petukovali ante manam oka EMPTY DEPENDENCY ([]) NI evalli. upadate chasina data ni okasari refresh avutundi. 
  useEffect(()=>{
    productHandler()
    console.log("This is Effect")
  }, [])
  const deleteProductById = async(productId)=>{
    try{
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE'
      })
      if(response.ok){
        setProducts(products.filter(product=>product._id !== productId));
        confirm("ARE YOU SURE, YOU WANT TO DELETE THE PRODUCT ?")
        alert('product deleted Successfully')
      }

    }catch(error){
      console.error("failed to delete product");
      alert("failed to delete product");

    }

  }

  return (
    <div>
      {!products ? (
        <p>No Products added</p>

      ): (
        <table className='product-table'>
          <thead>
            <tr>
              <th>ProductName</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item)=>{
              return (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.image && (
                    <img src={`${API_URL}/uploads/${item.image}`}
                    alt={item.productName}
                    style={{width:'50px', height: '50px'}}
                   />
                   )}
                  </td>
                  <td>
                    <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                  </td>
                </tr>
              )

            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts