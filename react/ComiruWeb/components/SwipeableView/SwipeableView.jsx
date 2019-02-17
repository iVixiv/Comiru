import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'NotoSansHans',
    background: '#000'
  },
  header: {
    fontFamily: 'NotoSansHans',
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default
  },
  img: {
    display: 'block',
    fontFamily: 'NotoSansHans',
    overflow: 'hidden',
    width: '100%'
  },
  mobileStepper: {
    position: 'relative',
    fontFamily: 'NotoSansHans',
    // backgroundColor: 'transparent'
    backgroundColor: 'black'
  },
  leftButton: {
    position: 'absolute',
    fontFamily: 'NotoSansHans',
    top: `-${theme.typography.pxToRem(150)}`,
    color: '#87745E',
    left: `-${theme.typography.pxToRem(10)}`
  },
  rightButton: {
    position: 'absolute',
    fontFamily: 'NotoSansHans',
    top: `-${theme.typography.pxToRem(150)}`,
    color: '#87745E',
    right: `-${theme.typography.pxToRem(10)}`
  },
  dots: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)'
  },
  dot: {
    fontFamily: 'NotoSansHans',
    backgroundColor: '#C6C6C6',
    borderRadius: 0,
    width: theme.typography.pxToRem(20),
    height: theme.typography.pxToRem(4)
  },
  dotActive: {
    fontFamily: 'NotoSansHans',
    backgroundColor: '#080400'
  },
  dialog: {
    fontFamily: 'NotoSansHans',
    position: 'relative',
    backgroundColor: 'transparent'
  },
  closeBtn: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    top: theme.typography.pxToRem(15),
    right: theme.typography.pxToRem(15),
    color: theme.palette.common.white
  },
  dialogContent: {
    fontFamily: 'NotoSansHans',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialogImage: {
    fontFamily: 'NotoSansHans',
    width: '100%'
  }
});

class SwipeableTextMobileStepper extends Component {
  state = {
    activeStep: 0,
    open: false,
    activeImage: null
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = (activeStep) => {
    this.setState({ activeStep });
  };

  imageClick = index => () => {
    const { data } = this.props;
    const activeImage = data[index].imgPath;
    this.setState({ open: true, activeImage });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, fullScreen } = this.props;
    const { hideArrow, data } = this.props;
    const { activeStep, activeImage, open } = this.state;
    const maxSteps = data.length;
    const nextButton = hideArrow ? (
      undefined
    ) : (
      <Button
        size="small"
        onClick={this.handleNext}
        disabled={activeStep === maxSteps - 1}
        className={classes.rightButton}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>
    );
    const backButton = hideArrow ? (
      undefined
    ) : (
      <Button
        size="small"
        onClick={this.handleBack}
        disabled={activeStep === 0}
        className={classes.leftButton}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </Button>
    );

    return (
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {data.map((step, index) => (
            <div key={Number(index)}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  role="presentation"
                  onClick={this.imageClick(index)}
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          classes={{
            dots: classes.dots,
            dot: classes.dot,
            dotActive: classes.dotActive
          }}
          className={classes.mobileStepper}
          nextButton={nextButton}
          backButton={backButton}
        />
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
        >
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              <img
                className={classes.dialogImage}
                src={activeImage}
                alt="ace"
              />
            </DialogContentText>
          </DialogContent>
          <CloseIcon onClick={this.handleClose} className={classes.closeBtn} />
        </Dialog>
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default compose(
  withMobileDialog(),
  withStyles(styles, { withTheme: true })
)(SwipeableTextMobileStepper);
