import { FC, ReactNode } from "react";
import { cn } from "../utils";

const CardCell: FC<{
  index: number;
  children?: ReactNode;
}> = ({ index, children }) => {
  return (
    <li
      className={cn(
        "w-[101px] rounded-lg lg:w-[211px]",
        index === 0 && "row-span-2 w-[211px] lg:row-span-1",
      )}
    >
      {children}
    </li>
  );
};

export default CardCell;
