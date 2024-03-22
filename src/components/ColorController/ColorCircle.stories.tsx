import ColorCircle from './ColorCircle';

export default {
  component: ColorCircle,
  title: 'ColorCircle',
  tags: ['autodocs'],
};

const swatchMockObj = {
  swatchName: 'CMYK(94, 84, 0, 0) - Custom Blue',
  colorSpace: 'CMYK',
  spotValue: null,
  id: 12345,
  place: 0,
  modified: false,
  foilable: false,

  cyanValue: 94,
  origCyanValue: 94,
  magentaValue: 84,
  origMagentaValue: 0,
  yellowValue: 0,
  origYellowValue: 0,
  blackValue: 0,
  origBlackValue: 0,

  redValue: 45,
  origRedValue: 45,
  greenValue: 63,
  origGreenValue: 63,
  blueValue: 144,
  origBlueValue: 144,
};

export const Default = {
  args: {
    color: swatchMockObj,
  },
};
