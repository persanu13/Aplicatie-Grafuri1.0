import { useRef, useEffect, useState } from "react";
import { Arc } from "./Arc";

export class Nod {
  constructor(point, number) {
    this.point = point;
    this.number = number;
    this.press = false;
    this.r = Math.floor(Math.random() * 170) + 60;
    this.g = Math.floor(Math.random() * 170) + 60;
    this.b = Math.floor(Math.random() * 170) + 60;
  }
}

export function Node({ nod, nods, TwoArcs, createArc }) {
  const [rand, setRand] = useState(false);
  const drageed = useRef(false);
  const savePoint = useRef(nod.point);
  const nodStyle = {
    left: nod.point.x - 25,
    top: nod.point.y - 25,
    zIndex: drageed.current ? 2 : 1,
    cursor: drageed.current ? "grabbing" : "pointer",
    backgroundColor: nod.press
      ? "rgb(" + (nod.r + 40) + ", " + (nod.g + 40) + ", " + (nod.b + 40) + ")"
      : "rgb(" + nod.r + ", " + nod.g + ", " + nod.b + ")",
  };
  const handleDrag = (newPoint) => {
    if (drageed.current) {
      nod.point = newPoint;
    }
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleDrag);
    return () => {
      window.removeEventListener("mousemove", handleDrag);
    };
  }, []);
  const IsOverlap = () => {
    if (
      nod.point.x < 50 ||
      nod.point.x > 1500 ||
      nod.point.y < 100 ||
      nod.point.y > 600
    )
      return true;
    let myBool = false;
    nods.forEach((element) => {
      if (
        nod.number !== element.number &&
        nod.point.x < element.point.x + 120 &&
        nod.point.x > element.point.x - 120 &&
        nod.point.y < element.point.y + 120 &&
        nod.point.y > element.point.y - 120
      ) {
        myBool = true;
      }
    });
    return myBool;
  };
  const mouseUp = () => {
    drageed.current = false;
    if (IsOverlap()) {
      nod.point = savePoint.current;
    }
  };
  const Click = () => {
    if (TwoArcs.current.Nod1 === null) {
      TwoArcs.current.Nod1 = nod;
      nod.press = true;
    } else {
      if (TwoArcs.current.Nod1 === nod) {
        TwoArcs.current.Nod1 = null;
        nod.press = false;
      } else {
        TwoArcs.current.Nod2 = nod;
        createArc();
        TwoArcs.current.Nod1.press = false;
        TwoArcs.current = { Nod1: null, Nod2: null };
      }
    }
    setRand(!rand);
  };
  return (
    <div
      onDoubleClick={Click}
      onMouseDown={() => {
        drageed.current = true;
        savePoint.current = nod.point;
      }}
      onMouseUp={mouseUp}
      className={"Nod"}
      style={nodStyle}
    >
      {nod.number}
    </div>
  );
}
