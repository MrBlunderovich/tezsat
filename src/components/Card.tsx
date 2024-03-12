import type { ForwardRefRenderFunction } from "react";
import { forwardRef } from "react";
import { cn } from "../utils";
import Delete from "./svg/Delete";
import { PhotoCard } from "./PhotoCard";

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
      <PhotoCard
        file={file}
        index={index}
        handleDeleteFile={handleDeleteFile}
      />
    </div>
  );
};

export const Card = forwardRef<HTMLDivElement, CardProps>(RefCard);
