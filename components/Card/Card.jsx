import { Avatar } from "../Avatar";
import { Container } from "../Layout";
import { format } from "@lukeed/ms";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./Card.module.css";

const classes = {
  inlineTag: "bg-pink-300 rounded-md p-0.5 text-sm text-white",
};

const Card = ({ card, className }) => {
  let separateTags = card.tags.join(",").split(",");

  return (
    // <div className={className}>
    <div className="flex flex-col bg-white">
      <div className="h-28 w-30 flex-shrink-0 overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={card.image}
          alt="image"
        />
      </div>
      <div className="px-2 py-2">
        <div className="text-sm mb-2">{card.title}</div>
        <p className="text-gray-700 text-sm">{card.content}</p>
      </div>
      <div className="my-1">
        {separateTags.map((item, id) => {
          return (
            <span className={classes.inlineTag} key={id}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
