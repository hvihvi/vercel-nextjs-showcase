import { FC } from "react";
import styles from "./VisuallyHidden.module.css";

/**
 * If an element is not explicit for screen readers, like svg buttons, inputs with no labels...
 * Use VisuallyHidden to add visually hidden explicit text or labels.
 */
export const VisuallyHidden: FC = ({ children }) => (
  <div className={styles.VisuallyHidden}>{children}</div>
);
