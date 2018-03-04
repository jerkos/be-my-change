webpackHotUpdate_name_(0,{

/***/ 53:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/components/slider/slider.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.createSlider = createSlider;\n\n__webpack_require__(/*! ../../home */ 3);\n\nvar _simpledomComponent = __webpack_require__(/*! simpledom-component */ 1);\n\nvar SimpleDom = _interopRequireWildcard(_simpledomComponent);\n\n__webpack_require__(/*! ./slider.less */ 66);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction createSlider(title, node, e) {\n    if (!document.getElementById('slide-out-actions')) {\n        var slideContainer = document.createElement('div');\n        slideContainer.id = \"slide-out-actions\";\n        slideContainer.classList.add('side-nav');\n        document.body.appendChild(slideContainer);\n    }\n    var slideStore = new SimpleDom.Store();\n    $(e.target).attr('data-activates', 'slide-out-actions');\n    $(e.target).sideNav({\n        menuWidth: 700, // Default is 300\n        edge: 'right', // Choose the horizontal origin\n        closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor\n        draggable: true, // Choose whether you can drag to open on touch screens\n        onOpen: function onOpen(el) {\n            SimpleDom.renderToDom('slide-out-actions', SimpleDom.el(SlideActionInfo, {\n                title: title,\n                close: function close() {\n                    return $(e.target).sideNav('destroy');\n                },\n                node: node\n            }), slideStore);\n        }\n    });\n    $(e.target).sideNav('show');\n}\n\nvar SlideActionInfo = function (_SimpleDom$Component) {\n    _inherits(SlideActionInfo, _SimpleDom$Component);\n\n    function SlideActionInfo() {\n        _classCallCheck(this, SlideActionInfo);\n\n        return _possibleConstructorReturn(this, (SlideActionInfo.__proto__ || Object.getPrototypeOf(SlideActionInfo)).apply(this, arguments));\n    }\n\n    _createClass(SlideActionInfo, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['SLIDE_TO_UPDATE'];\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return SimpleDom.el(\n                'div',\n                { 'class': 'slider' },\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'row' },\n                    SimpleDom.el('span', { 'class': 'lnr lnr-cross fa-3x slider-cross',\n                        onclick: this.props.close\n                    })\n                ),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'row' },\n                    SimpleDom.el(\n                        'p',\n                        { style: 'text-align: center; font-weight: bold; font-size: 20px, text-transform: uppercase;' },\n                        this.props.title\n                    )\n                ),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'row' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'col s12' },\n                        this.props.node\n                    )\n                )\n            );\n        }\n    }]);\n\n    return SlideActionInfo;\n}(SimpleDom.Component);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcz8xOWY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vaG9tZSc7XG5pbXBvcnQgKiBhcyBTaW1wbGVEb20gZnJvbSAnc2ltcGxlZG9tLWNvbXBvbmVudCc7XG5pbXBvcnQgJy4vc2xpZGVyLmxlc3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2xpZGVyKHRpdGxlLCBub2RlLCBlKSB7XG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGUtb3V0LWFjdGlvbnMnKSkge1xuICAgICAgICBsZXQgc2xpZGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2xpZGVDb250YWluZXIuaWQgPSBcInNsaWRlLW91dC1hY3Rpb25zXCI7XG4gICAgICAgIHNsaWRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVDb250YWluZXIpO1xuICAgIH1cbiAgICBjb25zdCBzbGlkZVN0b3JlID0gbmV3IFNpbXBsZURvbS5TdG9yZSgpO1xuICAgICQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYWN0aXZhdGVzJywgJ3NsaWRlLW91dC1hY3Rpb25zJyk7XG4gICAgJChlLnRhcmdldCkuc2lkZU5hdih7XG4gICAgICAgIG1lbnVXaWR0aDogNzAwLCAvLyBEZWZhdWx0IGlzIDMwMFxuICAgICAgICBlZGdlOiAncmlnaHQnLCAvLyBDaG9vc2UgdGhlIGhvcml6b250YWwgb3JpZ2luXG4gICAgICAgIGNsb3NlT25DbGljazogZmFsc2UsIC8vIENsb3NlcyBzaWRlLW5hdiBvbiA8YT4gY2xpY2tzLCB1c2VmdWwgZm9yIEFuZ3VsYXIvTWV0ZW9yXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSwgLy8gQ2hvb3NlIHdoZXRoZXIgeW91IGNhbiBkcmFnIHRvIG9wZW4gb24gdG91Y2ggc2NyZWVuc1xuICAgICAgICBvbk9wZW46IGVsID0+IHtcbiAgICAgICAgICAgIFNpbXBsZURvbS5yZW5kZXJUb0RvbShcbiAgICAgICAgICAgICAgICAnc2xpZGUtb3V0LWFjdGlvbnMnLFxuICAgICAgICAgICAgICAgIDxTbGlkZUFjdGlvbkluZm9cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgICBjbG9zZT17KCkgPT4gJChlLnRhcmdldCkuc2lkZU5hdignZGVzdHJveScpfVxuICAgICAgICAgICAgICAgICAgICBub2RlPXtub2RlfVxuICAgICAgICAgICAgICAgIC8+LFxuICAgICAgICAgICAgICAgIHNsaWRlU3RvcmVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKGUudGFyZ2V0KS5zaWRlTmF2KCdzaG93Jyk7XG59XG5cbmNsYXNzIFNsaWRlQWN0aW9uSW5mbyBleHRlbmRzIFNpbXBsZURvbS5Db21wb25lbnQge1xuXHRldmVudHNUb1N1YnNjcmliZSgpIHtcblx0XHRyZXR1cm4gWydTTElERV9UT19VUERBVEUnXTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gPGRpdiBjbGFzcz1cInNsaWRlclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInJvd1wiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImxuciBsbnItY3Jvc3MgZmEtM3ggc2xpZGVyLWNyb3NzXCJcbiAgICAgICAgICAgICAgICAgICAgb25jbGljaz17dGhpcy5wcm9wcy5jbG9zZX1cbiAgICAgICAgICAgICAgICAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwicm93XCI+XG5cdFx0XHRcdDxwIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAyMHB4LCB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1wiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgICA8L3A+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJyb3dcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbCBzMTJcIj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5ub2RlfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL3NsaWRlci9zbGlkZXIuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUE7QUFDQTtBQUxBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUhBO0FBT0E7QUFmQTtBQWlCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUFYQTtBQWlCQTs7OztBQXZCQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})