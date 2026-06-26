"use server"



import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";


export async function saveStudent(prevState, formData) {
  try {
    const id = formData.get("id");

    const name = formData.get("name");
    const email = formData.get("email");
    const course = formData.get("course");

    if (!name || !email || !course) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // UPDATE
    if (id) {

      const existingStudent = await prisma.student.findFirst({
        where: {
          email,
          NOT: {
            id: Number(id),
          },
        },
      });

      if (existingStudent) {
        return {
          success: false,
          message: "A student with this email already exists.",
        };
      }

      await prisma.student.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          email,
          course,
        },
      });

      revalidatePath("/");

      return {
        success: true,
        message: "Student updated successfully.",
      };
    }

    // CREATE

    const existingStudent = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (existingStudent) {
      return {
        success: false,
        message: "A student with this email already exists.",
      };
    }

    await prisma.student.create({
      data: {
        name,
        email,
        course,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Student added successfully.",
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}


export async function deleteStudent(id) {
  try {
    await prisma.student.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete student.",
    };
  }
}