"use client";

import { faker } from "@faker-js/faker";
import React, { useCallback, useEffect } from "react";

import styles from "./List.module.css";

function getIdFromEvent(event: React.DragEvent<HTMLDivElement>) {
  const target = event.currentTarget as HTMLDivElement;
  const id = parseInt(target.dataset.id ?? "");
  if (Number.isInteger(id)) {
    return id;
  } else {
    return null;
  }
}
const colors = [
  "#f4b8e4",
  "#ca9ee6",
  "#ea999c",
  "#e78284",
  "#99d1db",
  "#a6d189",
  "#e5c890",
  "#85c1dc",
  "#b7bdf8",
  "#94e2d5",
] as const;

const data = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  color: colors[i % colors.length],
}));

export default function List() {
  const [list, setList] = React.useState(data);
  const draggedId = React.useRef<number | null>(null);

  const onDragStart = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    draggedId.current = getIdFromEvent(event);
  }, []);

  const onDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const targetId = getIdFromEvent(event);
      if (
        draggedId === null ||
        targetId === null ||
        draggedId.current === targetId
      ) {
        return;
      }

      setList((prev) => {
        const newList = [...prev];
        const draggedIndex = newList.findIndex(
          (item) => item.id === draggedId.current
        );
        const targetIndex = newList.findIndex((item) => item.id === targetId);

        const [draggedItem] = newList.splice(draggedIndex, 1);
        newList.splice(targetIndex, 0, draggedItem);
        return newList;
      });
    },
    [draggedId]
  );

  const onDragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggedId.current = null;
  }, []);

  //tester avec key === index puis key === id
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((item) => (
        <ItemRender
          key={item.id}
          item={item}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        />
      ))}
    </div>
  );
}

interface Props {
  item: Item;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

function ItemRender({ item, ...props }: Readonly<Props>) {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const doc = ref.current;
    if (!doc) {
      return;
    }

    doc.animate(
      [{ outlineColor: "#d20f39" }, { outlineColor: "transparent" }],
      {
        duration: 300,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        iterations: 2,
      }
    );
  }, [item.id]);

  return (
    <div
      ref={ref}
      className={styles.item}
      draggable
      data-id={item.id}
      style={{
        "--color": item.color,
      }}
      {...props}
    >
      <div>
        <div className="font-bold text-md text-base-content leading-tight mb-2 text-pretty">
          {item.title}
        </div>
        <div className="text-base-content text-sm">{item.description}</div>
      </div>
    </div>
  );
}
