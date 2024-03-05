import update from "immutability-helper";
import type { FC, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { Card } from "./Card";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { cn } from "../utils";
import Camera from "./svg/Camera";
import { nanoid } from "nanoid";

export type Image = {
  id: string;
  file: File;
};

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
      setFiles((prevCards: Image[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Image],
          ],
        })
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
          isFirstCard={index === 0}
        />
      );
    }, []);

    console.log(files);

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
        <ul className="grid gap-4 grid-cols-[auto,repeat(4,1fr)] relative">
          {/* {cards.map((card, i) => renderCard(card, i))} */}
          {Array(9)
            .fill("")
            .map((_, index) => {
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

const CardCell: FC<{
  index: number;
  children?: ReactNode;
  triggerFileInput: () => void;
}> = ({ index, children, triggerFileInput }) => {
  return (
    <li
      className={cn(
        "rounded-lg w-[101px] h-20",
        //opacity,
        index === 0 && "row-span-2 w-[214px] h-full"
      )}
    >
      {children ? (
        children
      ) : (
        <button
          className="hover:shadow-button hover:bg-gray-50 transition-shadow overflow-hidden w-full h-full flex justify-center items-center text-gray-300"
          onClick={triggerFileInput}
        >
          <Camera />
        </button>
      )}
    </li>
  );
};
