import React from 'react'

const UpdateNote = (id) => {
  return (
    <>
     const note=Note.findById(id);
    <form>
       <input name='title' value={note.title}/>
       <input name='date' value={note.date}/>
       <input name='description' value={note.description}/>
    </form>
    </>
   
  )
}

export default UpdateNote