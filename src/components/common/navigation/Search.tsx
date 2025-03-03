import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <SearchIcon size={24} />
      </DrawerTrigger>
      <DrawerContent className="w-screen h-screen">
        <DrawerHeader>
          <DrawerTitle>Encontrá músicos acorde a tus necesidades</DrawerTitle>
          <DrawerDescription>
            Filtra por intrumento, provincia, experiencia
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Buscar</Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Search;
