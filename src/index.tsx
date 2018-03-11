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
    <SvgFile svgName="shape1" />
    {/* window glass */}
    <SvgFile svgName="shape2" transform={Matrix2D.translate(448)} />
    {/* outside bee */}
    <StopMotion
      frameSeries={[0, 21, 22, 23, 24, 25, 26, 27, 28, 29]}
      loopFrame={200}
      triggeredEvent="newFrame"
    >
      {null}
      <SvgFile svgName="shape5" transform={Matrix2D.translate(590, 61)} />
      <SvgFile svgName="shape6" transform={Matrix2D.translate(571, 37)} />
      <SvgFile svgName="shape5" transform={Matrix2D.translate(551, 43)} />
      <SvgFile svgName="shape6" transform={Matrix2D.translate(536, 33)} />
      <SvgFile svgName="shape5" transform={Matrix2D.translate(516, 35)} />
      <SvgFile svgName="shape6" transform={Matrix2D.translate(499, 25)} />
      <SvgFile svgName="shape5" transform={Matrix2D.translate(478, 20)} />
      <SvgFile svgName="shape6" transform={Matrix2D.translate(458, 11)} />
      {null}
    </StopMotion>

    {/* window frame */}
    <SvgFile svgName="shape8" transform={Matrix2D.translate(440, 1)} />
    {/* window curtain */}
    <SvgFile style={{ opacity: 0.9 }} svgName="shape9" transform={Matrix2D.translate(420)} />
    {/* window curtain edge */}
    <SvgFile transform={Matrix2D.translate(420, 93)} svgName="shape10" />
    {/* window curtain rope */}
    <SvgFile transform={Matrix2D.translate(442, 43)} svgName="shape98" />
    {/* mirror */}
    <SvgFile transform={Matrix2D.translate(200, -1)} svgName="shape102" />

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
          <SvgFile svgName="shape11" />
          <SvgFile svgName="shape12" />
          <SvgFile svgName="shape13" />
          <SvgFile svgName="shape14" />
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
          <SvgFile svgName="shape19" />
          <SvgFile svgName="shape20" />
        </StopMotion>

        {/* face 3 */}
        <StopMotion
          frameSeries={[-2, -1, 0, 1]}
          loopFrame={2}
          startFrame={-2}
          triggeredEvent="newFrame"
          key="face_3"
        >
          <SvgFile svgName="shape24" />
          <SvgFile svgName="shape25" />
          <SvgFile svgName="shape26" />
          <SvgFile svgName="shape27" />
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

        return <SvgFile svgName="shape129" transform={Matrix2D.translate(640, 145).translated(-offset)} />
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

        return <SvgFile svgName="shape125" transform={Matrix2D.translate(90, 450).translated(0, -offset)} />
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

        return <SvgFile svgName="shape127" transform={Matrix2D.translate(29, 50).translated(0, -offset)} />
      }}
    />

    {/* high-heeled shoes */}
    <Draggable transform={Matrix2D.translate(50, 218)}>
      <SvgFile svgName="shape33" />
    </Draggable>
    {/* socks */}
    <Draggable transform={Matrix2D.translate(6, 222)}>
      <SvgFile svgName="shape35" />
    </Draggable>
    {/* red boots */}
    <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgName="shape37" />
    </Draggable>
    {/* party hat */}
    <Draggable transform={Matrix2D.translate(59, 112)}>
      <SvgFile svgName="shape39" />
    </Draggable>
    {/* arrow and heart */}
    {/* <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgName="shape41" />
    </Draggable> */}
    {/* heart */}
    {/* <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgName="shape43" />
    </Draggable> */}
    {/* star */}
    {/* <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgName="shape45" />
    </Draggable> */}
    {/* fox tail */}
    <Draggable transform={Matrix2D.translate(527, 286)}>
      <SvgFile svgName="shape47" />
    </Draggable>
    {/* wing */}
    <Draggable transform={Matrix2D.translate(0, 175)}>
      <SvgFile svgName="shape49" />
    </Draggable>
    {/* paw */}
    <Draggable transform={Matrix2D.translate(16, 230)}>
      <SvgFile svgName="shape51" />
    </Draggable>
    {/* black boots */}
    <Draggable transform={Matrix2D.translate(26, 230)}>
      <SvgFile svgName="shape53" />
    </Draggable>
    {/* cowboy hat */}
    <Draggable transform={Matrix2D.translate(35, 158)}>
      <SvgFile svgName="shape55" />
    </Draggable>
    {/* long boots */}
    <Draggable transform={Matrix2D.translate(0, 208)}>
      <SvgFile svgName="shape57" />
    </Draggable>
    {/* black hair */}
    <Draggable transform={Matrix2D.translate(24, 94)}>
      <SvgFile svgName="shape59" />
    </Draggable>
    {/* saddle */}
    <Draggable transform={Matrix2D.translate(10, 100)}>
      <SvgFile svgName="shape61" />
    </Draggable>
    {/* unknown staff 1 */}
    <Draggable transform={Matrix2D.translate(6, 80)}>
      <SvgFile svgName="shape63" />
    </Draggable>
    {/* unknown staff 2 */}
    <Draggable transform={Matrix2D.translate(473, 294)}>
      <SvgFile svgName="shape65" />
    </Draggable>
    {/* beak */}
    <Draggable transform={Matrix2D.translate(8, 89)}>
      <SvgFile svgName="shape67" />
    </Draggable>
    {/* moustache */}
    <Draggable transform={Matrix2D.translate(13, 53)}>
      <SvgFile svgName="shape69" />
    </Draggable>
    {/* green mask */}
    <Draggable transform={Matrix2D.translate(459, 277)}>
      <SvgFile svgName="shape71" />
    </Draggable>
    {/* shit */}
    <Draggable transform={Matrix2D.translate(510, 272)}>
      <SvgFile svgName="shape73" />
    </Draggable>
    {/* rabbit ears */}
    <Draggable transform={Matrix2D.translate(455, 262)}>
      <SvgFile svgName="shape75" />
    </Draggable>
    {/* pirate hat */}
    <Draggable transform={Matrix2D.translate(491, 298)}>
      <SvgFile svgName="shape77" />
    </Draggable>
    {/* crown */}
    <Draggable transform={Matrix2D.translate(448, 298)}>
      <SvgFile svgName="shape79" />
    </Draggable>
    {/* tiger mask */}
    <Draggable transform={Matrix2D.translate(451, 289)}>
      <SvgFile svgName="shape81" />
    </Draggable>
    {/* gold hair */}
    <Draggable transform={Matrix2D.translate(479, 247)}>
      <SvgFile svgName="shape83" />
    </Draggable>
    {/* black hat */}
    <Draggable transform={Matrix2D.translate(472, 282)}>
      <SvgFile svgName="shape85" />
    </Draggable>

    {/* round glasses and lenses*/}
    <Draggable transform={Matrix2D.translate(485, 293)}>
      <SvgFile svgName="shape87" transform={Matrix2D.translate(1, 1)} style={{ opacity: 0.7 }} />
      <SvgFile svgName="shape88" />
    </Draggable>

    {/* sunglasses and lenses */}
    <Draggable transform={Matrix2D.translate(444, 285)}>
      <SvgFile svgName="shape90" transform={Matrix2D.translate(2, 2)} style={{ opacity: 0.7 }} />
      <SvgFile svgName="shape91" />
    </Draggable>
    {/* heart glasses */}
    <Draggable transform={Matrix2D.translate(450, 288)}>
      <SvgFile svgName="shape93" />
    </Draggable>
    {/* single glass and lens */}
    <Draggable transform={Matrix2D.translate(460, 270)}>
      <SvgFile svgName="shape95" transform={Matrix2D.translate(1, 1)} style={{ opacity: 0.7 }} />
      <SvgFile svgName="shape96" />
    </Draggable>
    {/* couch */}
    <SvgFile style={{ pointerEvents: 'none' }} svgName="shape99" transform={Matrix2D.translate(-1, 35)} />
    {/* toyz */}
    <SvgFile style={{ pointerEvents: 'none' }} transform={Matrix2D.translate(444, 258)} svgName="shape101" />
    {/* bear toy */}
    <SvgFile svgName="shape100" transform={Matrix2D.translate(70, 51)} />
    {/* fox toy */}
    <Draggable transform={Matrix2D.translate(-26, 93)}>
      <SvgFile svgName="shape103" />
    </Draggable>
    {/* rabbit toy */}
    <Draggable transform={Matrix2D.translate(27, 111)}>
      <SvgFile svgName="shape105" />
    </Draggable>
    {/* bear's nose */}
    <Draggable transform={Matrix2D.translate(98, 107)}>
      <SvgFile svgName="shape110" />
    </Draggable>
    {/* 2 bowknots */}
    <Draggable transform={Matrix2D.translate(434, 36)}>
      <SvgFile svgName="shape108" />
    </Draggable>
    <Draggable transform={Matrix2D.translate(582, 36)}>
      <SvgFile svgName="shape108" />
    </Draggable>
    {/* 2 blinking stars */}
    <Draggable transform={Matrix2D.translate(227, 24)}>
      <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
        <SvgFile svgName="shape113" />
        <SvgFile svgName="shape114" />
      </StopMotion>
    </Draggable>
    <Draggable transform={Matrix2D.translate(233, 6)}>
      <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
        <SvgFile svgName="shape113" />
        <SvgFile svgName="shape114" />
      </StopMotion>
    </Draggable>
    <Draggable transform={Matrix2D.translate(-40, -145)}>
      <StopMotion frameSeries={[0, 1]} loopFrame={2} triggeredEvent="newFrame">
        <SvgFile svgName="shape119" />
        <SvgFile svgName="shape120" />
      </StopMotion>
    </Draggable>
    {/* origin logo */}
    <Draggable transform={Matrix2D.translate(481, 405)}>
      <SvgFile svgName="shape116" />
    </Draggable>
    {/* bear's flower */}
    <Draggable transform={Matrix2D.translate(139, 80)}>
      <SvgFile svgName="shape122" />
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
