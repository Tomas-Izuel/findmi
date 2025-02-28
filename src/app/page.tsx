import { GridHome } from "@/components/home/grid-home";
import { GridHomeDesktop } from "@/components/home/grid-home-desktop";

export default function Home() {
  return (
    <main className="p-3.5 h-screen size-full">
      <GridHome />
      <GridHomeDesktop />
    </main>
  );
}
