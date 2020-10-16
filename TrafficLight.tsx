import * as React from "react";
import './TrafficCss.css'
import {View} from "react-native";

export const GREEN = "GREEN";
export const RED = "RED";
export const YELLOW = "YELLOW";

interface TrafficLightState {
    listStatus: Array<boolean>,
    time: number,
}

const TIME=[10,8,2];// den do=10, red=8, vang =2
export default class TrafficLight extends React.Component<{}, TrafficLightState> {
    index: number = 0;

    constructor(props) {
        super(props);
        this.state = {
            time: 10,
            listStatus: [true, false, false]
        };
        this._changeColor = this._changeColor.bind(this)
    }


    render() {
        let listStatus = this.state.listStatus;
        return (
            <View>
                <Timer time={this.state.time} signalReturn={this._changeColor}/>
                <RedLight isLightOn={listStatus[0]}/>
                <GreenLight isLightOn={listStatus[1]}/>
                <YellowLight isLightOn={listStatus[2]}/>
            </View>
        )
    }

    _changeColor() {
        //red:10s
        //green:8s
        //yellow:2s
        switch (this.state.time)
        {
            case TIME[0] :
                this.setState({time:8, listStatus: [false, true, false]});
                break;
            case TIME[1]:
                this.setState({time: 2, listStatus: [false, false,true]});
                break;

        }
    }
}

interface TimerProps {
    time: number
    signalReturn: () => void
}

interface TimerState {
    seconds: number
}

class Timer extends React.Component<TimerProps, TimerState> {
    constructor(props) {
        super(props);
        this.state = ({
            seconds: this.props.time
        })
    }

    render() {
        return (
            <div className="timer">
                <p>{this.state.seconds}</p>
            </div>
        );
    }

    componentDidMount() {
        this._timeout(this.state.seconds)
    }

    componentWillReceiveProps(nextProps: Readonly<TimerProps>, nextContext: any): void {
        let time = nextProps.time;
        if (this.props.time != time) {
            this.setState({seconds:time})
            this._timeout(time);
        }
    }

    _timeout(time) {
        let seconds = time;
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                this.setState({seconds})
            } else {
                clearInterval(myInterval);
                this.props.signalReturn();
                this.setState({seconds: 0})
            }
            seconds--;
        }, 1000)
    }
}

interface LightProps {
    isLightOn: boolean,

}

class Light extends React.Component<LightProps, any> {
    constructor(props) {
        super(props);

    }

    lightOn = "RedLight"
    lightOff = "GreyLight"

    render() {
        let mau = this.props.isLightOn ? this.lightOn : this.lightOff;
        return (<view className={mau}/>

        );
    }
}
class RedLight extends Light {
    lightOn = "RedLight"
}
class GreenLight extends Light {
    lightOn = "GreenLight"
}
class YellowLight extends Light {
    lightOn = "YellowLight"
}


