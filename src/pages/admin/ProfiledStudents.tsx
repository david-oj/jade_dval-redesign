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

const validateAccessSchema = z.object({
  accessCode: z.string().min(1, "Please enter an access code"),
  department: z.string().min(1, "Please select a department"),
});

type ValidateAccessForm = z.infer<typeof validateAccessSchema>;

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

interface StudentProfile {
  _id: string;
  name: string;
  email: string;
  department: string;
  accessCode: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

interface AccessDialog {
  open: boolean;
  code: string | null;
  studentName: string | null;
}

type FetchStateTypes = "idle" | "loading" | "success" | "error";

export default function ProfileStudents() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const [fetchState, setFetchState] = useState<FetchStateTypes>("idle");
  const [profiledStudents, setProfiledStudents] = useState<StudentProfile[]>(
    []
  );
  const [isValidating, setIsValidating] = useState(false);
  const [validateCodeMessage, setValidateCodeMessage] = useState<{
    message: string;
    color: string;
  }>({
    message: "",
    color: "",
  });
  const [isSelected, setisSelected] = useState<string | null>(null);
  const [accessCodeDialog, setAccessCodeDialog] = useState<AccessDialog>({
    open: false,
    code: null,
    studentName: null,
  });

  const form = useForm<ProfileStudentForm>({
    resolver: zodResolver(profileStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
    },
  });

  const validateForm = useForm<ValidateAccessForm>({
    resolver: zodResolver(validateAccessSchema),
    defaultValues: {
      accessCode: "",
      department: "",
    },
  });

  // Debounce Search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebounceSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  //Profiled students initial fetch and search
  useEffect(() => {
    const fetchProfiledStudents = async () => {
      setFetchState("loading");

      const API_URL = debounceSearch
        ? `${API_BASE}/profile/student/?search=${debounceSearch.trim()}`
        : `${API_BASE}/profile/student`;

      try {
        const res = await fetch(`${API_URL}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profiled students");
        }

        setProfiledStudents(data);
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
  }, [debounceSearch]);

  //Create new profiled students
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

      setProfiledStudents((prev) => [newStudent, ...prev]);

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

  //Generate Access Code
  const handleGenerateId = async (studentID: string, studentName: string) => {
    console.log(
      "Attempted to generate access code with the data",
      studentID,
      studentName
    );

    setisSelected(studentID);
    try {
      const res = await fetch(
        `${API_BASE}/profile/student/${studentID}/access-code/generate`,
        { method: "POST", headers: { "content-type": "application/json" } }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate access code");
      }

      setAccessCodeDialog({
        open: true,
        code: data.accessCode,
        studentName: studentName,
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate access code", {
        description: `${
          err instanceof Error ? err.message : "Operating failed"
        }`,
      });
    } finally {
      setisSelected(null);
    }
  };

  const handleValidate = async (data: ValidateAccessForm) => {
    setIsValidating(true);
    const payload = {
      code: data.accessCode,
      department: data.department,
    };

    try {
      const res = await fetch(`${API_BASE}/module/validate-access-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Invalid access code");

      toast.success("Access code validated", {
        description: `Code ${data.accessCode} is valid for ${data.department}`,
      });

      setValidateCodeMessage({
        message: `Code: ${data.accessCode} is valid for ${data.department}`,
        color: "bg-green-50 text-green-500",
      });

      validateForm.reset();
    } catch (err) {
      setValidateCodeMessage({
        message: err instanceof Error ? err.message : "Validation vailed",
        color: "bg-red-50 text-red-500",
      });
      toast.error("Validation failed", {
        description:
          err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const isLoading = (id: string) => id === isSelected;

  // console.log("The search term is:", searchTerm);
  // console.log("FetchState:", isSubmitting);

  return (
    <div className="space-y-6 min-h-screen">
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

        {/* Profile New Student Modal */}
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
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Profiled Students ({profiledStudents.length})</CardTitle>
          {/* Validate Access Code modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary ">Validate Access Code</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Validate Access Code</DialogTitle>
              </DialogHeader>

              <Form {...validateForm}>
                <form
                  onSubmit={validateForm.handleSubmit(handleValidate)}
                  className="space-y-4 mt-2"
                >
                  <FormField
                    control={validateForm.control}
                    name="accessCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter access code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={validateForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isValidating}
                  >
                    {isValidating ? (
                      <span className="flex items-center gap-2">
                        Validating <Loader2 className="animate-spin h-4 w-4" />
                      </span>
                    ) : (
                      "Validate"
                    )}
                  </Button>
                  {validateCodeMessage.message && (
                    <p
                      className={`${validateCodeMessage.color} rounded-md text-sm p-2`}
                    >
                      {validateCodeMessage.message}
                    </p>
                  )}
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="max-sm:p-4">
          <div className="space-y-4">
            {fetchState === "loading" ? (
              <Loader />
            ) : profiledStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm
                  ? fetchState === "error"
                    ? "Failed to fetch search results."
                    : "No students found matching your search."
                  : fetchState === "error"
                  ? "Failed to fetch students."
                  : "No profiled students yet."}
              </div>
            ) : (
              profiledStudents.map((student) => (
                <div
                  key={student._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {student.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
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

                  <Button
                    onClick={() => {
                      // handleIsSelected(student._id);
                      handleGenerateId(student._id, student.name);
                    }}
                    className="bg-secondary hover:bg-secondary/90 max-sm:mt-4"
                    disabled={isLoading(student._id)}
                  >
                    {isLoading(student._id) ? (
                      <span className="flex items-center gap-1">
                        Generating
                        <Loader2 className="animate-spin" />
                      </span>
                    ) : (
                      " Generate Access Code"
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Dialog for successful access code generation */}
          <Dialog
            open={accessCodeDialog.open}
            onOpenChange={(open) =>
              setAccessCodeDialog((prev) => ({ ...prev, open }))
            }
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Access Code Generated
                </DialogTitle>
              </DialogHeader>
              <div className="text-muted-foreground text-center">
                Access code{" "}
                <span className="font-mono text-black bg-amber-100/60">
                  {accessCodeDialog.code}
                </span>{" "}
                <br /> has been generated for <br />
                <strong className="text-black">
                  {accessCodeDialog.studentName}
                </strong>
                .
              </div>
              <div className="mt-2">
                <Button
                  onClick={() =>
                    setAccessCodeDialog((prev) => ({
                      ...prev,
                      open: false,
                      code: null,
                      studentName: null,
                    }))
                  }
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
