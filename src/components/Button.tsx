import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Text } from '@gluestack-ui/themed';

interface Props extends PressableProps {
  title?: string;
  full?: boolean;
  colorSchema?: 'gray' | 'secondary';
  variant?: 'outline' | 'ghost';
  size?: 'xxs' | 'xs' | 'normal';
  disabled?: boolean;
}

interface MakeStyle {
  colorSchema?: 'gray' | 'secondary';
  variant?: 'outline' | 'ghost';
  size?: 'xxs' | 'xs' | 'normal';
  disabled?: boolean;
}

function makeStyle(props: MakeStyle) {
  const { colorSchema, variant, size, disabled } = props;

  const xxs = 10;
  const xs = 12;
  const normal = 16;
  const normalPadding = 16;
  const paddingVerticalxxs = 4;
  const paddingVerticalxs = 8;
  const padddingHorizontal = size === 'xs' ? xs : normalPadding;
  let backgroundColor = '#080808';
  let text = variant ? '#080808' : '#feffff';
  if (colorSchema === 'gray' || disabled) {
    backgroundColor = '#525252';
    text = '#f5f5f5';
  } else if (colorSchema === 'secondary') {
    backgroundColor = '#254336';
    text = '#feffff';
  }

  let fontSize = normal;
  let paddingVertical = xs;

  switch (size) {
    case 'xxs':
      fontSize = xxs;
      paddingVertical = paddingVerticalxxs;
      break;
    case 'xs':
      fontSize = xs;
      paddingVertical = paddingVerticalxs;
      break;
    default:
      paddingVertical = xs;
      break;
  }

  return StyleSheet.create({
    base: {
      backgroundColor: variant ? 'transparent' : backgroundColor,
      borderWidth: 2,
      borderColor: variant === 'ghost' ? 'transparent' : backgroundColor,
      alignSelf: 'flex-start',
      paddingHorizontal: variant === 'ghost' ? 0 : padddingHorizontal,
      paddingVertical,
      borderRadius: 6,
      alignItems: 'center',
    },
    full: {
      width: '100%',
    },
    title: {
      color: text,
      fontSize,
    },
  });
}

function Button(props: Props) {
  const { full = false, title = 'Button', colorSchema, variant, size, disabled } = props;

  const localStyle = makeStyle({
    colorSchema,
    variant,
    size,
    disabled,
  });

  const fullStyle = full ? localStyle.full : {};

  return (
    <Pressable style={[localStyle.base, fullStyle]} {...props}>
      <Text bold style={localStyle.title}>
        {title}
      </Text>
    </Pressable>
  );
}

export default Button;
