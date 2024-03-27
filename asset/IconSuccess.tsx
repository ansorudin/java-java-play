import Svg, { G, Path } from 'react-native-svg';
import { Box } from '@gluestack-ui/themed';

export const IconSuccess = () => {
  return (
    <Box width={90} h={90}>
      <Svg viewBox="0 0 18 30">
        <G
          width="100%"
          height="100%"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          stroke="#20AE5C">
          <Path d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z" />
        </G>
      </Svg>
    </Box>
  );
};
