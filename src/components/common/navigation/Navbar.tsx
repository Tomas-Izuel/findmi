import { Home } from "lucide-react";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="nav block lg:hidden">
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

export default Navbar;
