
import React, { useContext, useState } from 'react'
import { data } from '../../assets/data'
import './Images.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserContext from '../../context/UserContext';
export default function ImageGallery() {
  // Accessing images and setImages from the UserContext using useContext hook
    const {images,setImages}=useContext(UserContext)
    // Counting the number of selected images
    const countSelection=images.filter(img=>img.isSelected).length
     // Checking if any images are selected
    const checkSelection=countSelection>0?true:false
    // Function to handle the change in selection status of an image
    const handleChange=(id)=>{
        setImages(prev=>prev.map(img=>img.id===id?{...img,isSelected:!img.isSelected}:{...img})  
      )
    }
    // Function to handle the change in selection status of an image
    const handleDrag=(results)=>{
      if(!results.destination) return
      const items=Array.from(images)
      const [reorder]=items.splice(results.source.index,1)
      items.splice(results.destination.index,0,reorder)
      setImages(items)

    }
   
  return (
    <div> 
       <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="images" direction="horizontal">     
         {(provided,snapshot)=>(   
          <div className='container' {...provided.droppableProps} ref={provided.innerRef}> 
          <ul className='image_items' >
            {images.map((image,index)=>{
               return(
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided,snapshot)=>(
                    <div className={`image_check ${image.isSelected ? 'selected-image' : ''}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                     <li>
                      <input type='checkbox' name="check" onChange={()=>handleChange(image.id)}/>
                      <img src={image.imgSrc} alt='image'  />
                     </li>
                    </div>
                  )}
                </Draggable>
              ) 
        })}
           <li>
            <form onClick={()=>document.querySelector('.input_file').click()}>
              <input type='file' accept='image/*' className='input_file' hidden/>
              <AddPhotoAlternateIcon size={60} />
              <label>Add Images</label>
            </form>
           </li>
          </ul>
    </div>
      )} 
    </Droppable>
    </DragDropContext>
    </div>
  )
}
