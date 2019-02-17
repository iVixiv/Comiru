import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Header from '../Header';
import Footer from '../Footer';

const styles = theme => ({
  content: {
    marginTop: theme.typography.pxToRem(56),
    overflow: 'hidden',
    fontFamily: 'NotoSansHans'
  },
  fixedBottomICP: {
    padding: 0,
    margin: 0,
    bottom: 0,
    textAlign: 'center',
    width: '100%',
    ...theme.typography.caption,
    fontFamily: 'NotoSansHans',
    fontSize: 10
  },
  space: {
    height: theme.typography.pxToRem(56),
    width: '100%',
    background: '#fff'
  },
  a: {
    fontFamily: 'NotoSansHans',
    textDecoration: 'none'
  },
  icp: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 10
  }
});

const Layout = (props) => {
  const { children, hideFooter, classes } = props;
  // const { width } = props;
  return (
    <div>
      <div className={classes.content}>
        <div>{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(Layout);
