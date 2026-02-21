import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText } from "lucide-react";
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
import {
  API_BASE,
  // CLOUDINARY_CLOUD_NAME,
  // CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/api";
import { formatDate, validateFutureDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { saveAs } from "file-saver";

const addMaterialSchema = z.object({
  department: z.string().min(1, "Please select a department"),
  date: z
    .string()
    .refine(validateFutureDate, "Please select today or a future date"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select a file to upload"),
});

type AddMaterialForm = z.infer<typeof addMaterialSchema>;

const departments = [
  "Frontend Development",
  "Backend Development",
  "UI/UX & Product Design",
  "Digital Marketing",
  "Mobile Development",
  "Data Analysis",
  "Video Editing",
  "Graphic Design",
  "Audio Engineering",
  "Photography Technology",
  "Animation & Motion Graphics",
  "Product Management",
];

interface Upload {
  _id: string;
  filename: string;
  fileUrl: string;
  publicId: string;
  fileType: string; // e.g. "application/pdf"
  fileSize: number; // in bytes
  uploadedAt: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  department: string; // ISO date string
  __v: number;
}

// Material shape
interface Material {
  _id: string;
  materialName: string;
  department: string;
  uploads: Upload[];
  date: string;
  createdAt: string;
  updatedAt: string;
  materiallink?: string; // optional, since only some have this
}

type UploadWithDept = Upload & {
  department: string;
  materialname?: string;
};

type FetchStateTypes = "idle" | "loading" | "success" | "error";

export default function AddMaterial() {
  const [fetchState, setFetchState] = useState<FetchStateTypes>("idle");
  const [uploadedMaterials, setUploadedMaterials] = useState<Upload[]>([]);
  const [selected, setselected] = useState<string | null>(null);

  const form = useForm<AddMaterialForm>({
    resolver: zodResolver(addMaterialSchema),
    defaultValues: {
      department: "",
      date: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchMaterials = async () => {
      setFetchState("loading");

      const API_URL = `${API_BASE}/module`;

      try {
        const res = await fetch(`${API_URL}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profiled students");
        }

        const uploadWithDept: UploadWithDept[] = data.flatMap(
          (material: Material) =>
            material.uploads.map((upload: Upload) => ({
              ...upload,
              department: material.department,
              materialName: material.materialName,
            }))
        );

        const sortedUploads = [...uploadWithDept].sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );

        setUploadedMaterials(sortedUploads);
        setFetchState("success");
      } catch (err) {
        console.log(err);
        setFetchState("error");
        toast.error("Failed to fetch profiled students", {
          description: `${
            err instanceof Error
              ? err.message
              : "Failed to fetch profiled students"
          }`,
        });
      }
    };

    fetchMaterials();
  }, []);

  // const uploadFileTOCloudinary = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  //   const res = await fetch(
  //     `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );

  //   const data = await res.json();
  //   return data.secure_url;
  // };

  const onSubmit = async (data: AddMaterialForm) => {
    const [{ _id, department }] = await fetch(
      `${API_BASE}/module?department=${data.department}`
    )
      .then((res) => res.json())
      .catch((err) => console.log("Module ID fetch err", err));

    // const fileUrl = await uploadFileTOCloudinary(data.file[0]);
    console.log("File URL:", department, "And:", _id);
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("uploadDate", data.date);

    // console.log("FormData", formData);

    try {
      const res = await fetch(`${API_BASE}/module/${_id}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to upload material");
      }

      toast.success(data.message || "Material Added Successfully", {
        description: `Material for ${department} - ${new Date(
          data.file.createdAt
        ).toLocaleDateString("en-us", {
          month: "long",
          year: "numeric",
        })} has been uploaded.`,
      });

      form.reset();
    } catch (err) {
      console.log(err);
      toast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleDownload = async (
    fileUrl: string,
    filename: string,
    id: string
  ) => {
    setselected(id);
    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Failed to fetch file");

      const blob = await res.blob();
      saveAs(blob, filename);
    } catch (err) {
      console.error(err);
    } finally {
      setselected(null);
    }
  };

  const isSelected = (id: string) => {
    return id === selected;
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
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Upload</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                            onChange={(e) => onChange(e.target.files)}
                            className="file:mr-4 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            {...field}
                            value={undefined} // Explicitly set value to undefined
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
                {/* <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    form.setValue("file", files);
                  }}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, PPT, PPTX, ZIP up to 50MB
                  </p>
                </div> */}

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  {isSubmitting ? "Uploading" : "Upload Material"}
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
          {fetchState === "loading" ? (
            <Loader />
          ) : fetchState === "error" ? (
            <p className="text-muted-foreground py-8 text-center">
              Failed to fetch Materials
            </p>
          ) : (
            <div className="space-y-3">
              {uploadedMaterials.map((upload, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <FileText className="size-4 sm:size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{upload.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {upload.department} • {formatDate(upload.uploadedAt)}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() =>
                      handleDownload(
                        upload.fileUrl,
                        upload.filename,
                        upload._id
                      )
                    }
                    disabled={isSelected(upload._id)}
                  >
                    {isSelected(upload._id) ? "Downloading" : "Download"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
