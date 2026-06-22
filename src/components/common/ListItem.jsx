import React, { useEffect, useRef, useState } from "react";
import "../CSS/ListItem.css";

import { AppButton } from "./AppButton";

import {
  trimBody,
  checkLineLimitExceeded,
} from "../../Services/Helpers/Formatting";

export default function ListItem({
  varient = "pending",
  body = "Text here",
  title = "title",
  date = "null",
  active = false,
  onPress,
  eventFun,
  deleteFun,
}) {
  const [shouldExpand, setShouldExpand] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(active);
  const [showClamp, setShowClamp] = useState(!active);

  const bodyRef = useRef(null);

  const limitTitle = 15;
  const transitionTime = 400;

  const variation = {
    pending: {
      buttonText: "Mark Done",
      buttonClass: "button-pending",
    },
    completed: {
      buttonText: "Undo",
      buttonClass: "button-completed",
    },
    failed: {
      buttonText: "Delete",
      buttonClass: "button-failed",
    },
  };

  useEffect(() => {
    setPressed(active);
  }, [active]);

  useEffect(() => {
    if (pressed) {
      setShowClamp(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowClamp(true);
    }, transitionTime);

    return () => clearTimeout(timer);
  }, [pressed]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setShouldExpand(checkLineLimitExceeded(bodyRef));
    });
  }, [body, showClamp]);

  function handleActiveOn() {
    setHovering(true);
  }

  function handleActiveOff() {
    setHovering(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onPress();
    }
  }

  return (
    <div
      className={`container-vertical ${varient} ${hovering ? "hovering" : ""}`}
      tabIndex={0}
      onClick={(e) => {
        onPress();
        e.stopPropagation();
      }}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleActiveOn}
      onMouseLeave={handleActiveOff}
      onFocus={handleActiveOn}
      onBlur={handleActiveOff}
      onTouchStart={handleActiveOn}
      onTouchEnd={handleActiveOff}
      onTouchCancel={handleActiveOff}
    >
      <div className="container-horizontal header">
        <h1 className="headding">
          {pressed ? title : trimBody(title, limitTitle)}
        </h1>

        <h1 className="date">{date}</h1>
      </div>

      <div
        className={`body-wrapper ${pressed ? "expanded" : "collapsed"} ${
          shouldExpand && showClamp ? "bodyC" : ""
        }`}
      >
        <p className={showClamp ? "body" : ""} ref={bodyRef}>
          {body}
        </p>
      </div>

      <div
        className={`container-horizontal button-storage ${
          hovering ? "hovering" : ""
        }`}
      >
        <AppButton varient={variation[varient].buttonClass} onClick={eventFun}>
          {variation[varient].buttonText}
        </AppButton>

        {varient !== "failed" && (
          <AppButton varient="button-important" onClick={deleteFun}>
            Delete
          </AppButton>
        )}
      </div>
    </div>
  );
}
