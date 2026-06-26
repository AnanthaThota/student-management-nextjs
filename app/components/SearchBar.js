"use client";

import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({
  placeholder = "Search...",
  className = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
      params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={`relative ${className}`}>
      <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

      <input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
      />
    </div>
  );
}