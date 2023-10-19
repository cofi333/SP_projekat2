"use client";
import { SweaterStyled, FoldedSweaterStyled } from "./SweaterStyled";
import { useDraggable } from "@dnd-kit/core";

const Sweater = (props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: {
      folded: props.img2 == null ? false : true,
    },
  });

  return props.img2 == null ? (
    <SweaterStyled
      src={props.img}
      alt={`sweater ${props.id}`}
      left={props.id * 7}
      width={234}
      height={189}
      id={props.id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  ) : (
    <FoldedSweaterStyled
      src={props.img2}
      alt={`sweater ${props.id}`}
      width={150}
      height={20}
      id={props.id}
      top={props.top}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  );
};

export default Sweater;
