import * as React from 'react';
import { parseSvg } from './getSvgComponent';

declare function require(src: string): string;

const map = new Map<string, React.DOMElement<{}, Element>>();

const shapesNum = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 24, 25, 26, 27, 28, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 88, 90, 91, 93, 95, 96, 98, 99, 100, 101, 102, 103, 105, 107, 108, 110, 113, 114, 116, 117, 119, 120, 122, 124, 125, 127, 129];
map.set('shape1', parseSvg(require('../shapes/1.svg')));
map.set('shape2', parseSvg(require('../shapes/2.svg')));
map.set('shape3', parseSvg(require('../shapes/3.svg')));
map.set('shape4', parseSvg(require('../shapes/4.svg')));
map.set('shape5', parseSvg(require('../shapes/5.svg')));
map.set('shape6', parseSvg(require('../shapes/6.svg')));
map.set('shape8', parseSvg(require('../shapes/8.svg')));
map.set('shape9', parseSvg(require('../shapes/9.svg')));
map.set('shape10', parseSvg(require('../shapes/10.svg')));
map.set('shape11', parseSvg(require('../shapes/11.svg')));
map.set('shape12', parseSvg(require('../shapes/12.svg')));
map.set('shape13', parseSvg(require('../shapes/13.svg')));
map.set('shape14', parseSvg(require('../shapes/14.svg')));
map.set('shape15', parseSvg(require('../shapes/15.svg')));
map.set('shape19', parseSvg(require('../shapes/19.svg')));
map.set('shape20', parseSvg(require('../shapes/20.svg')));
map.set('shape24', parseSvg(require('../shapes/24.svg')));
map.set('shape25', parseSvg(require('../shapes/25.svg')));
map.set('shape26', parseSvg(require('../shapes/26.svg')));
map.set('shape27', parseSvg(require('../shapes/27.svg')));
map.set('shape28', parseSvg(require('../shapes/28.svg')));
map.set('shape33', parseSvg(require('../shapes/33.svg')));
map.set('shape35', parseSvg(require('../shapes/35.svg')));
map.set('shape37', parseSvg(require('../shapes/37.svg')));
map.set('shape39', parseSvg(require('../shapes/39.svg')));
map.set('shape41', parseSvg(require('../shapes/41.svg')));
map.set('shape43', parseSvg(require('../shapes/43.svg')));
map.set('shape45', parseSvg(require('../shapes/45.svg')));
map.set('shape47', parseSvg(require('../shapes/47.svg')));
map.set('shape49', parseSvg(require('../shapes/49.svg')));
map.set('shape51', parseSvg(require('../shapes/51.svg')));
map.set('shape53', parseSvg(require('../shapes/53.svg')));
map.set('shape55', parseSvg(require('../shapes/55.svg')));
map.set('shape57', parseSvg(require('../shapes/57.svg')));
map.set('shape59', parseSvg(require('../shapes/59.svg')));
map.set('shape61', parseSvg(require('../shapes/61.svg')));
map.set('shape63', parseSvg(require('../shapes/63.svg')));
map.set('shape65', parseSvg(require('../shapes/65.svg')));
map.set('shape67', parseSvg(require('../shapes/67.svg')));
map.set('shape69', parseSvg(require('../shapes/69.svg')));
map.set('shape71', parseSvg(require('../shapes/71.svg')));
map.set('shape73', parseSvg(require('../shapes/73.svg')));
map.set('shape75', parseSvg(require('../shapes/75.svg')));
map.set('shape77', parseSvg(require('../shapes/77.svg')));
map.set('shape79', parseSvg(require('../shapes/79.svg')));
map.set('shape81', parseSvg(require('../shapes/81.svg')));
map.set('shape83', parseSvg(require('../shapes/83.svg')));
map.set('shape85', parseSvg(require('../shapes/85.svg')));
map.set('shape87', parseSvg(require('../shapes/87.svg')));
map.set('shape88', parseSvg(require('../shapes/88.svg')));
map.set('shape90', parseSvg(require('../shapes/90.svg')));
map.set('shape91', parseSvg(require('../shapes/91.svg')));
map.set('shape93', parseSvg(require('../shapes/93.svg')));
map.set('shape95', parseSvg(require('../shapes/95.svg')));
map.set('shape96', parseSvg(require('../shapes/96.svg')));
map.set('shape98', parseSvg(require('../shapes/98.svg')));
map.set('shape99', parseSvg(require('../shapes/99.svg')));
map.set('shape100', parseSvg(require('../shapes/100.svg')));
map.set('shape101', parseSvg(require('../shapes/101.svg')));
map.set('shape102', parseSvg(require('../shapes/102.svg')));
map.set('shape103', parseSvg(require('../shapes/103.svg')));
map.set('shape105', parseSvg(require('../shapes/105.svg')));
map.set('shape107', parseSvg(require('../shapes/107.svg')));
map.set('shape108', parseSvg(require('../shapes/108.svg')));
map.set('shape110', parseSvg(require('../shapes/110.svg')));
map.set('shape113', parseSvg(require('../shapes/113.svg')));
map.set('shape114', parseSvg(require('../shapes/114.svg')));
map.set('shape116', parseSvg(require('../shapes/116.svg')));
map.set('shape117', parseSvg(require('../shapes/117.svg')));
map.set('shape119', parseSvg(require('../shapes/119.svg')));
map.set('shape120', parseSvg(require('../shapes/120.svg')));
map.set('shape122', parseSvg(require('../shapes/122.svg')));
map.set('shape124', parseSvg(require('../shapes/124.svg')));
map.set('shape125', parseSvg(require('../shapes/125.svg')));
map.set('shape127', parseSvg(require('../shapes/127.svg')));
map.set('shape129', parseSvg(require('../shapes/129.svg')));


export default map;
