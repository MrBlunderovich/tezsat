import update from "immutability-helper";
import type { FC } from "react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Card } from "./Card";
import CardCell from "./CardCell";
// import { useMaxWidth } from "../hooks/useMaxWidth";

export type Image = {
  id: string;
  file: File;
};

const gridTemplate = Array(9).fill(null);

export const CardContainer: FC = () => {
  const [files, setFiles] = useState<Image[]>([]);
  // const isInline = useMaxWidth(1020);

  const handleDeleteFile = (index: number) => {
    setFiles((prev) => {
      const result = [...prev];
      result.splice(index, 1);
      return result;
    });
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    if (inputFiles) {
      const newFiles = [...inputFiles].map((file) => ({
        id: nanoid(),
        file,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setFiles((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1, prevCards[hoverIndex]],
            [hoverIndex, 1, prevCards[dragIndex]],
          ],
          /* $splice: isInline
            ? [
                [dragIndex, 1],
                [hoverIndex, 0, prevCards[dragIndex]],
              ]
            : [
                [dragIndex, 1, prevCards[hoverIndex]],
                [hoverIndex, 1, prevCards[dragIndex]],
              ], */
        }),
      );
    },
    [],
    //[isInline],
  );

  const renderCard = useCallback((card: Image, index: number) => {
    return (
      <Card
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
      <input
        id="file-input"
        hidden
        accept="image/png, image/jpeg, image/jpg"
        multiple
        type="file"
        onChange={handleFile}
      />
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
