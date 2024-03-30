import Svg, { G, Path } from 'react-native-svg';
import { Box } from '@gluestack-ui/themed';

export const IconHistory = () => {
  return (
    <Box width={30} h={30}>
      <Svg viewBox="0 0 24 24">
        <G
          width="100%"
          height="100%"
          stroke="#404040"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none">
          <Path d="M11.962 20q-3.047 0-5.311-1.99Q4.387 16.022 4.03 13h1.011q.408 2.58 2.351 4.29Q9.337 19 11.962 19q2.925 0 4.962-2.037T18.962 12q0-2.925-2.038-4.963T11.962 5q-1.552 0-2.918.656q-1.365.656-2.41 1.806h2.481v1H4.962V4.308h1v2.388q1.16-1.273 2.718-1.984Q10.238 4 11.962 4q1.663 0 3.118.626q1.455.626 2.542 1.713t1.714 2.543q.626 1.455.626 3.118q0 1.663-.626 3.118q-.626 1.455-1.714 2.543q-1.087 1.087-2.542 1.713q-1.455.626-3.118.626m3.203-4.146l-3.646-3.646V7h1v4.792l3.354 3.354z" />
        </G>
      </Svg>
    </Box>
  );
};
