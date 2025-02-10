import { memo } from "react";

const BaseLoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
    </div>
  );
};

export const LoadingSpinner = memo(BaseLoadingSpinner);
