import * as React from 'react';

import eventManager from '../eventManager';

interface FunctionComponentProps {
  triggeredEvent: string;
  calcComponent: (frame: number) => any;
}
interface FunctionComponentStates {
  frame: number;
}
class FunctionComponent extends React.Component<FunctionComponentProps, FunctionComponentStates>{
  _isMounted = false;
  constructor(props: FunctionComponentProps) {
    super(props);
    this.state = {
      frame: 0,
    };
    eventManager.on(this.props.triggeredEvent, () => {
      this.setState({
        frame: this.state.frame + 1,
      })
    });
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return this.props.calcComponent(this.state.frame);
  }
}

export default FunctionComponent;
