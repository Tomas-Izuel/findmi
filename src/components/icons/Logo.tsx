import Image from "next/image";

interface LogoProps {
  type?: "primary" | "secondary" | "black";
  className?: string;
}

export const Logo = ({ type = "primary", className }: LogoProps) => {
  return (
    <Image
      src={
        type === "primary"
          ? "/findmi-primary.svg"
          : type === "secondary"
            ? "/findmi-secondary.svg"
            : "/findmi-black.svg"
      }
      alt="FindMi logo"
      width={100}
      height={100}
      className={className}
    />
  );
};
