import { useState } from "react";

export default function App({
  collapsedNumWords,
  expandButtonText,
  collapseButtonText,
  buttonColor,
  expanded,
  className,
}) {
  return (
    <div>
      <TextExpander expanded={expanded} collapsedNumWords={collapsedNumWords}>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={collapsedNumWords}
        expandButtonText={expandButtonText}
        collapseButtonText={collapseButtonText}
        buttonColor={buttonColor}
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={expanded} className={className}>
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "blue",
  expanded = false,
  className = "expanderBox",
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const words = children.split(" ");
  const displayedText = words.slice(0, collapsedNumWords).join(" ");
  console.log(displayedText);
  return (
    <div style={{ margin: "10px 0" }} className={className}>
      <span>{isExpanded ? `${children} ` : `${displayedText}... `}</span>
      <span
        type="button"
        style={{ color: buttonColor, cursor: "pointer" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </span>
    </div>
  );
}
