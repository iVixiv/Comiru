import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import Copy from 'copy-to-clipboard';

// eslint-disable-next-line no-multi-spaces
const styles = theme => ({
  root: {
    fontFamily: 'NotoSansHans',
    flexGrow: 1
  },
  grow: {
    fontFamily: 'NotoSansHans',
    flexGrow: 1
  },
  headColor: {
    fontFamily: 'NotoSansHans',
    backgroundColor: '#000'
  },
  headIcon: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
    width: 50
  },
  menuButton: {
    fontFamily: 'NotoSansHans',
    marginLeft: -12,
    marginRight: 20
  },
  drawerPaper: {
    fontFamily: 'NotoSansHans',
    width: theme.typography.pxToRem(300),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  menuClose: {
    fontFamily: 'NotoSansHans',
    position: 'absolute',
    right: 0
  },
  alignCenter: {
    fontFamily: 'NotoSansHans',
    textAlign: 'center'
  },
  line: {
    fontFamily: 'NotoSansHans',
    width: '90%',
    margin: '0 auto'
  },
  withoutPadding: {
    fontFamily: 'NotoSansHans',
    padding: 0
  },
  smallFont: {
    fontFamily: 'NotoSansHans',
    fontSize: theme.typography.fontSize - 2
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

// function isWeixin() {
//   // 判断是否是微信
//   const ua = navigator.userAgent.toLowerCase();
//   return ua.match(/MicroMessenger/i).toString() === 'micromessenger';
// }

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Header extends Component {
  state = {
    left: false,
    open: false,
    openUS: false,
    openProduct: false
  };

  isWeixin = () => {
    const ua = navigator.userAgent.toLowerCase();
    return String(ua.match(/MicroMessenger/i)) === 'micromessenger';
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleClick = type => () => {
    this.setState(state => ({ [type]: !state[type] }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
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
    const { state, props } = this;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem key="0">
            <ListItemIcon
              className={classes.menuClose}
              onClick={this.toggleDrawer('left', false)}
            >
              <CloseIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="1">
            <Link href="/index.html">
              <ListItemText
                onClick={this.toggleDrawer('left', false)}
                primary="首页"
                className={classes.alignCenter}
              />
            </Link>
          </ListItem>
          <Divider className={classes.line} />
          <ListItem button>
            <Link href="/story.html">
              <ListItemText
                primary="品牌故事"
                className={classes.alignCenter}
                onClick={this.toggleDrawer('left', false)}
              />
            </Link>
          </ListItem>
          <Divider className={classes.line} />
          <ListItem button>
            <Link href="/design.html">
              <ListItemText
                primary="设计工艺"
                className={classes.alignCenter}
              />
            </Link>
          </ListItem>
          <Divider className={classes.line} />
          <ListItem button onClick={this.handleClick('openProduct')}>
            <ListItemText
              primary="产品"
              className={`${classes.alignCenter} ${classes.withoutPadding}`}
            />
            {state.openProduct ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider className={classes.line} />
          <Collapse in={state.openProduct} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItem button>
                <Link href="/ww_sku_list.html">
                  <ListItemText
                    primary="无畏系列"
                    classes={{ primary: classes.smallFont }}
                    className={classes.alignCenter}
                    onClick={this.toggleDrawer('left', false)}
                  />
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/sku_list.html?id=1#ace">
                  <ListItemText
                    primary="A.C.E.LOGO 系列"
                    classes={{ primary: classes.smallFont }}
                    className={classes.alignCenter}
                    onClick={this.toggleDrawer('left', false)}
                  />
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/sku_list.html?id=2#tennis">
                  <ListItemText
                    primary="TENNIS系列"
                    classes={{ primary: classes.smallFont }}
                    className={classes.alignCenter}
                    onClick={this.toggleDrawer('left', false)}
                  />
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/sku_list.html?id=3#gd">
                  <ListItemText
                    primary="特别定制"
                    classes={{ primary: classes.smallFont }}
                    className={classes.alignCenter}
                    onClick={this.toggleDrawer('left', false)}
                  />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={this.handleClick('openUS')}>
            <ListItemText
              primary="联系我们"
              className={`${classes.alignCenter} ${classes.withoutPadding}`}
            />
            {state.openUS ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider className={classes.line} />
          <Collapse in={state.openUS} timeout="auto" unmountOnExit>
            <List component="div">
              {/* <ListItem button key="3">
                <a className={classes.tel} href="tel:400-888-8888">
                  <ListItemText
                    primary="400-888-8888"
                    className={classes.alignCenter}
                  />
                </a>
              </ListItem> */}
              <ListItem button key="5" onClick={this.handleClickOpen}>
                <ListItemText
                  primary="售后维护"
                  className={classes.alignCenter}
                />
              </ListItem>
              <Dialog
                open={state.open}
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
                      color="default"
                    >
                      复制
                    </Button>
                  ) : (
                    <Button onClick={this.handleJump} color="default">
                      {' '}
                      前往
                    </Button>
                  )}
                  <Button onClick={this.handleClose} color="default">
                    关闭
                  </Button>
                </DialogActions>
              </Dialog>
              <Divider className={classes.line} />
            </List>
          </Collapse>
        </List>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.headColor}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {props.children}
        <Drawer
          open={state.left}
          onClose={this.toggleDrawer('left', false)}
          classes={{ paper: classes.drawerPaper }}
        >
          <div tabIndex={0} role="button">
            {/* onClick={this.toggleDrawer("left", false)}
                        onKeyDown={this.toggleDrawer("left", false)} */}
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
