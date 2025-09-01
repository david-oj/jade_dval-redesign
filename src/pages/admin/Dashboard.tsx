import { Users, Handshake } from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { StudentsTable } from "@/components/admin/dashboard/StudentsTable";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { Students, Partners } from "@/types/types";

interface DashboardType {
  students: Students[];
  partners: Partners[];
}

export type FetchState = "idle" | "loading" | "success" | "error";

export default function Overview() {
  const [dashboardData, setDashboardData] = useState<DashboardType>({
    students: [],
    partners: [],
  });
  const [fetchState, setFetchState] = useState<FetchState>("loading");

  const fetchDashboardData = async () => {
    setFetchState("loading");

    try {
      const [sRes, pRes] = await Promise.all([
        fetch(`${API_BASE}/students`),
        fetch(`${API_BASE}/partners`),
      ]);

      console.log("The code reached Error!");
      if (!sRes.ok || !pRes.ok) {
        const [sErr, pErr] = await Promise.all([sRes.json(), pRes.json()]);
        throw new Error(sErr.message || pErr.message || "Failed to fetch data");
      }

      const [sData, pData] = await Promise.all([sRes.json(), pRes.json()]);

      setDashboardData({
        students: sData,
        partners: pData,
      });
      setFetchState("success");
    } catch (e) {
      console.log(e);
      setFetchState("error");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your academy.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Registrations"
          value={dashboardData.students.length}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Partnership Offers"
          value={dashboardData.partners.length}
          icon={<Handshake className="h-6 w-6" />}
        />
      </div>

      {/* Data Table */}
      <StudentsTable
        tableData={dashboardData}
        fetchState={fetchState}
        fetchTableData={fetchDashboardData}
      />
    </div>
  );
}
