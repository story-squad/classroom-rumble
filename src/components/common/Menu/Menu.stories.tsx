import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../Button';
import Menu, { IMenuProps } from './Menu';

const Template: Story<
  React.PropsWithChildren<IMenuProps> & {
    hideItems?: boolean;
  }
> = ({
  isOpen,
  setIsOpen,
  hideItems,
  children,
  title = 'Menu Title',
  ...args
}) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <Button
        style={{
          width: 200,
        }}
        onMouseDown={() => setOpen((prev) => !prev)}
      >
        {open ? 'Close' : 'Open'}
      </Button>
      {open && (
        <Menu isOpen={open} setIsOpen={setOpen} title={title} {...args}>
          {!hideItems && (
            <>
              <Menu.Item>Thing 1</Menu.Item>
              <Menu.Item>Thing 2</Menu.Item>
              <Menu.Item>Thing 3</Menu.Item>
            </>
          )}
        </Menu>
      )}
    </div>
  );
};

export const RightMenu = Template.bind({});
RightMenu.args = {
  isOpen: true,
  right: true,
};

export const LeftMenu = Template.bind({});
LeftMenu.args = {
  isOpen: true,
  left: true,
};

export const BottomMenu = Template.bind({});
BottomMenu.args = {
  isOpen: true,
  bottom: true,
};

export const TopMenu = Template.bind({});
TopMenu.args = {
  isOpen: true,
  top: true,
};

export const MenuAsTooltip = Template.bind({});
MenuAsTooltip.args = {
  isOpen: true,
  bottom: true,
  hideItems: true,
  style: {
    width: '75%',
    left: '12.5%',
  },
};

export default {
  title: 'Components/Compound/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
} as Meta;
