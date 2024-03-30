import Svg, { G, Path } from 'react-native-svg';
import { Box } from '@gluestack-ui/themed';

export const IconTransfer = () => {
  return (
    <Box width={30} h={30}>
      <Svg viewBox="0 0 22 22">
        <G
          width="100%"
          height="100%"
          stroke="#404040"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none">
          <Path d="M11.5 15.308h1v-4.689l2.1 2.094l.713-.713L12 8.692L8.692 12l.714.708l2.094-2.095zM4.615 19q-.69 0-1.152-.462Q3 18.075 3 17.385V6.615q0-.69.463-1.152Q3.925 5 4.615 5h14.77q.69 0 1.152.463q.463.462.463 1.152v10.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1h14.77q.23 0 .423-.192q.192-.193.192-.423V6.615q0-.23-.192-.423Q19.615 6 19.385 6H4.615q-.23 0-.423.192Q4 6.385 4 6.615v10.77q0 .23.192.423q.193.192.423.192M4 18V6z" />
        </G>
      </Svg>
    </Box>
  );
};
