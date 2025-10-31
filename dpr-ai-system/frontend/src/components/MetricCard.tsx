import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend: string;
  variant: "primary" | "danger" | "warning" | "success";
}

const variantStyles = {
  primary: "text-primary",
  danger: "text-destructive",
  warning: "text-warning",
  success: "text-success",
};

export const MetricCard = ({ title, value, icon, trend, variant }: MetricCardProps) => {
  return (
    <Card className="bg-card/60 backdrop-blur-md border-border hover:bg-card/80 transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          </div>
          <div className={cn("p-3 rounded-lg bg-secondary/50", variantStyles[variant])}>
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
};
