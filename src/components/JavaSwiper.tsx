import React, { FC, ReactNode, useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, TouchableOpacity } from 'react-native';

import { useEffect } from 'react';
import { useState } from 'react';
import { Box, EditIcon, TrashIcon } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';

interface SwipeableProps {
  component: ReactNode;
  onDelete: () => void;
  onEdit: () => void;
  moveProfile: () => void;
  activeSwipe: string;
  onSwipe: (id: string) => void;
  id: string;
}

export const JavaSwiper: FC<SwipeableProps> = ({
  component,
  onDelete,
  onEdit,
  moveProfile,
  activeSwipe,
  onSwipe,
  id,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [showRemove, setShowRemove] = useState<boolean>(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
    onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -100) {
        setShowRemove(true);
        Animated.timing(translateX, {
          toValue: -150,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          onSwipe(id);
        });
      } else {
        setShowRemove(false);
        Animated.timing(translateX, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (id !== activeSwipe) {
      console.log('hayoo');
      Animated.spring(translateX, {
        toValue: 0,

        useNativeDriver: false,
      }).start(() => setShowRemove(false));
    }
  }, [activeSwipe, id, translateX]);
  const buttonOpacity = translateX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const buttonZIndex = translateX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, -1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {showRemove && (
        <Animated.View
          style={[styles.hiddenButtonsContainer, { opacity: buttonOpacity, zIndex: buttonZIndex }]}>
          <Box style={styles.button} backgroundColor="$success600" onTouchEnd={onEdit}>
            <Icon as={EditIcon} color="$white" />
          </Box>
          <Box style={styles.button} onTouchEnd={onDelete} backgroundColor="red">
            <Icon as={TrashIcon} color="$white" />
          </Box>
        </Animated.View>
      )}

      <Animated.View
        style={[styles.listItem, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}>
        <TouchableOpacity onPress={moveProfile}>{component}</TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  hiddenButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 150, // Width of the button area
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    flex: 1,
  },
});
