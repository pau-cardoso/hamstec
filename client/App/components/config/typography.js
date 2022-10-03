import {neutral, primary} from './colors';
import * as Font from 'expo-font';
import {
	Jost_400Regular,
	Jost_500Medium,
	Jost_600SemiBold,
} from '@expo-google-fonts/jost'

let customFonts = {
  'Jost_400Regular': Jost_400Regular,
  'Jost_500Medium': Jost_500Medium,
  'Jost_600SemiBold': Jost_600SemiBold,
};

Font.loadAsync(customFonts);


export const fontSize = {
  x10: {
    fontSize: 13,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x40: {
    fontSize: 19,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 38,
  },
}

export const fontWeight = {
	regular: {
		fontFamily: 'Jost_400Regular',
  },
  medium: {
		fontFamily: 'Jost_500Medium',
  },
  semibold: {
		fontFamily: 'Jost_600SemiBold',
  },
}

export const letterSpacing = {
  x30: 2,
  x40: 3,
}

export const lineHeight = {
  x10: {
    lineHeight: 20,
  },
  x20: {
    lineHeight: 22,
  },
  x30: {
    lineHeight: 24,
  },
  x40: {
    lineHeight: 26,
  },
  x50: {
    lineHeight: 32,
  },
  x60: {
    lineHeight: 38,
  },
  x70: {
    lineHeight: 44,
  },
}

export const header = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.bold,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.bold,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.bold,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.bold,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.bold,
  },
  x60: {
    ...fontSize.x60,
    ...lineHeight.x60,
    ...fontWeight.bold,
  },
  x70: {
    ...fontSize.x70,
    ...lineHeight.x70,
    ...fontWeight.bold,
  },
}

export const subheader = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.semibold,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.semibold,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.semibold,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.semibold,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.semibold,
  },
}

export const body = {
  x10: {
    ...fontSize.x10,
    ...lineHeight.x10,
    ...fontWeight.regular,
  },
  x20: {
    ...fontSize.x20,
    ...lineHeight.x20,
    ...fontWeight.regular,
  },
  x30: {
    ...fontSize.x30,
    ...lineHeight.x30,
    ...fontWeight.regular,
  },
  x40: {
    ...fontSize.x40,
    ...lineHeight.x40,
    ...fontWeight.regular,
  },
  x50: {
    ...fontSize.x50,
    ...lineHeight.x50,
    ...fontWeight.regular,
  },
}

export const fontColor = {
  white: {
    color: neutral.white,
  },
  black: {
    color: neutral.black,
  },
  brand: {
    color: primary.brand,
  },
  s050: {
    color: neutral.s050,
  },
  s100: {
    color: neutral.s100,
  },
  s150: {
    color: neutral.s150,
  },
  s200: {
    color: neutral.s200,
  },
  s250: {
    color: neutral.s250,
  },
  s300: {
    color: neutral.s300,
  },
  s400: {
    color: neutral.s400,
  },
  s500: {
    color: neutral.s500,
  },
  s600: {
    color: neutral.s600,
  },
  s700: {
    color: neutral.s700,
  },
  s800: {
    color: neutral.s800,
  },
  s900: {
    color: neutral.s900,
  },
}

export const type = {
	body: {
		fontFamily: 'Jost_400Regular',
    ...fontColor.s800,
	}
}

export const monospace = {
  base: {
    fontFamily: 'Jost_400Regular',
  },
}