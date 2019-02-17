import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  rootGrid: {
    flexGrow: 1,
    height: 800,
    fontFamily: 'NotoSansHans'
  },
  gridItem: {
    height: '80%',
    width: 160,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    fontFamily: 'NotoSansHans',
    marginLeft: 60
  },
  imageWrap: {
    width: 160,
    height: '100%',
    overflowY: 'scroll',
    cursor: 'pointer',
    fontFamily: 'NotoSansHans'
  },
  zoomGrid: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'NotoSansHans'
  },
  image: {
    width: 96,
    height: 96,
    cursor: 'pointer',
    fontFamily: 'NotoSansHans'
  },
  root: {
    position: 'relative',
    fontFamily: 'NotoSansHans'
  },
  gridList: {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    fontFamily: 'NotoSansHans'
  },
  title: {
    color: theme.palette.primary.light,
    fontFamily: 'NotoSansHans'
  },
  titleBar: {
    fontFamily: 'NotoSansHans',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  showImage: {
    fontFamily: 'NotoSansHans',
    width: 740
  },
  dialogImage: {
    cursor: 'pointer',
    fontFamily: 'NotoSansHans',
    width: '100%'
  }
});

class SingleLineGridList extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      open: false,
      activeImg: data && data[0].img
    };
  }

  handleClick = index => () => {
    const { data } = this.props;
    this.setState({
      open: false,
      activeImg: data[index].img
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, data, fullScreen } = this.props;
    const { activeImg, open } = this.state;
    return (
      <div className={classes.root}>
        <Grid container className={classes.rootGrid} spacing={16}>
          <Grid item xs={2} className={classes.gridItem}>
            <div className={classes.imageWrap}>
              {data
                && data.map((tile, index) => (
                  <img
                    onClick={this.handleClick(index)}
                    className={classes.image}
                    src={tile.img}
                    key={index.toString()}
                    alt={tile.title}
                    role="presentation"
                  />
                ))}
            </div>
          </Grid>
          <Grid className={classes.zoomGrid} item xs={9}>
            <img
              role="presentation"
              onClick={this.handleClickOpen}
              className={classes.showImage}
              src={activeImg}
              alt="ace"
            />
          </Grid>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <img
              role="presentation"
              onClick={this.handleClickOpen}
              className={classes.dialogImage}
              src={activeImg}
              alt="ace"
            />
          </Dialog>
        </Grid>
      </div>
    );
  }
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withMobileDialog()
)(SingleLineGridList);
