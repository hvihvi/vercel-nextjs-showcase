import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";

export const useEditor = () =>
  useMemo(
    () =>
      // @ts-ignore
      withBold(withChannels(withUsers(withReact(withHistory(createEditor()))))),
    []
  );

const withBold = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "bold" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "bold" ? true : isVoid(element);
  };

  return editor;
};

const withUsers = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "user" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "user" ? true : isVoid(element);
  };

  return editor;
};

const withChannels = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "channel" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "channel" ? true : isVoid(element);
  };

  return editor;
};
