type EventHandlerFunction = (...args: any[]) => void;

class EventManager {
    ons: EventHandlerFunction[][] = [];
    onlys: EventHandlerFunction[] = [];
    onlysEventRemoved: EventHandlerFunction[] = [];

    eventList: string[] = [];

    getEventCode(eventName: string): number {
        let eventCode = this.eventList.indexOf(eventName);
        if (eventCode === -1) {
            this.eventList.push(eventName);
            return this.eventList.length - 1;
        } else {
            return eventCode;
        }
    }


    on(eventName: string, eventHandler: EventHandlerFunction): void {
        const eventCode = this.getEventCode(eventName);
        if (this.ons[eventCode] === undefined) {
            this.ons[eventCode] = [];
        }
        this.ons[eventCode].push(eventHandler);
    }

    only(eventName: string, eventHandler: EventHandlerFunction, eventRemoveHandler?: EventHandlerFunction): void {
        // only one event can be triggered
        // later-registered event will replace the early one
        const eventCode = this.getEventCode(eventName);
        this.onlys[eventCode] = eventHandler;
        if (this.onlysEventRemoved[eventCode]) {
            this.onlysEventRemoved[eventCode].call(null);
        }
        this.onlysEventRemoved[eventCode] = eventRemoveHandler;
    }
    hasOnly(eventName: string) {
        const eventCode = this.getEventCode(eventName);
        return typeof this.onlys[eventCode] === 'function';
    }

    trigger(eventName: string, ...args: any[]): number {
        let eventsInvolved = 0;
        const eventCode = this.getEventCode(eventName);
        if (this.ons[eventCode]) {
            for (const eventFunction of this.ons[eventCode]) {
                eventFunction.call(null, ...args);
            }
            eventsInvolved += this.ons[eventCode].length;
        }
        if (this.onlys[eventCode]) {
            this.onlys[eventCode].call(null, ...args);
            eventsInvolved += 1;
        }

        // console.log(`Trigger event ${eventName} with ${args}, ${this.ons[eventCode].length} handler(s) involved.`);
        return eventsInvolved;
    }

    removeOn(eventName: string, eventHandler: EventHandlerFunction): number {
        // return the number of eventHandler functions removed
        const eventCode = this.getEventCode(eventName);
        if (this.ons[eventCode] === undefined || this.ons[eventCode].length === 0) {
            return 0;
        }
        const oldLength = this.ons[eventCode].length;
        this.ons[eventCode] = this.ons[eventCode].filter(func => func !== eventHandler);
        const newLength = this.ons[eventCode].length;

        return oldLength - newLength;
    }
    removeOnly(eventName: string) {
        const eventCode = this.getEventCode(eventName);
        this.onlys[eventCode] = null;
        if (this.onlysEventRemoved[eventCode]) {
            this.onlysEventRemoved[eventCode].call(null);
            this.onlysEventRemoved[eventCode] = null;
        }
    }
}

const eventManager = new EventManager;

export default eventManager;
