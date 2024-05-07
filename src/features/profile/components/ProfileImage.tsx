import { Box, Image, Text } from '@gluestack-ui/themed';
import { IProfile } from '../types';

interface Props {
  data: IProfile;
}

export const ProfileImage = (props: Props) => {
  const { image, title, description } = props.data;
  return (
    <Box width="$full" flex={1} rounded={20}>
      <Image
        rounded={10}
        h="$full"
        size="full"
        alt="image"
        position="absolute"
        source={{
          uri: image,
        }}
      />
      <Box
        width="$full"
        rounded={10}
        h="$full"
        borderWidth={2}
        justifyContent="flex-end"
        alignItems="center"
        bg="black"
        opacity="$50"
      />
      <Box
        gap={10}
        width="$full"
        position="absolute"
        zIndex={1}
        rounded={10}
        h="$full"
        paddingBottom={25}
        justifyContent="flex-end"
        alignItems="center">
        <Text size="2xl" color="white" bold>
          {title}
        </Text>
        <Text paddingBottom="$6" color="white" textAlign="center" paddingHorizontal={20}>
          {description}
        </Text>
      </Box>
    </Box>
  );
};
