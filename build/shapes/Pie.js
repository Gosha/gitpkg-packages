'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pie;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _group = require('@vx/group');

var _d3Shape = require('d3-shape');

var _additionalProps = require('../util/additionalProps');

var _additionalProps2 = _interopRequireDefault(_additionalProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      restProps = _objectWithoutProperties(_ref, ['className', 'top', 'left', 'data', 'centroid', 'innerRadius', 'outerRadius', 'cornerRadius', 'startAngle', 'endAngle', 'padAngle', 'padRadius', 'pieSort', 'pieSortValues', 'pieValue', 'children']);

  var path = (0, _d3Shape.arc)();
  path.innerRadius(innerRadius);
  if (outerRadius) path.outerRadius(outerRadius);
  if (cornerRadius) path.cornerRadius(cornerRadius);
  if (padRadius) path.padRadius(padRadius);
  var pie = (0, _d3Shape.pie)();
  if (pieSort !== undefined) pie.sort(pieSort);
  if (pieSortValues !== undefined) pie.sortValues(pieSortValues);
  if (pieValue) pie.value(pieValue);
  if (padAngle != null) pie.padAngle(padAngle);
  if (startAngle != null) pie.startAngle(startAngle);
  if (endAngle != null) pie.endAngle(endAngle);
  var arcs = pie(data);
  var renderFunctionArg = {
    arcs: arcs,
    generatePathProps: function generatePathProps(arc, index) {
      return _extends({
        className: (0, _classnames2.default)('vx-pie-arc', className),
        d: path(arc)
      }, (0, _additionalProps2.default)(restProps, _extends({}, arc, {
        index: index,
        centroid: centroid ? path.centroid(arc) : undefined
      })));
    },
    generateCentroid: function generateCentroid(arc) {
      return centroid && centroid(path.centroid(arc), arc);
    }
  };
  return _react2.default.createElement(
    _group.Group,
    { className: 'vx-pie-arcs-group', top: top, left: left },
    children ? children(renderFunctionArg) : arcs.map(function (arc, i) {
      var pathProps = renderFunctionArg.generatePathProps(arc, i);
      return _react2.default.createElement(
        'g',
        { key: 'pie-arc-' + i },
        _react2.default.createElement('path', pathProps),
        renderFunctionArg.generateCentroid(arc)
      );
    })
  );
}