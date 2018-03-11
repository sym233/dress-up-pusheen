import * as React from 'react';

import { fetchSvgToElement } from '../getSvgComponent';
import Matrix2D from '../Matrix2D';
import svgMap from '../svgBundle';
interface SvgFileProps {
  svgUrl?: string;
  svgName?: string;
  transform?: Matrix2D;
  style?: any;

}
interface SvgFileStates {
  children: React.DOMElement<{}, Element>;
}
class SvgFile extends React.Component<SvgFileProps, SvgFileStates>{
  constructor(props: SvgFileProps) {
    super(props);

    if (props.svgName && svgMap.has(props.svgName)) {
      this.state = {
        children: svgMap.get(props.svgName),
      };
    } else {
      if (props.svgUrl) {
        this.state = { children: null };
        fetchSvgToElement(props.svgUrl).then(res => this.setState({
          children: res,
        }));
      }
    }
  }

  componentWillReceiveProps(newProps: SvgFileProps) {
    if (newProps.svgName && newProps.svgName !== this.props.svgName) {
      if (svgMap.has(newProps.svgName)) {
        this.setState({
          children: svgMap.get(newProps.svgName),
        });
      } else {
        throw new Error(`svg name '${newProps.svgName}' not exists.`);
      }
    } else if (newProps.svgUrl && newProps.svgUrl !== this.props.svgUrl) {
      fetchSvgToElement(newProps.svgUrl).then(res => this.setState({
        children: res,
      }));
    }
  }
  render() {
    const props: {
      transform?: string;
      style?: any;
    } = {};
    if (this.props.transform) {
      props.transform = this.props.transform.toString()
    }
    if (this.props.style) {
      props.style = this.props.style;
    }

    if (this.state && this.state.children) {
      return (
        <g
          {...props}
        >
          {this.state.children}
        </g>
      );
    } else {
      return null;
    }
  }
}

export default SvgFile;
