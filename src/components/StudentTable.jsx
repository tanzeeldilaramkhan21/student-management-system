import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig'
import UpdateStudentDialog from './UpdateStudentDialog';
import { useState } from 'react';

export default function StudentTable({stdents,setStdents}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
    // update student
    function handleUpdateStudent(studentId){
       const student = stdents.find(s=>s.id === studentId )
       setCurrentStudent(student)
       setEditDialogOpen(true)

    }

   async function handleSaveStudent(){
      const studentDoc = doc(db,'stdents', currentStudent.id)
       await updateDoc(studentDoc, {
            name: currentStudent.name,
         age: currentStudent.age
       })
     setStdents(stdents.map((student)=>student.id === currentStudent.id  ?
      currentStudent: student))
       handleDialogClose()
     }
    // delete student
   async function handleDeleteStudent(studentId){
   const studentDoc = doc(db,'stdents',studentId)
   await deleteDoc(studentDoc)
// setStudents
setStdents(stdents.filter((student)=>student.id !==studentId))
    }
    // close update dialog
function handleDialogClose(){
  setEditDialogOpen(false)
  setCurrentStudent(null)
}

// handle change in dialog values
function handleChange(event){
  const {name, value} = event.target;
  setCurrentStudent((prev)=>({
    ...prev,
     [name]:value
   }))

}
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Roll No</TableCell>
            <TableCell align="center">Student Name</TableCell>
            <TableCell align="center">Student Age</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stdents.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {student.rollNo}
              </TableCell>
              <TableCell align="center">{student.name}</TableCell>
              <TableCell align="center">{student.age}</TableCell>
              <TableCell align="center">
                <EditIcon onClick={()=>handleUpdateStudent(student.id)} style={{cursor:'pointer',color:'#007bff',marginRight:10}}/>
                <DeleteIcon onClick={()=>handleDeleteStudent(student.id)}  style={{cursor:'pointer',color:'crimson'}}/>

</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <UpdateStudentDialog
      editDialogOpen={editDialogOpen} 
      currentStudent={currentStudent} 
      handleDialogClose={handleDialogClose}
      handleChange={handleChange}
       handleSaveStudent={handleSaveStudent}
      /> 
    </>
  );
}