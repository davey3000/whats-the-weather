/*
 * Component that allows the user to select whether they want to see the current
 * weather conditions or the forecast for a future date
 */
import React from 'react';

import {
    createStyles,
    withStyles,
    Slider,
    Theme,
    WithStyles
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(5.5)
    }
});

type Mark = {
    label: string,  // displayed on the slider
    time: string,   // displayed on the marker above the currently selected
                    // slider entry
    value: number   // index of the mark in the array
}

interface Props extends WithStyles<typeof styles> {
    // Array of weather forecasts (time-ordered; ascending) where the first
    // entry is the current weather
    forecast: Array<any>,

    // Inform parent that the index of the currently selected forecast has been
    // updated
    setForecastSelection: (forecastSelection: number) => void
}
interface State {
    // Marks along the slider (potentially labelled)
    marks: Mark[];
}

class ForecastSelector extends React.Component<Props, State> {
    // Number of weather forecast entries (including the "Now" entry) to show
    // on the slider
    private static MAX_FORECAST_ENTRIES = 32;

    public readonly state: Readonly<State> = {
        marks: [
            {
                label: "",
                time: "",
                value: 0
            }
        ]
    };

    // Set the initial slider values from the component props
    componentDidMount() {
        const forecast = this.props.forecast;
        this.updateSelector(forecast);
    }

    // When the forecast provided by the props changes, update the slider values
    // to match
    componentDidUpdate(prevProps: Props) {
        if (prevProps.forecast !== this.props.forecast) {
            const forecast = this.props.forecast;
            this.updateSelector(forecast);
        }
    }

    // Update the slider values based on the passed forecast data
    private updateSelector(forecast: Array<any>) {
        // Generate an array of slider marks to match the first
        // MAX_FORECAST_ENTRIES forecasts
        const marks: Mark[] = [];
        forecast.forEach((item, index) => {
            if (index < ForecastSelector.MAX_FORECAST_ENTRIES) {
                const date = new Date(item.dt * 1000);
                const hours = date.getHours();
                const label = index <= 0
                    ? ""
                    : (hours === 0
                        ? this.dayToString(date.getDay())
                        : "");
                const time = (hours >= 10 ? hours.toString() : "0" + hours) + ":00";
                marks.push({
                    label: label,
                    time: time,
                    value: index
                });
            }
        });
        this.setState({
            marks: marks
        })
    }

    // Convert JS numeric day value (0-7) to a text equivalent
    private dayToString(day: number): string {
        switch(day) {
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thu";
            case 5: return "Fri";
            case 6: return "Sat";
            default: return "???"
        }
    }

    // Format the label on the marker above the slider (the marker that
    // indicates the currently selected entry on the slider)
    private valueLabelFormat(value: number): JSX.Element {
        if (value <= 0) {
            return (<span>Now</span>)
        } else {
            return (<span>{this.state.marks[value].time}</span>);
        }
    }

    // Slider value (forecast selection) has been changed by the user, so
    // inform other components via the props
    private handleChange(evt: any, newValue: number | number[]) {
        this.props.setForecastSelection(newValue as number);
    }

    render() {
        const { classes } = this.props;
        const { marks } = this.state;

        return (
            <div className={classes.root}>
                <Slider
                  defaultValue={0}
                  step={1}
                  min={0}
                  max={31}
                  valueLabelFormat={
                    (value: number): JSX.Element => {
                        return this.valueLabelFormat(value);
                    }}
                  valueLabelDisplay="on"
                  marks={marks}
                  onChange={(evt, newValue) => { this.handleChange(evt, newValue); }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ForecastSelector);
