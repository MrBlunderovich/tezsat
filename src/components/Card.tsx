import { useDrag } from "react-dnd";
import Camera from "./svg/Camera";
import styles from "./Card.module.css";

function Card({ text }: { text: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="border-black border rounded-lg p-4"
      /* style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }} */
    >
      <Camera />
      <p>{text}</p>
    </div>
  );
}

export default Card;

/* import { FC } from "react";
import Camera from "../svg/Camera";

const Card: FC<{ id: string }> = ({ id }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    //event.dataTransfer.dropEffect = "move";
    console.log(event);
  };

  return (
    <div className={styles.card} draggable onDragStart={handleDragStart}>
      <Camera />
      <p>{id}</p>
    </div>
  );
};

export default Card; */
