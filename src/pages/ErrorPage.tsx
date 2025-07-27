import { FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground" />

        <h1 className="text-4xl font-bold tracking-tight">404</h1>

        <h2 className="text-2xl font-semibold">Page Not Found</h2>

        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>


          <Link to="/">Return to Home</Link>
    
      </div>
    </div>
  );
}
