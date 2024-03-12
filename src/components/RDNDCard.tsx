import type { Identifier } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../itemTypes";
import { Card } from "./Card";

export interface RDNDCardProps {
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

export const RDNDCard: FC<RDNDCardProps> = ({
  id,
  index,
  file,
  moveCard,
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
    <Card
      ref={ref}
      index={index}
      file={file}
      moveCard={moveCard}
      handleDeleteFile={handleDeleteFile}
      handlerId={handlerId}
      opacity={opacity}
    />
  );
};
