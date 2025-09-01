/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const addMaterialSchema = z.object({
  department: z.string().min(1, "Please select a department"),
  month: z.string().min(1, "Please select a month"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select a file to upload"),
});

type AddMaterialForm = z.infer<typeof addMaterialSchema>;

const departments = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Design",
  "Digital Marketing",
  "Data Science",
  "Mobile Development",
];

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function AddMaterial() {
  const form = useForm<AddMaterialForm>({
    resolver: zodResolver(addMaterialSchema),
    defaultValues: {
      department: "",
      month: "",
    },
  });

  const onSubmit = (data: AddMaterialForm) => {
    console.log("Add Material Data:", {
      ...data,
      fileName: data.file[0]?.name,
      fileSize: data.file[0]?.size,
    });

    toast.success("Material Added Successfully", {
      description: `Material for ${data.department} - ${
        months.find((m) => m.value === data.month)?.label
      } has been uploaded.`,
    });
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Add Material
        </h1>
        <p className="text-muted-foreground">
          Upload learning materials for specific departments and months.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload New Material
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Upload</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                            onChange={(e) => onChange(e.target.files)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            {...field}
                          />
                          <div className="mt-2 text-xs text-muted-foreground">
                            Accepted formats: PDF, DOC, DOCX, PPT, PPTX, ZIP
                            (Max 50MB)
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drag and drop area alternative */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, PPT, PPTX, ZIP up to 50MB
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Upload Material
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Frontend_Week1_Materials.pdf",
                dept: "Frontend Development",
                month: "January",
                date: "2024-01-15",
              },
              {
                name: "UX_Design_Guidelines.zip",
                dept: "UI/UX Design",
                month: "January",
                date: "2024-01-14",
              },
              {
                name: "Marketing_Strategy_2024.pptx",
                dept: "Digital Marketing",
                month: "December",
                date: "2024-01-13",
              },
            ].map((upload, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{upload.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {upload.dept} • {upload.month}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {upload.date}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
