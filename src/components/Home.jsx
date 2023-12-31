import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/NoteContext'


function Home() {
  const provider=useContext(NoteContext)
  useEffect(()=>{
    console.log("Provider is "+provider);
},[]);
  const {notes,setNote}=provider;
  return (
    <div>
      <div className='container my-3'>
        <h2>Add a note</h2>
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

      </div>
      <div className='container my-3'>
        <h2>You Notes</h2>  
        <div>
            {notes.map((item)=>{return item.title})}
        </div>

      </div>
    </div>
  )
}

export default Home