"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage);

    router.push(`/?${params.toString()}`);
  };

  return (
  <div className="flex justify-center items-center gap-2 mt-6">

  <button
    disabled={page === 1}
    onClick={() => changePage(page - 1)}
    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => changePage(index + 1)}
      className={`px-4 py-2 rounded font-medium ${
        page === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages}
    onClick={() => changePage(page + 1)}
    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
  );
}