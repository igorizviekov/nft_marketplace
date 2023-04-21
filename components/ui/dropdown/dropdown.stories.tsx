import { Dropdown } from './dropdown';
import { ComponentStory, Meta } from '@storybook/react';
import { IDropdownProps } from './dropdown.type';
import { useState } from 'react';

export default {
  title: '/components/Form/Dropdown',
  component: Dropdown,
  args: {
    heading: 'Fruits',
    name: 'fruits',
    checked: 0,
    options: ['Apple', 'Cherry', 'Ananas'],
  },
  argTypes: {
    onChange: {
      action: 'Select changed',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#eaf1fa',
          width: '300px',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Story />
        <br />
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args: IDropdownProps) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});

export const WithState = ({
  name,
  options,
  checked,
  heading,
}: IDropdownProps) => {
  const [selected, setSelected] = useState(checked);

  return (
    <Dropdown
      heading={heading}
      options={options}
      onChange={(option) => setSelected(option)}
      name={name}
      checked={selected}
    />
  );
};
