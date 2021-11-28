import React from "react";
import styles from "./ChannelSelect.module.css";

export const ChannelSelect = ({ chans, index }) => {
  return (
    <div className={styles.wrapper}>
      {chans.map((chan, i) => (
        <div
          className={styles.chanWrapper}
          key={chan.discriminator}
          style={{
            background: i === index ? "#36393f" : "transparent",
          }}
        >
          <span className={styles.leftSpan}>
            <strong>#{chan.name}</strong>
          </span>
          <span className={styles.rightSpan}>{chan.id}</span>
        </div>
      ))}
    </div>
  );
};
