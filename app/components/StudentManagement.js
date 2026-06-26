"use client";

import { useState } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

export default function StudentManagement({ students, page,
  totalPages, }) {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <>
     <StudentForm
      student={selectedStudent}
      setSelectedStudent={setSelectedStudent}
    />

      <StudentTable
        students={students}
        page={page}
        totalPages={totalPages}
        setSelectedStudent={setSelectedStudent}
      />
    </>
  );
}