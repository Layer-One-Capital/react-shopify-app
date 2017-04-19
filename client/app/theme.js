
// TODO: move to common?

let Colors = require('material-ui/styles/colors');
let ColorManipulator = require('material-ui/utils/colorManipulator');
let Spacing = require('material-ui/styles/spacing');
let Typography = require('material-ui/styles/typography');

/* mirror these in style.scss to maintain consistency */
var topNavColor = '#039BE5';
var subNavColor = '#0288D1';

var foregroundWhite = '#FAFAFA';
var foregroundBlack = '#212121';
var foregroundGrey = '#969696';

var green = '#16a085';
var red = '#e74c3c';
var blue = '#03A9F4';
var orange = '#FFAB00';
var yellow = '#f1c40f';

var headlineTextSize = 24;
var headlineTextWeight = 300;

var buttonTextSize = 14;
var buttonTextWeight = 400;
var buttonTextTransform = 'uppercase';

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: topNavColor,
    primary2Color: ColorManipulator.darken(orange, 0.3),
    primary3Color: ColorManipulator.lighten(topNavColor, 0.3),

    accent1Color: orange,
    accent2Color: subNavColor,
    accent3Color: '#000',

    textColor: foregroundBlack,
    alternateTextColor: foregroundWhite,
    disabledTextColor: foregroundGrey,

    canvasColor: Colors.white,
    borderColor: ColorManipulator.fade(foregroundGrey, 0.5),
    disabledColor: foregroundGrey,

    foregroundBlack: foregroundBlack,
    foregroundBlackFaded: ColorManipulator.fade(foregroundBlack, 0.5),
    foregroundWhite: foregroundWhite,
    foregroundWhiteFaded: ColorManipulator.fade(foregroundWhite, 0.5),
    foregroundGrey: foregroundGrey,
    red: red,
    green: green,
    orange: orange,
    yellow: yellow,
  },
  typography: {
    headlineTextSize: headlineTextSize,
    headlineTextWeight: headlineTextWeight
  },
  raisedButton: {
    height: 150,
  },
};
