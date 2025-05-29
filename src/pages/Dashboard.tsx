// pages/Dashboard.tsx
import useAuthGuard from "@/hooks/useAuthGuard";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import { API_BASE } from "@/lib/api";

type Students = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  // ownLaptop: string;
};

type Partners = {
  name: string;
  email: string;
  phone: string;
  howWouldYouLikeToPartner: string;
};


const Dashboard = () => {
  useAuthGuard();
  const [view, setView] = useState<"students" | "partners">("students");
  const [students, setStudents] = useState<Students[]>([]);
  const [partners, setPartners] = useState<Partners[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchstudents = async () => {
      try {
        const res = await fetch(`${API_BASE}/students`);
        const data = await res.json();

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch");
        }

        setStudents(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchstudents();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(`${API_BASE}/partners`);
        const data = await res.json();

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch");
        }

        setPartners(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [view]);

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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-primary/5 p-4 rounded-lg shadow-sm">
          <div className="font-satoshi">
            <span className="text-2xl font-bold text-primary block">
              {students.length}
            </span>
            <span className="text-gray-600 text-sm">Total Registrations</span>
          </div>
        </div>
        <div className="bg-primary/5 p-4 rounded-lg shadow-sm">
          <div className="font-satoshi">
            <span className="text-2xl font-bold text-primary block">{partners.length}</span>
            <span className="text-gray-600 text-sm">Partnership Offers</span>
          </div>
        </div>
      </div>

      {/* section View toggle buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setView("students")}
          className={`px-4 py-2 rounded-lg text-sm max-w-[82px] ${
            view === "students" ? "bg-primary text-white" : "bg-gray-100"
          }`}
          bgColor=""
          textColor=""
        >
          Students
        </Button>
        <Button
          onClick={() => setView("partners")}
          className={`px-4 py-2 rounded-lg text-sm max-w-[82px] ${
            view === "partners" ? "bg-primary text-white" : "bg-gray-100"
          }`}
          bgColor=""
          textColor=""
        >
          Partners
        </Button>
      </div>

      <div className="overflow-auto  max-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : view === "students" ? (
          <table className="w-full font-satoshi text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr className="">
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Laptop</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{s.firstName}</td>
                  <td className="px-4 py-2">{s.lastName}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2 line-clamp-3 max-h-[calc(1.5rem*3)]">{s.interest}</td>
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
              {partners.map((p, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.phone}</td>
                  <td className="px-4 py-2 line-clamp-3 max-h-[calc(1.5rem*3)]">{p.howWouldYouLikeToPartner}</td>
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
