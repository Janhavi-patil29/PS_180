import { useState } from "react";
import { Upload as UploadIcon, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (uploadedFile) {
      toast({
        title: "Upload Started",
        description: `${uploadedFile.name} is being processed. You'll be notified when analysis is complete.`,
      });
      // Reset after upload
      setTimeout(() => {
        setUploadedFile(null);
        toast({
          title: "Analysis Complete",
          description: "Your DPR has been analyzed and is ready for review.",
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload DPR</h1>
        <p className="text-muted-foreground">Upload Detailed Project Reports for AI-powered assessment</p>
      </div>

      <Card className="bg-card/60 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Upload Document</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOC, DOCX, XLS, XLSX
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drag and drop your file here
            </h3>
            <p className="text-muted-foreground mb-4">or</p>
            <div className="flex justify-center">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Browse Files</span>
                </Button>
              </Label>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
          </div>

          {uploadedFile && (
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Enter department name"
                className="mt-2"
              />
            </div>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!uploadedFile}
            className="w-full"
            size="lg"
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            Upload and Analyze
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <span>Ensure all required documents are included in a single file or compressed archive</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <span>Documents should be clear and readable for optimal AI analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <span>Maximum file size: 50 MB</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <span>Analysis typically takes 5-15 minutes depending on document complexity</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
