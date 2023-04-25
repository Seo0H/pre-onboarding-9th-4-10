import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  MenuItemOption,
  MenuItemOptionProps,
  Tag,
  TagProps,
} from '@chakra-ui/react';

export const TextBtn = (props: BoxProps) => {
  return (
    <Box fontSize={'xl'} cursor='default' _selection={{ background: 'none' }} {...props}>
      {props.children}
    </Box>
  );
};

export const IconBtn = (props: IconButtonProps) => {
  return (
    <IconButton variant='outline' {...props}>
      {props.children}
    </IconButton>
  );
};

export const MenuItem = (props: MenuItemOptionProps) => (
  <MenuItemOption minH='35px' fontSize='md' fontWeight='bold' {...props}>
    {props.children}
  </MenuItemOption>
);

export const OutlinBtn = (props: ButtonProps) => (
  <Button variant='outline' {...props}>
    {props.children}
  </Button>
);

export const TagGray = (props: TagProps) => (
  <Tag fontSize='md' padding='5 1' color='gray.500' {...props}>
    {props.children}
  </Tag>
);

export const MenuItemOptionBlock = (props: MenuItemOptionProps) => {
  return (
    <MenuItemOption minH='35px' fontSize='md' fontWeight='bold' {...props}>
      {props.children}
    </MenuItemOption>
  );
};
