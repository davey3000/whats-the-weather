/*
 * Component that displays a map indicating the location that the weather
 * forecast is for
 */
import React from 'react';

import {
    createStyles,
    withStyles,
    Theme,
    WithStyles
} from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const styles = (theme: Theme) => createStyles({
    root: {
        flex: 1
    },
    map: {
        height: "500px"
    }
});

interface Props extends WithStyles<typeof styles> {
    // Weather forecast location
    targetPos: {
        lat: number,
        lng: number
    }
}
interface State {
    // Current map location and zoom level
    pos: {
        lat: number,
        lng: number
    },
    zoom: number
}

class WeatherMap extends React.Component<Props, State> {
    public readonly state: Readonly<State> = {
        pos: {
            lat: 0.0,
            lng: 0.0
        },
        zoom: 0
    }

    mapRef = React.createRef<Map>();

    // Set the initial displayed location from the component props
    componentDidMount() {
        const targetPos = this.props.targetPos;
        this.setState({
            pos: {
                lat: targetPos.lat,
                lng: targetPos.lng
            },
            zoom: 13
        });
    }

    // When the weather forecast location changes, move the map to center on
    // the new location.  We track target position separately from current map
    // position so the user can still move around the map
    componentDidUpdate(prevProps: Props) {
        const targetPos = this.props.targetPos;
        const prevTargetPos = prevProps.targetPos;
        const posChanged = (targetPos.lat !== prevTargetPos.lat
                            || targetPos.lng !== prevTargetPos.lng);
        if (posChanged) {
            this.setState({
                pos: {
                    lat: targetPos.lat,
                    lng: targetPos.lng
                },
                zoom: 13
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { pos, zoom } = this.state;

        return (
            <div className={classes.root}>
                <Map
                  className={classes.map}
                  center={pos}
                  zoom={zoom}
                  ref={this.mapRef}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={pos}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}

export default withStyles(styles)(WeatherMap);
