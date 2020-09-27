import * as React from "react";
import Circle from '../Circle';
const colors={
    red:{
        backgroundColor:"#ff0000"
    },
    yellow:{
        backgroundColor:"#ffff00"
    },
    green:{
        backgroundColor:"#00ff00"
    },
    grey:{
        backgroundColor:"#999999"
    }
};
export default class TrafficLight extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            red:colors.red,
            yellow:colors.yellow,
            green:colors.green,
            next:'red'
        }
    }

    ChangeRedtoGreen=()=>{
        switch (this.state.next) {
            case "green":
                this.setState({
                    red: colors.grey,
                    yellow: colors.grey,
                    green: colors.green,
                    next: 'yellow'

                });
                break;

            case "red":
                this.setState({
                    red: colors.red,
                    yellow: colors.grey,
                    green: colors.grey,
                    next: 'green'
                });
                break;
            case "yellow":
                this.setState({
                    red: colors.grey,
                    yellow: colors.yellow,
                    green: colors.grey,
                    next: 'red'
                });
                break;
        }
    }

    repeatingFunc = ()=>{

        this.ChangeRedtoGreen();

        if (this.state.red == colors.red){
            setTimeout(this.repeatingFunc, 10000);
        }else if (this.state.green == colors.green){
            setTimeout(this.repeatingFunc, 8000);
        }else if(this.state.yellow == colors.yellow){
            setTimeout(this.repeatingFunc, 2000);
        }

    }
    componentDidMount() {
        // setInterval(() => {
        //     this.ChangeRedtoGreen();
        // }, 2000)

        this.repeatingFunc();

    }

    render(){
        return (
            <>
                <div>Traffic Light</div>
                <Time
                    red={this.state.red}
                    green={this.state.green}
                    yellow = {this.state.yellow}
                />

                <Light
                    red={this.state.red}
                    green={this.state.green}
                    yellow = {this.state.yellow}
                />
            </>
        );
    }
}
class Time extends React.Component<any,any>{

    constructor(props) {
        super(props);
        this.state={
            second: 10
        }
    }
    componentDidMount() {
        var intervalID=setInterval(this.countDown.bind(this),1000);

    }
    componentWillUnmount(){
        clearInterval(this.state.intervalID);
    }

    // đếm thời gian
    timesetting = ()=>{
        var newSecond=this.state.second-1;
        if(newSecond>= -1){
            this.setState({second:newSecond});
        }else {
            clearInterval(this.state.intervalID);
        }
    }

    countDown=()=>{

    this.timesetting();
        if(this.state.second == 0) {
            this.timesetting();
            if (this.props.red == colors.red) {
                this.setState(
                    {second: 10}
                )
            } else if (this.props.green == colors.green)
            {
                this.setState(
                    {second: 8}
                )
            } else if(this.props.yellow == colors.yellow){
                this.setState(
                    {second: 2}
                )
            }

        }

    }

    render() {
        return (
            <div className="time"><p>{this.state.second}</p>
            </div>
        );
    }

}
class Light extends React.Component<any, any>{
  constructor(props) {
      super(props);
  }






    render() {
        return (
            <div className="light" >
          <Circle colors={this.props.red}/>
          <Circle colors={this.props.yellow}/>
          <Circle colors={this.props.green}/>
          

            </div>
        );
    }
}

