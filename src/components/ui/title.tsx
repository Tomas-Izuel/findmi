import clsx from "clsx";

export interface TitleProps {
  children: React.ReactNode;
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

function Title({ children, headingLevel = "h2", className }: TitleProps) {
  const HeadingTag = headingLevel;
  const style = {
    title: clsx(className, headingLevel === "h1" ? "text-3xl" : "text-xl"),
  };
  return <HeadingTag className={style.title}>{children}</HeadingTag>;
}

export { Title };
