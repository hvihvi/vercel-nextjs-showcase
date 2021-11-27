import { useState } from "react";
import data from "./data.json";
import styles from "./UserAutoCompleteRadio.module.css";

const toReadableUser = (user) => `${user.username}#${user.discriminator}`;

const toId = (user) => "radio" + user.discriminator;

export const UserAutoCompleteRadio = ({ onSubmit }) => {
  const [value, setValue] = useState(toReadableUser(data.users[0]));
  return (
    <form className={styles.form}>
      {data.users.map((user) => (
        <div key={toId(user)} className={styles.item}>
          <input
            id={toId(user)}
            className={styles.input}
            autoFocus
            type="radio"
            value={toReadableUser(user)}
            checked={value === toReadableUser(user)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(user);
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor={toId(user)} className={styles.label}>
            <span className={styles.leftSpan}>
              <img
                className={styles.avatar}
                alt="psykokwak"
                src="https://www.pokepedia.fr/images/4/44/Psykokwak-RFVF.png"
              />
              <strong>{user.username}</strong>
            </span>
            <span className={styles.rightSpan}>{toReadableUser(user)}</span>
          </label>
        </div>
      ))}
    </form>
  );
};
