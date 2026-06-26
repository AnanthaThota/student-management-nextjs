"use client"

import { FaEdit, FaTrash } from "react-icons/fa";

import {deleteStudent} from '../actions/StudentAction'

import SearchBar from '../components/SearchBar'

import Pagination from '../components/Pagination'

// const students = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@gmail.com",
//     course: "React.js",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@gmail.com",
//     course: "Next.js",
//   },
//   {
//     id: 3,
//     name: "Rahul",
//     email: "rahul@gmail.com",
//     course: "JavaScript",
//   },
// ];

export default function StudentTable({ students,
  setSelectedStudent,
  page,
  totalPages,}) {

    const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) return;

  await deleteStudent(id);
};


const handleEdit = (student) => {
    console.log(student);

    setSelectedStudent(student);
}

  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

          <h2 className="text-3xl font-bold text-gray-800">
            Students List
          </h2>

         <SearchBar
  placeholder="Search Student..."
  className="w-full md:w-72"
/>

        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100">
    {/* <th className="p-3 text-left text-gray-800 font-semibold">#</th> */}
    <th className="p-3 text-left text-gray-800 font-semibold">Name</th>
    <th className="p-3 text-left text-gray-800 font-semibold">Email</th>
    <th className="p-3 text-left text-gray-800 font-semibold">Course</th>
    <th className="p-3 text-center text-gray-800 font-semibold">
      Actions
    </th>
  </tr>
            </thead>

            <tbody>

              {students.map((student,index) => (

                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition"
                >
{/* 
                 <td className="p-3 text-gray-700">
  {index + 1}
</td> */}

                  <td className="p-3 text-gray-700">{student.name}</td>

                  <td className="p-3 text-gray-700">{student.email}</td>

                  <td className="p-3 text-gray-700">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {student.course}
                    </span>
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-3">

                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg"  onClick={() => handleEdit(student)}>
                        <FaEdit />  
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"  onClick={() => handleDelete(student.id)}>
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
          

        </div>
        <Pagination
  page={page}
  totalPages={totalPages}
/>

      </div>
    </section>
  );
}