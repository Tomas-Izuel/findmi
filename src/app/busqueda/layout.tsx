import CommonLayout from "@/components/layout/commonLayout";

export default function BusquedaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonLayout>{children}</CommonLayout>
      <>{children}</>
    </>
  );
}
