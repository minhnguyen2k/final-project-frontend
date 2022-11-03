import { alpha } from '@mui/material/styles';

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  50: '#FBFCFD',
  100: '#F8F9FA',
  200: '#F1F3F5',
  300: '#ECEEF0',
  400: '#E6E8EB',
  500: '#DFE3E6',
  600: '#D7DBDF',
  700: '#C1C8CD',
  800: '#889096',
  900: '#7E868C',
  1000: '#687076',
  1100: '#11181C',
  500_8: alpha('#C1C8CD', 0.08),
  500_12: alpha('#C1C8CD', 0.12),
  500_16: alpha('#C1C8CD', 0.16),
  500_24: alpha('#C1C8CD', 0.24),
  500_32: alpha('#C1C8CD', 0.32),
  500_48: alpha('#C1C8CD', 0.48),
  500_56: alpha('#C1C8CD', 0.56),
  500_80: alpha('#C1C8CD', 0.8),
};

const PRIMARY = {
  lighter: '#EDF6FF',
  light: '#E1F0FF',
  main: '#0091FF',
  dark: '#0081F1',
  darker: '#006ADC',
  contrastText: '#FBFDFF',
};

const SECONDARY = {
  lighter: '#FFF1E7',
  light: '#FFB381',
  // main: '#ff5252',
  // dark: '#ff8a80',
  main: '#616161',
  dark: '#757575',
  darker: '#BD4B00',
  contrastText: '#FFF1E7',
};

const INFO = {
  lighter: '#EDF6FF',
  light: '#E1F0FF',
  main: '#0091FF',
  dark: '#0081F1',
  darker: '#006ADC',
  contrastText: '#FBFDFF',
};

const SUCCESS = {
  lighter: '#E9F9EE',
  light: '#5BB98C',
  main: '#30A46C',
  dark: '#299764',
  darker: '#18794E',
  contrastText: '#E9F9EE',
};

const WARNING = {
  lighter: '#FFF8BB',
  light: '#FFE16A',
  main: '#EBBC00',
  dark: '#F7CE00',
  darker: '#946800',
  contrastText: '#FFF8BB',
};

const ERROR = {
  lighter: '#FFEFEF',
  light: '#F3AEAF',
  main: '#E5484D',
  dark: '#DC3D43',
  darker: '#CD2B31',
  contrastText: '#FFEFEF',
};

const PURPLE = {
  lighter: '#F5F2FF',
  light: '#AA99EC',
  main: '#6E56CF',
  dark: '#644FC1',
  darker: '#5746AF',
  contrastText: '#F5F2FF',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

export const palette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  purple: { ...PURPLE },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  text: { primary: GREY[1100], secondary: GREY[1000], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[100] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};
