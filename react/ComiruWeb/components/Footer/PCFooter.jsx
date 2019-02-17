import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'NotoSansHans',
    backgroundColor: theme.palette.common.white
  },
  divider: {
    fontFamily: 'NotoSansHans',
    marginBottom: theme.spacing.unit * 4
  },
  paper: {
    fontFamily: 'NotoSansHans',
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[0],
    width: theme.typography.pxToRem(200),
    margin: '0 auto'
  },
  desTitle: {
    fontFamily: 'NotoSansHans',
    padding: theme.typography.pxToRem(5)
  },
  des: {
    fontFamily: 'NotoSansHans',
    padding: theme.typography.pxToRem(5),
    color: '#666',
    cursor: 'pointer'
  },
  qrcode: {
    fontFamily: 'NotoSansHans',
    width: theme.typography.pxToRem(140)
  },
  a: {
    fontFamily: 'NotoSansHans',
    textDecoration: 'none'
  },
  icp: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    height: '50px',
    justifyContent: 'center'
  },
  icpText: {
    color: '#4a4a4a',
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20
  }
});

const PCFooter = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.desTitle}
              variant="h6"
              component="h3"
            >
              网站地图
            </Typography>
            <Link href="/ww_sku_list.html">
              <Typography className={classes.des} component="p">
                无畏系列
              </Typography>
            </Link>
            <Link href="/sku_list.html?id=1#ace">
              <Typography className={classes.des} component="p">
                A.C.E.LOGO 系列
              </Typography>
            </Link>
            <Link href="/sku_list.html?id=2#tennis">
              <Typography className={classes.des} component="p">
                TENNIS系列
              </Typography>
            </Link>
            <Link href="/sku_list.html?id=3#gd">
              <Typography className={classes.des} component="p">
                特别定制
              </Typography>
            </Link>
            <Link href="/story.html">
              <Typography className={classes.des} component="p">
                品牌故事
              </Typography>
            </Link>
            <Link href="/design.html">
              <Typography className={classes.des} component="p">
                设计工艺
              </Typography>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.desTitle}
              variant="h6"
              component="h3"
            >
              联系我们
            </Typography>
            {/* <Typography className={classes.des} component="p">
              400-888-8888
            </Typography> */}
            <a className={classes.a} href="https://acesp.tmall.com">
              <Typography className={classes.des} component="p">
                售后维护
              </Typography>
            </a>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.desTitle}
              variant="h6"
              component="h3"
            >
              关注微博
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.desTitle}
              variant="h6"
              component="h3"
            >
              关注微信公众号
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.icp}>
        <a className={classes.a} href="http://www.miitbeian.gov.cn">
          <Typography
            variant="h6"
            component="h3"
            className={classes.icpText}
          >
            备案号：津ICP备18009351号
          </Typography>
        </a>
        <Typography
          variant="h6"
          component="h3"
          className={classes.icpText}
        >
          企业名称：天津星运文化发展有限公司
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          className={classes.icpText}
        >
          联系电话：400-056-6868
        </Typography>
      </div>
    </div>
  );
};

PCFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PCFooter);
