import { Box, Text } from '@gluestack-ui/themed';

interface PropsItemTransaction {
  title: string;
  text?: string;
  hidden?: boolean;
}

export const ItemTransaction = (props: PropsItemTransaction) => {
  const { title, text, hidden } = props;
  return (
    <Box
      display={hidden ? 'none' : undefined}
      flexDirection="row"
      justifyContent="space-between"
      borderColor="$coolGray300"
      borderBottomWidth={1}
      padding={13}>
      <Text size="sm" color="$coolGray500">
        {title}
      </Text>
      <Text size="sm" bold>
        {text}
      </Text>
    </Box>
  );
};
