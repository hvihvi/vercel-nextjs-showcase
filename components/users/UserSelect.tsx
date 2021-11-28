import React from "react";
import styles from "./UserSelect.module.css";

export const UserSelect = ({ users, index }) => {
  return (
    <div className={styles.wrapper}>
      {users.map((user, i) => (
        <div
          className={styles.userWrapper}
          key={user.discriminator}
          style={{
            padding: "1px 3px",
            borderRadius: "3px",
            background: i === index ? "#36393f" : "transparent",
          }}
        >
          <span className={styles.leftSpan}>
            <img
              className={styles.avatar}
              alt="psykokwak"
              src="https://www.pokepedia.fr/images/4/44/Psykokwak-RFVF.png"
            />
            <strong>{user.username}</strong>
          </span>
          <span className={styles.rightSpan}>{toReadableUser(user)}</span>
        </div>
      ))}
    </div>
  );
};

const toReadableUser = (user) => `${user.username}#${user.discriminator}`;
