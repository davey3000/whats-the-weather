/*
 * Search bar component that allows the user to search for a location they
 * specify
 */
import React from 'react';

import {
    createStyles,
    withStyles,
    Button,
    Icon,
    IconButton,
    TextField,
    Theme,
    WithStyles
} from '@material-ui/core';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2)
    },
    searchForm: {
        display: "flex"
    },
    locationField: {
        flex: 1,
        paddingRight: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles>, WithWidth {
    // Inform parent that the forecast and forecast location have been updated
    setLocationAndForecast: (lat: number, lng: number, forecast: Array<any>) => void
}
interface State {
    // Value currently displayed in the search location text input field
    searchLocation: string;
}

class SearchBar extends React.Component<Props, State> {
    // URL for the API for finding the coordinates of a specified location
    private static LOCATION_SEARCH_URL = "https://nominatim.openstreetmap.org/search";

    // URL for the API for getting the current weather conditions
    private static CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

    // URL for the API for getting the weather forecast
    private static FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

    // API key for OpenWeatherMap; required to fetch weather day
    private static FORECAST_API_KEY = "693943cf1c26beecbba5cbe6ec6e21fc";

    public readonly state: Readonly<State> = {
        searchLocation: ""
    }

    // When the user changes the contents of the search location text input
    // field, update the state so the changes reflect in the GUI
    private handleLocationChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState({
            searchLocation: evt.target.value
        });
    }

    // User has requested a search (either by pressing Return when focused on
    // the search location text input field, or by clicking the "Search"
    // button), so send a REST query to the location service to find the
    // location indicated by the user.  If the request is successful
    // then we will get the latitude and longitude of the location, which we can
    // then include in a  REST query to the weather forecast service.  We can
    // then pass the result of both queries to the parent which can pass the
    // results on to any other components which need them.
    private async handleSearch(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();   // Stop the default "submit" button behaviour
                                // (which will refresh the page)

        const searchLocation = this.state.searchLocation;
        if (!searchLocation) return null;

        try {
            const pos = await this.lookupLocation(searchLocation);
            const current = await this.lookupCurrentWeather(pos.lat, pos.lng);
            const forecast = current.concat(await this.lookupWeatherForecast(pos.lat, pos.lng));

            // Pass results to the parent component
            this.props.setLocationAndForecast(pos.lat, pos.lng, forecast);
        } catch(err) {
            // REVISIT: Flag an error to the user when location or forecast not found
            console.error(err);
        }
    }

    // Send a REST query to find the coordinates of the current location
    // specifed by the user
    private async lookupLocation(searchLocation: string): Promise<{lat: number, lng: number}> {
        const url = new URL(SearchBar.LOCATION_SEARCH_URL);
        const params: any = {
            q: this.state.searchLocation,
            format: "json",
            limit: 1
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const resp = await fetch(url.toString());
        const data = await resp.json();
        if (data && data.length >= 1) {
            const result = data[0];
            const lat: number = result.lat;
            const lng: number = result.lon;

            return {lat: lat, lng: lng};
        }
        throw new Error("Location lookup failed");
    }

    // Send a REST query to find the current weather for a location specified
    // by coordinates
    private async lookupCurrentWeather(lat: number, lng: number): Promise<Array<any>> {
        const url = new URL(SearchBar.CURRENT_WEATHER_URL);
        const params: any = {
            appid: SearchBar.FORECAST_API_KEY,
            lat: lat,
            lon: lng
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const resp = await fetch(url.toString());
        const data = await resp.json();
        if (data && data.cod === 200) {
            return [data];
        }
        throw new Error("Forecast lookup failed");
    }

    // Send a REST query to find the weather forecast for a location specified
    // by coordinates
    private async lookupWeatherForecast(lat: number, lng: number): Promise<Array<any>> {
        const url = new URL(SearchBar.FORECAST_URL);
        const params: any = {
            appid: SearchBar.FORECAST_API_KEY,
            lat: lat,
            lon: lng
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const resp = await fetch(url.toString());
        const data = await resp.json();
        if (data && data.cod === "200" && data.list) {
            return data.list;
        }
        throw new Error("Forecast lookup failed");
    }

    render() {
        const { classes, width } = this.props;
        const { searchLocation } = this.state;

        const showIconButton = isWidthDown('xs', width);

        return (
            <div className={classes.root}>
                <form className={classes.searchForm} noValidate>
                    <TextField
                      className={classes.locationField}
                      id="weather-location"
                      label="Location"
                      value={searchLocation}
                      onChange={(evt) => { this.handleLocationChange(evt); }}
                    />
                    { showIconButton ? (
                        <IconButton
                          aria-label="search"
                          type="submit"
                          onClick={(evt) => { this.handleSearch(evt); }}
                          >
                            <Icon>search</Icon>
                        </IconButton>) : (
                        <Button
                          type="submit"
                          variant="contained"
                          endIcon={<Icon>search</Icon>}
                          onClick={(evt) => { this.handleSearch(evt); }}
                        >
                            Search
                        </Button>
                    )}
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(SearchBar));
