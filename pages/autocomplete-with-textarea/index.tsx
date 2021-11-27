import { useState } from "react";
import styles from "./index.module.css";
import { TextArea } from "../../components/TextArea";
import { UserAutoCompleteRadio } from "../../components/UserAutoCompleteRadio";

const AutoCompletePage = () => {
  const [value, setValue] = useState("");
  const [displayAutoComplete, setDisplayAutoComplete] = useState(false);

  const onChange = (e) => {
    if (
      (displayAutoComplete && e.target.value.endsWith(" ")) ||
      e.target.value === ""
    ) {
      setDisplayAutoComplete(false);
    }
    if (e.target.value.endsWith(" @") || e.target.value === "@") {
      setDisplayAutoComplete(true);
    }
    setValue(e.target.value);
  };

  const onSubmit = (user) => {
    setValue(value + user.username);
    setDisplayAutoComplete(false);
  };

  return (
    <section className={styles.textSection}>
      {displayAutoComplete && <UserAutoCompleteRadio onSubmit={onSubmit} />}
      <TextArea value={toDisplayedValue(value)} onChange={onChange} />
    </section>
  );
};

const toDisplayedValue = (value) => {
  return value;
};

export default AutoCompletePage;
