import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertDestructiveProps = {
  alertTitle?: string;
  alertDescription: string;
};

export const AlertDestructive: React.FC<AlertDestructiveProps> = ({
  alertTitle,
  alertDescription,
}) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      {alertTitle && <AlertTitle>{!!alertTitle && alertTitle}</AlertTitle>}
      <AlertDescription>
        {!!alertDescription && alertDescription}
      </AlertDescription>
    </Alert>
  );
};
