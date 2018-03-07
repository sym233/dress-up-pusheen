import * as React from 'react';
import * as ReactDOM from 'react-dom';

import StopMotion from './components/StopMotion';
import SvgFile from './components/SvgFile';
import Draggable from './components/Draggable'
import FunctionComponent from './components/FunctionComponent';

import Matrix2D from './Matrix2D';
import eventManager from './eventManager';
import soundsManager from './soundManager';


function linearP(curve: { x: number; y: number }[], x: number): number {
  const l = curve.length;
  for (let i = 0; i < l - 1; i++) {
    if (curve[i].x < curve[i + 1].x) {
      // pass
    } else {
      curve.sort((a, b) => b.x - a.x);
      break;
    }
  }
  for (let i = 0; i < l - 1; i++) {
    if (curve[i].x <= x && x <= curve[i + 1].x) {
      return (curve[i + 1].y - curve[i].y) / (curve[i + 1].x - curve[i].x) * (x - curve[i].x) + curve[i].y;
    }
  }
  throw new Error('x not in curve range');
}


let scale = 1.3;

const w = 629;
const h = 449;

interface SvgRootProps {
  width: number;
  height: number;
  scale?: number;
  children?: any[];

}
interface SvgRootStates {

}

class SvgRoot extends React.Component<SvgRootProps, SvgRootStates>{
  constructor(props: SvgRootProps) {
    super(props);

    // console.log(props.children);
  }
  mouseDownHandler(event: React.MouseEvent<SVGElement>) {

  }
  mouseMoveHandler(event: React.MouseEvent<SVGElement>) {
    eventManager.trigger('dragElement', event);
  }
  mouseUpOrLeaveHandler(event: React.MouseEvent<SVGElement>) {
    eventManager.removeOnly('dragElement');
  }

  render() {

    const s = this.props.scale | 1;
    const w = this.props.width;
    const h = this.props.height;
    return (
      <svg
        width={w * s}
        height={h * s}


        // Drag elements related events
        onMouseMove={(event: React.MouseEvent<SVGElement>) => this.mouseMoveHandler(event)}
        onMouseUp={(event: React.MouseEvent<SVGElement>) => this.mouseUpOrLeaveHandler(event)}
        onMouseLeave={(event: React.MouseEvent<SVGElement>) => this.mouseUpOrLeaveHandler(event)}
      >

        {this.props.children}

      </svg>
    );
  }
}






ReactDOM.render(
  <SvgRoot width={w} height={h} >
    {/* background */}
    <SvgFile svgUrl="./shapes/1.svg" />
    {/* window glass */}
    <SvgFile svgUrl="./shapes/2.svg" transform={Matrix2D.translate(448)} />
    {/* outside bee */}
    <StopMotion
      frameSeries={[0, 21, 22, 23, 24, 25, 26, 27, 28, 29]}
      loopFrame={200}
      triggeredEvent="newFrame"
    >
      {null}
      <SvgFile svgUrl="./shapes/5.svg" transform={Matrix2D.translate(590, 61)} />
      <SvgFile svgUrl="./shapes/6.svg" transform={Matrix2D.translate(571, 37)} />
      <SvgFile svgUrl="./shapes/5.svg" transform={Matrix2D.translate(551, 43)} />
      <SvgFile svgUrl="./shapes/6.svg" transform={Matrix2D.translate(536, 33)} />
      <SvgFile svgUrl="./shapes/5.svg" transform={Matrix2D.translate(516, 35)} />
      <SvgFile svgUrl="./shapes/6.svg" transform={Matrix2D.translate(499, 25)} />
      <SvgFile svgUrl="./shapes/5.svg" transform={Matrix2D.translate(478, 20)} />
      <SvgFile svgUrl="./shapes/6.svg" transform={Matrix2D.translate(458, 11)} />
      {null}
    </StopMotion>

    {/* window frame */}
    <SvgFile svgUrl="./shapes/8.svg" transform={Matrix2D.translate(440, 1)} />
    {/* window curtain */}
    <SvgFile style={{ opacity: 0.9 }} svgUrl="./shapes/9.svg" transform={Matrix2D.translate(420)} />
    {/* window curtain edge */}
    <SvgFile transform={Matrix2D.translate(420, 93)} svgUrl="./shapes/10.svg" />
    {/* window curtain rope */}
    <SvgFile transform={Matrix2D.translate(442, 43)} svgUrl="./shapes/98.svg" />
    {/* mirror */}
    <SvgFile transform={Matrix2D.translate(200, -1)} svgUrl="./shapes/102.svg" />

    {/* pusheen */}
    <g
      transform={Matrix2D.translate(203, 177).toString()}
      onClick={() => eventManager.trigger('clickPusheen')}
      style={{ cursor: "pointer" }}
    >
      <StopMotion
        frameSeries={[0, 1, 2]}
        loopFrame={3}
        triggeredEvent="clickPusheen"
      >

        {/* face 1 */}
        <StopMotion
          frameSeries={[-2, -1, 0, 1]}
          loopFrame={2}
          startFrame={-2}
          triggeredEvent="newFrame"
          key="face_1"
        >
          <SvgFile svgUrl="./shapes/11.svg" />
          <SvgFile svgUrl="./shapes/12.svg" />
          <SvgFile svgUrl="./shapes/13.svg" />
          <SvgFile svgUrl="./shapes/14.svg" />
          {/* <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
          </StopMotion> */}
        </StopMotion>

        {/* face 2 */}
        <StopMotion
          frameSeries={[0, 1]}
          loopFrame={2}
          triggeredEvent="newFrame"
          key="face_2"
        >
          <SvgFile svgUrl="./shapes/19.svg" />
          <SvgFile svgUrl="./shapes/20.svg" />
        </StopMotion>

        {/* face 3 */}
        <StopMotion
          frameSeries={[-2, -1, 0, 1]}
          loopFrame={2}
          startFrame={-2}
          triggeredEvent="newFrame"
          key="face_3"
        >
          <SvgFile svgUrl="./shapes/24.svg" />
          <SvgFile svgUrl="./shapes/25.svg" />
          <SvgFile svgUrl="./shapes/26.svg" />
          <SvgFile svgUrl="./shapes/27.svg" />
        </StopMotion>
      </StopMotion>
    </g>

    {/* right cat */}
    <FunctionComponent
      triggeredEvent="newFrame"
      calcComponent={(frame) => {
        const loopFrame = 250;
        while (frame >= loopFrame) {
          frame -= loopFrame;
        }

        const points = [{
          x: 0, y: 0
        }, {
          x: 20, y: 0
        }, {
          x: 40, y: 130
        }, {
          x: 50, y: 130
        }, {
          x: 70, y: 0
        }, {
          x: 250, y: 0
        }];
        const offset = linearP(points, frame);

        return <SvgFile svgUrl="./shapes/129.svg" transform={Matrix2D.translate(640, 145).translated(-offset)} />
      }}
    />
    <FunctionComponent
      triggeredEvent="newFrame"
      calcComponent={(frame) => {
        const loopFrame = 220;
        while (frame >= loopFrame) {
          frame -= loopFrame;
        }

        const points = [{
          x: 0, y: 0
        }, {
          x: 10, y: 0
        }, {
          x: 30, y: 70
        }, {
          x: 40, y: 70
        }, {
          x: 60, y: 0
        }, {
          x: 220, y: 0
        }];
        const offset = linearP(points, frame);

        return <SvgFile svgUrl="./shapes/125.svg" transform={Matrix2D.translate(90, 450).translated(0, -offset)} />
      }}
    />
    <FunctionComponent
      triggeredEvent="newFrame"
      calcComponent={(frame) => {
        const loopFrame = 250;
        while (frame >= loopFrame) {
          frame -= loopFrame;
        }

        const points = [{
          x: 0, y: 0
        }, {
          x: 60, y: 0
        }, {
          x: 90, y: 48
        }, {
          x: 105, y: 48
        }, {
          x: 130, y: 0
        }, {
          x: 250, y: 0
        }];
        const offset = linearP(points, frame);

        return <SvgFile svgUrl="./shapes/127.svg" transform={Matrix2D.translate(29, 50).translated(0, -offset)} />
      }}
    />
    {/* <Draggable transform={Matrix2D.translate(400, 200)}>
      <SvgFile svgUrl="./shapes/127.svg" />
    </Draggable> */}

    {/* high-heeled shoes */}
    <Draggable transform={Matrix2D.translate(50, 218)}>
      <SvgFile svgUrl="./shapes/33.svg" />
    </Draggable>
    {/* socks */}
    <Draggable transform={Matrix2D.translate(6, 222)}>
      <SvgFile svgUrl="./shapes/35.svg" />
    </Draggable>
    {/* red boots */}
    <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgUrl="./shapes/37.svg" />
    </Draggable>
    {/* party hat */}
    <Draggable transform={Matrix2D.translate(59, 112)}>
      <SvgFile svgUrl="./shapes/39.svg" />
    </Draggable>
    {/* arrow and heart */}
    {/* <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgUrl="./shapes/41.svg" />
    </Draggable> */}
    {/* heart */}
    {/* <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgUrl="./shapes/43.svg" />
    </Draggable> */}
    {/* star */}
    {/* <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgUrl="./shapes/45.svg" />
    </Draggable> */}
    {/* fox tail */}
    <Draggable transform={Matrix2D.translate(527, 286)}>
      <SvgFile svgUrl="./shapes/47.svg" />
    </Draggable>
    {/* wing */}
    <Draggable transform={Matrix2D.translate(0, 175)}>
      <SvgFile svgUrl="./shapes/49.svg" />
    </Draggable>
    {/* paw */}
    <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgUrl="./shapes/51.svg" />
    </Draggable>
    {/* black boots */}
    <Draggable transform={Matrix2D.translate(26, 230)}>
      <SvgFile svgUrl="./shapes/53.svg" />
    </Draggable>
    {/* cowboy hat */}
    <Draggable transform={Matrix2D.translate(35, 158)}>
      <SvgFile svgUrl="./shapes/55.svg" />
    </Draggable>
    {/* long boots */}
    <Draggable transform={Matrix2D.translate(0, 208)}>
      <SvgFile svgUrl="./shapes/57.svg" />
    </Draggable>
    {/* black hair */}
    <Draggable transform={Matrix2D.translate(24, 94)}>
      <SvgFile svgUrl="./shapes/59.svg" />
    </Draggable>
    {/* saddle */}
    <Draggable transform={Matrix2D.translate(10, 100)}>
      <SvgFile svgUrl="./shapes/61.svg" />
    </Draggable>
    {/* unknown staff 1 */}
    <Draggable transform={Matrix2D.translate(6, 80)}>
      <SvgFile svgUrl="./shapes/63.svg" />
    </Draggable>
    {/* unknown staff 2 */}
    <Draggable transform={Matrix2D.translate(473, 294)}>
      <SvgFile svgUrl="./shapes/65.svg" />
    </Draggable>
    {/* beak */}
    <Draggable transform={Matrix2D.translate(8, 89)}>
      <SvgFile svgUrl="./shapes/67.svg" />
    </Draggable>
    {/* moustache */}
    <Draggable transform={Matrix2D.translate(13, 53)}>
      <SvgFile svgUrl="./shapes/69.svg" />
    </Draggable>
    {/* green mask */}
    <Draggable transform={Matrix2D.translate(459, 277)}>
      <SvgFile svgUrl="./shapes/71.svg" />
    </Draggable>
    {/* shit */}
    <Draggable transform={Matrix2D.translate(510, 272)}>
      <SvgFile svgUrl="./shapes/73.svg" />
    </Draggable>
    {/* rabbit ears */}
    <Draggable transform={Matrix2D.translate(455, 262)}>
      <SvgFile svgUrl="./shapes/75.svg" />
    </Draggable>
    {/* pirate hat */}
    <Draggable transform={Matrix2D.translate(491, 298)}>
      <SvgFile svgUrl="./shapes/77.svg" />
    </Draggable>
    {/* crown */}
    <Draggable transform={Matrix2D.translate(448, 298)}>
      <SvgFile svgUrl="./shapes/79.svg" />
    </Draggable>
    {/* tiger mask */}
    <Draggable transform={Matrix2D.translate(451, 289)}>
      <SvgFile svgUrl="./shapes/81.svg" />
    </Draggable>
    {/* gold hair */}
    <Draggable transform={Matrix2D.translate(479, 247)}>
      <SvgFile svgUrl="./shapes/83.svg" />
    </Draggable>
    {/* black hat */}
    <Draggable transform={Matrix2D.translate(472, 282)}>
      <SvgFile svgUrl="./shapes/85.svg" />
    </Draggable>

    {/* round glasses and lenses*/}
    <Draggable transform={Matrix2D.translate(485, 293)}>
      <SvgFile svgUrl="./shapes/87.svg" transform={Matrix2D.translate(1, 1)} style={{ opacity: 0.7 }} />
      <SvgFile svgUrl="./shapes/88.svg" />
    </Draggable>

    {/* sunglasses and lenses */}
    <Draggable transform={Matrix2D.translate(444, 285)}>
      <SvgFile svgUrl="./shapes/90.svg" transform={Matrix2D.translate(2, 2)} style={{ opacity: 0.7 }} />
      <SvgFile svgUrl="./shapes/91.svg" />
    </Draggable>
    {/* heart glasses */}
    <Draggable transform={Matrix2D.translate(450, 288)}>
      <SvgFile svgUrl="./shapes/93.svg" />
    </Draggable>
    {/* single glass and lens */}
    <Draggable transform={Matrix2D.translate(460, 270)}>
      <SvgFile svgUrl="./shapes/95.svg" transform={Matrix2D.translate(1, 1)} style={{ opacity: 0.7 }} />
      <SvgFile svgUrl="./shapes/96.svg" />
    </Draggable>
    {/* couch */}
    <SvgFile style={{ pointerEvents: 'none' }} svgUrl="./shapes/99.svg" transform={Matrix2D.translate(-1, 35)} />
    {/* toyz */}
    <SvgFile style={{ pointerEvents: 'none' }} transform={Matrix2D.translate(444, 258)} svgUrl="./shapes/101.svg" />
    {/* bear toy */}
    <SvgFile svgUrl="./shapes/100.svg" transform={Matrix2D.translate(70, 51)} />
    {/* fox toy */}
    <Draggable transform={Matrix2D.translate(-26, 93)}>
      <SvgFile svgUrl="./shapes/103.svg" />
    </Draggable>
    {/* rabbit toy */}
    <Draggable transform={Matrix2D.translate(27, 111)}>
      <SvgFile svgUrl="./shapes/105.svg" />
    </Draggable>
    {/* bear's nose */}
    <Draggable transform={Matrix2D.translate(98, 107)}>
      <SvgFile svgUrl="./shapes/110.svg" />
    </Draggable>
    {/* 2 bowknots */}
    <Draggable transform={Matrix2D.translate(434, 36)}>
      <SvgFile svgUrl="./shapes/108.svg" />
    </Draggable>
    <Draggable transform={Matrix2D.translate(582, 36)}>
      <SvgFile svgUrl="./shapes/108.svg" />
    </Draggable>
    {/* 2 blinking stars */}
    <Draggable transform={Matrix2D.translate(227, 24)}>
      <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
        <SvgFile svgUrl="./shapes/113.svg" />
        <SvgFile svgUrl="./shapes/114.svg" />
      </StopMotion>
    </Draggable>
    <Draggable transform={Matrix2D.translate(233, 6)}>
      <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
        <SvgFile svgUrl="./shapes/113.svg" />
        <SvgFile svgUrl="./shapes/114.svg" />
      </StopMotion>
    </Draggable>
    <Draggable transform={Matrix2D.translate(-40, -145)}>
      <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
        <SvgFile svgUrl="./shapes/119.svg" />
        <SvgFile svgUrl="./shapes/120.svg" />
      </StopMotion>
    </Draggable>
    {/* origin logo */}
    <Draggable transform={Matrix2D.translate(481, 405)}>
      <SvgFile svgUrl="./shapes/116.svg" />
    </Draggable>
    {/* bear's flower */}
    <Draggable transform={Matrix2D.translate(139, 80)}>
      <SvgFile svgUrl="./shapes/122.svg" />
    </Draggable>
  </SvgRoot>,
  document.getElementById('app')
);


let frame = 0;
const c = setInterval(() => {
  eventManager.trigger('newFrame', frame);
  frame++;
}, 200);

let pusheenSound = 0;
eventManager.on('clickPusheen', () => {
  pusheenSound++;
  if (pusheenSound >= 3) {
    pusheenSound -= 3;
  }
  soundsManager.play(pusheenSound);
});
