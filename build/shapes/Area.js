'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Area;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Shape = require('d3-shape');

var _additionalProps = require('../util/additionalProps');

var _additionalProps2 = _interopRequireDefault(_additionalProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

Area.propTypes = {
  x: _propTypes2.default.func,
  x0: _propTypes2.default.func,
  x1: _propTypes2.default.func,
  y: _propTypes2.default.func,
  y0: _propTypes2.default.func,
  y1: _propTypes2.default.func,
  xScale: _propTypes2.default.func,
  yScale: _propTypes2.default.func,
  data: _propTypes2.default.array,
  defined: _propTypes2.default.func,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.object, _propTypes2.default.array]),
  innerRef: _propTypes2.default.func,
  strokeDasharray: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  stroke: _propTypes2.default.string,
  fill: _propTypes2.default.string,
  curve: _propTypes2.default.func
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
      restProps = _objectWithoutProperties(_ref, ['children', 'x', 'x0', 'x1', 'y', 'y0', 'y1', 'xScale', 'yScale', 'data', 'defined', 'className', 'strokeDasharray', 'strokeWidth', 'stroke', 'fill', 'curve', 'innerRef']);

  var path = (0, _d3Shape.area)();
  if (x) path.x(function () {
    return xScale(x.apply(undefined, arguments));
  });
  if (x0) path.x0(function () {
    return xScale(x0.apply(undefined, arguments));
  });
  if (x1) path.x1(function () {
    return xScale(x1.apply(undefined, arguments));
  });
  if (y) path.y(function () {
    return yScale(y.apply(undefined, arguments));
  });
  if (y0) path.y0(function () {
    return yScale(y0.apply(undefined, arguments));
  });
  if (y1) path.y1(function () {
    return yScale(y1.apply(undefined, arguments));
  });
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return children({ path: path });
  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('path', _extends({
      ref: innerRef,
      className: (0, _classnames2.default)('vx-area', className),
      d: path(data),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      fill: fill
    }, (0, _additionalProps2.default)(restProps, data)))
  );
}