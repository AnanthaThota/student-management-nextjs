import Navbar from "../app/components/Navbar";
import StudentManagement from "../app/components/StudentManagement";
import { prisma } from "../app/lib/prisma";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  // Next.js 16
  const params = await searchParams;

  // Search
  const search = params?.search || "";

  // Pagination
  const page = Number(params?.page || 1);
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  // Search Filter
  const where = {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
      {
        course: {
          contains: search,
          mode: "insensitive" as const,
        },
      },
    ],
  };

  // Total Students Count
  const totalStudents = await prisma.student.count({
    where,
  });

  // Fetch Students
  const students = await prisma.student.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: pageSize,
  });

  // Total Pages
  const totalPages = Math.ceil(totalStudents / pageSize);

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <StudentManagement
        students={students}
        page={page}
        totalPages={totalPages}
      />
    </main>
  );
}