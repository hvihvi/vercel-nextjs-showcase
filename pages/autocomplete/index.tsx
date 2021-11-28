import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Range, Transforms } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  Slate,
  useFocused,
  useSelected,
  withReact,
} from "slate-react";
import data from "../../components/data.json";
import styles from "./index.module.css";
import { UserSelect } from "../../components/UserSelect";
import { Mention } from "../../components/Mention";

const DiscordTextArea = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [target, setTarget] = useState<Range | undefined>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(
    // @ts-ignore
    () => withMentions(withReact(withHistory(createEditor()))),
    []
  );

  const users = data.users
    .filter((it) => it.username.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = index >= users.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = index <= 0 ? users.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, users[index].username);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, search, target]
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
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
      }}
    >
      {target && users.length > 0 && <UserSelect users={users} index={index} />}
      <section className={styles.textSection}>
        <Editable
          renderElement={renderElement}
          onKeyDown={onKeyDown}
          placeholder="Envoyer un message dans #welcome"
        />
      </section>
    </Slate>
  );
};

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

const insertMention = (editor, character) => {
  const mention = {
    type: "mention",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const initialValue: Descendant[] = [
  {
    children: [
      {
        text: "",
      },
    ],
  },
];

export default DiscordTextArea;
