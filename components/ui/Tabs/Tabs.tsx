import styles from './Tabs.module.scss';
import { ITabsProps } from './Tabs.types';
export const Tabs = ({
  options,
  selected,
  className,
  handleChange,
  ...props
}: ITabsProps) => {
  const classNames = [styles['tabs'], className].filter(Boolean).join(' ');
  const tabOptions = options.map((option, i) => (
    <h1
      className={`${styles['tab-option']} ${
        selected === i ? styles['selected'] : ''
      }`}
      key={i + option}
      color={selected === i ? 'blue' : 'grey'}
      onClick={() => handleChange(i)}
    >
      {option}
    </h1>
  ));
  return (
    <div className={classNames} {...props}>
      {tabOptions}
    </div>
  );
};
