"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

type BoxType = {
  number: number;
  x: number;
  y: number;
};

const RedBoxDnd = () => {
  const [boxes, setBoxes] = useState<BoxType[]>([]);

  const [{ isOver }, drop] = useDrop<BoxType, void, { isOver: boolean }>({
    accept: "BoxType",
    drop: (item, monitor) => onDrop(item, monitor),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const onDrop = (item: BoxType, monitor: DropTargetMonitor<BoxType, void>) => {
    const newBoxes = boxes.map(box => {
      if (item.number !== box.number) {
        return box;
      }

      return {
        ...box,
        x: monitor.getClientOffset()?.x - 55,
        y: monitor.getClientOffset()?.y - 115,
      };
    });
    setBoxes(newBoxes);
  };

  const addBox = () => {
    setBoxes([...boxes, { number: boxes.length, x: 0, y: 0 }]);
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
          className={`h-[80vh] relative overflow-y-hidden w-full ring-1 rounded-lg ${
            isOver ? "ring-red-500" : "ring-red-400"
          }`}
        >
          {boxes.map(item => (
            <DraggableBox {...item} key={item.number} />
          ))}
        </div>
    </div>
  );
};

export default RedBoxDnd;

import { DragSourceMonitor } from "react-dnd";

const DraggableBox: React.FC<BoxType> = ({ number, x, y }) => {
  const [{ isDragging }, drag] = useDrag<
    BoxType,
    unknown,
    { isDragging: boolean }
  >({
    item: { number, x, y },
    type: "BoxType",
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      id={`box-${number}`}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      className={`w-20 h-20 absolute rounded-lg transition-colors flex justify-center items-center text-xl font-semibold ${
        isDragging ? "bg-red-500" : "bg-yellow-500"
      }`}
    >
      {number}
    </div>
  );
};
