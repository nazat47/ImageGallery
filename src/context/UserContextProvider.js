import React, { useState } from 'react'
import UserContext from './UserContext'
import { data } from '../assets/data'

export default function UserContextProvider({children}) {
    const [images,setImages]=useState(data)
  return (
    <UserContext.Provider value={{images,setImages}}>
        {children}
    </UserContext.Provider>
  )
}
