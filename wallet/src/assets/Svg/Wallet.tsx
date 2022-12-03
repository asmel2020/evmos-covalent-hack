import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Wallet = ({ size = 30, color = "#ffffff", ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M4.476 4.874h15c.175 0 .35.011.524.033a3.094 3.094 0 0 0-3.633-2.604L4.031 4.409h-.014a3.094 3.094 0 0 0-1.925 1.225 4.105 4.105 0 0 1 2.384-.76Z" />
    <Path d="M19.477 6h-15a3.003 3.003 0 0 0-3 3v9a3.003 3.003 0 0 0 3 3h15a3.003 3.003 0 0 0 3-3V9a3.004 3.004 0 0 0-3-3Zm-2.227 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    <Path d="M1.5 12.164V7.5c0-1.016.563-2.719 2.515-3.088 1.657-.31 3.298-.31 3.298-.31s1.078.75.187.75C6.61 4.852 6.633 6 7.5 6s0 1.102 0 1.102l-3.492 3.96L1.5 12.165Z" />
  </Svg>
);

export default Wallet;
