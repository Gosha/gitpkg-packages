"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _browserLang = _interopRequireDefault(require("browser-lang"));

var _gatsby = require("gatsby");

var _reactIntl = require("react-intl");

var _intlContext = require("./intl-context");

var preferDefault = function preferDefault(m) {
  return m && m.default || m;
};

var polyfillIntl = function polyfillIntl(language) {
  var locale = language.split("-")[0];

  try {
    if (!Intl.PluralRules) {
      require("@formatjs/intl-pluralrules/polyfill");

      require("@formatjs/intl-pluralrules/dist/locale-data/" + locale);
    }

    if (!Intl.RelativeTimeFormat) {
      require("@formatjs/intl-relativetimeformat/polyfill");

      require("@formatjs/intl-relativetimeformat/dist/locale-data/" + locale);
    }
  } catch (e) {
    throw new Error("Cannot find react-intl/locale-data/" + language);
  }
};

var withIntlProvider = function withIntlProvider(intl) {
  return function (children) {
    polyfillIntl(intl.language);
    return /*#__PURE__*/_react.default.createElement(_reactIntl.IntlProvider, {
      locale: intl.language,
      defaultLocale: intl.defaultLanguage,
      messages: intl.messages
    }, /*#__PURE__*/_react.default.createElement(_intlContext.IntlContextProvider, {
      value: intl
    }, children));
  };
};

var _default = function _default(_ref, pluginOptions) {
  var element = _ref.element,
      props = _ref.props;

  if (!props) {
    return;
  }

  var pageContext = props.pageContext,
      location = props.location;
  var defaultLanguage = pluginOptions.defaultLanguage;
  var intl = pageContext.intl;
  var language = intl.language,
      languages = intl.languages,
      redirect = intl.redirect,
      routed = intl.routed,
      originalPath = intl.originalPath;

  if (typeof window !== "undefined") {
    window.___gatsbyIntl = intl;
  }
  /* eslint-disable no-undef */


  var isRedirect = redirect && !routed;

  if (isRedirect) {
    var search = location.search; // Skip build, Browsers only

    if (typeof window !== "undefined") {
      var detected = window.localStorage.getItem("gatsby-intl-language") || (0, _browserLang.default)({
        languages: languages,
        fallback: language
      });

      if (!languages.includes(detected)) {
        detected = language;
      }

      var queryParams = search || "";
      var newUrl = (0, _gatsby.withPrefix)("/" + detected + originalPath + queryParams);
      window.localStorage.setItem("gatsby-intl-language", detected);
      window.location.replace(newUrl);
    }
  }

  var renderElement = isRedirect ? GATSBY_INTL_REDIRECT_COMPONENT_PATH && _react.default.createElement(preferDefault(require(GATSBY_INTL_REDIRECT_COMPONENT_PATH))) : element;
  return withIntlProvider(intl)(renderElement);
};

exports.default = _default;