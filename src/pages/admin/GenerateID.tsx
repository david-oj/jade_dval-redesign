import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IdCard, Download, Copy, Check } from "lucide-react";
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

const generateIdSchema = z.object({
  id: z
    .string()
    .min(3, "ID must be at least 3 characters")
    .max(20, "ID must be less than 20 characters"),
  month: z.string().min(1, "Please select a month"),
});

type GenerateIdForm = z.infer<typeof generateIdSchema>;

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

interface GeneratedId {
  id: string;
  fullId: string;
  month: string;
  generatedAt: string;
}

export default function GenerateId() {
  const [generatedIds, setGeneratedIds] = useState<GeneratedId[]>([
    {
      id: "TECH001",
      fullId: "TECH001-2024-01",
      month: "01",
      generatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "ACAD002",
      fullId: "ACAD002-2024-01",
      month: "01",
      generatedAt: "2024-01-14T14:20:00Z",
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const form = useForm<GenerateIdForm>({
    resolver: zodResolver(generateIdSchema),
    defaultValues: {
      id: "",
      month: "",
    },
  });

  const onSubmit = (data: GenerateIdForm) => {
    const year = new Date().getFullYear();
    const fullId = `${data.id.toUpperCase()}-${year}-${data.month}`;

    const newId: GeneratedId = {
      id: data.id.toUpperCase(),
      fullId,
      month: data.month,
      generatedAt: new Date().toISOString(),
    };

    setGeneratedIds((prev) => [newId, ...prev]);

    toast.success("ID Generated Successfully", {
      description: `Generated ID: ${fullId}`,
    });

    form.reset();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      toast.success("Copied to clipboard", {
        description: `ID "${text}" has been copied to your clipboard.`,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch{
      toast.error("Failed to copy", {
        description: "Could not copy to clipboard. Please copy manually.",
      });
    }
  };

  const getMonthName = (monthValue: string) => {
    return months.find((m) => m.value === monthValue)?.label || monthValue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Generate ID
        </h1>
        <p className="text-muted-foreground">
          Create unique identifiers for students, courses, or academy resources.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="h-5 w-5" />
              Generate New ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter ID (e.g., TECH001, STUDENT123)"
                          {...field}
                          onChange={(e) => {
                            // Convert to uppercase as user types
                            const upperValue = e.target.value.toUpperCase();
                            field.onChange(upperValue);
                          }}
                        />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        ID will be formatted as:{" "}
                        {field.value
                          ? `${field.value}-${new Date().getFullYear()}-MM`
                          : "ID-YYYY-MM"}
                      </div>
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

                <Button type="submit" className="w-full">
                  Generate ID
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Generated IDs History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated IDs ({generatedIds.length})</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {generatedIds.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No IDs generated yet.
                </div>
              ) : (
                generatedIds.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-semibold text-primary">
                          {item.fullId}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.fullId)}
                          className="h-6 w-6 p-0"
                        >
                          {copiedId === item.fullId ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {getMonthName(item.month)}
                        </Badge>
                        <span>
                          {new Date(item.generatedAt).toLocaleDateString()} at{" "}
                          {new Date(item.generatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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

      {/* ID Format Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ID Format Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Format Structure</h4>
              <p className="text-sm text-muted-foreground">
                [CUSTOM_ID]-[YEAR]-[MONTH]
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Example</h4>
              <p className="text-sm text-muted-foreground font-mono">
                TECH001-2024-01
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                Use descriptive prefixes like TECH, STUDENT, COURSE, etc.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
