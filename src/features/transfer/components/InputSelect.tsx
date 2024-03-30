import {
  Text,
  ChevronDownIcon,
  Box,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  Icon,
} from '@gluestack-ui/themed';
import { ReactNode } from 'react';

interface PropsInputSelect {
  title: string;
  handleChangeValue: (e: string) => void;
  placeHolder: string;
  underline?: boolean;
  children: ReactNode;
}

export const InputSelect = (props: PropsInputSelect) => {
  const { title, handleChangeValue, placeHolder, children, underline } = props;
  const border = underline ? 'underlined' : 'outline';

  return (
    <Box gap={10}>
      <Text bold>{title}</Text>
      <Select onValueChange={handleChangeValue}>
        <SelectTrigger variant={border} size="sm">
          <SelectInput
            placeholder={placeHolder}
            fontSize="$sm"
            marginHorizontal={underline ? 8 : 0}
          />
          <SelectIcon>
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {children}
          </SelectContent>
        </SelectPortal>
      </Select>
    </Box>
  );
};
