import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

type BoxType = {
  number: number;
  x: number;
  y: number;
}

const RedBoxDnd = () => {
  const [board, setBoard] = useState<number[]>([]);

  const [{ isOver }, drop] = useDrop<number, void, { isOver: boolean }>({
    accept: "BoxType",
    drop: item => {
      console.log(item);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const addBox = () => {
    setBoard([...board, board.length]);
  };

  return (
    <div className="p-8 space-y-4">
      <button
        className="border border-red-500 text-sm font-medium px-4 py-2 rounded-lg"
        onClick={addBox}
      >
        Add Box
      </button>
      <div
        ref={drop}
        className={`h-[80vh] w-full ring-1 rounded-lg ${
          isOver ? "ring-red-500" : "ring-red-400"
        }`}
      >
        {board.map(item => (
          <DraggableBox number={item} key={item} />
        ))}
      </div>
    </div>
  );
};

export default RedBoxDnd;

import { DragSourceMonitor } from "react-dnd";

const DraggableBox: React.FC<{ number: number }> = ({ number }) => {
  const [{ isDragging }, drag] = useDrag<
    number,
    unknown,
    { isDragging: boolean }
  >({
    item: number,
    type: "BoxType",
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`w-20 h-20 rounded-lg transition-colors flex justify-center items-center text-xl font-semibold ${
        isDragging ? "bg-red-500" : "bg-yellow-500"
      }`}
    >
      {number}
    </div>
  );
};
