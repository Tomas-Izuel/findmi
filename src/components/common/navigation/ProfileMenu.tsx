import { Logo } from "@/components/icons/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-translate-y-5 w-16 h-16 bg-Therciary_color rounded-full flex items-center justify-center">
        <Logo type="primary" className="w-12 h-12" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-Therciary_color">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/">Crear perfil de músico</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/user">Editar mi usuario</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
