import { Book, AlertCircle, Phone, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground">User guides, definitions, and technical support</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card/60 backdrop-blur-md border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Technical Support
            </CardTitle>
            <CardDescription>Get help from our team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-lg font-medium text-foreground">1800-123-4567</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium text-foreground">support@dpr-ai.gov.in</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours</p>
              <p className="text-foreground">Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-md border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Feedback
            </CardTitle>
            <CardDescription>Help us improve</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-foreground">
              We value your feedback! Share your suggestions or report issues to help us enhance the system.
            </p>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-medium text-foreground">feedback@dpr-ai.gov.in</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-md border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Documentation
            </CardTitle>
            <CardDescription>Quick access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="#" className="block text-primary hover:underline">
              User Manual (PDF)
            </a>
            <a href="#" className="block text-primary hover:underline">
              Quick Start Guide
            </a>
            <a href="#" className="block text-primary hover:underline">
              Video Tutorials
            </a>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/60 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Risk Level Definitions
          </CardTitle>
          <CardDescription>Understanding project risk classifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Badge variant="destructive" className="mt-1">High Risk</Badge>
              <div>
                <p className="font-semibold text-foreground">Critical Issues Detected</p>
                <p className="text-sm text-muted-foreground">
                  Projects with major compliance gaps, significant budget discrepancies, or missing critical documentation. 
                  Requires immediate review and corrective action before approval.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Badge variant="warning" className="mt-1">Medium Risk</Badge>
              <div>
                <p className="font-semibold text-foreground">Moderate Concerns</p>
                <p className="text-sm text-muted-foreground">
                  Projects with minor compliance issues, documentation gaps, or moderate inconsistencies. 
                  Should be reviewed and addressed before final approval.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Badge variant="success" className="mt-1">Low Risk</Badge>
              <div>
                <p className="font-semibold text-foreground">Compliant & Well-Documented</p>
                <p className="text-sm text-muted-foreground">
                  Projects that meet all compliance requirements with complete and accurate documentation. 
                  Ready for streamlined approval process.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Book className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the AI assessment work?</AccordionTrigger>
              <AccordionContent>
                The AI system analyzes uploaded DPR documents using advanced machine learning algorithms. It checks for 
                compliance with regulatory requirements, identifies missing documentation, detects budget inconsistencies, 
                and flags potential risks. The analysis is completed within minutes of upload.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What file formats are supported for upload?</AccordionTrigger>
              <AccordionContent>
                The system supports PDF, DOC, DOCX, and Excel (XLS, XLSX) formats. All documents should be clear and 
                readable. Scanned documents should have OCR applied for best results.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I override the AI risk assessment?</AccordionTrigger>
              <AccordionContent>
                Yes, authorized reviewers and admins can override risk assessments with proper justification. The system 
                maintains an audit trail of all overrides for transparency and accountability.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How long does the analysis take?</AccordionTrigger>
              <AccordionContent>
                Most DPR analyses are completed within 5-15 minutes, depending on document size and complexity. You'll 
                receive a notification when the analysis is complete and the project is ready for review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Yes, the DPR AI System uses enterprise-grade encryption for data at rest and in transit. All access is 
                logged and audited. The system complies with government data security standards and regulations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
