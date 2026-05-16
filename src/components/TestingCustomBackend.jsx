import React from "react";
import { useEffect, useState } from "react";

function TestingCustomBackend() {
  const [testVar, SetTestVar] = useState([{}]);

  useEffect(() => {
    fetch("/api/test")
      .then((response) => response.json())
      .then((data) => {
        SetTestVar(data.TestingResult);
      });
  }, []);

  return (
    <>
      <button className={`task-item ${testVar ? "completed" : ""}`} />
    </>
  );
}

export default TestingCustomBackend;
