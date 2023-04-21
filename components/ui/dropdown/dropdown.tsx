import styles from './dropdown.module.scss';
import { useState } from 'react';
import { IDropdownProps } from './dropdown.type';
import Icon from '../Icon/Icon';
import { BsArrowDown } from 'react-icons/bs';

export function Dropdown({
  required,
  heading,
  onChange,
  options,
  checked,
  placeholder,
  ...props
}: IDropdownProps) {
  const [expanded, setExpanded] = useState(false);
  const headingElement = heading && <p className={styles.heading}>{heading}</p>;

  const toggleOptions = () => setExpanded(!expanded);
  const select = (option: number) => {
    toggleOptions();
    onChange(option);
  };

  const optionList = expanded && (
    <ul className={styles.options}>
      {options.map((option, index) => (
        <p
          key={option + index}
          onClick={() => select(index)}
          className={styles.item}
        >
          {option}
        </p>
      ))}
    </ul>
  );

  return (
    <div
      tabIndex={0}
      className={styles.dropdown}
      onBlur={() => setExpanded(false)}
      onClick={toggleOptions}
      {...props}
    >
      {headingElement}
      <div className={styles.header}>
        <p>{options[checked]}</p>
        <Icon icon={<BsArrowDown />} />
      </div>
      {optionList}
    </div>
  );
}
