/*
 * Component that displays a summary of the current or forecasted weather
 * conditions for the current selected location
 */
import React from 'react';

import {
    createStyles,
    withStyles,
    Button,
    ButtonGroup,
    Box,
    Theme,
    WithStyles
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    tempSelector: {
        float: "left",
        paddingLeft: theme.spacing(2)
    },
    weatherIcon: {
        flex: 1,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
    },
    tempPressure: {
        display: "flex",
        justifyContent: "space-around",
        padding: theme.spacing(2),
        fontSize: "4rem",
        [theme.breakpoints.down('md')]: {
            fontSize: "3rem"
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2.5rem"
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    // Array of weather forecasts (time-ordered; ascending) where the first
    // entry is the current weather
    forecast: Array<any>,

    // Index (in the forecast array) of the forecast to display
    forecastSelection: number
}
interface State {
    valid: boolean,       // forecast is valid
    icon: string,         // name of icon summarising the conditions
    temp: number,         // temperature in Kelvin
    pressure: number,     // pressure in mB,
    tempCelsius: boolean  // true for celsius, false for fahrenheit
}

class WeatherForecast extends React.Component<Props, State> {
    public static WEATHER_ICON_URL = "https://openweathermap.org/img/wn/";

    public readonly state: Readonly<State> = {
        valid: false,
        icon: "",
        temp: 0,
        pressure: 0,
        tempCelsius: true
    }

    // Set the initial displayed forecast from the component props
    componentDidMount() {
        const forecast = this.props.forecast;
        const forecastSelection = this.props.forecastSelection;
        this.updateForecast(forecast, forecastSelection);
    }

    // When the forecast provided by the props changes, update the displayed
    // forecast to match
    componentDidUpdate(prevProps: Props) {
        const propsChanged = (
            prevProps.forecast !== this.props.forecast
            || prevProps.forecastSelection !== this.props.forecastSelection);
        if (propsChanged) {
            const forecast = this.props.forecast;
            const forecastSelection = this.props.forecastSelection;
            this.updateForecast(forecast, forecastSelection);
        }
    }

    // Update the displayed forecast based on the passed forecast data
    private updateForecast(forecast: Array<any>, forecastSelection: number) {
        if (forecast.length > 0) {
            const forecastItem = forecast[forecastSelection];
            const icon = forecastItem.weather[0].icon;
            const temp = forecastItem.main.temp;
            const pressure = forecastItem.main.pressure;
            const valid = true;
            this.setState({
                valid, icon, temp, pressure
            })
        }
    }

    // Select temperature conversion algorithm
    private handleSelectCelsius() {
        this.setState({
            tempCelsius: true
        });
    }
    private handleSelectFahrenheit() {
        this.setState({
            tempCelsius: false
        });
    }

    render() {
        const { classes } = this.props;
        const { valid, icon, temp, tempCelsius, pressure } = this.state;

        // URL to an icon that represents the weather conditions
        const weatherIconPath = WeatherForecast.WEATHER_ICON_URL + icon + "@2x.png";

        // Convert temperature to Celsius/Fahrenheit (from Kelvin)
        const tempConverted = tempCelsius ? ~~(temp - 273.15)
                                          : ~~(((temp-273.15)*1.8)+32);
        const tempUnits = tempCelsius ? "°C" : "°F";

        return (
            <div className={classes.root}>
                { valid ?
                    <>
                        <div className={classes.tempSelector}>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={() => { this.handleSelectCelsius(); }}>°C</Button>
                                <Button onClick={() => { this.handleSelectFahrenheit(); }}>°F</Button>
                            </ButtonGroup>
                        </div>
                        <div className={classes.weatherIcon} style={{backgroundImage: 'url("' + weatherIconPath + '")'}}>
                        </div>
                        <div className={classes.tempPressure}>
                            <Box>
                                {tempConverted}{tempUnits}
                            </Box>
                            <Box>
                                {pressure}mB
                            </Box>
                        </div>
                    </> : null}
            </div>
        );
    }
}

export default withStyles(styles)(WeatherForecast);
