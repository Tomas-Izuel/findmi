import CommonLayout from "@/components/layout/commonLayout";

export default function RegistroLayout({
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
