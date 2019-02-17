import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactSVG from 'react-svg';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Popover from '@material-ui/core/Popover';
import ChatIcon from '@material-ui/icons/Chat';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from 'next/link';
import Copy from 'copy-to-clipboard';
import Slide from '@material-ui/core/Slide';

// eslint-disable-next-line no-multi-spaces

const styles = theme => ({
  white: {
    fontFamily: 'NotoSansHans',
    color: theme.palette.common.white
  },
  backgroundWhite: {
    fontFamily: 'NotoSansHans',
    backgroundColor: theme.palette.common.white
  },
  locationList: {
    fontFamily: 'NotoSansHans',
    flexGrow: 1,
    color: theme.palette.common.white
  },
  locationListItemTitle: {
    fontFamily: 'NotoSansHans',
    textAlign: 'center',
    ...theme.typography.title,
    color: theme.palette.common.white,
    paddingBottom: theme.spacing.unit * 2
  },
  locationListItem: {
    fontFamily: 'NotoSansHans',
    textAlign: 'center',
    color: theme.palette.common.white
  },
  buttonNavSeleted: {
    fontFamily: 'NotoSansHans',
    color: 'black !important',
    paddingTop: 0
  },
  fixedBottom: {
    fontFamily: 'NotoSansHans',
    position: 'fixed',
    width: '100%',
    bottom: 0
  },
  paper: {
    padding: theme.spacing.unit * 2,
    fontFamily: 'NotoSansHans',
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  typography: {
    fontFamily: 'NotoSansHans',
    position: 'relative',
    margin: theme.spacing.unit * 2,
    color: theme.palette.common.white
  },
  arrowSvg: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    left: '50%',
    bottom: `-${theme.typography.pxToRem(14)}`,
    transform: 'translate(-50%)',
    color: theme.palette.common.black
  },
  arrowLeftSvg: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    left: theme.typography.pxToRem(45),
    bottom: `-${theme.typography.pxToRem(14)}`,
    transform: 'translate(-50%)',
    color: theme.palette.common.black
  },
  arrowSvgRight: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    right: theme.typography.pxToRem(22),
    bottom: `-${theme.typography.pxToRem(14)}`,
    transform: 'translate(-50%)',
    color: theme.palette.common.black
  },
  withoutOverflow: {
    fontFamily: 'NotoSansHans',
    overflow: 'unset',
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.common.black,
    width: '100%'
  },
  eyesPoper: {
    fontFamily: 'NotoSansHans',
    position: 'relative',
    color: theme.palette.common.white,
    display: 'inline-block',
    padding: theme.typography.pxToRem(15),
    width: '100%',
    textAlign: 'center'
  },
  eyesIcon: {
    fontFamily: 'NotoSansHans',
    color: 'white',
    display: 'inline-block',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30)
  },
  gapRight: {
    fontFamily: 'NotoSansHans',
    marginRight: theme.spacing.unit * 2
  },
  gapLeft: {
    fontFamily: 'NotoSansHans',
    marginLeft: theme.spacing.unit * 2
  },
  tel: {
    fontFamily: 'NotoSansHans',
    width: '100%',
    textAlign: 'center'
  },
  qrcode: {
    fontFamily: 'NotoSansHans',
    width: 100,
    padding: 15
  },
  DialogContentLayout: {
    fontFamily: 'NotoSansHans',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  DialogTitleText: {
    fontFamily: 'NotoSansHans',
    width: '100%',
    textAlign: 'center'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MobileFooter extends Component {
  state = {
    open: false,
    value: 0,
    anchorElOfEye: null,
    anchorElOfLocation: null,
    anchorElContact: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = type => (event) => {
    this.setState({
      [type]: event.currentTarget
    });
  };

  handleClose = type => () => {
    this.setState({
      [type]: null
    });
  };

  isWeixin = () => {
    const ua = navigator.userAgent.toLowerCase();
    return String(ua.match(/MicroMessenger/i)) === 'micromessenger';
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseContact = () => {
    this.setState({ open: false });
  };

  handleJump = () => {
    this.setState({ open: false });
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      // 移动端
      window.location.href = 'https://m.tb.cn/h.3qwdNg7?sm=94a449';
    } else {
      window.location.href = 'https://acesp.tmall.com';
    }
  };

  handleCopy = () => {
    Copy(tbLink);
    this.handleClose();
  };

  render() {
    const inWeixin = this.isWeixin();
    const { classes } = this.props;
    const { value, anchorElOfEye, anchorElOfLocation } = this.state;
    const { open } = this.state;
    const { anchorElContact } = this.state;
    const openEye = Boolean(anchorElOfEye);
    const openLocation = Boolean(anchorElOfLocation);
    const openContact = Boolean(anchorElContact);
    return (
      <div>
        <BottomNavigation
          className={classes.fixedBottom}
          value={value}
          onChange={this.handleChange}
        >
          <BottomNavigationAction
            icon={<ChatIcon />}
            onClick={this.handleClick('anchorElContact')}
            classes={{ selected: classes.buttonNavSeleted }}
          />
          <BottomNavigationAction
            aria-owns={openEye ? 'eye-popper' : undefined}
            icon={<VisibilityIcon />}
            onClick={this.handleClick('anchorElOfEye')}
            classes={{ selected: classes.buttonNavSeleted }}
          />
          <BottomNavigationAction
            classes={{ selected: classes.buttonNavSeleted }}
            onClick={this.handleClick('anchorElOfLocation')}
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
        <Popover
          id="location-popper"
          open={openContact}
          classes={{ paper: classes.withoutOverflow }}
          anchorEl={anchorElContact}
          onClose={this.handleClose('anchorElContact')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <div className={classes.eyesPoper}>
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
                    primary="400-8888-888"
                  />
                </a>
              </ListItem>
              <Divider className={classes.backgroundWhite} /> */}
              <ListItem button>
                <ListItemText
                  onClick={this.handleClickOpen}
                  classes={{ primary: classes.locationListItem }}
                  primary="售后维护"
                />
              </ListItem>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle
                  className={classes.DialogTitleText}
                  id="alert-dialog-slide-title"
                >
                  售后维护
                </DialogTitle>
                <DialogActions>
                  {inWeixin ? (
                    <Button
                      onClick={this.handleCopy}
                      data-clipboard-text={tbLink}
                      color="primary"
                    >
                      复制
                    </Button>
                  ) : (
                    <Button onClick={this.handleJump} color="primary">
                      前往
                    </Button>
                  )}
                  <Button onClick={this.handleCloseContact} color="primary">
                    关闭
                  </Button>
                </DialogActions>
              </Dialog>
            </List>
            <ArrowDropDown className={classes.arrowLeftSvg} />
          </div>
        </Popover>
        <Popover
          id="eye-popper"
          open={openEye}
          classes={{ paper: classes.withoutOverflow }}
          anchorEl={anchorElOfEye}
          onClose={this.handleClose('anchorElOfEye')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <div className={classes.eyesPoper}>
            <Link href="/qc_weixin.html">
              <ReactSVG
                className={`${classes.eyesIcon} ${classes.gapRight}`}
                src="./../static/assets/icon/weixin-brands.svg"
              />
            </Link>
            <Link href="/qc_weibo.html">
              <ReactSVG
                className={`${classes.eyesIcon} ${classes.gapLeft}`}
                src="./../static/assets/icon/weibo-brands.svg"
              />
            </Link>
            <ArrowDropDown className={classes.arrowSvg} />
          </div>
        </Popover>
        <Popover
          id="location-popper"
          open={openLocation}
          classes={{ paper: classes.withoutOverflow }}
          anchorEl={anchorElOfLocation}
          onClose={this.handleClose('anchorElOfLocation')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <div className={classes.eyesPoper}>
            <List component="nav" className={classes.locationList}>
              <ListItem button>
                <ListItemText
                  classes={{ primary: classes.locationListItemTitle }}
                  primary="网站地图"
                />
              </ListItem>
              <Divider className={classes.backgroundWhite} />
              <Link href={{ pathname: '/sku_list.html', query: { id: 1 } }}>
                <ListItem button>
                  <ListItemText
                    classes={{ primary: classes.locationListItem }}
                    primary="A.C.E.LOGO 系列"
                  />
                </ListItem>
              </Link>
              <Divider className={classes.backgroundWhite} />
              <Link href="/ww_sku_list.html">
                <ListItem button>
                  <ListItemText
                    classes={{ primary: classes.locationListItem }}
                    primary="无畏系列"
                  />
                </ListItem>
              </Link>
              <Divider className={classes.backgroundWhite} />
              <Link href={{ pathname: '/sku_list.html', query: { id: 2 } }}>
                <ListItem button>
                  <ListItemText
                    classes={{ primary: classes.locationListItem }}
                    primary="TENNIS系列"
                  />
                </ListItem>
              </Link>
              <Divider className={classes.backgroundWhite} />
              <Link href={{ pathname: '/sku_list.html', query: { id: 3 } }}>
                <ListItem button>
                  <ListItemText
                    classes={{ primary: classes.locationListItem }}
                    primary="特别定制"
                  />
                </ListItem>
              </Link>
              <Divider className={classes.backgroundWhite} />
              <Link href="/story.html">
                <ListItem button>
                  <ListItemText
                    classes={{ primary: classes.locationListItem }}
                    primary="品牌故事"
                  />
                </ListItem>
              </Link>
              <Divider className={classes.backgroundWhite} />
              <Link href="/design.html">
                <ListItem button>
                  <ListItemText
                    classes={{ primary: classes.locationListItem }}
                    primary="设计工艺"
                  />
                </ListItem>
              </Link>
              <Divider className={classes.backgroundWhite} />
            </List>
            <ArrowDropDown className={classes.arrowSvgRight} />
          </div>
        </Popover>
      </div>
    );
  }
}

MobileFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MobileFooter);
