import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  scrollBar: {
    width: '100%',
    height: '100%',
  },
  scrollBarWrapper: {
    width: '100%',
    height: '100%',
  },
  scrollBarScroll: {
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 4,
    background: 'rgba(0, 0, 0, 0.1)',
    userSelect: 'none',
    backgroundColor: 'rgb(201,212,218, .44)',
  },
  scrollBarScrollX: {
    left: 3,
    bottom: -20,
    width: 'calc(100% - 3px)',
    height: 10,
  },
  scrollBarScrollY: {
    top: 0,
    right: 0,
    height: 'calc(100% - 3px)',
    width: 10,
  },
  scroll: {
    backgroundColor: '#41525B',
    cursor: 'pointer',
    borderRadius: 4,
    position: 'absolute',
  },
  scrollX: {
    height: '100%',
  },
  scrollY: {
    width: '100%',
  },
});

class CustomScrollBar extends PureComponent {
  constructor(props) {
    super(props);

    this.scrollbarRef = createRef();
  }

  scrollToTop = () => {
    const scrollOffsetTop = this.scrollbarRef.current.scrollTop;

    if (scrollOffsetTop !== 0) {
      this.scrollbarRef.current.scrollToTop();
    }
  };

  render() {
    const {
      classes,
      children,
      passContentHeight,
      scrollLeft,
      scrollTop,
      customContentClass,
      scrollBarHeight,
      verticalScroll,
      customScrollBarYClass,
      customScrollBarXClass,
      customScrollXWidth,
      removeScrollX,
      handleScrollPositionChange,
      customWrapperClass,
      customScrollerClass,
    } = this.props;

    return (
      <Scrollbar
        ref={this.scrollbarRef}
        style={{ height: scrollBarHeight }}
        noDefaultStyles
        disableTracksWidthCompensation
        translateContentSizeYToHolder={passContentHeight}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        noScrollY={!verticalScroll}
        noScrollX={removeScrollX}
        removeTracksWhenNotUsed
        onScroll={values => {
          handleScrollPositionChange(values);
        }}
        renderer={props => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className={classes.scrollBar}
            />
          );
        }}
        wrapperProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                className={classNames(
                  classes.scrollBarWrapper,
                  customWrapperClass
                )}
              />
            );
          },
        }}
        scrollerProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                className={customScrollerClass}
              />
            );
          },
        }}
        contentProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                style={{ display: 'block' }}
                ref={elementRef}
                className={customContentClass}
              />
            );
          },
        }}
        trackXProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                style={{ width: customScrollXWidth }}
                className={classNames(
                  classes.scrollBarScroll,
                  classes.scrollBarScrollX,
                  customScrollBarXClass
                )}
              />
            );
          },
        }}
        trackYProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                className={classNames(
                  classes.scrollBarScroll,
                  classes.scrollBarScrollY,
                  customScrollBarYClass
                )}
              />
            );
          },
        }}
        thumbXProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                className={classNames(classes.scroll, classes.scrollX)}
              />
            );
          },
        }}
        thumbYProps={{
          renderer: props => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                className={classNames(classes.scroll, classes.scrollY)}
              />
            );
          },
        }}
      >
        {children}
      </Scrollbar>
    );
  }
}

CustomScrollBar.defaultProps = {
  passContentHeight: false,
  scrollLeft: 0,
  scrollTop: undefined,
  verticalScroll: false,
  scrollBarHeight: undefined,
  customScrollBarXClass: '',
  customScrollBarYClass: '',
  handleScrollPositionChange: () => {},
  removeScrollX: false,
  customScrollXWidth: undefined,
  customWrapperClass: '',
  customScrollerClass: '',
};

CustomScrollBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  passContentHeight: PropTypes.bool,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
  verticalScroll: PropTypes.bool,
  scrollBarHeight: PropTypes.number,
  customScrollBarXClass: PropTypes.string,
  customScrollBarYClass: PropTypes.string,
  handleScrollPositionChange: PropTypes.func,
  removeScrollX: PropTypes.bool,
  customScrollXWidth: PropTypes.string,
  customWrapperClass: PropTypes.string,
  customScrollerClass: PropTypes.string,
};

export default withStyles(styles)(CustomScrollBar);
