import { Box, Text, Heading, Button, ButtonText } from '@gluestack-ui/themed';

export const RegisterPlayer = () => {
  return (
    <Box flex={1}>
      {/* <Alert action="error" variant="accent" display={error ? 'flex' : 'none'}>
      <AlertIcon as={InfoIcon} mr="$3" />
      <AlertText size="2xs">{error}</AlertText>
    </Alert> */}
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        {/* <Text size="sm">{error ? 'Scanning Again...' : 'Scaning...'}</Text> */}
        {/* <Button
          display={error ? 'flex' : 'none'}
          variant="outline"
          action="negative"
          size="xs"
          gap="$1"
          marginTop={20}
          onPress={handleBackHome}>
          <ButtonText>Back To Home</ButtonText>
        </Button> */}
      </Box>
    </Box>
  );
};
