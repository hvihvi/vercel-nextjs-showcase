import { useCallback, useState } from "react";
import { Editor, Range, Transforms } from "slate";
import data from "./data.json";

export const useUserSearch = (editor) => {
  const [target, setTarget] = useState<Range | undefined>();
  const [userIndex, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const users = data.users
    .filter((it) => it.username.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  const onUserKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = userIndex >= users.length - 1 ? 0 : userIndex + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = userIndex <= 0 ? users.length - 1 : userIndex - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertUser(editor, users[userIndex].username);
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
    [editor, userIndex, target, users]
  );

  const handleUserSearchChange = () => {
    const { selection } = editor;
    if (Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
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

  const displayUsers = target && users.length > 0;

  return {
    users,
    userIndex,
    displayUsers,
    handleUserSearchChange,
    onUserKeyDown,
  };
};

const insertUser = (editor, character) => {
  const mention = {
    type: "user",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
