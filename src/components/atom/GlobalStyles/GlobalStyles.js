import { createGlobalStyle } from 'styled-components';
import {
	base_font_size,
	h1_font_size,
	h2_font_size,
	h3_font_size,
	h4_font_size,
	small_space,
	white,
	secondary_color,
	lightGrey
} from '../index';
import { dark } from '../variables/colors';

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

:root {
  font-size: 62.5%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  height: 100%;
  width: 100%;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, button {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

body {
  font-size: ${base_font_size};
  font-family: 'Roboto', 'Roboto Slab', serif;
  line-height: 1.2;
  color: ${dark};
  background: ${lightGrey};
}

h1 {
  font-size: ${h1_font_size};
}

h2 {
  font-size: ${h2_font_size};
}

h3 {
  font-size: ${h3_font_size};
}

h3 {
  font-size: ${h4_font_size};
}

a {
	font-weight: 400;
  margin: 0 ${small_space};
	color: ${white};
	text-decoration: none;
	transition: all 100ms ease-in-out;
	cursor: pointer;

	&:hover {
		color: ${secondary_color};
	}
}
`;
