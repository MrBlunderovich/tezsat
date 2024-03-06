import type { Identifier } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../itemTypes";
import Camera from "./svg/Camera";
import { cn } from "../utils";

export interface CardProps {
  id: any;
  index: number;
  file: File;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isFirstCard?: boolean;
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
  isFirstCard = false,
  handleDeleteFile,
}) => {
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
    drop(item: DragItem) {
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
      className="[border:3px_solid_green] h-full w-full relative"
      ref={ref}
      data-handler-id={handlerId}
    >
      <img
        className="object-cover object-center w-full h-full"
        src={URL.createObjectURL(file)}
        alt="user-submitted image"
      />
      <button
        className="absolute flex justify-center items-center text-white w-8 h-8 top-4 right-4 bg-sky-700 rounded-full"
        onClick={() => handleDeleteFile(index)}
      >
        X
      </button>
    </div>
  );
  return (
    <li
      className={cn(
        //"border-black border rounded-lg p-4 w-[101px] h-20",
        "rounded-lg w-[101px] h-20",
        opacity,
        isFirstCard && "row-span-2 w-[214px] h-full"
      )}
      //ref={ref}
      data-handler-id={handlerId}
    >
      <button
        className="hover:shadow-button hover:bg-gray-50 transition-shadow overflow-hidden relative w-full h-full flex justify-center items-center text-gray-300"
        //onClick={triggerFileInput}
      >
        <Camera />
        {/* <div className="absolute inset-0 bg-gray-500 opacity-30 rounded-full scale-1 hover:scale-150" /> */}
        {/* FIX_ME: temporary */}
        <p className="absolute left-1 bottom-1 text-red-500">123</p>
      </button>
    </li>
  );
};
