/*
 * Main web app component
 *
 * Instantiates and links together the components that:
 * - let the user search for a location
 * - display the location on a map
 * - display the weather forecast
 * - let the user choose which day to display the forecast for
 */
import React from 'react';

import {
    createStyles,
    withStyles,
    Container,
    CssBaseline,
    Paper,
    Theme,
    WithStyles
} from '@material-ui/core';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';

import ForecastSelector from './ForecastSelector';
import SearchBar from './SearchBar';
import WeatherMap from './WeatherMap';
import WeatherForecast from './WeatherForecast';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2)
    },
    topLevelLayout: {
        display: "flex",
        flexDirection: "column"
    },
    desktopWeatherBox: {
        display: "flex"
    }
});

interface Props extends WithStyles<typeof styles>, WithWidth {
}
interface State {
    // Weather forecast location
    targetPos: {
        lat: number,
        lng: number
    },

    // Array of weather forecasts (time-ordered; ascending) where the first
    // entry is the current weather
    forecast: Array<any>,
    
    // Index (in the forecast array) of the forecast to display
    forecastSelection: number,

    // Set to true when the first lookup of location and weather forecast has
    // completed successfully
    firstLookupDone: boolean
}

class App extends React.Component<Props, State> {
    public readonly state: Readonly<State> = {
        targetPos: {
            lat: 0.0,
            lng: 0.0
        },
        forecast: [],
        forecastSelection: 0,
        firstLookupDone: false
    };

    //constructor(props: Props) {
    //    super(props);
    //}

    private setLocationAndForecast(lat: number, lng: number, forecast: Array<any>) {
        this.setState({
            targetPos: {
                lat: lat,
                lng: lng
            },
            forecast: forecast,
            firstLookupDone: true
        });
    }
    private setForecastSelection(forecastSelection: number): void {
        this.setState({
            forecastSelection: forecastSelection
        });
    }
    
    render() {
        const { classes, width } = this.props;
        const { firstLookupDone, forecast, forecastSelection,
                targetPos } = this.state;

        // For mobile screen sizes, use a different layout
        if (isWidthDown('xs', width)) {
            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <Container component="main" maxWidth="lg">
                        <Paper>
                            <div className={classes.topLevelLayout}>
                                <SearchBar
                                  setLocationAndForecast={
                                    (lat, lng, forecast) => {
                                        this.setLocationAndForecast(lat, lng, forecast); }}
                                >
                                </SearchBar>
                                { firstLookupDone ?
                                    <>
                                        <WeatherForecast
                                            forecast={forecast}
                                            forecastSelection={forecastSelection}
                                            mobileView={true}
                                        >
                                        </WeatherForecast>
                                        <ForecastSelector
                                          forecast={forecast}
                                          setForecastSelection={
                                            (index) => { this.setForecastSelection(index); }}
                                        >
                                        </ForecastSelector>
                                        <WeatherMap
                                          targetPos={targetPos}
                                        >
                                        </WeatherMap>
                                    </>
                                : null}
                            </div>
                        </Paper>
                    </Container>
                </div>
            );
        } else {
            // Full-size layout
            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <Container component="main" maxWidth="lg">
                        <Paper>
                            <div className={classes.topLevelLayout}>
                                <SearchBar
                                  setLocationAndForecast={
                                    (lat, lng, forecast) => {
                                        this.setLocationAndForecast(lat, lng, forecast); }}
                                >
                                </SearchBar>
                                { firstLookupDone ?
                                    <>
                                        <div className={classes.desktopWeatherBox}>
                                            <WeatherMap
                                              targetPos={targetPos}
                                            >
                                            </WeatherMap>
                                            <WeatherForecast
                                              forecast={forecast}
                                              forecastSelection={forecastSelection}
                                              mobileView={false}
                                            >
                                            </WeatherForecast>
                                        </div>
                                        <ForecastSelector
                                          forecast={forecast}
                                          setForecastSelection={
                                            (index) => { this.setForecastSelection(index); }}
                                        >
                                        </ForecastSelector>
                                    </>
                                : null}
                            </div>
                        </Paper>
                    </Container>
                </div>
            );
        }
    }
}

export default withStyles(styles)(withWidth()(App));
