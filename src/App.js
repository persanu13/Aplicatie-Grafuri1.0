import "./App.css";
import { saveAs } from "file-saver";
import { useState, useRef } from "react";
import { Nod, Node } from "./components/Node";
import { Arc, Line } from "./components/Arc";

function App() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [nods, setNods] = useState(new Array());
  const [arcs, setArcs] = useState(new Array());
  const TwoArcs = useRef({ Nod1: null, Nod2: null });
  const [Orientat, setOrientat] = useState(false);
  const MatA = new Array();
  const mouseMoveHandler = (event) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };
  const IsOverlap = (myNod) => {
    let myBool = false;
    nods.forEach((element) => {
      if (
        myNod.number !== element.number &&
        myNod.point.x < element.point.x + 120 &&
        myNod.point.x > element.point.x - 120 &&
        myNod.point.y < element.point.y + 120 &&
        myNod.point.y > element.point.y - 120
      ) {
        myBool = true;
      }
    });
    return myBool;
  };
  const createNod = () => {
    if (
      mouseCoordinates.x < 50 ||
      mouseCoordinates.x > 1500 ||
      mouseCoordinates.y < 100 ||
      mouseCoordinates.y > 600
    )
      return null;
    const new_Nod = new Nod(mouseCoordinates, nods.length);
    if (IsOverlap(new_Nod)) return null;
    const myNods = nods.slice();
    myNods.push(new_Nod);
    setNods(myNods);
  };
  const createArc = () => {
    let doubleArc = false;
    let idSters = null;
    const new_Arc = new Arc(TwoArcs.current.Nod1, TwoArcs.current.Nod2);
    const myArcs = arcs.slice();
    myArcs.forEach((Arc, key) => {
      if (Arc.Nod1 === new_Arc.Nod1 && Arc.Nod2 === new_Arc.Nod2)
        doubleArc = true;
      idSters = key;
    });
    if (!doubleArc) {
      myArcs.push(new_Arc);
      setArcs(myArcs);
    } else {
      myArcs.splice(idSters);
      setArcs(myArcs);
    }
  };
  const renderNods = nods.map((myNod, key) => {
    MatA.push(new Array(MatA.length).fill(0));
    MatA.map((value) => {
      value.push(0);
    });
    return (
      <Node
        nod={myNod}
        nods={nods}
        TwoArcs={TwoArcs}
        createArc={createArc}
        key={key}
      ></Node>
    );
  });
  const renderArcs = arcs.map((myArc, key) => {
    if (Orientat) {
      MatA[myArc.Nod1.number][myArc.Nod2.number] = 1;
    } else {
      MatA[myArc.Nod1.number][myArc.Nod2.number] = 1;
      MatA[myArc.Nod2.number][myArc.Nod1.number] = 1;
    }
    return <Line myArc={myArc} orientat={Orientat} key={key} />;
  });
  const handleDownload = () => {
    let stringMatA = "";
    for (let i = 0; i < MatA.length; i++) {
      for (let j = 0; j < MatA[i].length; j++) {
        stringMatA += MatA[i][j] + " ";
      }
      stringMatA += "\n";
    }
    console.log(stringMatA);
    const file = new Blob([stringMatA], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file, "MatA.txt");
  };
  return (
    <div className='App' onMouseDown={createNod} onMouseMove={mouseMoveHandler}>
      <h1 className='titlu'>Aplicatie Grafuri</h1>
      <p className='coordonate'>
        {" "}
        Mouse Coordinates: x = {mouseCoordinates.x}, y=
        {mouseCoordinates.y}
      </p>
      <div className='buttons'>
        <button
          onClick={() => {
            setOrientat(true);
          }}
        >
          Orientat
        </button>
        <button
          onClick={() => {
            setOrientat(false);
          }}
        >
          Neorientat
        </button>
        <button onClick={handleDownload}>Download</button>
      </div>
      {renderNods}
      {renderArcs}
    </div>
  );
}

export default App;
