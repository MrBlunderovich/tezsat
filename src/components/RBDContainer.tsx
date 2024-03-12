import { FC, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable as LooseDroppable,
  OnDragEndResponder,
  DroppableProps,
} from "react-beautiful-dnd";
import { RBDCard } from "./RBDCard";
import { Image } from "./CardContainer";
import { FileInputButton } from "./FileInpitButton";

//react StrictMode fix:
export const Droppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <LooseDroppable {...props}>{children}</LooseDroppable>;
};

export const RBDContainer: FC<{
  files: Image[];
  setFiles: React.Dispatch<React.SetStateAction<Image[]>>;
  handleDeleteFile: (index: number) => void;
  gridTemplate: null[];
}> = ({ files, setFiles, handleDeleteFile, gridTemplate }) => {
  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const items = (cards: Image[]) => {
      const i = Array.from(cards);
      const [reorderedItem] = i.splice(result.source.index, 1);
      i.splice(result.destination!.index, 0, reorderedItem);
      return i;
    };
    setFiles(items(files));
  };

  const cells = gridTemplate.map((item, index) => {
    const file = files[index];
    if (file) return file;
    return item;
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dragDrop" direction="horizontal">
        {(provided) => (
          <>
            <ul
              className="scrollbar grid h-[176px] w-full grid-cols-[repeat(9,_211px)] grid-rows-[1fr] gap-2 overflow-x-auto p-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cells.map((cell, index) => {
                if (cell) {
                  return (
                    <Draggable
                      key={cell.id}
                      draggableId={cell.id}
                      index={index}
                    >
                      {(provided) => (
                        <RBDCard
                          image={cell}
                          index={index}
                          handleDeleteFile={handleDeleteFile}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  );
                }
                return <FileInputButton key={index} />;
              })}
            </ul>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};
