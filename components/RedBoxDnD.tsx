"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

type BoxType = {
  number: number;
  x: number;
  y: number;
};

const RedBoxDnd = () => {
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const [board, setBoard] = useState<BoxType[]>([]);

  const [{ isOver }, drop] = useDrop<BoxType, void, { isOver: boolean }>({
    accept: "BoxType",
    drop: item => onDrop(item),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const onDrop = (item: BoxType) => {
    const box = document.getElementById(`box-${item.number}`);
    if (wrapperRef.current && box) {
      const parentRect = wrapperRef.current.getBoundingClientRect();
      const elementRect = box.getBoundingClientRect();

      const position = {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.bottom - parentRect.top,
        right: elementRect.right - parentRect.left,
      };

      // Output the position information
      console.log("Element Position (relative to parent):");
      console.log("Top: " + position.top);
      console.log("Left: " + position.left);
      console.log("Bottom: " + position.bottom);
      console.log("Right: " + position.right);
    }
  };

  const addBox = () => {
    setBoard([...board, { number: board.length, x: 0, y: 0 }]);
  };

  return (
    <div className="p-8 space-y-4">
      <button
        className="border border-red-500 text-sm font-medium px-4 py-2 rounded-lg"
        onClick={addBox}
      >
        Add Box
      </button>
      <div ref={wrapperRef}>
        <div
          ref={drop}
          className={`h-[80vh] w-full ring-1 rounded-lg ${
            isOver ? "ring-red-500" : "ring-red-400"
          }`}
        >
          {board.map(item => (
            <DraggableBox {...item} key={item.number} />
          ))}
        </div>
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
      className={`w-20 h-20 rounded-lg transition-colors flex justify-center items-center text-xl font-semibold ${
        isDragging ? "bg-red-500" : "bg-yellow-500"
      }`}
    >
      {number}
    </div>
  );
};
