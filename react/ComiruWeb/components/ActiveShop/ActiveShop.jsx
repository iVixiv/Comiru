import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Copy from 'copy-to-clipboard';
import Slide from '@material-ui/core/Slide';
import qrcode from '../../static/assets/images/qrcode_tianmao.png';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// eslint-disable-next-line no-multi-spaces
const tbLink = '【ace旗舰店】，復·制这段描述￥SJu1bLP0FuW￥后咑閞👉手机淘宝👈或者用浏览器咑閞https://m.tb.cn/h.3qwdNg7?sm=94a449查看';

const styles = () => ({
  qrcode: {
    width: 100,
    padding: 15,
    fontFamily: 'NotoSansHans'
  },
  DialogContentLayout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'NotoSansHans'
  },
  DialogTitleText: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'NotoSansHans'
  },
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class ActiveShop extends Component {
  state = {
    open: false
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
    const { classes, children } = this.props;
    const { open } = this.state;

    return (
      <div>
        <div className={classes.layout} role="presentation" onClick={this.handleClickOpen}>
          {children}
        </div>
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
            前往购买
          </DialogTitle>
          <DialogContent className={classes.DialogContentLayout}>
            <DialogContentText id="alert-dialog-slide-description">
              {inWeixin ? (
                tbLink
              ) : (
                <img src={qrcode} className={classes.qrcode} alt="ace" />
              )}
            </DialogContentText>
            <Typography component="p" className={classes.title}>
              前往A.C.E.天猫旗舰店咨询
            </Typography>
          </DialogContent>
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
                  前往
              </Button>
            )}
            <Button onClick={this.handleCloseContact} color="default">
              关闭
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ActiveShop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ActiveShop);
