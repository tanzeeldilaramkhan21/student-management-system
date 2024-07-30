import {collection, getDocs } from 'firebase/firestore';
import './App.css'
import CreateStudent from './components/CreateStudent'
import StudentList from './components/StudentList'
import { useEffect, useState } from 'react';
import { db } from './firebaseConfig';

function App() {
  const [stdents, setStdents] = useState([]);
  const getStudents = async()=>{
    
    const studentsCollection = collection(db, 'stdents');
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map(doc =>(
      {
        id: doc.id,
        ...doc.data()
      }
    
    ));
    setStdents(studentList);
  };
  useEffect(() => {
    getStudents();
  }, [stdents]); // Empty array as a second argument to run the effect only once


  return (
    <div className='app-container'>
      <h1 className='app-title'>Student Management System</h1>
      <CreateStudent getStudents={getStudents} />
      <StudentList stdents={stdents} setStdents={setStdents} />
      </div>
    
  )}
      

export default App
