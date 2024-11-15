"use client";

import React, { useCallback, useEffect, useId } from "react";

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

export default function List({ data }: { data: Item[] }) {
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

        const temps = newList[draggedIndex];
        newList[draggedIndex] = newList[targetIndex];
        newList[targetIndex] = temps;

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  const id = useId();

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const doc = ref.current;
    if (!doc) {
      return;
    }

    const timeout = setTimeout(() => {
      doc.animate(
        [{ outlineColor: "#d20f39" }, { outlineColor: "transparent" }],
        {
          duration: 300,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          iterations: 2,
        }
      );
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [item.title]);

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
        <div className="text-right"></div>
        <div className="text-base-content mb-2 gap-2 text-pretty flex items-start">
          <span className="font-bold text-md leading-tight grow">
            {item.title}
          </span>
          <span className="rounded bg-base-100 text-base-content p-1 shadow">
            {id}
          </span>
        </div>
        <div className="text-base-content text-sm">{item.description}</div>
      </div>
    </div>
  );
}

// const ItemRenderMemo = React.memo(ItemRender);
