
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="animate-bounce">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
