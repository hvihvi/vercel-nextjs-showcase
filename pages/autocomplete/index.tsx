import React, { useState } from "react";
import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import styles from "./index.module.css";
import { UserSelect } from "../../components/users/UserSelect";
import { useEditor } from "../../components/useEditor";
import { useRenderElement } from "../../components/useRenderElement";
import { useUserSearch } from "../../components/users/useUserSearch";
import { useChannelSearch } from "../../components/channels/useChannelSearch";
import { ChannelSelect } from "../../components/channels/ChannelSelect";

const DiscordTextArea = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useRenderElement();
  const editor = useEditor();
  const {
    users,
    userIndex,
    displayUsers,
    handleUserSearchChange,
    onUserKeyDown,
  } = useUserSearch(editor);
  const {
    channels,
    channelIndex,
    displayChans,
    handleChannelSearchChange,
    onChannelKeyDown,
  } = useChannelSearch(editor);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        handleUserSearchChange();
        handleChannelSearchChange();
      }}
    >
      {displayUsers && <UserSelect users={users} index={userIndex} />}
      {displayChans && <ChannelSelect chans={channels} index={channelIndex} />}
      <section className={styles.textSection}>
        <Editable
          renderElement={renderElement}
          onKeyDown={(e) => {
            onUserKeyDown(e);
            onChannelKeyDown(e);
          }}
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
