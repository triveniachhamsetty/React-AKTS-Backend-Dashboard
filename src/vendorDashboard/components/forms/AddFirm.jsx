import React, {useState} from 'react'
import {API_URL} from '../../APICREATIONS/ApiPath'

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value));
    }
    else{
      setCategory([...category, value])
    }
  }
  const handleRegionChange = (event)=>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !==value));
    }
    else{
      setRegion([...region, value])
    }
  }
  const handlerImageUpload= (event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage)

  }

  const handleFirmSubmits= async(e)=>{
    e.preventDefault();
    try{
      const loginToken = localStorage.getItem('loginToken')
      if(!loginToken){
        console.error("User not authenticated");
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);
      region.forEach((value)=>{
        formData.append('region', value)
      });
      category.forEach((value)=>{
        formData.append('category', value)
      });

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });
      const data=await response.json()
      if(response.ok){
        console.log(data);
        //console.log("This is firm id",data.firmId );
        //if(data.firmId){
          //const mango = data.firmId;
          //localStorage.setItem('firmId', mango)    
        //}
        alert('Firm Added Successfully')
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }else if(data.message === "vendor can have only one firm"){
        alert("Firm Exits . only 1 firm can be added")
      }
      else{
        alert('failed to add firm');
      }
      console.log("This is firm id",data.firmId );
      const mango = data.firmId;
      const vendorRestuarant = data.vendorFirmName
      localStorage.setItem('firmId', mango) 
      localStorage.setItem('firmName', vendorRestuarant)
      //window.location.reload()  
    }catch(error){
      console.error('failed to add firm')

    }
  }
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmits}>
        <label>Firm Name</label><br />
        <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br />
        {/* Area */}
        <label>Area</label><br />
        <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)} /><br />

        {/* Category */}
        <div className="check-inp">
        <label>Category</label>
        <div className="radioContainer">
        <label><input type="checkbox" name="category" checked={category.includes("veg")} value="veg" onChange={handleCategoryChange} /> Veg</label>
        <label><input type="checkbox" name="category" checked={category.includes("non-veg")} value="non-veg" onChange={handleCategoryChange} /> Non-Veg</label>
        <label><input type="checkbox" name="category" checked={category.includes("both")} value="both" onChange={handleCategoryChange} /> Both</label>
        </div>
        </div>

        {/* Region */}
        <div className="check-region">
        <label>Region</label>
        <div className="regionContainer">
        <label><input type="checkbox" name="region" checked={region.includes("south-indian")} value="south-indian" onChange={handleRegionChange}  /> South-Indian</label>
        <label><input type="checkbox" name="region" checked={region.includes("north-indian")} value="north-indian" onChange={handleRegionChange}  /> North-Indian</label>
        <label><input type="checkbox" name="region" checked={region.includes("chinese")} value="chinese" onChange={handleRegionChange} /> Chinese</label>
        <label><input type="checkbox" name="region" checked={region.includes("bakery")} value="bakery" onChange={handleRegionChange}  /> Bakery</label>
        </div>
        </div>
        {/* Offer */}
        <label>Offer</label><br />
        <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}/><br />
        <label>Image</label><br />
        <input type="file" onChange={handlerImageUpload}/><br />
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddFirm;