import React, { useContext } from 'react'
import './Header.css'
import UserContext from '../../context/UserContext'

export default function Header() {
  // Accessing images and setImages from the UserContext using useContext hook
  const  {images,setImages}=useContext(UserContext)
  // Counting the number of selected images
  const countSelection=images.filter(img=>img.isSelected).length
   // Checking if any images are selected
  const checkSelection=countSelection>0?true:false
  // Function to handle the deletion of selected images
  const handleDelete=()=>{
    // Filtering out the selected images and updating the state
    const filter=images.filter(img=>!img.isSelected)
    setImages(prev=>filter)
  }
  return (
    <div className='header'>
      {!checkSelection ? (<h4> Gallery</h4>): 
      (
      <>
      <input type='checkbox' checked={true}/>
      <p>{`${countSelection} ${countSelection>1?"files":"file"} selected`}</p>
      <button className='btn_delete' onClick={handleDelete}>Delete files</button></>
      )
      }
      
    </div>
    
  )
}
