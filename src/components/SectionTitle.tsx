type SectionTitleProps = {
  children: React.ReactNode;
  light?: boolean;
};

export default function SectionTitle({
  children,
  light = false,
}: SectionTitleProps) {
  return (
    <div className="mb-9">
      <h2
        className={`font-barlow text-2xl font-bold uppercase leading-none tracking-tight ${
          light ? "text-white" : "text-[#404040]"
        }`}
      >
        {children}
      </h2>
      <div
        className={`mt-3 h-px w-full ${light ? "bg-white/85" : "bg-[#3d3d3d]"}`}
      />
    </div>
  );
}