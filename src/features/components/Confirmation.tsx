import {
  Box,
  Text,
  Button,
  ButtonIcon,
  ChevronLeftIcon,
  Image,
  ButtonText,
} from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';
import { ModalSuccess } from './ModalSuccess';
import { useState } from 'react';
import { ItemTransaction } from './ItemTransaction';

export const Confirmation = () => {
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);

  return (
    <Box>
      <Button
        onPress={() => navigate('TopUp')}
        position="absolute"
        size="sm"
        variant="solid"
        aspectRatio={1}
        rounded="$full"
        backgroundColor="$coolGray300"
        zIndex={1}>
        <ButtonIcon size="md" as={ChevronLeftIcon} color="$coolGray500" />
      </Button>
      <Box paddingVertical={5} alignItems="center" marginBottom={30}>
        <Text bold>Confirmation</Text>
      </Box>

      <Box alignItems="center" gap={10}>
        <Text size="2xl" bold>
          Are you sure ?
        </Text>
        <Text size="sm" textAlign="center">
          Please make sure that you want proceed this transaction.
        </Text>

        <Box alignItems="center" width="$full" mt={20}>
          <Image
            height={60}
            position="absolute"
            width={60}
            rounded="$full"
            borderColor="$secondary300"
            alt="image"
            zIndex={1}
            source={{
              uri: 'https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg',
            }}
          />
          <Box
            backgroundColor="$coolGray200"
            rounded="$lg"
            mt={30}
            width="$full"
            paddingVertical="$10"
            paddingHorizontal={24}>
            <Text size="xl" bold textAlign="center">
              Siavash
            </Text>
            <ItemTransaction title="Funding source" text="Bank" />
            <ItemTransaction title="Transaction" text="Top Up" />
            <ItemTransaction title="Top Up Amount" text="Rp. 700,000" />
          </Box>
        </Box>
        <Button variant="solid" p="$0" size="md" mt={40} width="$2/3">
          <ButtonText onPress={() => setOpenModalSuccess(true)} size="md">
            Continue
          </ButtonText>
        </Button>
      </Box>
      <ModalSuccess isOpen={openModalSuccess} text="Top up money from bank" />
    </Box>
  );
};
