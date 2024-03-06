import { FC, ReactNode } from "react";
import { cn } from "../utils";
import Camera from "./svg/Camera";

const CardCell: FC<{
  index: number;
  children?: ReactNode;
}> = ({ index, children }) => {
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
          type="button"
          className="h-full w-full overflow-hidden text-gray-300 transition-shadow hover:bg-gray-50 hover:shadow-button"
          //onClick={triggerFileInput}
        >
          <label
            className="flex h-full w-full items-center justify-center"
            htmlFor="file-input"
          >
            <Camera />
          </label>
        </button>
      )}
    </li>
  );
};

export default CardCell;
