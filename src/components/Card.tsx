import type { Identifier } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../itemTypes";
import { cn } from "../utils";
import Delete from "./svg/Delete";
import { useMaxWidth } from "../hooks/useMaxWidth";

export interface CardProps {
  id: any;
  index: number;
  file: File;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleDeleteFile: (index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  index,
  file,
  moveCard,
  handleDeleteFile,
}) => {
  const isInline = useMaxWidth(1020);
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item: DragItem) {
      if (!isInline) return;
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },

    drop(item: DragItem) {
      if (isInline) return;
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? "opacity-0" : "opacity-100";
  drag(drop(ref));

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
