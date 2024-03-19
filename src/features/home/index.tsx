import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { navigate } from '../../routes/MainNavigator';

export const Home = () => {
  return (
    <Box flex={1}>
      <Text color="$black">Hey, Welcome back!</Text>
      <Button
        onPress={() => navigate('Profile')}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Profile </ButtonText>
      </Button>
    </Box>
  );
};
