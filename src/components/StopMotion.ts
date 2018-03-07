import * as React from 'react';
import eventManager from '../eventManager';

interface StopMotionProps {
  frameSeries: number[];
  // While
  // frameSeries[i] <= frame (< frameSeries[i + 1], if exists)
  // play the ith frame (ith child)
  triggeredEvent: string;
  startFrame?: number;
  children?: any[];

  loopFrame?: number;
  // if loop > 0,  animation repeats
}
interface StopMotionStates {
  frame: number;
}
class StopMotion extends React.Component<StopMotionProps, StopMotionStates>{
  frameCount = 0;
  // with loopFrame set
  // frameCount goes in (-Inf, loopFrame)
  // frameSeries[i] < 0 means the ith frame will only be drawn once
  // props.frame should be set negative if above effect is required
  _isMounted = false;

  constructor(props: StopMotionProps) {
    super(props);
    if (props.frameSeries.length !== props.children.length) {
      throw new Error('StopMotion Error: the length of frameSeries and the number of children must be same.\n');
    }
  
    let firstFrame = this.props.startFrame | 0;
    while(this.props.loopFrame && firstFrame >= this.props.loopFrame){
      firstFrame -= this.props.loopFrame
    }
    this.state = {
      frame: firstFrame,
    };
    eventManager.on(this.props.triggeredEvent, () => {
      if(this._isMounted){
        this.frameCount++;
        if(this.props.loopFrame && this.frameCount >= this.props.loopFrame){
          this.frameCount -= this.props.loopFrame;
        }
        this.setState({
          frame: this.frameCount,
        });
      }
    });
  }
  componentDidMount(){
    this._isMounted = true;
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  render() {

    const l = this.props.frameSeries.length;
    for (let i = 1; i < l; i++) {
      if (this.state.frame < this.props.frameSeries[i]) {
        return this.props.children[i - 1];
      }
    }
    return this.props.children[l - 1];
  }
}

export default StopMotion;
