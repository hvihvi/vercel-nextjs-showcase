import React, { useCallback } from "react";
import { Bold } from "../bold/Bold";
import { UserText } from "../users/UserText";
import { ChannelText } from "../channels/ChannelText";

export const useRenderElement = () =>
  useCallback((props) => <Element {...props} />, []);

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "user":
      return <UserText {...props} />;
    case "channel":
      return <ChannelText {...props} />;
    case "bold":
      return <Bold {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
