import { Home } from "lucide-react";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";
import Search from "./Search";

const DesktopNavbar = () => {
  return (
    <nav className="hidden lg:flex items-center justify-between w-[35rem] bg-Therciary_color/35 backdrop-blur-lg border border-Therciary_color/70 px-10 rounded-2xl absolute bottom-10 left-1/2 -translate-x-1/2 shadow-xl">
      <Link href="/">
        <button className="text-Secondary_color">
          <Home size={24} />
        </button>
      </Link>
      <ProfileMenu />
      <Search />
    </nav>
  );
};

export default DesktopNavbar;
