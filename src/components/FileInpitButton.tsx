import { FC } from "react";
import { cn } from "../utils";
import Camera from "./svg/Camera";

export const FileInputButton: FC<{ index?: number }> = ({ index }) => (
  <li className={cn(index === 0 && "row-span-2")}>
    <button
      type="button"
      className="h-full w-full overflow-hidden text-gray-300 transition-shadow hover:bg-gray-50 hover:shadow-button"
    >
      <label
        className="flex h-full w-full items-center justify-center"
        htmlFor="file-input"
      >
        <Camera />
      </label>
    </button>
  </li>
);
