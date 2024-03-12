import { useState, type FC } from "react";
import { nanoid } from "nanoid";
import { ReactDNDContainer } from "./RDNDContainer";
import { RBDContainer } from "./RBDContainer";
import { useMaxWidth } from "../hooks/useMaxWidth";

export type Image = {
  id: string;
  file: File;
};

const gridTemplate: null[] = Array(9).fill(null);

export const CardContainer: FC = () => {
  const [files, setFiles] = useState<Image[]>([]);
  const isInline = useMaxWidth(1020);

  const handleDeleteFile = (index: number) => {
    setFiles((prev) => {
      const result = [...prev];
      result.splice(index, 1);
      return result;
    });
  };

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    if (inputFiles) {
      const newFiles = [...inputFiles].map((file) => ({
        id: nanoid(),
        file,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <>
      <input
        id="file-input"
        hidden
        accept="image/png, image/jpeg, image/jpg"
        multiple
        type="file"
        onChange={handleAddFile}
      />
      {isInline ? (
        <RBDContainer
          files={files}
          gridTemplate={gridTemplate}
          handleDeleteFile={handleDeleteFile}
          setFiles={setFiles}
        />
      ) : (
        <ReactDNDContainer
          files={files}
          gridTemplate={gridTemplate}
          handleDeleteFile={handleDeleteFile}
          setFiles={setFiles}
        />
      )}
    </>
  );
};
