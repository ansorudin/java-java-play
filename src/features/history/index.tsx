import { Box, Text, Button, ButtonIcon, ChevronLeftIcon, Image } from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';

export const History = () => {
  return (
    <Box flex={1}>
      <Button
        onPress={() => navigate('Profile')}
        position="absolute"
        left={1}
        size="xs"
        variant="link"
        zIndex={1}
        aspectRatio={1}>
        <ButtonIcon size="xl" as={ChevronLeftIcon} color="$coolGray500" />
      </Button>
      <Box paddingVertical={5} alignItems="center" marginBottom={30}>
        <Text bold>History</Text>
      </Box>

      <Box
        flexDirection="row"
        justifyContent="space-between"
        bgColor="$white"
        shadowColor="$white"
        paddingHorizontal={10}
        paddingVertical={10}
        rounded={10}>
        <Box flexDirection="row" gap={10}>
          <Image
            height={35}
            width={35}
            rounded="$full"
            borderWidth={1}
            borderColor="$secondary300"
            alt="image"
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbK45YvXlYTC3t0rH6SONYBr-aZiVxi_dsfg&usqp=CAU',
            }}
          />
          <Box>
            <Text bold size="sm">
              John Fonesca
            </Text>
            <Text size="xs">Transfer</Text>
          </Box>
        </Box>
        <Text size="sm" color="$red400">
          {' '}
          - Rp. 800,400
        </Text>
      </Box>

      <Box
        marginTop={20}
        flexDirection="row"
        justifyContent="space-between"
        bgColor="$white"
        shadowColor="$white"
        paddingHorizontal={10}
        paddingVertical={10}
        rounded={10}>
        <Box flexDirection="row" gap={10}>
          <Image
            height={35}
            width={35}
            rounded="$full"
            borderWidth={1}
            borderColor="$secondary300"
            alt="image"
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbK45YvXlYTC3t0rH6SONYBr-aZiVxi_dsfg&usqp=CAU',
            }}
          />
          <Box>
            <Text bold size="sm">
              John Fonesca
            </Text>
            <Text size="xs">Top Up </Text>
          </Box>
        </Box>
        <Text size="sm" color="$green400">
          {' '}
          + Rp. 800,400
        </Text>
      </Box>

      <Box
        marginTop={20}
        flexDirection="row"
        justifyContent="space-between"
        bgColor="$white"
        shadowColor="$white"
        paddingHorizontal={10}
        paddingVertical={10}
        rounded={10}>
        <Box flexDirection="row" gap={10}>
          <Image
            height={35}
            width={35}
            rounded="$full"
            borderWidth={1}
            borderColor="$secondary300"
            alt="image"
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbK45YvXlYTC3t0rH6SONYBr-aZiVxi_dsfg&usqp=CAU',
            }}
          />
          <Box>
            <Text bold size="sm">
              Bank
            </Text>
            <Text size="xs">Top Up </Text>
          </Box>
        </Box>
        <Text size="sm" color="$green400">
          {' '}
          + Rp. 800,400
        </Text>
      </Box>
    </Box>
  );
};
