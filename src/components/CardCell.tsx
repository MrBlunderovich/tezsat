import { FC, ReactNode } from "react";
import { cn } from "../utils";

const CardCell: FC<{
  index: number;
  children?: ReactNode;
  className?: string;
  innerRef?: (element: HTMLElement | null) => void;
}> = ({ index, children, className, innerRef, ...props }) => {
  return (
    <li
      className={cn(index === 0 && "row-span-2 lg:row-span-1", className)}
      /* className={cn(
        "w-[101px] rounded-lg lg:w-[211px]",
        index === 0 && "row-span-2 w-[211px] lg:row-span-1",
      )} */
      ref={innerRef}
      {...props}
    >
      {children}
    </li>
  );
};

export default CardCell;
