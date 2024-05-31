import { FC } from 'react';
import { Box, Text, Heading, AlertText, Alert, AlertIcon, InfoIcon } from '@gluestack-ui/themed';

export enum ActionType {
  profile = 'navigateToProfile',
  history = 'taxTransferPlayer',
}
interface NfcTagProps {
  error: string;
  display: boolean;
}

export const NfcTag: FC<NfcTagProps> = ({ error, display }) => {
  return (
    <Box flex={1} display={display ? 'flex' : 'none'}>
      <Alert action="error" position="absolute" variant="accent" display={error ? 'flex' : 'none'}>
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText size="2xs">{error}</AlertText>
      </Alert>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">{error ? 'Scanning Again...' : 'Scaning...'}</Text>
      </Box>
    </Box>
  );
};
