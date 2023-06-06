import React, { useState } from "react";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragEndEvent,
} from "@dnd-kit/core";

type BoxType = {
  id: number;
  x: number;
  y: number;
};

const RedBoxDnDV2 = () => {
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const addBox = () => {
    setBoxes([...boxes, { id: boxes.length, x: 0, y: 0 }]);
  };

  const onDragEnd = ({ active, activatorEvent }: DragEndEvent) => {
  const updatedBoxes = boxes.map(box => {
      if (box.id !== active.id) {
        return box
      }

      return {
        ...box,
        // x: activatorEvent.clientX,
        // y: activatorEvent.clientY
      }
    })

    setBoxes(updatedBoxes)
  };

  return (
    <div className="p-8 space-y-4">
      <button
        className="border border-red-500 text-sm font-medium px-4 py-2 rounded-lg"
        onClick={addBox}
      >
        Add Box
      </button>
      <DndContext onDragEnd={onDragEnd}>
        <div
          ref={setNodeRef}
          className={`h-[80vh] w-full relative ring-1 rounded-lg overflow-hidden ${
            isOver ? "ring-red-500" : "ring-red-400"
          }`}
        >
          {boxes.map(box => (
            <DraggableBox {...box} key={box.id} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default RedBoxDnDV2;

const DraggableBox: React.FC<BoxType> = ({ id, x, y }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      id={`box-${id}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="w-20 h-20 rounded-lg absolute transition-colors flex justify-center items-center text-xl font-semibold bg-cyan-500"
    >
      {id}
    </div>
  );
};
