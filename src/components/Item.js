import React from "react";
import data from "./Game";
import app from "./App";

function Item(props) {
  //   console.log(props, "-------------");
  const ref = React.useRef(props.itemId);
  console.log(ref, "---------");
  React.useEffect(() => {
    console.log(
      props.itemId,
      "------",
      typeof props.itemId,
      props.itemId === "cursor"
    );
    if (props.itemId === "cursor") {
      ref.current.focus();
    }
  }, [props]);
  return (
    <button ref={ref} onClick={() => props.handlePoints(props)}>
      <div>{`Name: ${props.name}`}</div>
      <div>{`Cost: ${props.cost}`}</div>
      <div>{`Value: ${props.value}`}</div>
      <div>{`Purchased: ${props.purchased}`}</div>
    </button>
  );
}

export default Item;
