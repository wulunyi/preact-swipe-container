/**
 * @description
 */

import {render, h, Component} from 'preact';

import ScrollContainer from './preact-scroll-container';
import './test.scss';

render(
		<ScrollContainer class="container" currentPage="0" totalPage="3" soft={true}>
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</ScrollContainer>,
		document.body,
)