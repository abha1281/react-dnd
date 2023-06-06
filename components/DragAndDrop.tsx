import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

const list = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Hello",
  },
  {
    id: 3,
    name: "Jef",
  },
  {
    id: 4,
    name: "Aisha",
  },
  {
    id: 5,
    name: "Meow",
  },
  {
    id: 6,
    name: "Pikachu",
  },
];

type ItemType = { id: number; name: string };

const DragAndDrop = () => {
  const [board, setBoard] = useState<ItemType[]>([]);
  const [originalBoard, setOriginalBoard] = useState<ItemType[]>([]);

  const addBox = (item: ItemType) => {
    setBoard([...board, item]);
    setOriginalBoard(board.filter(box => box.id !== item.id))
  };
  
  const addOriginal = (item: ItemType) => {
    setOriginalBoard([...originalBoard, item]);
    setBoard(board.filter(box => box.id !== item.id))
  };

  useEffect(() => {
    setOriginalBoard(list)
  },[])

  return (
    <div className="m-4 space-y-4">
      <DroppableBox name="List" list={originalBoard} onDrop={addOriginal} />
      <DroppableBox name="Board" list={board} onDrop={addBox} />
    </div>
  );
};

export default DragAndDrop;

import { DragSourceMonitor } from "react-dnd";

const DraggableBox: React.FC<ItemType> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag<
    ItemType,
    unknown,
    { isDragging: boolean }
  >({
    item: { id, name },
    type: "ItemType",
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`w-20 h-20 rounded-lg transition-colors ${
        isDragging ? "bg-red-500" : "bg-yellow-500"
      }`}
    />
  );
};

type DroppableBox = {
  list: ItemType[];
  name: string;
  onDrop?: (item: ItemType) => void;
};

const DroppableBox = ({ list, name, onDrop = () => {} }: DroppableBox) => {
  const [{ isOver }, drop] = useDrop<ItemType, void, { isOver: boolean }>({
    accept: "ItemType",
    drop: (item: ItemType) => onDrop(item),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`rounded-xl p-4 ring-1 ${
        isOver ? "ring-red-500" : " ring-teal-500"
      }`}
    >
      <p className="text-xl">{name}</p>
      <div className="flex items-center gap-x-4">
        {list.map(item => (
          <DraggableBox {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
