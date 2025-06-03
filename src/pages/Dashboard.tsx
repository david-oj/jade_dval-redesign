// pages/Dashboard.tsx
import useAuthGuard from "@/hooks/useAuthGuard";
import { useEffect, useState } from "react";
import { Button } from "@/components";
import { API_BASE } from "@/lib/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Student = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  haveALaptop: boolean;
};

type Partner = {
  name: string;
  email: string;
  phone: string;
  howWouldYouLikeToPartner: string;
};

const Dashboard: React.FC = () => {
  useAuthGuard();
  const [view, setView] = useState<"students" | "partners">("students");
  const [students, setStudents] = useState<Student[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          fetch(`${API_BASE}/students`),
          fetch(`${API_BASE}/partners`),
        ]);
        const [sData, pData] = await Promise.all([sRes.json(), pRes.json()]);

        if (!sRes.ok)
          throw new Error(sData.message || "Failed to fetch students");
        if (!pRes.ok)
          throw new Error(pData.message || "Failed to fetch partners");

        setStudents(sData);
        setPartners(pData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Export functions
  const exportPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const title =
      view === "students" ? "Registered Students" : "Partnership Offers";
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    if (view === "students") {
      const head = [["No","Full Name", "Email", "Phone", "Interest"]];
      const body = students.map((s, i) => [
        i + 1,
        s.fullName,
        s.email,
        s.phone,
        s.interest,
      ]);
      autoTable(doc, {
        startY: 30,
        head,
        body,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 101, 255] },
      });
    } else {
      const head = [["No","Name", "Email", "Phone", "Message"]];
      const body = partners.map((p, i) => [
        i + 1,
        p.name,
        p.email,
        p.phone,
        p.howWouldYouLikeToPartner,
      ]);
      autoTable(doc, {
        startY: 30,
        head,
        body,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 101, 255] },
      });
    }

    doc.save(`${title.replace(/ /g, "-")}.pdf`);
  };

  const exportExcel = () => {
    let data = [];
    let fileName = "";

    if (view === "students") {
      data = students.map((s, i) => ({
        No: i + 1,
        "Full Name": s.fullName,
        Email: s.email,
        Phone: s.phone,
        Interest: s.interest,
      }));
      fileName = "registered-students.xlsx";
    } else {
      data = partners.map((p, i) => ({
        No: i + 1,
        Name: p.name,
        Email: p.email,
        Phone: p.phone,
        Message: p.howWouldYouLikeToPartner,
      }));
      fileName = "partnership-offers.xlsx";
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, titleCase(view));

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  // Helper to Title Case sheet name
  const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <section className="p-6 max-w-5xl mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button
          className="text-sm text-red-600 hover:cursor-pointer hover:underline"
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
            <span className="text-2xl font-bold text-primary block">
              {partners.length}
            </span>
            <span className="text-gray-600 text-sm">Partnership Offers</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        {/* section View toggle buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => setView("students")}
            className={`px-4 py-2 rounded-lg text-sm ${
              view === "students" ? "bg-primary text-white" : "bg-gray-100"
            }`}
            bgColor=""
            textColor=""
          >
            Students
          </Button>
          <Button
            onClick={() => setView("partners")}
            className={`px-4 py-2 rounded-lg text-sm ${
              view === "partners" ? "bg-primary text-white" : "bg-gray-100"
            }`}
            bgColor=""
            textColor=""
          >
            Partners
          </Button>
        </div>
        {/* Export buttons */}
        <div className="relative group flex gap-4">
        <button className="hover:cursor-pointer text-sm hover:underline hover:text-primary transition ">Download</button>
          <div className="absolute overflow-hidden hidden md:group-hover:flex transition max-md:group-focus-within:flex flex-col top-9 right-0 rounded-lg bg-white">
            <button
              onClick={exportPdf}
              className="px-4 py-2 border-b-2 text-sm active:text-white hover:text-white hover:bg-blue-700 active:bg-blue-700"
            >
              Export PDF
            </button>
            <button
              onClick={exportExcel}
              className="px-4 py-2 whitespace-nowrap text-sm hover:text-white active:text-white hover:bg-green-700 active:bg-green-700"
            >
              Export Excel
            </button>
          </div>
        </div>
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
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Laptop</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{s.fullName}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2 line-clamp-3 max-h-[calc(1.5rem*3)]">
                    {s.interest}
                  </td>
                  <td className="px-4 py-2]">{s.haveALaptop ? "Yes" : "No"}</td>
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
                  <td className="px-4 py-2 line-clamp-3 max-h-[calc(1.5rem*3)]">
                    {p.howWouldYouLikeToPartner}
                  </td>
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
