import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = {
  grid: {
    width: '100%',
    height: 'auto'
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#308CFE',
      secondary: '#308CFE'
    }
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiFormControl: {
      marginNormal: {
        marginTop: '0px',
        marginBottom: '0px',
        width: '100%'
      }
    },
    MuiInputBase: {
      input: {
        padding: '0px',
        letterSpacing: '1px'
      }
    },
    MuiInput: {
      input: {
        color: '#777c83'
      },
      underline: {
        "&:before": {
          borderBottom: `none`
        },
        "&:after": {
          borderBottom: `none`
        },
        '&:hover:not($disabled):not($focused):not($error):before':
        {
          borderBottom: `none`
        },
        '&:hover:not($disabled):not($focused):not($error):after':
        {
          borderBottom: `none`
        }
      }
    }
  }
});

class MaterialUIPickers extends React.Component {
  render() {
    const { classes, date, setDate } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <MuiThemeProvider theme={theme}>
            <DatePicker
              margin="normal"
              value={date}
              onChange={setDate}
              format='yyyy / MM / dd '
            />
          </MuiThemeProvider>
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }
}

MaterialUIPickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIPickers);
