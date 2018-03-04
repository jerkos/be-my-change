webpackHotUpdate_name_(0,{

/***/ 76:
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./src/actions/actionInfoSlider/actionInfoSlider.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.ActionInfo = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _simpledomComponent = __webpack_require__(/*! simpledom-component */ 1);\n\nvar SimpleDom = _interopRequireWildcard(_simpledomComponent);\n\n__webpack_require__(/*! ./actionInfoSlider.less */ 78);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar JournalEntries = function (_SimpleDom$Component) {\n    _inherits(JournalEntries, _SimpleDom$Component);\n\n    function JournalEntries() {\n        _classCallCheck(this, JournalEntries);\n\n        return _possibleConstructorReturn(this, (JournalEntries.__proto__ || Object.getPrototypeOf(JournalEntries)).apply(this, arguments));\n    }\n\n    _createClass(JournalEntries, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['JOURNAL_ENTRIES_TO_REFRESH'];\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return SimpleDom.el(\n                'div',\n                { 'class': 'action-info-journal' },\n                SimpleDom.el(\n                    'ul',\n                    { 'class': 'action-info-journal-list' },\n                    this.props.entries.map(function (entry) {\n                        return SimpleDom.el(\n                            'li',\n                            null,\n                            entry.content\n                        );\n                    })\n                ),\n                SimpleDom.el(\n                    'a',\n                    { 'class': 'hbtn hbtn-action' },\n                    '+'\n                )\n            );\n        }\n    }]);\n\n    return JournalEntries;\n}(SimpleDom.Component);\n\nvar ActionInfo = exports.ActionInfo = function (_SimpleDom$Component2) {\n    _inherits(ActionInfo, _SimpleDom$Component2);\n\n    function ActionInfo(props, store) {\n        _classCallCheck(this, ActionInfo);\n\n        var _this2 = _possibleConstructorReturn(this, (ActionInfo.__proto__ || Object.getPrototypeOf(ActionInfo)).call(this, props, store));\n\n        _this2.userAction = _this2.props.userAction;\n        _this2.action = _this2.userAction.action;\n        _this2.journalEntries = _this2.props.journalEntries;\n        _this2.editDescription = false;\n        return _this2;\n    }\n\n    _createClass(ActionInfo, [{\n        key: 'render',\n        value: function render() {\n            var _this3 = this;\n\n            return SimpleDom.el(\n                'div',\n                { 'class': 'action-info' },\n                SimpleDom.el(\n                    'h4',\n                    { 'class': 'action-info-title' },\n                    this.action.title\n                ),\n                SimpleDom.el(\n                    'h6',\n                    { 'class': 'action-info-subtitle' },\n                    'Description'\n                ),\n                SimpleDom.predicate(this.editDescription, function () {\n                    return SimpleDom.el(\n                        'textarea',\n                        { 'class': 'action-info-editor' },\n                        _this3.action.description\n                    );\n                }, function () {\n                    return SimpleDom.el(\n                        'p',\n                        { 'class': 'action-info-description' },\n                        _this3.action.description\n                    );\n                }),\n                SimpleDom.el(\n                    'h6',\n                    { 'class': 'action-info-subtitle' },\n                    'Journal'\n                ),\n                SimpleDom.el(JournalEntries, {\n                    entries: this.journalEntries\n                })\n            );\n        }\n    }]);\n\n    return ActionInfo;\n}(SimpleDom.Component);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FjdGlvbnMvYWN0aW9uSW5mb1NsaWRlci9hY3Rpb25JbmZvU2xpZGVyLmpzPzIzYzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2ltcGxlRG9tIGZyb20gJ3NpbXBsZWRvbS1jb21wb25lbnQnO1xuaW1wb3J0ICcuL2FjdGlvbkluZm9TbGlkZXIubGVzcyc7XG5cbmNsYXNzIEpvdXJuYWxFbnRyaWVzIGV4dGVuZHMgU2ltcGxlRG9tLkNvbXBvbmVudCB7XG4gICAgZXZlbnRzVG9TdWJzY3JpYmUoKSB7XG4gICAgICAgIHJldHVybiBbJ0pPVVJOQUxfRU5UUklFU19UT19SRUZSRVNIJ107XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1pbmZvLWpvdXJuYWxcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImFjdGlvbi1pbmZvLWpvdXJuYWwtbGlzdFwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmVudHJpZXMubWFwKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT57ZW50cnkuY29udGVudH08L2xpPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImhidG4gaGJ0bi1hY3Rpb25cIj4rPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uSW5mbyBleHRlbmRzIFNpbXBsZURvbS5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBzdG9yZSkge1xuICAgICAgICBzdXBlcihwcm9wcywgc3RvcmUpO1xuICAgICAgICB0aGlzLnVzZXJBY3Rpb24gPSB0aGlzLnByb3BzLnVzZXJBY3Rpb247XG4gICAgICAgIHRoaXMuYWN0aW9uID0gdGhpcy51c2VyQWN0aW9uLmFjdGlvbjtcbiAgICAgICAgdGhpcy5qb3VybmFsRW50cmllcyA9IHRoaXMucHJvcHMuam91cm5hbEVudHJpZXM7XG4gICAgICAgIHRoaXMuZWRpdERlc2NyaXB0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24taW5mb1wiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImFjdGlvbi1pbmZvLXRpdGxlXCI+e3RoaXMuYWN0aW9uLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICAgICAgPGg2IGNsYXNzPVwiYWN0aW9uLWluZm8tc3VidGl0bGVcIj5EZXNjcmlwdGlvbjwvaDY+XG4gICAgICAgICAgICAgICAge1NpbXBsZURvbS5wcmVkaWNhdGUodGhpcy5lZGl0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IDx0ZXh0YXJlYSBjbGFzcz1cImFjdGlvbi1pbmZvLWVkaXRvclwiPnt0aGlzLmFjdGlvbi5kZXNjcmlwdGlvbn08L3RleHRhcmVhPixcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gPHAgY2xhc3M9XCJhY3Rpb24taW5mby1kZXNjcmlwdGlvblwiPnt0aGlzLmFjdGlvbi5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8aDYgY2xhc3M9XCJhY3Rpb24taW5mby1zdWJ0aXRsZVwiPkpvdXJuYWw8L2g2PlxuICAgICAgICAgICAgICAgIDxKb3VybmFsRW50cmllc1xuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzPXt0aGlzLmpvdXJuYWxFbnRyaWVzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hY3Rpb25zL2FjdGlvbkluZm9TbGlkZXIvYWN0aW9uSW5mb1NsaWRlci5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFMQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFSQTtBQVdBOzs7O0FBbEJBO0FBQ0E7QUFvQkE7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTs7O0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFSQTtBQWFBOzs7O0FBdkJBIiwic291cmNlUm9vdCI6IiJ9");

/***/ })

})