import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PieChat = ({ size = 30, color = "#ffffff", ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M3.098 16.734a.75.75 0 0 1-.685-.443A10.5 10.5 0 0 1 11.999 1.5a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-.444.685l-8.901 3.982a.747.747 0 0 1-.306.067Z" />
    <Path d="M14.699 3.195a.375.375 0 0 0-.45.367v8.437a2.253 2.253 0 0 1-1.331 2.054l-8.085 3.618a.375.375 0 0 0-.157.553 9.77 9.77 0 0 0 2.272 2.363 9.672 9.672 0 0 0 5.801 1.912c5.376 0 9.75-4.374 9.75-9.75 0-4.709-3.355-8.648-7.8-9.554Z" />
  </Svg>
);

export default PieChat;