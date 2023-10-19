"use client";
import { Hero } from "@/components";
import {
  DndContext,
  TouchSensor,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";

export default function Home() {
  const handleDrop = (event) => {
    if (event && event.active && event.over) {
      const activeId = event.active.id;
      const overId = event.over.id;

      if (overId !== "hatstand") {
        const { addSweater, removeFromHatStand } = event.over.data.current;
        const { folded } = event.active.data.current;
        !folded && addSweater(activeId);
        removeFromHatStand(activeId);
      } else {
        const { addBackSweater, removeSweaterFromShelf } =
          event.over.data.current;
        addBackSweater(activeId);
        removeSweaterFromShelf(activeId);
      }
    }
  };

  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(touchSensor, mouseSensor);

  return (
    <DndContext id='dndContext' onDragEnd={handleDrop} sensors={sensors}>
      <Hero />
    </DndContext>
  );
}
