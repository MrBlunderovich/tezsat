import { FC } from "react";
import { cn } from "../utils";
import { Image } from "./CardContainer";
import Delete from "./svg/Delete";
import { DraggableProvided } from "react-beautiful-dnd";

const RBDCard: FC<{
  image: Image;
  index: number;
  handleDeleteFile: (index: number) => void;
  provided: DraggableProvided;
}> = ({ image, index, handleDeleteFile, provided }) => {
  return (
    <div
      className={cn(
        "relative flex h-full cursor-grab justify-center overflow-hidden rounded-sm border border-black",
      )}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <img
        className="h-full w-full object-cover object-center"
        src={URL.createObjectURL(image.file)}
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

export default RBDCard;
