import { FC } from "react";
import Delete from "./svg/Delete";

export const PhotoCard: FC<{
  file: File;
  index: number;
  handleDeleteFile: (index: number) => void;
}> = ({ file, index, handleDeleteFile }) => (
  <>
    <img
      className="h-full w-full object-cover object-center"
      src={URL.createObjectURL(file)}
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
  </>
);
