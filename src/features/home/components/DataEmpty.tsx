import { Image, Text, Box } from '@gluestack-ui/themed';
import { FC } from 'react';
import { IPlayer } from '../../../stores/type';
import Button from '../../../components/Button';

interface DataEmptyProps {
  dataPlayer: IPlayer[];
  buttonScan: () => void;
}

export const DataEmpty: FC<DataEmptyProps> = ({ buttonScan, dataPlayer }) => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="space-around"
      display={dataPlayer.length > 0 ? 'none' : 'flex'}>
      <Box alignItems="center">
        <Text size="4xl" bold color="$black">
          Welcome To
        </Text>
        <Text size="2xl" bold color="$black">
          JavaJava Play
        </Text>
      </Box>
      <Image
        w="$full"
        h={150}
        source={require('../../../../asset/homeScreen/all-player-image.png')}
        alt="icon"
      />
      <Box w={280}>
        <Button full onPress={buttonScan} title="Scan To New Player" />
      </Box>
    </Box>
  );
};
