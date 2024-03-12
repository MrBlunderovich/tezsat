import { DraggableProvided } from "react-beautiful-dnd";
import { FC } from "react";
import { cn } from "../utils";
import { Image } from "./CardContainer";
import { PhotoCard } from "./PhotoCard";

export const RBDCard: FC<{
  image: Image;
  index: number;
  handleDeleteFile: (index: number) => void;
  provided: DraggableProvided;
}> = ({ image, index, handleDeleteFile, provided }) => {
  return (
    <li
      className={cn(
        "relative flex h-full cursor-grab justify-center overflow-hidden rounded-sm border border-black",
      )}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <PhotoCard
        file={image.file}
        index={index}
        handleDeleteFile={handleDeleteFile}
      />
    </li>
  );
};
