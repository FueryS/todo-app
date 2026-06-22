import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CookieTesting() {
  const [biscut, setBiscut, removeBiscut] = useCookies(["biscut"]);

  const [val, setVal] = useState();

  const onClick = () => {
    setBiscut("biscut", biscut, { path: "/" });
  };

  const onClickDel = () => {
    removeBiscut("biscut", { path: "/" });
  };

  return (
    <div>
      <h1>{biscut.biscut ? "Hello" : "Bye"}</h1>
      <button onClick={onClick}>Set</button>
      <button onClick={onClickDel}>Del</button>
    </div>
  );
}

export default CookieTesting;
