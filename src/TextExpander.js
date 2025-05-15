import React, { useState } from "react";

const TextExpander = ({
  expandButtonText = "Show more",
  collapsedButtonText = "Hide more",
  buttonTextColor = "red",
  expanded = false,
  collapsedNumWords = 10,
  children,
  className = "",
}) => {
  const [isExpand, setIsExpand] = useState(expanded);

  const displayText = isExpand
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const buttonStyle = {
    background: "none",
    font: "inherit",
    border: "none",
    cursor: "pointer",
    color: buttonTextColor,
  };

  return (
    <div className={className}>
      <span>{displayText}</span>{" "}
      <button onClick={() => setIsExpand((open) => !open)} style={buttonStyle}>
        {isExpand ? collapsedButtonText : expandButtonText}
      </button>
    </div>
  );
};

export default TextExpander;
