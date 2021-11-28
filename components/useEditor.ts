import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";

export const useEditor = () =>
  useMemo(
    // @ts-ignore
    () => withMentions(withReact(withHistory(createEditor()))),
    []
  );

const withMentions = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
};
