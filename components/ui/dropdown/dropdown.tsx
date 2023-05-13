import styles from './dropdown.module.scss';
import { useState } from 'react';
import { IDropdownProps } from './dropdown.types';
import Icon from '../Icon/Icon';
import { BsArrowDown } from 'react-icons/bs';
import { ADD_COLLECTION } from '../../../pages/create-nft/SingleForm';

export function Dropdown({
  required,
  heading,
  onChange,
  options,
  checked,
  placeholder,
  openModal,
  ...props
}: IDropdownProps) {
  const [expanded, setExpanded] = useState(false);
  const headingElement = heading && <p className={styles.heading}>{heading}</p>;

  const toggleOptions = () => setExpanded(!expanded);

  const handleClick = (index: number, option: string) => {
    if (option === ADD_COLLECTION) {
      openModal();
    } else {
      toggleOptions();
      onChange(index);
    }
  };

  const OptionList = () => {
    return (
      <ul className={styles.options}>
        {!required && (
          <p onClick={() => handleClick(-1, 'None')} className={styles.item}>
            None
          </p>
        )}
        {options.map((option, index) => (
          <p
            key={option + index}
            onClick={() => handleClick(index, option)}
            className={styles.item}
          >
            {option}
          </p>
        ))}
      </ul>
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
      <div className={styles.header}>
        <p>{checked !== -1 ? options[checked] : placeholder}</p>
        <Icon icon={<BsArrowDown />} />
      </div>
      {expanded && <OptionList />}
    </div>
  );
}
