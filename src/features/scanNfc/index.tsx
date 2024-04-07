import { Box, Text, Button, ButtonText, Heading } from '@gluestack-ui/themed';

export const ScanNfc = () => {
  return (
    <Box flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">Scanning...</Text>
      </Box>
      <Button
        mb={10}
        size="md"
        variant="solid"
        $hover-bg="$backgroundDark100"
        bg="$backgroundDark700"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Scan</ButtonText>
      </Button>
    </Box>
  );
};
