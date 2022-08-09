import { useLocation,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UpdateUser() {
  const location = useLocation();
  const navigate=useNavigate();
  const [user,setUser]=useState({name:'',address:"",designation:""})
  
  useEffect(() => {
    const params = location.pathname.split("/");
    const id = params[params.length - 1];
    const getData=async()=>{
        let resp=await axios.get(`http://localhost:5000/user/${id}`)
        setUser({...user,name:resp.data.user.name,address:resp.data.user.address,designation:resp.data.user.designation})
    }
    getData();
  },[]);

  const handleUpdate=async()=>{
    const params = location.pathname.split("/");
    const id = params[params.length - 1];
    let resp=await axios.put(`http://localhost:5000/user/${id}`,user)
    if(resp.data.status==='success'){
        alert('user updated successfully navigating back to home page')
        navigate('/')
    }
  }

  return <>
   <h1>
        Name:{" "}
        <input
          type="text"
          onChange={(e) => {
            setUser({
              ...user,
              name: e.target.value,
            });
          }}
          value={user.name}
        />
      </h1>
      <h1>
        Address:{" "}
        <input
          type="text"
          onChange={(e) => {
            setUser({
              ...user,
              address: e.target.value,
            });
          }}
          value={user.address}
        />
      </h1>
      <h1>
        Designation:{" "}
        <input
          type="text"
          onChange={(e) => {
            setUser({
              ...user,
              designation: e.target.value,
            });
          }}
          value={user.designation}
        />
      </h1>
      <h1><button onClick={()=>{
        handleUpdate()
      }}>Update user</button></h1>
     </>;
}

export default UpdateUser;
