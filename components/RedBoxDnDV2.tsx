import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const draggable = [
  {
    id: "DG",
    name: "D",
    position: {
      x: 24,
      y: 24,
    },
  },
  {
    id: "KA",
    name: "K",
    position: {
      x: 164,
      y: 164,
    },
  },
];

type BoxType = {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
};

const RedBoxDnDV2 = () => {
  const [boxes, setBoxes] = useState<BoxType[]>([...draggable]);
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const addBox = () => {
    const newBox = {
      id: `${boxes.length}`,
      name: `${boxes.length}`,
      position: {
        x: 20,
        y: 20,
      },
    };
    setBoxes([...boxes, newBox]);
  };

  const handleDragEnd = (ev: DragEndEvent) => {
    const activeId = ev.active.id;

    setBoxes(box => {
      return box.map(draggable => {
        if (draggable.id === activeId) {
          return {
            ...draggable,
            position: {
              x: (draggable.position.x += ev.delta.x),
              y: (draggable.position.y += ev.delta.y),
            },
          };
        }
        return draggable;
      });
    });
  };

  return (
    <div className="p-8 space-y-4">
      <button
        className="border border-red-500 text-sm font-medium px-4 py-2 rounded-lg"
        onClick={addBox}
      >
        Add Box
      </button>
      <div className="h-[80vh] w-full ring-1 relative rounded-lg overflow-hidden">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {boxes.map(box => (
            <DraggableBox
              {...box}
              key={box.id}
              styles={{
                position: "absolute",
                left: `${box.position.x}px`,
                top: `${box.position.y}px`,
              }}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default RedBoxDnDV2;

type DraggableProps = {
  id: string;
  styles?: React.CSSProperties;
  name?: string;
};

const DraggableBox: React.FC<DraggableProps> = ({ id, styles, name }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    ...styles,
  };

  return (
    <div
      id={`box-${id}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="absolute w-20 h-20 rounded-lg transition-colors flex justify-center items-center text-xl font-semibold bg-red-500"
    >
      {name}
    </div>
  );
};
