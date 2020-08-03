import { createGlobalStyle } from 'styled-components';

import ArialMT from './arial-mt-bold.ttf';
import BiotifBlack from "./Biotif-Black.ttf"
import BiotifBold from "./Biotif-Bold.ttf"
import BiotifNormal from "./Biotif-Regular.ttf"

const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: 'ArialMT';
		src: url(${ArialMT});
	}
  
	@font-face {
		font-family: "Biotif";
		src: url(${BiotifBold});
		font-weight: bold;
	}
`;

export default GlobalStyles;
