import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  card: {
    maxWidth: 350,
    height: 320,
  },
  cardTitle: {
    color: '#41525B',
    fontSize: '20px',
    textAlign: 'left',
    height: 50,
    marginBottom: 15,
    overflow: 'hidden',
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardImage: {
    height: 140,
  },
  cardDescription: {
    height: 40,
    overflow: 'hidden',
  },
  cardAction: {
    justifyContent: 'flex-end',
  },
  actionButton: {
    color: '#41525B',
  },
});

class NewsCard extends PureComponent {
  render() {
    const { classes, item, onClickMore } = this.props;

    return (
      <Grid item xs={4}>
        <Card className={classes.card}>
          <CardActionArea>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.cardTitle}
            >
              {item.title}
            </Typography>
            <CardMedia
              component="img"
              alt="item image"
              height="140"
              image={item.urlToImage}
              className={classes.cardImage}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.cardDescription}
              >
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardAction}>
            <Button
              size="small"
              color="primary"
              onClick={onClickMore}
              className={classes.actionButton}
            >
              More >
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

NewsCard.defaultProps = {
  onClickMore: () => {},
};

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onClickMore: PropTypes.func,
};

export default withStyles(styles)(NewsCard);
