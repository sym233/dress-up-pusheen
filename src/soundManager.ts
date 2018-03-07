class SoundsManager {
    // soundsCount = 0;
    soundsList: {
        name: string;
        url?: string;
        node: HTMLAudioElement;
    }[] = [{
        name: '30',
        node: new Audio('./sounds/30.mp3'),
    }, {
        name: '17',
        node: new Audio('./sounds/17.mp3'),
    }, {
        name: '22',
        node: new Audio('./sounds/22.mp3'),
    }];
    play(nameOrIndex: string | number) {
        if (typeof nameOrIndex === 'number') {
            this.soundsList[nameOrIndex].node.currentTime = 0;
            this.soundsList[nameOrIndex].node.play();
            return;
        }
        for (const sound of this.soundsList) {
            if (sound.name === name) {
                sound.node.currentTime = 0;
                sound.node.play();
                return;
            }
        }
    }
}

const soundsManager = new SoundsManager();
export default soundsManager;
