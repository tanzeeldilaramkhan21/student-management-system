
import StudentTable from "./StudentTable";

function StudentList({stdents,setStdents}){
  return (
    <>
    <h1>Student List</h1>
    
      <StudentTable stdents={stdents} setStdents={setStdents}
      />
    </>
  );
}
export default StudentList;