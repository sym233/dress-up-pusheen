import * as React from 'react';

import Matrix2D from '../Matrix2D';
import eventManager from '../eventManager';

interface DraggableProps {
  transform?: Matrix2D;
}
interface DraggableStates {
  transform: Matrix2D;
  tempTransform: Matrix2D;
}
class Draggable extends React.Component<DraggableProps, DraggableStates>{
  mouseStartX = 0;
  mouseStartY = 0;
  constructor(props: DraggableProps) {
    super(props);
    this.state = {
      transform: props.transform ? props.transform : new Matrix2D(),
      tempTransform: null,
    }
  }

  mouseDownHandler(event: React.MouseEvent<SVGElement>) {
    if (event.button !== 0) {
      return;
    }

    this.mouseStartX = event.clientX;
    this.mouseStartY = event.clientY

    eventManager.only(
      'dragElement',
      (event: React.MouseEvent<SVGElement>) => this.mouseMoveHandler(event),
      () => {
        if (this.state.tempTransform) {
          this.setState({
            transform: this.state.tempTransform,
            tempTransform: null,
          });
        }
      }
    );

  }
  mouseMoveHandler(event: React.MouseEvent<SVGElement>) {
    this.setState({
      tempTransform: this.state.transform.translated(
        event.clientX - this.mouseStartX, event.clientY - this.mouseStartY
      ),
    });
  }
  render() {
    return (
      <g
        style={{ cursor: "move" }}
        transform={this.state.tempTransform ?
          this.state.tempTransform.toString() :
          this.state.transform.toString()
        }
        onMouseDown={(event: React.MouseEvent<SVGElement>) => this.mouseDownHandler(event)}
      >
        {this.props.children}
      </g>
    );
  }
}

export default Draggable;
