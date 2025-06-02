export default function LoadingSpinner() {
  return (
    <div className="relative flex min-h-[150px] items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-300 border-t-transparent"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    </div>
  );
}
