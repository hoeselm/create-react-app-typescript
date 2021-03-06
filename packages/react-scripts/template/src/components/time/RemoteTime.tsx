import * as React from "react";
import styled from "styled-components";
import * as mui from "material-ui";

import * as primitives from "../util/primitives";
import * as animations from "../util/animations";
import * as formatters from "../util/formatters";
import * as i18n from "../../i18n/util";
import FullScreenProgress from "./FullScreenProgress";

interface IJSONResponse {
    time: string;
    milliseconds_since_epoch: number;
    date: string;
}

interface IProps { }
interface IState {
    loading: boolean;
    data: IJSONResponse;
}

export default class Component extends React.Component<IProps, IState> {

    headShakeAnimation: animations.Animatable;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: null
        };

    }

    fetchRemoteTime = async () => {

        this.setState({
            loading: true
        });

        const res = await fetch("http://date.jsontest.com/");
        const data: IJSONResponse = await res.json();

        this.setState({
            loading: false,
            data
        });

        this.headShakeAnimation.trigger();

    }

    reset = () => {
        this.setState({
            data: null
        });
    }

    render() {
        return (
            <div>

                <FullScreenProgress show={this.state.loading} />
                
                <mui.FlatButton
                    icon={<primitives.IconDone />}
                    onTouchTap={this.fetchRemoteTime} 
                />
                <mui.FlatButton
                    icon={<primitives.IconRestore />}
                    onTouchTap={this.reset} 
                />

                <animations.HeadShakeAnimatable durationMs={1000} innerRef={(c) => this.headShakeAnimation = c}>

                    {this.state.data ? (
                        <p><small><formatters.IsoDate date={new Date(this.state.data.milliseconds_since_epoch).toISOString()} /></small></p>
                    ) : null}
                
                </animations.HeadShakeAnimatable>

            </div>
        );
    }
}
