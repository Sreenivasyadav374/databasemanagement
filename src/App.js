import './index.css';
import datab from './data/data'
import { useState } from 'react';

function App() {
  const [data,setData]=useState(datab);
  const [current,setCurrent]=useState(data[0]?.id);
  const [showinp,setShowinp]=useState(false);
  const [inpdata,setInpData]=useState({name:"",last:"",contact:"",address:"",mail:""})
  const curr=data.length>0?data.filter((a)=>a.id===current)[0]:""
  
  
  function remove(each){
    if(data.length===1){

      setCurrent(-1)
      setData({})
    }

    else if(each.id===data[0].id){
      setCurrent(data[1].id);
      setData((prev)=>prev.filter((a)=>a.id!==each.id))
    }
    else{setData((prev)=>prev.filter((a)=>a.id!==each.id))
    setCurrent(data[0].id)
    }
    
    
    
  }
 function handlesubmit(e){
  e.preventDefault();
  setData([...data,{"id": data[data.length-1].id+1,
    "imageUrl": "https://cdn-icons-png.flaticon.com/512/0/93.png",
    "firstName": inpdata.name,
    "lastName": inpdata.last,
    "email": inpdata.mail,
    "contactNumber": inpdata.contact,
    "age": 43,
    "dob": "26/08/1979",
    "salary": 1,
    "address": inpdata.address}])
  setShowinp(false)
    
    
 }


  
  return (
    <div className="total">
      <header className='header'>
        <h1>Employee Database</h1>
        <button onClick={()=>setShowinp(true)}>Add Employee</button>
      </header>
      <div className="listandinfo">
        <div className='list'>
          <span>Employee List</span>
          <div className='listnames'>
          {data.length>0?data.map((each)=>
          <div className='singlelist'>
            <span onClick={()=>{setCurrent(each.id)}}>{each.firstName} {each.lastName}</span>
            <span className='closebutton' onClick={()=>remove(each)}>❌</span>
          </div>
          ):""}
          </div>
        </div>
        <div className='info'>
          <span>Employee Info</span>
          {current===-1?"":
          <div className='allinfo'>
       
            <img className="image" src={curr.imageUrl}/>
            <span>{curr.firstName} {curr.lastName}</span>
            <span>{curr.age}</span>
            <span>{curr.email}</span>
            <span>{curr.salary}</span>

          </div>}
        </div>
      </div>
      {showinp?
      <div className='addemp' onClick={(e)=>{if(e.target.className==='addemp'){setShowinp(false)}}}>
        <form className='addempcreate' onSubmit={(e)=>handlesubmit(e)}>
          <div className='headerforform'>
           <h2>Add a new Employee</h2>
          <span><button onClick={()=>setShowinp(false)}>❌</button></span>
          </div>
          <div>
            <input type="text" name="firstName" onChange={(e)=>{setInpData({...inpdata,name:e.target.value})}} placeholder="First Name" required/>
            <input type="text" name="lastName" onChange={(e)=>{setInpData({...inpdata,last:e.target.value})}} placeholder="Last Name" required/>
          </div>
          <input type="text" name="imageUrl" placeholder="Image URL (Optional)" />
          <input type="email" name="email" onChange={(e)=>{setInpData({...inpdata,mail:e.target.value})}} placeholder="Email" required/>
          <input type="number" name="contactNumber" onChange={(e)=>{setInpData({...inpdata,contact:e.target.value})}} placeholder="Contact" required/>
          <input type="number" name="salary" placeholder="Salary" required/>
          <input type="text" name="address" onChange={(e)=>{setInpData({...inpdata,address:e.target.value})}} placeholder="Address" required/>
          <input type="date" name="dob" placeholder="Date of Birth" class="addEmployee_create--dob" required/>
          <input type="submit" class="addempcreatesubmit" value="Submit"/>
        </form>
      </div>
      :""}
    </div>
  );
}

export default App;
