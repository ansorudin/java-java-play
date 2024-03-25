import { Box, Image, Text } from '@gluestack-ui/themed';
import { IProfile } from '../types';

interface Props {
  data: IProfile;
}

export const ProfileImage = (props: Props) => {
  const { image, title, description } = props.data;
  return (
    <Box width="$full" flex={1} rounded={10}>
      <Image
        height={400}
        rounded={10}
        borderWidth={1}
        borderColor="$secondary300"
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
        height={400}
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
        height={400}
        borderWidth={2}
        paddingBottom={20}
        justifyContent="flex-end"
        alignItems="center">
        <Text size="2xl" color="white" bold>
          {title}
        </Text>
        <Text paddingBottom="$2" color="white">
          {description}
        </Text>
      </Box>
    </Box>
  );
};
