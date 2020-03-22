import React, { useState } from "react";
import styled from "styled-components";
import Item from "./Item";
import cookieSrc from "../cookie.svg";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 }
];

const calculateCookiesPerTick = purchasedItems => {
  console.log(purchasedItems, "purchased items");
  let sum = 0;
  let total = items.reduce((reduceTotal, item) => {
    sum += item.value * purchasedItems[item.id];
    console.log(sum, "SUM IS HERE");
    return sum;
  });
  console.log(total, "this is total");
  return total;
};

const Game = () => {
  const [numCookies, setNumCookies] = useState(10000);

  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0
  });

  React.useEffect(() => {
    const handleKeyDown = ev => {
      if (ev.code === "Space") HandleClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function HandleClick() {
    setNumCookies(numCookies + 1);
    document.title = `${numCookies}Fuck u`;
    console.log("CLICK HERE?");
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numOfGeneratedCookies + numCookies);
    // console.log(numOfGeneratedCookies)
    // let x = numOfGeneratedCookies + purchasedItems.total;
    // console.log(x, "TEST  XXXXXX", purchasedItems.total, "PURCHASEDITEMS");
  }, 1000);
  function handlePoints(item) {
    // console.log("button-HIT", item.id);
    if (numCookies >= item.cost) {
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1
      });
      // console.log(purchasedItems, "");
    } else {
      alert("You Dont Got ENOUGH MONEY");
    }
  }
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button onClick={HandleClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>
      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => {
          return (
            <Item
              key={item.id}
              itemId={item.id}
              name={item.name}
              value={item.value}
              cost={item.cost}
              purchased={purchasedItems[item.id]}
              handlePoints={() => handlePoints(item)}
            />
          );
        })}
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
