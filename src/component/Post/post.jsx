import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./post.css"

const Post = () => {
    const [title,setTitle] =useState("")
    const [description,setDescription] =useState("")
    const [status,setStatus] =useState("")
    const [id,setId] =useState("")
 
    const [modal,setModal] = useState(false)

    const [task,setTask] =useState([])

    const openModal =(_id) =>{
    setId(_id);
    setModal(true);
    }


    const deletetask = async(_id) =>{
        try {
            await axios.delete(`https://task-mange-backend.vercel.app/api/v1/delete/${_id}`)
            getAllPost();
            alert("task deleted")
        } catch (error) {
            console.error(error)
        }
    }

    const updateTask = async(e) =>{
        e.preventDefault();
        try {
             await axios.put(`https://task-mange-backend.vercel.app/api/v1/update/${id}`,{
                title,description,status,
             })
             setTitle("")
             setDescription("")
             setStatus("")
             setModal(false);
             getAllPost();
             alert("task updated")

        } catch (error) {
            console.error(error)
        }
    }

    const CreatePost = async(e) =>{
        e.preventDefault();
        try {
            await axios.post("https://task-mange-backend.vercel.app/api/v1/create",{
                title,description
            })
            setTitle("")
            setDescription("")
            getAllPost();
            alert("task created")
        } catch (error) {
            console.error(error)
        }
    }

    const getAllPost = async() =>{
        try {
            const {data} =  await axios.get("https://task-mange-backend.vercel.app/api/v1/getAllTask")
            console.log(data)
            setTask(data.task)
        } catch (error) {
            console.error(error)
        }
    }
useEffect(()=>{
  getAllPost();
},[])

  return (
    <div className='post'>

      <form onSubmit={CreatePost} className='createPost'>
         <input type="text" placeholder='enter the title' value={title} onChange={(e) => setTitle(e.target.value)} />
         <input type="text" placeholder='enter the description' value={description} onChange={(e) => setDescription(e.target.value)} />
       <button type='submit'>Create</button>
      </form>
      {task.map((t)=>(
        <div key={t._id} className='allPost'>
        <div>
        {/* <p>Name :</p> */}
        <p>title : <b>{t.title}</b> </p>
        <p>description : <b>{t.description}</b> </p>
        <p>statud : <b>{t.status} </b></p>
        <button onClick={()=>openModal(t._id)}>Update</button> <br /> <br />
        <button onClick={()=>deletetask(t._id)}>Delete</button> <br /> <br />
        {modal === true && (
            <form onSubmit={updateTask} className="createPost">
        <input type="text" placeholder='enter the title' value={title} onChange={(e) => setTitle(e.target.value)} />
         <input type="text" placeholder='enter the description' value={description} onChange={(e) => setDescription(e.target.value)} />
         <p>statue: <select defaultValue={status} onChange={(e)=>setStatus(e.target.value)} name="" id="">
             <option value="To do">To do</option>
             <option value="Doing">Doing</option>
             <option value="Done">Done</option>
             </select></p>
       <button type='submit'>Update</button>
       <button onClick={()=>setModal(false)}>Cancle</button>
            </form>
        )}
        </div>
       </div>
      ))}
    </div>
  )
}

export default Post
