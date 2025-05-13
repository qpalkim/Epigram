export default function BackgroundLines() {
  return (
    <>
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #f2f2f2 1px, transparent 1px, transparent 24px)",
          backgroundSize: "100% 24px",
        }}
      />
      <div
        className="hidden lg:block absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #f2f2f2 1px, transparent 1px, transparent 36px)",
          backgroundSize: "100% 36px",
        }}
      />
    </>
  );
}
