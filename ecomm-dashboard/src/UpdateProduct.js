import Header from "./Header"
import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';

function UpdateProduct(id){

    const params = useParams();

    const [data,setData] = useState([]);
    const [name, setName]=useState("");
    const [file, setFile]=useState("");
    const [price, setPrice]=useState("");
    const [description, setDescription]=useState("");

    
    useEffect(async ()=>{
        let result = await fetch("http://localhost:8000/api/product/"+ params.id);
        result = await result.json();
        setData(result);
        setName(result.name);
        setFile(result.file);
        setPrice(result.price);
        setDescription(result.description);
    },[])


    async function editProduct(id){
        const formData = new FormData();
        formData.append('file',file);
        formData.append('price',price);
        formData.append('name',name);
        formData.append('description',description);
        
        let result = await fetch("http://localhost:8000/api/updateproduct/"+id+"?_method=PUT", {
            method: 'POST',
            body: formData
        });
        alert("Data has been updated");
    }


    return(
        <div>
            <Header />
            <h1>
                Update Product
            </h1>
            <div className="col-sm-3 offset-sm-5">
                < br />
                <input type="text" className="form-control" placeholder="name" onChange={(e)=>setName(e.target.value)} defaultValue={data.name}/>
                < br />
                <input type="file" className="form-control" placeholder="file" onChange={(e)=>setFile(e.target.files[0])} defaultValue={data.file_path}/>
                <img style={{width:100}} src={ "http://localhost:8000/" + data.file_path } />
                
                < br />
                <input type="text" className="form-control" placeholder="price" onChange={(e)=>setPrice(e.target.value)} defaultValue={data.price}/>
                < br />
                <input type="text" className="form-control" placeholder="description" onChange={(e)=>setDescription(e.target.value)} defaultValue={data.description}/>
                < br />
                <button onClick={()=>editProduct(data.id)} className="btn btn-primary">Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProduct