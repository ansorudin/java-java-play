import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';

interface HomeProps {
  handleProfileScreen: () => void;
  handleScanScreen: () => void;
  handleExitScreen: () => void;
}

export const Home: React.FC<HomeProps> = ({
  handleProfileScreen,
  handleScanScreen,
  handleExitScreen,
}) => {
  return (
    <Box flex={1} bg="$red200">
      <Box flex={1}>
        <Button
          onPress={handleExitScreen}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>Exit Games </ButtonText>
        </Button>
        <Text>Saldo Uang Pajak</Text>
        <Text>Dadu Otomatis</Text>

        <Button
          onPress={handleProfileScreen}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>Nama Player 1</ButtonText>
        </Button>
      </Box>

      <Button
        mb={20}
        onPress={handleScanScreen}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Scan NFC</ButtonText>
      </Button>
    </Box>
  );
};
