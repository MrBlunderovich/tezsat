import { FC, memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image } from "./CardContainer";
import RBDCard from "./RBDCard";

const reorder = (list: Image[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteList = memo(function QuoteList({ quotes }) {
  return quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

export const ReactBeautifulDNDContainer: FC<{
  files: Image[];
  setFiles: React.Dispatch<React.SetStateAction<Image[]>>;
  handleDeleteFile: (index: number) => void;
  gridTemplate: null[];
}> = ({ files, setFiles, handleDeleteFile, gridTemplate }) => {
  //const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newFiles = reorder(
      files,
      result.source.index,
      result.destination.index,
    );

    setFiles(newFiles);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" direction="horizontal">
        {(provided) => (
          <ul className="" {...provided.droppableProps} ref={provided.innerRef}>
            {files.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <RBDCard
                    image={image}
                    index={index}
                    handleDeleteFile={handleDeleteFile}
                  />
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

{
  /* <DropItem
  intl={intl}
  messages={messages}
  styles={{ img: classes.img, closeMobile: classes.closeMobile, mainWord: classes.mainWord }}
  photo={file}
  remove={handleRemove}
  index={index}
  provided={provided}
/> */
}
