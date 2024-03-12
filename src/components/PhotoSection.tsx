import { FC } from "react";
import { CardContainer } from "./CardContainer";

const PhotoSection: FC = () => {
  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-between gap-2">
        <p className="whitespace-nowrap">
          Загрузите фото<span className="ml-1 text-red-600">*</span>
        </p>
        <CardContainer />
      </div>
    </div>
  );
};

export default PhotoSection;
