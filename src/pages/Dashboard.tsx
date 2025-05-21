// pages/Dashboard.tsx
import useAuthGuard from "@/hooks/useAuthGuard";
import { useState } from "react";

const dummyStudents = [
  {
    fullName: "Jane Doe",
    email: "jane@example.com",
    tel: "08012345678",
    course: "Frontend",
    ownLaptop: "Yes",
  },
  {
    fullName: "John Smith",
    email: "john@example.com",
    tel: "08098765432",
    course: "Backend",
    ownLaptop: "No",
  },
];

const dummyPartners = [
  {
    name: "Alice Partner",
    email: "alice@corp.com",
    phone: "0805551111",
    message: "Sponsorship offer.",
  },
  {
    name: "Bob NGO",
    email: "bob@ngo.org",
    phone: "0804442222",
    message: "Free workshop proposal.",
  },
];

const Dashboard = () => {
  useAuthGuard();
  const [view, setView] = useState<"students" | "partners">("students");

  return (
    <section className="p-6 max-w-5xl mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button
          className="text-sm text-red-600"
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("students")}
          className={`px-4 py-2 rounded-lg text-sm ${
            view === "students" ? "bg-primary text-white" : "bg-gray-100"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setView("partners")}
          className={`px-4 py-2 rounded-lg text-sm ${
            view === "partners" ? "bg-primary text-white" : "bg-gray-100"
          }`}
        >
          Partners
        </button>
      </div>

      <div className="overflow-x-auto">
        {view === "students" ? (
          <table className="w-full font-satoshi text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr className="">
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Laptop</th>
              </tr>
            </thead>
            <tbody>
              {dummyStudents.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{s.fullName}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.tel}</td>
                  <td className="px-4 py-2">{s.course}</td>
                  <td className="px-4 py-2">{s.ownLaptop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full font-satoshi text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {dummyPartners.map((p, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.phone}</td>
                  <td className="px-4 py-2">{p.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
