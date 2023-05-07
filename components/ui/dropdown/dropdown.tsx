import styles from './dropdown.module.scss';
import { useState } from 'react';
import { IDropdownProps } from './dropdown.types';
import { ADD_COLLECTION } from '../../../pages/create-nft/SingleForm';

export function Dropdown({
  required,
  heading,
  onChange,
  options,
  id,
  placeholder,
  openModal,
  value,
  ...props
}: IDropdownProps) {
  console.log(value);
  const [expanded, setExpanded] = useState(false);
  const headingElement = heading && <p className={styles.heading}>{heading}</p>;

  const toggleOptions = () => setExpanded(!expanded);

  const handleClick = () => {
    if (value === ADD_COLLECTION) {
      openModal();
    }
  };

  const OptionList = () => {
    return (
      <select
        value={value}
        className={styles.select}
        onChange={onChange}
        id={id}
      >
        {placeholder && !required && (
          <option className={styles.item}>None</option>
        )}
        {options.map((option, index) => (
          <option key={option + index} className={styles.item}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div
      tabIndex={0}
      className={styles.dropdown}
      onBlur={() => setExpanded(false)}
      onClick={toggleOptions}
      {...props}
    >
      {headingElement}
      <OptionList />
    </div>
  );
}
