import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileDown,
  ChevronDown,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Students, Partners } from "@/types/types";

interface ExportData {
  students?: Students[];
  partners?: Partners[];
}

interface ExportDropdownProps {
  data: ExportData;
  activeTab: "students" | "partners";
}

export function ExportDropdown({ data, activeTab }: ExportDropdownProps) {
  const studentsData = data.students || [];
  const partnersData = data.partners || [];

  const currentData = activeTab === "students" ? studentsData : partnersData;
  const filename = `${activeTab}_${new Date().toISOString().split("T")[0]}`;

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(
      `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`,
      20,
      20
    );

    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    if (activeTab === "students") {
      const tableData = (currentData as Students[]).map((item, i) => [
        i + 1,
        item.fullName,
        item.email,
        item.phone,
        item.interest,
        item.haveALaptop ? "Yes" : "No",
      ]);

      autoTable(doc, {
        head: [["No.", "Full Name", "Email", "Phone", "Course", "Laptop"]],
        body: tableData,
        startY: 40,
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [18, 119, 103], // --primary color
          textColor: 255,
        },
      });
    } else {
      const tableData = (currentData as Partners[]).map((item, i) => [
        i + 1,
        item.name,
        item.email,
        item.phone,
        item.howWouldYouLikeToPartner,
      ]);

      autoTable(doc, {
        head: [["No.", "Partner Name", "Email", "Phone", "Proposal"]],
        body: tableData,
        startY: 40,
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [18, 119, 103], // --primary color
          textColor: 255,
        },
      });
    }

    const blob = doc.output("blob");
    saveAs(blob, `${filename}.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(currentData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    );

    // use file-saver
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, `${filename}.xlsx`);
  };

  const exportToCSV = () => {
    const headers =
      activeTab === "students"
        ? ["No.", "Full Name", "Email", "Phone", "Course", "Laptop"]
        : ["No.", "Partner Name", "Email", "Phone", "Proposal"];

    const csvData =
      activeTab === "students"
        ? (currentData as Students[]).map((item, i) => [
            i + 1,
            item.fullName,
            item.email,
            item.phone,
            item.interest,
            item.haveALaptop ? "Yes" : "No",
          ])
        : (currentData as Partners[]).map((item, i) => [
            i + 1,
            item.name,
            item.email,
            item.phone,
            item.howWouldYouLikeToPartner,
          ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // use file-saver
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={exportToPDF}
          className="gap-2 cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          Download as PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportToExcel}
          className="gap-2 cursor-pointer"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Download as Excel
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportToCSV}
          className="gap-2 cursor-pointer"
        >
          <FileDown className="h-4 w-4" />
          Download as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
