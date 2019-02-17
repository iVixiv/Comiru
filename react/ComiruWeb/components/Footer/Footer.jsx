import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileFooter from './MobileFooter';
import PCFooter from './PCFooter';

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'NotoSansHans'
  },
  mobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      fontFamily: 'NotoSansHans'
    }
  },
  pc: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      fontFamily: 'NotoSansHans'
    }
  }
});

class Footer extends Component {
  render() {
    const { hideFooter, classes } = this.props;

    if (hideFooter) {
      return '';
    }
    return (
      <footer className={classes.root}>
        <div className={classes.mobile}>
          <MobileFooter />
        </div>
        <div className={classes.pc}>
          <PCFooter />
        </div>
      </footer>
    );
  }
}

Footer.defaultProps = {
  hideFooter: false
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  hideFooter: PropTypes.bool
};

export default withStyles(styles)(Footer);
