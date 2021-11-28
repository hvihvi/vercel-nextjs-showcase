import { useCallback, useState } from "react";
import { Editor, Range, Transforms } from "slate";
import data from "./data.json";

export const useChannelSearch = (editor) => {
  const [target, setTarget] = useState<Range | undefined>();
  const [channelIndex, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const channels = data.channels
    .filter((it) => it.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  const onChannelKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex =
              channelIndex >= channels.length - 1 ? 0 : channelIndex + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex =
              channelIndex <= 0 ? channels.length - 1 : channelIndex - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, channels[channelIndex].name);
            setTarget(null);
            setIndex(0);
            setSearch("");
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            setIndex(0);
            setSearch("");
            break;
        }
      }
    },
    [editor, channelIndex, target, channels]
  );

  const handleChannelSearchChange = () => {
    const { selection } = editor;
    if (Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^#(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        setIndex(0);
        return;
      }
    }

    setTarget(null);
  };

  const displayChans = target && channels.length > 0;

  return {
    channels,
    channelIndex,
    displayChans,
    handleChannelSearchChange,
    onChannelKeyDown,
  };
};

const insertMention = (editor, character) => {
  const mention = {
    type: "mention",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
