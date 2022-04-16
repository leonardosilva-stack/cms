import Header from './Header'
import React, {useState,useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function ProductList() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        getData();
    },[])

    async function deleteOperation(id){
        let result = await fetch("http://localhost:8000/api/delete/"+id,{
            method:'DELETE'
        });
        result = await result.json();
        getData();
    }

    async function getData(){
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result);
    }

    async function search(key){
        let result = await fetch("http://localhost:8000/api/search/"+key);

        if(key){
            result = await result.json();
            setData(result);
        }
        else{
            getData()
        }

    }

    return (
        <div>
            <Header />
            <h1>Product List</h1>
            
            <div className="col-sm-8 offset-sm-2">
            <input type="text" onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Product" />
            <Table>
                <tbody>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operations</td>
                    
                </tr>
                {
                    data.map( (item,key)=> 
                        <tr key={key}>
                        <td >{item.id}</td>
                        <td >{item.name}</td>
                        <td >{item.price}</td>
                        <td >{item.description}</td>
                        <td ><img style={{width:100}} src={ "http://localhost:8000/" + item.file_path }/></td>
                        <td >
                            <Link  to={"update/"+item.id}> <span className="update">Update</span></Link> <span onClick={()=>deleteOperation(item.id)} className="delete">Delete</span></td>
                    </tr>
                    )
                }
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default ProductList;