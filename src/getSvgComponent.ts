import * as React from 'react';


function parseSvg(svgContent: string): React.DOMElement<{}, Element> {

  function svgToComponent(dom: Element): React.DOMElement<{}, Element> {

    const props: any = {};
    for (let attr of Array.from(dom.attributes)) {
      let newAttr;
      // react-dom.development.js:894 
      // Warning: Invalid DOM property `fill-rule`. Did you mean `fillRule`?
      // Maybe it's a bug

      // update: not a bug, a react element is not a html element


      if (attr.nodeName.includes('-')) {

        // convert '-' to lower camel case
        const nameParts = attr.nodeName.split('-');

        newAttr = nameParts.map((namePart, i) => {
          if (i === 0) {
            return namePart;
          } else {
            return Array.prototype.map.call(namePart, (letter: string, i: number) => {
              if (i === 0) {
                return letter.toUpperCase();
              } else {
                return letter;
              }
            }).join('');
          }
        }).join('');
      } else {
        newAttr = attr.nodeName;
      }
      props[newAttr] = attr.nodeValue;
    }

    const children: React.DOMElement<{}, Element>[] = [];
    for (const child of Array.from(dom.children)) {
      children.push(svgToComponent(child));
    }

    const newComponent = React.createElement(dom.nodeName, props, ...children);

    return newComponent;

  }

  const domParser = new DOMParser();
  const parsedDom = domParser.parseFromString(svgContent, 'image/svg+xml');
  const svgDom = parsedDom.children[0];

  if (svgDom && svgDom.nodeName === 'svg') {
    if (svgDom.childElementCount === 0) {
      return null;
    } else if (svgDom.childElementCount === 1){
      return svgToComponent(svgDom.children[0]);
    }else{
      const children = [];
      for(const child of svgDom.children){
        children.push(svgToComponent(child));
      }
      return React.createElement('g', {}, ...children);
    }
  } else {
    throw new Error(`parse svg error, "svg" element expected, ${svgDom ? svgDom.nodeName : 'empty element'} instead.`);
  }
}

function fetchText(url: string): Promise<string> {
  return fetch(url).then(res => res.text());
}

const cache = new Map<string, React.DOMElement<{}, Element>>();

function fetchSvgToElement(url: string): Promise<React.DOMElement<{}, Element>> {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  } else {
    return fetchText(url).then(res => {
      cache.set(url, parseSvg(res));
      return cache.get(url);
    });
  }

}

export { fetchSvgToElement, parseSvg };
