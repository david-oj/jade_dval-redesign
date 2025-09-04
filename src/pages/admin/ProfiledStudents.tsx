import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { API_BASE } from "@/lib/api";
import Loader from "@/components/Loader";

const profileStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Please select a department"),
});

type ProfileStudentForm = z.infer<typeof profileStudentSchema>;

const departments = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Design",
  "Digital Marketing",
  "Data Science",
  "Mobile Development",
];

interface StudentProfile {
  _id: string;
  name: string;
  email: string;
  department: string;
  accessCode: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

type FetchStateTypes = "idle" | "loading" | "success" | "error";

export default function ProfileStudents() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState<StudentProfile[]>([]);
  const [fetchState, setFetchState] = useState<FetchStateTypes>("idle");
  const [studentProfile, setstudentProfile] = useState<StudentProfile[]>([]);

  useEffect(() => {
    const fetchProfiledStudents = async () => {
      setFetchState("loading");
      try {
        const res = await fetch(`${API_BASE}/profile/student`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profiled students");
        }

        setstudentProfile(data);
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

    fetchProfiledStudents();
  }, []);

  const form = useForm<ProfileStudentForm>({
    resolver: zodResolver(profileStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
    },
  });

  const onSubmit = async (data: ProfileStudentForm) => {
    setIsSubmitting(true);
    console.log("Profile Student Data:", data);

    try {
      const res = await fetch(`${API_BASE}/profile/student`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const newStudent = await res.json();

      if (!res.ok) {
        throw new Error(newStudent.message || "Failled to create profile");
      }
      toast.success("Student Profiled Successfully", {
        description: `${data.name} has been added to the profiled students list.`,
      });

      setstudentProfile((prev) => [newStudent, ...prev]);

      form.reset();
      setOpen(false);
    } catch (err) {
      console.log("Profile STudent Failed: ", err);

      toast.error("Failed to create profile", {
        description: `${
          err instanceof Error ? err.message : "Failed to create profile"
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const filteredStudents = profiledStudents.filter(
  //   (student) =>
  //     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     student.department.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchItems([]);
      return;
    }

    setFetchState("loading");
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/profile/student/?search=${searchTerm.trim()}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch perform query search"
          );
        }

        setSearchItems(data);
        setFetchState("success");
      } catch (err) {
        console.log("Search failed", err);
        setFetchState("error");
      }
    }, 700);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  console.log("The search term is:", searchTerm);
  console.log("FetchState:", isSubmitting);

  const studentsDisplay =
    searchTerm.trim().length > 0 ? searchItems : studentProfile;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Profile Students for Material
          </h1>
          <p className="text-muted-foreground">
            Manage and profile students for material distribution.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Profile New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Profile New Student</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student's Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter student's full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="student@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {isSubmitting ? (
                      <span className="flex gap-2 items-center">
                        Profiling
                        <Loader2 className="text-white animate-spin" />
                      </span>
                    ) : (
                      "Profile Student"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Profiled Students ({studentsDisplay.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fetchState === "loading" ? (
              <Loader />
            ) : studentsDisplay.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm
                  ? "No students found matching your search."
                  : "No profiled students yet."}
              </div>
            ) : (
              studentsDisplay.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {student.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{student.department}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Profiled on{" "}
                        {new Date(student.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
