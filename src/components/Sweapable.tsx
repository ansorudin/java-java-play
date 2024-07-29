// import React, { FC, ReactNode, useRef } from 'react';

// import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

// interface SwipeableProps {
//   component: ReactNode;
//   onDelete: () => void;
//   onEdit: () => void;
// }

// export const Swipeable: FC<SwipeableProps> = ({ component, onDelete, onEdit }) => {
//   const translateX = useRef(new Animated.Value(0)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
//       onPanResponderRelease: (e, gestureState) => {
//         if (gestureState.dx < -100) {
//           Animated.timing(translateX, {
//             toValue: -150,
//             duration: 200,
//             useNativeDriver: false,
//           }).start();
//         } else {
//           Animated.spring(translateX, {
//             toValue: 0,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     }),
//   ).current;

//   return (
//     <View style={styles.container}>
//       <View style={styles.hiddenButtonsContainer}>
//         <View style={styles.button} onTouchEnd={onEdit}>
//           <Text style={styles.buttonText}>Edit</Text>
//         </View>
//         <View style={styles.button} onTouchEnd={onDelete}>
//           <Text style={styles.buttonText}>Delete</Text>
//         </View>
//       </View>
//       <Animated.View
//         style={[styles.listItem, { transform: [{ translateX }] }]}
//         {...panResponder.panHandlers}>
//         {component}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // marginVertical: 5,
//     overflow: 'hidden',
//   },
//   hiddenButtonsContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     bottom: 0,
//     width: 150, // Width of the button area
//     justifyContent: 'flex-end',
//     backgroundColor: 'transparent',
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   listItem: {
//     flex: 1,
//     // padding: 20,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

import React, { FC, ReactNode, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface SwipeableProps {
  component: ReactNode;
  onDelete: () => void;
  onEdit: () => void;
}

export const Swipeable: FC<SwipeableProps> = ({ component, onDelete, onEdit }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.timing(translateX, {
            toValue: -150,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

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
      <Animated.View
        style={[styles.hiddenButtonsContainer, { opacity: buttonOpacity, zIndex: buttonZIndex }]}>
        <View style={styles.button} onTouchEnd={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </View>
        <View style={styles.button} onTouchEnd={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.listItem, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}>
        {component}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  listItem: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
