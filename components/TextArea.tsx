import { VisuallyHidden } from "./VisuallyHidden";
import styles from "./TextArea.module.css";

export const TextArea = ({ value, onChange }) => (
  <form>
    <VisuallyHidden>
      <label htmlFor="textarea">Envoyer un message dans #welcome</label>
    </VisuallyHidden>
    <textarea
      rows={5}
      cols={99}
      className={styles.textArea}
      id="textarea"
      onChange={onChange}
      placeholder="Envoyer un message dans #welcome"
      value={value}
    />
  </form>
);
