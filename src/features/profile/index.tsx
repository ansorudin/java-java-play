import {
  Box,
  Text,
  Button,
  ArrowLeftIcon,
  ButtonIcon,
  Icon,
  DownloadIcon,
  ExternalLinkIcon,
  StarIcon,
  ButtonText,
} from '@gluestack-ui/themed';
import Swiper from 'react-native-swiper';

import { ProfileImage } from './components/ProfileImage';

export const Profile = () => {
  return (
    <Box flex={1}>
      <Button
        borderRadius="$full"
        position="absolute"
        left={1}
        size="xs"
        variant="outline"
        aspectRatio={1}
        borderColor="$coolGray500">
        <ButtonIcon size="md" as={ArrowLeftIcon} color="$coolGray500" />
      </Button>
      <Box paddingVertical={5} alignItems="center">
        <Text bold>Hello Siavash!</Text>
      </Box>

      <Box flexDirection="row" alignItems="center" justifyContent="flex-end" marginVertical={5}>
        <Icon as={DownloadIcon} m="$2" w="$4" h="$4" />
        <Text size="xs" color="$coolGray400" bold>
          Rp 80.000
        </Text>
      </Box>

      <Box
        flexDirection="row"
        rounded={10}
        justifyContent="space-between"
        width="$full"
        padding={5}
        borderWidth={1}
        borderColor="$coolGray500"
        marginBottom={25}>
        <Button variant="link" p="$0" size="sm">
          <Icon as={DownloadIcon} m="$2" w="$4" h="$4" />
          <ButtonText size="xs" color="$coolGray500">
            Top up
          </ButtonText>
        </Button>
        <Button variant="link" p="$0" size="sm">
          <Icon as={ExternalLinkIcon} m="$2" w="$4" h="$4" />
          <ButtonText size="xs" color="$coolGray500">
            Transfer
          </ButtonText>
        </Button>
        <Button variant="link" p="$0" size="sm">
          <Icon as={StarIcon} m="$2" w="$4" h="$4" />
          <ButtonText size="xs" color="$coolGray500">
            History
          </ButtonText>
        </Button>
      </Box>

      <Swiper showsButtons={true}>
        <ProfileImage
          data={{
            image: 'https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg',
            title: 'Tjomas',
            description: 'lalalal',
          }}
        />
        <ProfileImage
          data={{ image: 'https://www.mordeo.org/download/6157/', title: '', description: '' }}
        />
        <ProfileImage
          data={{
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbK45YvXlYTC3t0rH6SONYBr-aZiVxi_dsfg&usqp=CAU',
            title: '',
            description: '',
          }}
        />
      </Swiper>
    </Box>
  );
};
