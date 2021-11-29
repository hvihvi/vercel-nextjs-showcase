import React from "react";

export const Bold = ({ attributes, children, element }) => {
  return (
    <strong
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(" ", "-")}`}
    >
      {element.character}
      {children}
    </strong>
  );
};
