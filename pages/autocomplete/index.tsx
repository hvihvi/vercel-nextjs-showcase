import React, { useState } from "react";
import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import styles from "./index.module.css";
import { UserSelect } from "../../components/users/UserSelect";
import { useEditor } from "../../components/useEditor";
import { useRenderElement } from "../../components/useRenderElement";
import { useUserSearch } from "../../components/users/useUserSearch";

const DiscordTextArea = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useRenderElement();
  const editor = useEditor();
  const { users, index, display, handleUserSearchChange, onKeyDown } =
    useUserSearch(editor);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        handleUserSearchChange();
      }}
    >
      {display && <UserSelect users={users} index={index} />}
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
