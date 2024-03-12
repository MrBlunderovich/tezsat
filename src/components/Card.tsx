import type { ForwardRefRenderFunction } from "react";
import { forwardRef } from "react";
import { cn } from "../utils";
import Delete from "./svg/Delete";

export interface CardProps {
  index: number;
  file: File;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleDeleteFile: (index: number) => void;
  handlerId?: any;
  opacity: string;
}

const RefCard: ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  { index, file, handleDeleteFile, handlerId, opacity },
  ref,
) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full cursor-grab justify-center overflow-hidden rounded-sm border border-black",
        opacity,
      )}
      ref={ref}
      data-handler-id={handlerId}
    >
      <img
        className="h-full w-full object-cover object-center"
        src={URL.createObjectURL(file)}
        alt="user-submitted image"
      />
      <button
        type="button"
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-700 text-white hover:filter"
        onClick={() => handleDeleteFile(index)}
      >
        <Delete />
      </button>
      {index === 0 && (
        <span className="absolute bottom-1 rounded-sm bg-[rgba(0,81,186,0.2)] px-[6px] py-1 text-white backdrop-blur-[1px]">
          Главное фото
        </span>
      )}
    </div>
  );
};

export const Card = forwardRef<HTMLDivElement, CardProps>(RefCard);
