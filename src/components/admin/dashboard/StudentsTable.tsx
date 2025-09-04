import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Handshake } from "lucide-react";
import { ExportDropdown } from "@/components/admin/dashboard/ExportDropdown";
import { Students, Partners } from "@/types/types";
import Loader from "@/components/Loader";
import ErrorUi from "@/components/ErrorUi";
import { FetchState } from "@/pages/admin/Dashboard";

interface TableProps {
  tableData: {
    students: Students[];
    partners: Partners[];
  };
  fetchState: FetchState;
  fetchTableData?: () => void;
}

export function StudentsTable({
  tableData,
  fetchState,
  fetchTableData,
}: TableProps) {
  const [activeTab, setActiveTab] = useState<"students" | "partners">(
    "students"
  );

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Registrations & Partners
          </CardTitle>
          <ExportDropdown
            data={{
              students: tableData.students,
              partners: tableData.partners,
            }}
            activeTab={activeTab}
          />
        </div>

        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "students" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("students")}
            className="relative"
          >
            <Users className="h-4 w-4 mr-2" />
            Students
          </Button>
          <Button
            variant={activeTab === "partners" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("partners")}
            className="relative mx-[8px]"
          >
            <Handshake className="h-4 w-4 mr-2" />
            Partners
          </Button>
        </div>
      </CardHeader>

      {fetchState === "loading" && <Loader />}

      {fetchState === "error" && (
        <ErrorUi
          onRetry={fetchTableData}
          message="Failed to load students. Please try again later."
          title="Unable to Load Students"
        />
      )}

      {fetchState === "success" && (
        <CardContent className="max-h-screen overflow-y-auto">
          {activeTab === "students" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Laptop</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.students.map((student, i) => (
                    <TableRow key={student._id}>
                      <TableCell>{i + 1}.</TableCell>
                      <TableCell className="font-medium">
                        {student.fullName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.email}
                      </TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.interest}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.haveALaptop ? "default" : "secondary"
                          }
                        >
                          {student.haveALaptop ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Proposal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.partners.map((partner) => (
                    <TableRow key={partner._id}>
                      <TableCell className="font-medium">
                        {partner.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {partner.email}
                      </TableCell>
                      <TableCell>{partner.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {partner.howWouldYouLikeToPartner}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
