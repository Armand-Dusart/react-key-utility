"use client";

import { faker } from "@faker-js/faker";
import Image from "next/image";
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

const data = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  image: faker.image.urlPicsumPhotos(),
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
      [{ outlineColor: "oklch(70% 0.1 45)" }, { outlineColor: "transparent" }],
      {
        duration: 1000,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        iterations: 1,
      }
    );
  }, [item.id]);

  return (
    <div
      ref={ref}
      className={styles.item}
      draggable
      data-id={item.id}
      {...props}
    >
      <div className="avatar">
        <div className="w-8 rounded">
          <Image
            src={item.image}
            alt="item-Avatar-component"
            width={32}
            height={32}
            priority
          />
        </div>
      </div>
      <div>
        <div className="font-bold text-md text-base-content leading-tight mb-2 text-pretty">
          {item.title}
        </div>
        <div className="text-base-content text-sm">{item.description}</div>
      </div>
    </div>
  );
}
