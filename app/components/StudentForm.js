"use client";
import { toast } from "react-hot-toast";
import { useActionState ,useEffect,useRef} from "react";
import { saveStudent } from "../actions/StudentAction";
const initialState = {
  success: false,
  message: "",
};

export default function StudentForm({
  student = null,
  setSelectedStudent,
}) {
  const [state, formAction, pending] = useActionState(
    saveStudent,
    initialState
  );


  const formRef = useRef(null);
useEffect(() => {
  if (!state.message) return;

  if (state.success) {
    toast.success(state.message);

    formRef.current?.reset();

    // Exit edit mode
    setSelectedStudent(null);
  } else {
    toast.error(state.message);
  }
}, [state, setSelectedStudent]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {student ? "Update Student" : "Add New Student"}
        </h2>

        <form
           ref={formRef}
          action={formAction}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Hidden Id */}
          {student && (
            <input
              type="hidden"
              name="id"
              defaultValue={student.id}

            />
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Name
            </label>

            <input
              name="name"
              type="text"
              defaultValue={student?.name || ""}
              placeholder="Enter student name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Email
            </label>

            <input
              name="email"
              type="email"
              defaultValue={student?.email || ""}
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black">
              Course
            </label>

            <input
              name="course"
              type="text"
              defaultValue={student?.course || ""}
              placeholder="Enter course"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
            >
              {pending
                ? "Saving..."
                : student
                ? "Update Student"
                : "Add Student"}
            </button>
          </div>

        </form>

        {/* Success / Error Message */}
        {/* {state.message && (
          <p
            className={`mt-4 text-center font-medium ${
              state.success
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )} */}

      </div>
    </section>
  );
}