import { Box, Button, ButtonIcon, Text, ChevronLeftIcon } from '@gluestack-ui/themed';

interface PropsHeader {
  title: string;
  buttonHeader: () => void;
}

export const Header = (props: PropsHeader) => {
  const { title, buttonHeader } = props;
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="center" mb={25}>
      <Button variant="link" position="absolute" left={1} onPress={buttonHeader}>
        <ButtonIcon size="xl" as={ChevronLeftIcon} color="$coolGray700" />
      </Button>
      <Box>
        <Text size="lg" bold>
          {title}
        </Text>
      </Box>
    </Box>
  );
};
