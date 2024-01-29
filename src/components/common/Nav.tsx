/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import {
  Session,
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BiExit,
  BiHome,
  BiSearchAlt,
  BiUser,
  BiUserPlus,
} from "react-icons/bi";
import ProfileNav from "./ProfileNav";

const Nav = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <header className="absolute bottom-0 w-screen bg-white py-3 px-8  z-50 lg:hidden">
        <nav>
          <ul className="flex justify-between items-center text-2xl ">
            <li>
              <BiHome />
            </li>
            <li>
              <BiSearchAlt />
            </li>
            <li>
              <BiUserPlus />
            </li>
            <li>
              <BiUser />
            </li>
          </ul>
        </nav>
      </header>
      <header className=" max-md:hidden">
        <Navbar maxWidth="xl">
          <NavbarBrand>
            <Link href="/">
              <img src="/assets/Logo.svg" alt="" className=" w-20" />
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/musicos">
                Buscar músicos
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href={session ? "/perfil/agregar" : "/registro"}
                color="foreground"
              >
                Añadir perfil de músico
              </Link>
            </NavbarItem>
          </NavbarContent>
          <ProfileNav session={session} />
        </Navbar>
      </header>
    </>
  );
};

export default Nav;
