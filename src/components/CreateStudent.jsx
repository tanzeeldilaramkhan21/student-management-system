import { addDoc, collection } from 'firebase/firestore'
import { useState } from "react"
import { db } from '../firebaseConfig'

function CreateStudent(getStudents) {
    const [rollNo, setRollNo] =useState('')
    const [name, setName] =useState('')
    const [age, setAge] =useState('')
const [isCreatingStudent,setIsCreatingStudent] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setIsCreatingStudent(true)
            await addDoc(collection(db,'stdents'),{
                rollNo: Number (rollNo),
                name: name,
                age: Number(age)
            })
            setRollNo('')
            setName('')
            setAge('')
            setIsCreatingStudent(false)
            await getStudents()
        } catch (error) {
            console.log("Error creating user:",error)
            setIsCreatingStudent(false)
        }
    }
  return (
   <form onSubmit={handleSubmit} className="form">
    <input type="number" value={rollNo} onChange={(e)=>setRollNo(e.target.value)}
     placeholder="Enter student rollNo"required/>
    <input type="text"  value={name} onChange={(e)=>setName(e.target.value)}
    placeholder="Enter student name"required />
    <input type="number" value={age} onChange={(e)=>setAge(e.target.value)}
     placeholder="Enter student age"required/>
     <button type="submit">{isCreatingStudent ?'Creating....':'Create Student'}</button>
   </form>
  )
}

export default CreateStudent
