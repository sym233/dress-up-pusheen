import * as React from 'react';

import fetchSvgToElement from '../getSvgComponent';
import Matrix2D from '../Matrix2D';

interface SvgFileProps {
  svgUrl: string;
  transform?: Matrix2D;
  style?: any;

}
interface SvgFileStates {
  refresh: number;
  children: React.DOMElement<{}, Element>[];
}
class SvgFile extends React.Component<SvgFileProps, SvgFileStates>{
  constructor(props: SvgFileProps) {
    super(props);
    this.state = {
      refresh: 0,
      children: null,
    };
    fetchSvgToElement(props.svgUrl).then(res => this.setState({
      children: res,
    }));
  }

  componentWillReceiveProps(newProps: SvgFileProps) {
    if (newProps.svgUrl !== this.props.svgUrl) {
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

    if (this.state.children) {
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
