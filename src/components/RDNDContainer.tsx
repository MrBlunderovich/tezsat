import update from "immutability-helper";
import type { FC } from "react";
import { Fragment, useCallback } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Image } from "./CardContainer";
import { RDNDCard } from "./RDNDCard";
import { FileInputButton } from "./FileInpitButton";

export const RDNDContainer: FC<{
  files: Image[];
  setFiles: React.Dispatch<React.SetStateAction<Image[]>>;
  handleDeleteFile: (index: number) => void;
  gridTemplate: null[];
}> = ({ files, setFiles, handleDeleteFile, gridTemplate }) => {
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setFiles((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1, prevCards[hoverIndex]],
          [hoverIndex, 1, prevCards[dragIndex]],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback((card: Image, index: number) => {
    return (
      <RDNDCard
        key={card.id}
        index={index}
        id={card.id}
        file={card.file}
        moveCard={moveCard}
        handleDeleteFile={handleDeleteFile}
      />
    );
  }, []);

  const cells = gridTemplate.map((item, index) => {
    const file = files[index];
    if (file) return file;
    return item;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="grid h-[176px] grid-cols-[211px,repeat(4,98px)] grid-rows-2 gap-2 p-1  ">
        {cells.map((cell, index) => (
          <Fragment key={index}>
            {cell ? (
              <>{renderCard(cell, index)}</>
            ) : (
              <FileInputButton index={index} />
            )}
          </Fragment>
        ))}
      </ul>
    </DndProvider>
  );
};
