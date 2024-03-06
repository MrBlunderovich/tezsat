import update from "immutability-helper";
import type { FC } from "react";
import { nanoid } from "nanoid";
import { useCallback, useRef, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Card } from "./Card";
import CardCell from "./CardCell";

export type Image = {
  id: string;
  file: File;
};

const gridTemplate = Array(9).fill("");

export const CardContainer: FC = () => {
  {
    const [files, setFiles] = useState<Image[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDeleteFile = (index: number) => {
      setFiles((prev) => {
        const result = [...prev];
        result.splice(index, 1);
        return result;
      });
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputFiles = event.target.files;
      console.log(inputFiles);
      if (inputFiles) {
        const newFiles = [...inputFiles].map((file) => ({
          id: nanoid(),
          file,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
      }
    };

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setFiles((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1, prevCards[hoverIndex]],
            [hoverIndex, 1, prevCards[dragIndex]],
          ],
          //alternative dnd logic:
          /* $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Image],
          ], */
        }),
      );
    }, []);

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
          ref={inputRef}
          hidden
          accept="image/png, image/jpeg, image/jpg"
          multiple
          type="file"
          onChange={handleFile}
        />
        <ul className="grid grid-cols-[auto,repeat(4,1fr)] grid-rows-[78px_78px] gap-4">
          {gridTemplate.map((_, index) => {
            const file = files[index];
            return (
              <CardCell
                key={index}
                index={index}
                triggerFileInput={() => inputRef.current?.click()}
              >
                {file && renderCard(file, index)}
              </CardCell>
            );
          })}
        </ul>
      </DndProvider>
    );
  }
};
