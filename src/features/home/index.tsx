import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';

interface HomeProps {
  handleNextScreen: () => void;
}

export const Home: React.FC<HomeProps> = ({ handleNextScreen }) => {
  return (
    <Box flex={1} bg="$red200">
      <Text color="$black">Hey, Welcome back!</Text>
      <Button
        onPress={handleNextScreen}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Profile </ButtonText>
      </Button>
    </Box>
  );
};
