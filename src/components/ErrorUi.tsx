import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";
import { Card, CardContent } from "./ui/card";

interface ErrorUiProps {
  message: string; 
  title?: string; 
  className?: string; 
  onRetry?: () => void;
}

const ErrorUi = ({ onRetry, message, className, title }: ErrorUiProps) => {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-4 rounded-full bg-red-50 p-3 dark:bg-red-950/20">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-[var(--color-black)] dark:text-foreground">
          {title}
        </h3>

        <p className="mb-6 max-w-sm text-sm text-[var(--color-text3)] leading-relaxed">
          {message}
        </p>

        <Button
          onClick={onRetry}
          className="bg-primary hover:bg-primary/90 !w-fit text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorUi;
