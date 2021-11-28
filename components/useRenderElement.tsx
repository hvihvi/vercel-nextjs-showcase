import React, { useCallback } from "react";
import { Mention } from "./Mention";

export const useRenderElement = () =>
  useCallback((props) => <Element {...props} />, []);

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
