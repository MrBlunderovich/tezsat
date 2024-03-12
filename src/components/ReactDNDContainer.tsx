import update from "immutability-helper";
import type { FC } from "react";
import { useCallback } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import CardCell from "./CardCell";
import { Image } from "./CardContainer";
import { RDNDCard } from "./RDNDCard";

export const ReactDNDContainer: FC<{
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

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="grid grid-cols-[auto,repeat(4,1fr)] grid-rows-[78px_78px] gap-4 p-1 lg:grid-cols-[repeat(9,1fr)] lg:grid-rows-[172px]">
        {gridTemplate.map((_, index) => {
          const file = files[index];
          return (
            <CardCell key={index} index={index}>
              {file && renderCard(file, index)}
            </CardCell>
          );
        })}
      </ul>
    </DndProvider>
  );
};
