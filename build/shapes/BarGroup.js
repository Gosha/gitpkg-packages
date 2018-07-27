'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BarGroup;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _group = require('@vx/group');

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _additionalProps = require('../util/additionalProps');

var _additionalProps2 = _interopRequireDefault(_additionalProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      restProps = _objectWithoutProperties(_ref, ['data', 'className', 'top', 'left', 'x0', 'x0Scale', 'x1Scale', 'yScale', 'zScale', 'keys', 'height']);

  var format = x0Scale.tickFormat ? x0Scale.tickFormat() : function (d) {
    return d;
  };
  return _react2.default.createElement(
    _group.Group,
    { className: (0, _classnames2.default)('vx-bar-group', className), top: top, left: left },
    data && data.map(function (d, i) {
      return _react2.default.createElement(
        _group.Group,
        { key: 'bar-group-' + i + '-' + x0(d), left: x0Scale(x0(d)) },
        keys && keys.map(function (key, i) {
          var value = d[key];
          return _react2.default.createElement(_Bar2.default, _extends({
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
  data: _propTypes2.default.array.isRequired,
  x0: _propTypes2.default.func.isRequired,
  x0Scale: _propTypes2.default.func.isRequired,
  x1Scale: _propTypes2.default.func.isRequired,
  yScale: _propTypes2.default.func.isRequired,
  zScale: _propTypes2.default.func.isRequired,
  keys: _propTypes2.default.array.isRequired,
  height: _propTypes2.default.number.isRequired,
  className: _propTypes2.default.string,
  top: _propTypes2.default.number,
  left: _propTypes2.default.number
};