import React from "react";

interface BoardSpaceProps {
  id: number;
  key: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const BoardSpace = ({
  id,
  color,
  isSelected,
  onClick,
}: BoardSpaceProps): JSX.Element => {
  let classes;
  if (id === 0) {
    // an empty space on the board
    classes = "space";
  } else if (isSelected) {
    classes = "marble selected";
  } else if (id > 0) {
    // a coloured marble
    classes = `marble ${color}`;
  } else {
    // not part of the board
    classes = "empty";
  }

  return <div onClick={onClick} id={`${id}`} className={classes} />;
};
