import { FC, ReactNode } from "react";
import { cn } from "../utils";
import Camera from "./svg/Camera";

const CardCell: FC<{
  index: number;
  children?: ReactNode;
  triggerFileInput: () => void;
}> = ({ index, children, triggerFileInput }) => {
  return (
    <li
      className={cn(
        "w-[101px] rounded-lg",
        index === 0 && "row-span-2 w-[211px]",
      )}
    >
      {children ? (
        children
      ) : (
        <button
          className="flex h-full w-full items-center justify-center overflow-hidden text-gray-300 transition-shadow hover:bg-gray-50 hover:shadow-button"
          onClick={triggerFileInput}
        >
          <Camera />
        </button>
      )}
    </li>
  );
};

export default CardCell;
