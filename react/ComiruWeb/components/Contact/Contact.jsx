import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.common.white,
    fontFamily: 'NotoSansHans'
  },
  divider: {
    marginBottom: theme.spacing.unit * 4,
    fontFamily: 'NotoSansHans'
  },
  paper: {
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[0],
    fontFamily: 'NotoSansHans'
  },
  arrowRight: {
    margin: 0,
    fontFamily: 'NotoSansHans'
  },
  locationListItemTitle: {
    textAlign: 'center',
    ...theme.typography.title,
    color: '#000',
    fontSize: 17,
    paddingBottom: theme.spacing.unit * 2,
    fontFamily: 'NotoSansHans'
  },
  locationListItem: {
    textAlign: 'center',
    color: '#000',
    fontSize: 9,
    fontFamily: 'NotoSansHans'
  },
  tel: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'NotoSansHans'
  }
});

const Contact = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List component="nav" className={classes.locationList}>
          <ListItem button>
            <ListItemText
              classes={{ primary: classes.locationListItemTitle }}
              primary="联系我们"
            />
          </ListItem>
          <Divider className={classes.backgroundWhite} />
          {/* <ListItem button>
            <a className={classes.tel} href="tel:400-888-8888">
              <ListItemText
                classes={{ primary: classes.locationListItem }}
                primary="400-888-8888"
              />
            </a>
          </ListItem> */}
          {/* <Divider className={classes.backgroundWhite} /> */}
          <ListItem button>
            <ListItemText
              classes={{ primary: classes.locationListItem }}
              primary="售后维护"
            />
          </ListItem>
          <Divider className={classes.backgroundWhite} />
        </List>
      </Paper>
    </div>
  );
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contact);
