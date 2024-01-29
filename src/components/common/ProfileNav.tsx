"use client";
import {
  Avatar,
  Button,
  Link,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { BiExit } from "react-icons/bi";

const ProfileNav = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const { refresh } = useRouter();

  const singOut = async () => {
    await supabase.auth.signOut();
    refresh();
  };
  return session ? (
    <NavbarContent justify="end" className="hidden lg:flex ">
      <NavbarItem>
        <Button color="primary" variant="flat" onClick={singOut}>
          Cerrar sesión
          <BiExit />
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Avatar color="secondary" name={session.user.email} />
      </NavbarItem>
    </NavbarContent>
  ) : (
    <NavbarContent justify="end" className="hidden lg:flex">
      <NavbarItem>
        <Link href="/login">Iniciar sesión</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/registro" variant="flat">
          Registrarme
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

export default ProfileNav;
