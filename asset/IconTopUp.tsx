import Svg, { G, Path } from 'react-native-svg';
import { Box } from '@gluestack-ui/themed';

export const IconTopUp = () => {
  return (
    <Box width={30} h={30}>
      <Svg viewBox="0 0 18 18">
        <G
          width="100%"
          height="100%"
          stroke="#404040"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none">
          <Path d="M16.5 14.5v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2m-6-7v6.056m3-3.056h-6" />
        </G>
      </Svg>
    </Box>
  );
};
