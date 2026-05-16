

export const metadata = {
  title: "LivFit External Template",
  description: "Standard layout for external staff applications",
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
