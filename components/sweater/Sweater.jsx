"use client";
import { SweaterStyled, FoldedSweaterStyled } from "./SweaterStyled";
import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

const Sweater = (props) => {
  const { attributes, listeners, transform, isDragging, setNodeRef } = useDraggable({
    id: props.id,
    data: {
      folded: props.img2 == null ? false : true,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1
  };

  return props.img2 == null ? (
    <SweaterStyled
      src={props.img}
      alt={`sweater ${props.id}`}
      left={props.id * 7}
      width={234}
      height={189}
      id={props.id}
      ref={setNodeRef}
      style={style}
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
      style={style}
      {...listeners}
      {...attributes}
    />
  );
};

export default Sweater;
