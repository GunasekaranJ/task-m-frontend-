import React from 'react'
import { useState } from 'react'
import styles from './Todolist.module.css'
import trash from './dustbin.png'
import pencil from './pencil.png'

function Todolist({id,title,description,deleteTodo,onToggle,isdone}) {

  const complete = () => {
     onToggle(id, !isdone)
  }

  return (
    <>
       <div className={styles.todoBox}
       style={{
        backgroundColor: isdone ? 'rgba(0, 255, 0, 0.3)' : 'rgba(212, 210, 252, 1)'
      }}>
            <input type="checkbox" 
              checked={isdone}
              onChange={complete}/>

            <div className={styles.texts}>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>    
            <img src={trash} onClick={()=>deleteTodo(id)} alt="" />
       </div>
      
    </>
  )
}

export default Todolist
