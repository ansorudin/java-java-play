import { Box, Text } from '@gluestack-ui/themed';

interface PropsItemTransaction {
  title: string;
  text: string;
}

export const ItemTransaction = (props: PropsItemTransaction) => {
  const { title, text } = props;
  return (
    <Box
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
