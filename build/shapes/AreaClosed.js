'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = AreaClosed;

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

AreaClosed.propTypes = {
  innerRef: _propTypes2.default.func
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
      restProps = _objectWithoutProperties(_ref, ['x', 'y', 'y0', 'xScale', 'yScale', 'data', 'defined', 'className', 'strokeDasharray', 'strokeWidth', 'stroke', 'fill', 'curve', 'innerRef']);

  var path = (0, _d3Shape.area)().x(function () {
    return xScale(x.apply(undefined, arguments));
  }).y0(y0 || yScale.range()[0]).y1(function () {
    return yScale(y.apply(undefined, arguments));
  }).defined(defined);
  if (curve) path.curve(curve);
  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('path', _extends({
      ref: innerRef,
      className: (0, _classnames2.default)('vx-area-closed', className),
      d: path(data),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      fill: fill
    }, (0, _additionalProps2.default)(restProps, data)))
  );
}