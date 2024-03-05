import { FC } from "react";
import { CardContainer } from "./CardContainer";

const PhotoSection: FC = () => {
  return (
    <div className="border-red-500 border p-8">
      <div className="flex gap-2">
        <p className="basis-[25%] grow">
          Загрузите фото<span className="text-red-600 ml-1">*</span>
        </p>
        <CardContainer />
      </div>
    </div>
  );
};

export default PhotoSection;
