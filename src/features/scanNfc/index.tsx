import { Box, Text, Button, ButtonText, Heading } from '@gluestack-ui/themed';
import { Header } from '../../components/Header';
import { FC } from 'react';

interface ScanNfcProps {
  buttonBack: () => void;
}

export const ScanNfc: FC<ScanNfcProps> = ({ buttonBack }) => {
  return (
    <Box flex={1}>
      <Header title="" buttonHeader={buttonBack} />
      <Box flex={1} alignItems="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">Scanning</Text>
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
