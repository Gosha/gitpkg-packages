import React from 'react';
import cx from 'classnames';
import { arc, pie, line, radialLine, area, stack, stackOrderAscending, stackOrderDescending, stackOrderInsideOut, stackOrderNone, stackOrderReverse, stackOffsetExpand, stackOffsetDiverging, stackOffsetNone, stackOffsetSilhouette, stackOffsetWiggle, linkHorizontal, linkVertical, linkRadial } from 'd3-shape';
import { Group } from '@vx/group';
import PropTypes from 'prop-types';
import { Point } from '@vx/point';
import { curveLinear } from '@vx/curve';
import { path } from 'd3-path';

function callOrValue(maybeFn, data) {
  if (typeof maybeFn === 'function') {
    return maybeFn(data);
  }
  return maybeFn;
}

function additionalProps(restProps, data) {
  return Object.keys(restProps).reduce(function (ret, cur) {
    ret[cur] = callOrValue(restProps[cur], data);
    return ret;
  }, {});
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

function Arc(_ref) {
  var className = _ref.className,
      data = _ref.data,
      centroid = _ref.centroid,
      innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius,
      restProps = objectWithoutProperties(_ref, ['className', 'data', 'centroid', 'innerRadius', 'outerRadius', 'cornerRadius', 'startAngle', 'endAngle', 'padAngle', 'padRadius']);

  var arc$$1 = arc();
  if (centroid) arc$$1.centroid(centroid);
  if (innerRadius) arc$$1.innerRadius(innerRadius);
  if (outerRadius) arc$$1.outerRadius(outerRadius);
  if (cornerRadius) arc$$1.cornerRadius(cornerRadius);
  if (startAngle) arc$$1.startAngle(startAngle);
  if (endAngle) arc$$1.endAngle(endAngle);
  if (padAngle) arc$$1.padAngle(padAngle);
  if (padRadius) arc$$1.padRadius(padRadius);
  return React.createElement('path', _extends({ className: cx('vx-arc', className), d: arc$$1(data) }, additionalProps(restProps, data)));
}

function Pie(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$top = _ref.top,
      top = _ref$top === undefined ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === undefined ? 0 : _ref$left,
      data = _ref.data,
      centroid = _ref.centroid,
      _ref$innerRadius = _ref.innerRadius,
      innerRadius = _ref$innerRadius === undefined ? 0 : _ref$innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      _ref$startAngle = _ref.startAngle,
      startAngle = _ref$startAngle === undefined ? 0 : _ref$startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius,
      pieSort = _ref.pieSort,
      pieSortValues = _ref.pieSortValues,
      pieValue = _ref.pieValue,
      children = _ref.children,
      restProps = objectWithoutProperties(_ref, ['className', 'top', 'left', 'data', 'centroid', 'innerRadius', 'outerRadius', 'cornerRadius', 'startAngle', 'endAngle', 'padAngle', 'padRadius', 'pieSort', 'pieSortValues', 'pieValue', 'children']);

  var path$$1 = arc();
  path$$1.innerRadius(innerRadius);
  if (outerRadius) path$$1.outerRadius(outerRadius);
  if (cornerRadius) path$$1.cornerRadius(cornerRadius);
  if (padRadius) path$$1.padRadius(padRadius);
  var pie$$1 = pie();
  if (pieSort !== undefined) pie$$1.sort(pieSort);
  if (pieSortValues !== undefined) pie$$1.sortValues(pieSortValues);
  if (pieValue) pie$$1.value(pieValue);
  if (padAngle != null) pie$$1.padAngle(padAngle);
  if (startAngle != null) pie$$1.startAngle(startAngle);
  if (endAngle != null) pie$$1.endAngle(endAngle);
  var arcs = pie$$1(data);
  var renderFunctionArg = {
    arcs: arcs,
    generatePathProps: function generatePathProps(arc$$1, index) {
      return _extends({
        className: cx('vx-pie-arc', className),
        d: path$$1(arc$$1)
      }, additionalProps(restProps, _extends({}, arc$$1, {
        index: index,
        centroid: centroid ? path$$1.centroid(arc$$1) : undefined
      })));
    },
    generateCentroid: function generateCentroid(arc$$1) {
      return centroid && centroid(path$$1.centroid(arc$$1), arc$$1);
    }
  };
  return React.createElement(
    Group,
    { className: 'vx-pie-arcs-group', top: top, left: left },
    children ? children(renderFunctionArg) : arcs.map(function (arc$$1, i) {
      var pathProps = renderFunctionArg.generatePathProps(arc$$1, i);
      return React.createElement(
        'g',
        { key: 'pie-arc-' + i },
        React.createElement('path', pathProps),
        renderFunctionArg.generateCentroid(arc$$1)
      );
    })
  );
}

Line.propTypes = {
  innerRef: PropTypes.func
};

function Line(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === undefined ? new Point({ x: 0, y: 0 }) : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === undefined ? new Point({ x: 1, y: 1 }) : _ref$to,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 1 : _ref$strokeWidth,
      _ref$strokeDasharray = _ref.strokeDasharray,
      strokeDasharray = _ref$strokeDasharray === undefined ? '' : _ref$strokeDasharray,
      _ref$transform = _ref.transform,
      transform = _ref$transform === undefined ? '' : _ref$transform,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      data = _ref.data,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, ['from', 'to', 'stroke', 'strokeWidth', 'strokeDasharray', 'transform', 'className', 'data', 'innerRef']);

  return React.createElement('line', _extends({
    ref: innerRef,
    className: cx('vx-line', className),
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    transform: transform
  }, additionalProps(restProps, data)));
}

LinePath.propTypes = {
  innerRef: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  data: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func,
  defined: PropTypes.func,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  glyph: PropTypes.func,
  curve: PropTypes.func
};

function LinePath(_ref) {
  var children = _ref.children,
      data = _ref.data,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      x = _ref.x,
      y = _ref.y,
      _ref$defined = _ref.defined,
      defined = _ref$defined === undefined ? function () {
    return true;
  } : _ref$defined,
      className = _ref.className,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'steelblue' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$strokeDasharray = _ref.strokeDasharray,
      strokeDasharray = _ref$strokeDasharray === undefined ? '' : _ref$strokeDasharray,
      _ref$strokeDashoffset = _ref.strokeDashoffset,
      strokeDashoffset = _ref$strokeDashoffset === undefined ? 0 : _ref$strokeDashoffset,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'none' : _ref$fill,
      _ref$curve = _ref.curve,
      curve = _ref$curve === undefined ? curveLinear : _ref$curve,
      glyph = _ref.glyph,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, ['children', 'data', 'xScale', 'yScale', 'x', 'y', 'defined', 'className', 'stroke', 'strokeWidth', 'strokeDasharray', 'strokeDashoffset', 'fill', 'curve', 'glyph', 'innerRef']);

  var path$$1 = line().x(function () {
    return xScale(x.apply(undefined, arguments));
  }).y(function () {
    return yScale(y.apply(undefined, arguments));
  }).defined(defined).curve(curve);
  if (children) return children({ path: path$$1 });
  return React.createElement(
    'g',
    null,
    React.createElement('path', _extends({
      ref: innerRef,
      className: cx('vx-linepath', className),
      d: path$$1(data),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeDashoffset: strokeDashoffset,
      fill: fill
    }, additionalProps(restProps, data))),
    glyph && React.createElement(
      'g',
      { className: 'vx-linepath-glyphs' },
      data.map(glyph)
    )
  );
}

LineRadial.propTypes = {
  innerRef: PropTypes.func
};

function LineRadial(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      angle = _ref.angle,
      radius = _ref.radius,
      defined = _ref.defined,
      curve = _ref.curve,
      data = _ref.data,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, ['className', 'angle', 'radius', 'defined', 'curve', 'data', 'innerRef']);

  var path$$1 = radialLine();
  if (angle) path$$1.angle(angle);
  if (radius) path$$1.radius(radius);
  if (defined) path$$1.defined(defined);
  if (curve) path$$1.curve(curve);
  return React.createElement(
    'g',
    null,
    React.createElement('path', _extends({
      ref: innerRef,
      className: cx('vx-line-radial', className),
      d: path$$1(data)
    }, additionalProps(restProps, data)))
  );
}

Area.propTypes = {
  x: PropTypes.func,
  x0: PropTypes.func,
  x1: PropTypes.func,
  y: PropTypes.func,
  y0: PropTypes.func,
  y1: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  data: PropTypes.array,
  defined: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object, PropTypes.array]),
  innerRef: PropTypes.func,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  curve: PropTypes.func
};

function Area(_ref) {
  var children = _ref.children,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y = _ref.y,
      y0 = _ref.y0,
      y1 = _ref.y1,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      _ref$defined = _ref.defined,
      defined = _ref$defined === undefined ? function () {
    return true;
  } : _ref$defined,
      className = _ref.className,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'rgba(0,0,0,0.3)' : _ref$fill,
      curve = _ref.curve,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, ['children', 'x', 'x0', 'x1', 'y', 'y0', 'y1', 'xScale', 'yScale', 'data', 'defined', 'className', 'strokeDasharray', 'strokeWidth', 'stroke', 'fill', 'curve', 'innerRef']);

  var path$$1 = area();
  if (x) path$$1.x(function () {
    return xScale(x.apply(undefined, arguments));
  });
  if (x0) path$$1.x0(function () {
    return xScale(x0.apply(undefined, arguments));
  });
  if (x1) path$$1.x1(function () {
    return xScale(x1.apply(undefined, arguments));
  });
  if (y) path$$1.y(function () {
    return yScale(y.apply(undefined, arguments));
  });
  if (y0) path$$1.y0(function () {
    return yScale(y0.apply(undefined, arguments));
  });
  if (y1) path$$1.y1(function () {
    return yScale(y1.apply(undefined, arguments));
  });
  if (defined) path$$1.defined(defined);
  if (curve) path$$1.curve(curve);
  if (children) return children({ path: path$$1 });
  return React.createElement(
    'g',
    null,
    React.createElement('path', _extends({
      ref: innerRef,
      className: cx('vx-area', className),
      d: path$$1(data),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      fill: fill
    }, additionalProps(restProps, data)))
  );
}

AreaClosed.propTypes = {
  innerRef: PropTypes.func
};

function AreaClosed(_ref) {
  var x = _ref.x,
      y = _ref.y,
      y0 = _ref.y0,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      data = _ref.data,
      _ref$defined = _ref.defined,
      defined = _ref$defined === undefined ? function () {
    return true;
  } : _ref$defined,
      className = _ref.className,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? 2 : _ref$strokeWidth,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'black' : _ref$stroke,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'rgba(0,0,0,0.3)' : _ref$fill,
      curve = _ref.curve,
      innerRef = _ref.innerRef,
      restProps = objectWithoutProperties(_ref, ['x', 'y', 'y0', 'xScale', 'yScale', 'data', 'defined', 'className', 'strokeDasharray', 'strokeWidth', 'stroke', 'fill', 'curve', 'innerRef']);

  var path$$1 = area().x(function () {
    return xScale(x.apply(undefined, arguments));
  }).y0(y0 || yScale.range()[0]).y1(function () {
    return yScale(y.apply(undefined, arguments));
  }).defined(defined);
  if (curve) path$$1.curve(curve);
  return React.createElement(
    'g',
    null,
    React.createElement('path', _extends({
      ref: innerRef,
      className: cx('vx-area-closed', className),
      d: path$$1(data),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      fill: fill
    }, additionalProps(restProps, data)))
  );
}

function AreaStack(_ref) {
  var className = _ref.className,
      _ref$top = _ref.top,
      _ref$left = _ref.left,
      keys = _ref.keys,
      data = _ref.data,
      curve = _ref.curve,
      defined = _ref.defined,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1,
      glyph = _ref.glyph,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
      restProps = objectWithoutProperties(_ref, ['className', 'top', 'left', 'keys', 'data', 'curve', 'defined', 'x', 'x0', 'x1', 'y0', 'y1', 'glyph', 'reverse']);

  var stack$$1 = stack();
  if (keys) stack$$1.keys(keys);

  var path$$1 = area();
  if (x) path$$1.x(x);
  if (x0) path$$1.x0(x0);
  if (x1) path$$1.x1(x1);
  if (y0) path$$1.y0(y0);
  if (y1) path$$1.y1(y1);
  if (curve) path$$1.curve(curve);
  if (defined) path$$1.defined(defined);

  var seriesData = stack$$1(data);
  if (reverse) seriesData.reverse();

  return React.createElement(
    'g',
    null,
    seriesData.map(function (series, i) {
      return React.createElement('path', _extends({
        className: cx('vx-area-stack', className),
        key: 'area-stack-' + i + '-' + (series.key || ''),
        d: path$$1(series)
      }, additionalProps(restProps, {
        datum: series[i],
        index: i,
        series: series
      })));
    }),
    !!glyph && React.createElement(
      'g',
      { className: 'vx-area-stack-glyphs' },
      data.map(glyph)
    )
  );
}

Bar.propTypes = {
  innerRef: PropTypes.func
};

function Bar(_ref) {
  var className = _ref.className,
      innerRef = _ref.innerRef,
      data = _ref.data,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      width = _ref.width,
      height = _ref.height,
      rx = _ref.rx,
      ry = _ref.ry,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'steelblue' : _ref$fill,
      fillOpacity = _ref.fillOpacity,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      strokeLinejoin = _ref.strokeLinejoin,
      strokeMiterlimit = _ref.strokeMiterlimit,
      strokeOpacity = _ref.strokeOpacity,
      restProps = objectWithoutProperties(_ref, ['className', 'innerRef', 'data', 'x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'fillOpacity', 'stroke', 'strokeWidth', 'strokeDasharray', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit', 'strokeOpacity']);

  return React.createElement('rect', _extends({
    ref: innerRef,
    className: cx('vx-bar', className),
    x: x,
    y: y,
    width: width,
    height: height,
    rx: rx,
    ry: ry,
    fill: fill,
    fillOpacity: fillOpacity,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    strokeLinejoin: strokeLinejoin,
    strokeMiterlimit: strokeMiterlimit,
    strokeOpacity: strokeOpacity
  }, additionalProps(restProps, data)));
}

function BarGroup(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x0 = _ref.x0,
      x0Scale = _ref.x0Scale,
      x1Scale = _ref.x1Scale,
      yScale = _ref.yScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      height = _ref.height,
      restProps = objectWithoutProperties(_ref, ['data', 'className', 'top', 'left', 'x0', 'x0Scale', 'x1Scale', 'yScale', 'zScale', 'keys', 'height']);

  var format = x0Scale.tickFormat ? x0Scale.tickFormat() : function (d) {
    return d;
  };
  return React.createElement(
    Group,
    { className: cx('vx-bar-group', className), top: top, left: left },
    data && data.map(function (d, i) {
      return React.createElement(
        Group,
        { key: 'bar-group-' + i + '-' + x0(d), left: x0Scale(x0(d)) },
        keys && keys.map(function (key, i) {
          var value = d[key];
          return React.createElement(Bar, _extends({
            key: 'bar-group-bar-' + i + '-' + value + '-' + key,
            x: x1Scale(key),
            y: yScale(value),
            width: x1Scale.bandwidth(),
            height: height - yScale(value),
            fill: zScale(key),
            data: {
              key: key,
              value: value,
              x: format(x0(d)),
              data: d
            }
          }, restProps));
        })
      );
    })
  );
}

BarGroup.propTypes = {
  data: PropTypes.array.isRequired,
  x0: PropTypes.func.isRequired,
  x0Scale: PropTypes.func.isRequired,
  x1Scale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};

function BarGroupHorizontal(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      y0 = _ref.y0,
      y0Scale = _ref.y0Scale,
      y1Scale = _ref.y1Scale,
      xScale = _ref.xScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      width = _ref.width,
      restProps = objectWithoutProperties(_ref, ['data', 'className', 'top', 'left', 'y0', 'y0Scale', 'y1Scale', 'xScale', 'zScale', 'keys', 'width']);

  var format = y0Scale.tickFormat ? y0Scale.tickFormat() : function (d) {
    return d;
  };
  return React.createElement(
    Group,
    { className: cx('vx-bar-group-horizontal', className), top: top, left: left },
    data && data.map(function (d, i) {
      return React.createElement(
        Group,
        { key: 'bar-group-' + i + '-' + y0(d), top: y0Scale(y0(d)) },
        keys && keys.map(function (key, i) {
          var value = d[key];
          return React.createElement(Bar, _extends({
            key: 'bar-group-bar-' + i + '-' + value + '-' + key,
            x: 0,
            y: y1Scale(key),
            width: width - xScale(value),
            height: y1Scale.bandwidth(),
            fill: zScale(key),
            data: {
              key: key,
              value: value,
              y: format(y0(d)),
              data: d
            }
          }, restProps));
        })
      );
    })
  );
}

BarGroupHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y0: PropTypes.func.isRequired,
  y0Scale: PropTypes.func.isRequired,
  y1Scale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};

function BarStack(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x = _ref.x,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      height = _ref.height,
      restProps = objectWithoutProperties(_ref, ['data', 'className', 'top', 'left', 'x', 'xScale', 'yScale', 'zScale', 'keys', 'height']);

  var series = stack().keys(keys)(data);
  var format = xScale.tickFormat ? xScale.tickFormat() : function (d) {
    return d;
  };
  var bandwidth = xScale.bandwidth();
  var step = xScale.step();
  var paddingInner = xScale.paddingInner();
  var paddingOuter = xScale.paddingOuter();
  return React.createElement(
    Group,
    { className: cx('vx-bar-stack', className), top: top, left: left },
    series && series.map(function (s, i) {
      return React.createElement(
        Group,
        { key: 'vx-bar-stack-' + i },
        s.map(function (d, ii) {
          var barHeight = yScale(d[0]) - yScale(d[1]);
          return React.createElement(Bar, _extends({
            key: 'bar-group-bar-' + i + '-' + ii + '-' + s.key,
            x: xScale(x(d.data)),
            y: yScale(d[1]),
            width: bandwidth,
            height: barHeight,
            fill: zScale(s.key),
            data: {
              bandwidth: bandwidth,
              paddingInner: paddingInner,
              paddingOuter: paddingOuter,
              step: step,
              key: s.key,
              value: d[1],
              height: barHeight,
              width: bandwidth,
              x: x(d.data),
              xFormatted: format(x(d.data)),
              data: d.data
            }
          }, restProps));
        })
      );
    })
  );
}

BarStack.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};

function BarStackHorizontal(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      y = _ref.y,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      zScale = _ref.zScale,
      keys = _ref.keys,
      height = _ref.height,
      restProps = objectWithoutProperties(_ref, ['data', 'className', 'top', 'left', 'y', 'xScale', 'yScale', 'zScale', 'keys', 'height']);

  var series = stack().keys(keys)(data);
  var format = yScale.tickFormat ? yScale.tickFormat() : function (d) {
    return d;
  };
  var bandwidth = yScale.bandwidth();
  var step = yScale.step();
  var paddingInner = yScale.paddingInner();
  var paddingOuter = yScale.paddingOuter();
  return React.createElement(
    Group,
    { className: cx('vx-bar-stack-horizontal', className), top: top, left: left },
    series && series.map(function (s, i) {
      return React.createElement(
        Group,
        { key: 'vx-bar-stack-horizontal-' + i },
        s.map(function (d, ii) {
          var barWidth = xScale(d[1]) - xScale(d[0]);
          return React.createElement(Bar, _extends({
            key: 'bar-group-bar-' + i + '-' + ii + '-' + s.key,
            x: xScale(d[0]),
            y: yScale(y(d.data)),
            width: barWidth,
            height: bandwidth,
            fill: zScale(s.key),
            data: {
              bandwidth: bandwidth,
              paddingInner: paddingInner,
              paddingOuter: paddingOuter,
              step: step,
              key: s.key,
              value: d[0],
              height: bandwidth,
              width: barWidth,
              y: y(d.data),
              yFormatted: format(y(d.data)),
              data: d.data
            }
          }, restProps));
        })
      );
    })
  );
}

BarStackHorizontal.propTypes = {
  data: PropTypes.array.isRequired,
  y: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number
};

var STACK_ORDERS = {
  ascending: stackOrderAscending,
  descending: stackOrderDescending,
  insideout: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse
};

var STACK_ORDER_NAMES = Object.keys(STACK_ORDERS);

function stackOrder(order) {
  return STACK_ORDERS[order] || STACK_ORDERS.none;
}

var STACK_OFFSETS = {
  expand: stackOffsetExpand,
  diverging: stackOffsetDiverging,
  none: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle
};

var STACK_OFFSET_NAMES = Object.keys(STACK_OFFSETS);

function stackOffset(offset) {
  return STACK_OFFSETS[offset] || STACK_OFFSETS.none;
}

function Stack(_ref) {
  var className = _ref.className,
      _ref$top = _ref.top,
      top = _ref$top === undefined ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === undefined ? 0 : _ref$left,
      keys = _ref.keys,
      data = _ref.data,
      curve = _ref.curve,
      defined = _ref.defined,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      render = _ref.render,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
      restProps = objectWithoutProperties(_ref, ['className', 'top', 'left', 'keys', 'data', 'curve', 'defined', 'x', 'x0', 'x1', 'y0', 'y1', 'value', 'order', 'offset', 'render', 'reverse']);

  var stack$$1 = stack();
  if (keys) stack$$1.keys(keys);
  if (value) stack$$1.value(value);
  if (order) stack$$1.order(stackOrder(order));
  if (offset) stack$$1.offset(stackOffset(offset));

  var path$$1 = area();
  if (x) path$$1.x(x);
  if (x0) path$$1.x0(x0);
  if (x1) path$$1.x1(x1);
  if (y0) path$$1.y0(y0);
  if (y1) path$$1.y1(y1);
  if (curve) path$$1.curve(curve);
  if (defined) path$$1.defined(defined);

  var seriesData = stack$$1(data);
  if (reverse) seriesData.reverse();

  if (render) return React.createElement(
    Group,
    { top: top, left: left },
    render({ seriesData: seriesData, path: path$$1 })
  );

  return React.createElement(
    Group,
    { top: top, left: left },
    seriesData.map(function (series, i) {
      return React.createElement('path', _extends({
        className: cx('vx-stack', className),
        key: 'stack-' + i + '-' + (series.key || ''),
        d: path$$1(series)
      }, additionalProps(restProps, {
        datum: series[i],
        index: i,
        series: series
      })));
    })
  );
}

function pathHorizontalDiagonal(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

  return function (data) {
    var link = linkHorizontal();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkHorizontal.propTypes = {
  innerRef: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkHorizontal(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathHorizontalDiagonal({ source: source, target: target, x: x, y: y });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link-horizontal', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathVerticalDiagonal(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

  return function (data) {
    var link = linkVertical();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkVertical.propTypes = {
  innerRef: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkVertical(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathVerticalDiagonal({ source: source, target: target, x: x, y: y });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link-vertical', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathRadialDiagonal(_ref) {
  var source = _ref.source,
      target = _ref.target,
      angle = _ref.angle,
      radius = _ref.radius;

  return function (data) {
    var link = linkRadial();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

LinkRadial.propTypes = {
  innerRef: PropTypes.func,
  angle: PropTypes.func,
  radius: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkRadial(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$angle = _ref2.angle,
      angle = _ref2$angle === undefined ? function (d) {
    return d.x;
  } : _ref2$angle,
      _ref2$radius = _ref2.radius,
      radius = _ref2$radius === undefined ? function (d) {
    return d.y;
  } : _ref2$radius,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'angle', 'radius', 'source', 'target']);

  path$$1 = path$$1 || pathRadialDiagonal({ source: source, target: target, angle: angle, radius: radius });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link-radius', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathHorizontalCurve(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var dx = tx - sx;
    var dy = ty - sy;
    var ix = percent * (dx + dy);
    var iy = percent * (dy - dx);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path$$1.toString();
  };
}

LinkHorizontalCurve.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkHorizontalCurve(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.2 : _ref2$percent,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target', 'percent']);

  path$$1 = path$$1 || pathHorizontalCurve({ source: source, target: target, x: x, y: y, percent: percent });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathVerticalCurve(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var dx = tx - sx;
    var dy = ty - sy;
    var ix = percent * (dx + dy);
    var iy = percent * (dy - dx);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path$$1.toString();
  };
}

LinkVerticalCurve.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkVerticalCurve(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.2 : _ref2$percent,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target', 'percent']);

  path$$1 = path$$1 || pathVerticalCurve({ source: source, target: target, x: x, y: y, percent: percent });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathRadialCurve(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sa = x(sourceData) - Math.PI / 2;
    var sr = y(sourceData);
    var ta = x(targetData) - Math.PI / 2;
    var tr = y(targetData);

    var sc = Math.cos(sa);
    var ss = Math.sin(sa);
    var tc = Math.cos(ta);
    var ts = Math.sin(ta);

    var sx = sr * sc;
    var sy = sr * ss;
    var tx = tr * tc;
    var ty = tr * ts;

    var dx = tx - sx;
    var dy = ty - sy;
    var ix = percent * (dx + dy);
    var iy = percent * (dy - dx);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path$$1.toString();
  };
}

LinkRadialCurve.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkRadialCurve(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.2 : _ref2$percent,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target', 'percent']);

  path$$1 = path$$1 || pathRadialCurve({ source: source, target: target, x: x, y: y, percent: percent });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathHorizontalLine(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.lineTo(tx, ty);

    return path$$1.toString();
  };
}

LinkHorizontalLine.propTypes = {
  innerRef: PropTypes.func,
  path: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func
};

function LinkHorizontalLine(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathHorizontalLine({ source: source, target: target, x: x, y: y });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathVerticalLine(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.lineTo(tx, ty);

    return path$$1.toString();
  };
}

LinkVerticalLine.propTypes = {
  innerRef: PropTypes.func,
  path: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func
};

function LinkVerticalLine(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathVerticalLine({ source: source, target: target, x: x, y: y });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathRadialLine(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sa = x(sourceData) - Math.PI / 2;
    var sr = y(sourceData);
    var ta = x(targetData) - Math.PI / 2;
    var tr = y(targetData);

    var sc = Math.cos(sa);
    var ss = Math.sin(sa);
    var tc = Math.cos(ta);
    var ts = Math.sin(ta);

    var path$$1 = path();
    path$$1.moveTo(sr * sc, sr * ss);
    path$$1.lineTo(tr * tc, tr * ts);

    return path$$1.toString();
  };
}

LinkRadialStep.propTypes = {
  innerRef: PropTypes.func,
  path: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func
};

function LinkRadialStep(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathRadialLine({ source: source, target: target, x: x, y: y });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathHorizontalStep(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.lineTo(sx + (tx - sx) * percent, sy);
    path$$1.lineTo(sx + (tx - sx) * percent, ty);
    path$$1.lineTo(tx, ty);

    return path$$1.toString();
  };
}

LinkHorizontalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkHorizontalStep(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.5 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'percent', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathHorizontalStep({ source: source, target: target, x: x, y: y, percent: percent });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathVerticalStep(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var path$$1 = path();
    path$$1.moveTo(sx, sy);
    path$$1.lineTo(sx, sy + (ty - sy) * percent);
    path$$1.lineTo(tx, sy + (ty - sy) * percent);
    path$$1.lineTo(tx, ty);

    return path$$1.toString();
  };
}

LinkVerticalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkVerticalStep(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === undefined ? 0.5 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'percent', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathVerticalStep({ source: source, target: target, x: x, y: y, percent: percent });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

function pathRadialStep(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;

  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);

    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);

    var sa = sx - Math.PI / 2;
    var sr = sy;
    var ta = tx - Math.PI / 2;
    var tr = ty;

    var sc = Math.cos(sa);
    var ss = Math.sin(sa);
    var tc = Math.cos(ta);
    var ts = Math.sin(ta);
    var sf = Math.abs(ta - sa) > Math.PI ? ta <= sa : ta > sa;

    return '\n      M' + sr * sc + ',' + sr * ss + '\n      A' + sr + ',' + sr + ',0,0,' + (sf ? 1 : 0) + ',' + sr * tc + ',' + sr * ts + '\n      L' + tr * tc + ',' + tr * ts + '\n    ';
  };
}

LinkRadialStep$1.propTypes = {
  innerRef: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

function LinkRadialStep$1(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path$$1 = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === undefined ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === undefined ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === undefined ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === undefined ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = objectWithoutProperties(_ref2, ['className', 'innerRef', 'data', 'path', 'x', 'y', 'source', 'target']);

  path$$1 = path$$1 || pathRadialStep({ source: source, target: target, x: x, y: y });
  return React.createElement('path', _extends({
    ref: innerRef,
    className: cx('vx-link', className),
    d: path$$1(data)
  }, additionalProps(restProps, data)));
}

export { Arc, Pie, Line, LinePath, LineRadial, Area, AreaClosed, AreaStack, Bar, BarGroup, BarGroupHorizontal, BarStack, BarStackHorizontal, Stack, callOrValue, stackOffset, STACK_OFFSETS, STACK_OFFSET_NAMES, stackOrder, STACK_ORDERS, STACK_ORDER_NAMES, LinkHorizontal, pathHorizontalDiagonal, LinkVertical, pathVerticalDiagonal, LinkRadial, pathRadialDiagonal, LinkHorizontalCurve, pathHorizontalCurve, LinkVerticalCurve, pathVerticalCurve, LinkRadialCurve, pathRadialCurve, LinkHorizontalLine, pathHorizontalLine, LinkVerticalLine, pathVerticalLine, LinkRadialStep as LinkRadialLine, pathRadialLine, LinkHorizontalStep, pathHorizontalStep, LinkVerticalStep, pathVerticalStep, LinkRadialStep$1 as LinkRadialStep, pathRadialStep };
