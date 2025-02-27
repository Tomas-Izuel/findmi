import clsx from "clsx";

export interface TitleProps {
  title?: string;
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

function Title({ title, headingLevel = "h2", className }: TitleProps) {
  const HeadingTag = headingLevel;
  const style = {
    title: clsx(className, headingLevel === "h1" ? "text-3xl" : "text-xl"),
  };
  return <HeadingTag className={style.title}>{title}</HeadingTag>;
}

export { Title };
