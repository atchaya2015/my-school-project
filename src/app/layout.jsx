import Link from "next/link";
import "../styles/globals.css";

export const metadata = {
  title: "School Directory",
  description: "Manage and view schools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">🏫 TechSchools</span>
          </div>
          <div className="flex gap-6">
            <Link href="/addSchool" className="text-gray-700 hover:text-blue-600 font-medium">
              Add School
            </Link>
            <Link href="/showSchools" className="text-gray-700 hover:text-blue-600 font-medium">
              View Schools
            </Link>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
