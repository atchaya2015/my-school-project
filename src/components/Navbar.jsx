"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        
       
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

       
        <div className="hidden md:flex gap-x-8">
          <Link href="/addschool" className="text-gray-700 hover:text-blue-600 font-medium">
            Add School
          </Link>
          <Link href="/showschools" className="text-gray-700 hover:text-blue-600 font-medium">
            View Schools
          </Link>
        </div>

       
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-600"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-2 bg-white shadow-md">
          <Link
            href="/addschool"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Add School
          </Link>
          <Link
            href="/showschools"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            View Schools
          </Link>
        </div>
      )}
    </nav>
  );
}
