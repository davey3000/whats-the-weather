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

import ForecastSelector from './ForecastSelector';
import SearchBar from './SearchBar';
import WeatherMap from './WeatherMap';
import WeatherForecast from './WeatherForecast';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2)
    },
    desktopLayout: {
        display: "flex",
        flexDirection: "column"
    },
    desktopWeatherBox: {
        display: "flex"
    }
});

interface Props extends WithStyles<typeof styles> {
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
        const { classes } = this.props;
        const { firstLookupDone, forecast, forecastSelection,
                targetPos } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Container component="main" maxWidth="lg">
                    <Paper>
                        <div className={classes.desktopLayout}>
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
                                          forecastSelection={forecastSelection}>
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

export default withStyles(styles)(App);
