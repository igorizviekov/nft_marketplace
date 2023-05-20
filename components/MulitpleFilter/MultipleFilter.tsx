import React from 'react';
import { IMultipleFilterProps } from './MultipleFilter.types';
import styles from './MultipleFilter.module.scss';
import { Accordion } from 'react-accordion-ts';
import 'react-accordion-ts/src/panel.css';
import Icon from '../ui/Icon/Icon';
import { BsChevronDown } from 'react-icons/bs';
import { useStoreActions, useStoreState } from '../../store';
import classNames from 'classnames';
import { ITraits } from '../ui/NFTCard/NFTCard.types';
import Traits from '../Traits/Traits';
import { Trait } from '../../store/model/nft-mint/nft-mint.types';
export const MultipleFilter = ({ values, hasPrice }: IMultipleFilterProps) => {
  const { addFilter } = useStoreActions((actions) => actions.filter);
  const { filters } = useStoreState((state) => state.filter);

  const priceFilter = [
    {
      title: (
        <div className={styles.title}>
          <h3>{'Price'}</h3>
          <Icon icon={<BsChevronDown />} />
        </div>
      ),
      content: (
        <Traits
          traits={[]}
          addTrait={function (trait: Trait): void {
            throw new Error('Function not implemented.');
          }}
          setFormError={() => console.log('asd')}
          traitError={false}
          isTrait={false}
          leftLabel="Max price"
          leftPlaceholder="Max"
          rightLabel="Min price"
          rightPlaceholder="Min"
        />
      ),
    },
  ];
  const items = values?.traits.map((trait) => ({
    title: (
      <div className={styles.title}>
        <h3>{trait.trait_type}</h3>
        <Icon icon={<BsChevronDown />} />
      </div>
    ),
    content: (
      <>
        {trait.values.map((value, index) => {
          const selected = filters.some(
            (filter: ITraits) =>
              filter.value === value && filter.trait_type === trait.trait_type
          );
          return (
            <div
              key={index}
              className={classNames(styles.filter, selected && styles.selected)}
              onClick={() =>
                addFilter({ trait_type: trait.trait_type, value: value })
              }
            >
              <p>{value}</p>
            </div>
          );
        })}
      </>
    ),
  }));

  const newItems: Array<{ title: JSX.Element; content: JSX.Element }> = [
    ...priceFilter,
    ...items,
  ];
  return (
    <div className={styles.wrapper}>
      {hasPrice && items ? (
        <Accordion items={newItems} duration={200} multiple={false} />
      ) : (
        <Accordion items={items} duration={200} multiple={false} />
      )}
    </div>
  );
};
