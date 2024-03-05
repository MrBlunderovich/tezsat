import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";

import { Card } from "./RDNDCard";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const initialCards = [
  {
    id: 1,
    text: "1",
  },
  {
    id: 2,
    text: "2",
  },
  {
    id: 3,
    text: "3",
  },
  {
    id: 4,
    text: "4",
  },
  {
    id: 5,
    text: "5",
  },
  {
    id: 6,
    text: "6",
  },
  {
    id: 8,
    text: "8",
  },
  {
    id: 9,
    text: "9",
  },
  {
    id: 10,
    text: "10",
  },
];

export const Container: FC = () => {
  {
    const [cards, setCards] = useState(initialCards);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);

    const renderCard = useCallback(
      (card: { id: number; text: string }, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            isFirstCard={index === 0}
          />
        );
      },
      []
    );

    return (
      <DndProvider backend={HTML5Backend}>
        {/* <ul className="flex gap-4 flex-wrap pl-[222px] relative max-w-[666px]"> */}
        <ul className="grid gap-4 grid-cols-[auto,repeat(4,1fr)] relative">
          {cards.map((card, i) => renderCard(card, i))}
        </ul>
      </DndProvider>
    );
  }
};
