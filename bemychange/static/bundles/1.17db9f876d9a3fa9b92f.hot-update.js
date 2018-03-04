webpackHotUpdate_name_(1,{

/***/ 47:
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/actions/currentActions.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _utils = __webpack_require__(/*! ./utils */ 31);\n\nvar _simpledomComponent = __webpack_require__(/*! simpledom-component */ 1);\n\nvar SimpleDom = _interopRequireWildcard(_simpledomComponent);\n\nvar _veil = __webpack_require__(/*! ../components/veil/veil */ 5);\n\nvar _sidebarActions = __webpack_require__(/*! ./sidebarActions */ 35);\n\nvar _step = __webpack_require__(/*! ./step1 */ 34);\n\nvar _actionCard = __webpack_require__(/*! ./actionCard */ 50);\n\nvar _animejs = __webpack_require__(/*! animejs */ 49);\n\nvar _animejs2 = _interopRequireDefault(_animejs);\n\n__webpack_require__(/*! ../css/popovers.less */ 26);\n\n__webpack_require__(/*! ../css/avatar.less */ 29);\n\n__webpack_require__(/*! ./currentActions.less */ 64);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n__webpack_require__(/*! ../home */ 3);\nvar moment = __webpack_require__(/*! moment */ 2);\n__webpack_require__(/*! moment/locale/fr */ 6);\nvar flatpickr = __webpack_require__(/*! flatpickr */ 32);\nvar francese = __webpack_require__(/*! flatpickr/dist/l10n/fr.js */ 69).fr;\nflatpickr.localize(francese);\n\nvar ActionsList = function (_SimpleDom$Component) {\n    _inherits(ActionsList, _SimpleDom$Component);\n\n    _createClass(ActionsList, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['ACTIONS_LIST_TO_UPDATE'];\n        }\n    }]);\n\n    function ActionsList(props, store) {\n        _classCallCheck(this, ActionsList);\n\n        return _possibleConstructorReturn(this, (ActionsList.__proto__ || Object.getPrototypeOf(ActionsList)).call(this, props, store));\n    }\n\n    _createClass(ActionsList, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var allCallbacks = (0, _animejs2.default)({\n                targets: '.card',\n                opacity: 1,\n                delay: function delay(el, i) {\n                    return 100 + i * 100;\n                },\n                duration: function duration(el, i) {\n                    return 500 + i * 500;\n                }\n            });\n        }\n    }, {\n        key: 'partitionList',\n        value: function partitionList(input, spacing) {\n            var output = [];\n            for (var i = 0; i < input.length; i += spacing) {\n                output[output.length] = input.slice(i, i + spacing);\n            }\n            return output;\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var nbActions = this.state.minisidebar ? 4 : 3;\n            var colSize = this.state.minisidebar ? 'm3' : 'm4';\n            if (!(this.state.selectedActions || []).length) {\n                return SimpleDom.el(\n                    'section',\n                    { 'class': 'empty' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'empty-icon' },\n                        SimpleDom.el('i', { 'class': 'lnr lnr-rocket fa-3x' })\n                    ),\n                    SimpleDom.el(\n                        'h4',\n                        { 'class': 'empty-title' },\n                        'Pas d\\'action ici...'\n                    ),\n                    SimpleDom.el(\n                        'p',\n                        { 'class': 'empty-subtitle' },\n                        'Rechercher une action qui vous correspond',\n                        SimpleDom.el(\n                            'a',\n                            { href: '#createAction',\n                                onclick: function onclick() {\n                                    $('#createAction').modal({\n                                        startingTop: '2%'\n                                    });\n                                }\n                            },\n                            ' ici'\n                        ),\n                        ' !'\n                    )\n                );\n            }\n            return SimpleDom.el(\n                'div',\n                { id: 'actions-card' },\n                this.partitionList(this.state.selectedActions || [], nbActions).map(function (subactions) {\n                    return SimpleDom.el(\n                        'div',\n                        { 'class': 'row' },\n                        subactions.map(function (action) {\n                            return SimpleDom.el(\n                                'div',\n                                { 'class': 'col ' + colSize + ' s12' },\n                                SimpleDom.el(_actionCard.ActionCard, { userAction: action })\n                            );\n                        })\n                    );\n                })\n            );\n        }\n    }]);\n\n    return ActionsList;\n}(SimpleDom.Component);\n\nvar MainTitle = function (_SimpleDom$Component2) {\n    _inherits(MainTitle, _SimpleDom$Component2);\n\n    function MainTitle() {\n        _classCallCheck(this, MainTitle);\n\n        return _possibleConstructorReturn(this, (MainTitle.__proto__ || Object.getPrototypeOf(MainTitle)).apply(this, arguments));\n    }\n\n    _createClass(MainTitle, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['TITLE_TO_REFRESH'];\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return SimpleDom.el(\n                'h1',\n                { 'class': 'main-title' },\n                'Mes actions en cours (',\n                this.state.selectedActions.length,\n                ')',\n                SimpleDom.el(\n                    'a',\n                    { href: '#createAction', 'class': 'right hbtn-action hbtn-main-color add-action',\n                        onclick: function onclick() {\n                            $('#createAction').modal({\n                                startingTop: '2%'\n                            });\n                        }\n                    },\n                    SimpleDom.el(\n                        'i',\n                        { 'class': 'material-icons white-text' },\n                        'add'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return MainTitle;\n}(SimpleDom.Component);\n\nvar App = function (_SimpleDom$Component3) {\n    _inherits(App, _SimpleDom$Component3);\n\n    function App() {\n        _classCallCheck(this, App);\n\n        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));\n    }\n\n    _createClass(App, [{\n        key: 'render',\n        value: function render() {\n            var _this4 = this;\n\n            return SimpleDom.el(\n                'div',\n                { id: 'top', 'class': 'action' },\n                SimpleDom.el(\n                    'div',\n                    { id: 'createAction', 'class': 'modal', style: 'display: none' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'modal-content' },\n                        SimpleDom.el(_step.CreateAction, null)\n                    )\n                ),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'boxed-layout' },\n                    SimpleDom.el(_sidebarActions.SidebarAction, null),\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'row' },\n                        SimpleDom.el(\n                            'div',\n                            { id: 'actions', 'class': 'col s12' },\n                            SimpleDom.el(MainTitle, null),\n                            SimpleDom.el('hr', null),\n                            SimpleDom.el(\n                                'div',\n                                { 'class': 'row action-filter' },\n                                SimpleDom.el(\n                                    'div',\n                                    { 'class': 'action-date-picker input-field' },\n                                    SimpleDom.el('i', { 'class': 'lnr lnr-calendar-full prefix' }),\n                                    SimpleDom.el('input', { 'class': 'flatpicker', type: 'date' })\n                                ),\n                                SimpleDom.el(\n                                    'div',\n                                    { 'class': 'action-search input-field' },\n                                    SimpleDom.el('i', { 'class': 'lnr lnr-magnifier prefix' }),\n                                    SimpleDom.el('input', { type: 'search', onkeyup: function onkeyup(event) {\n                                            var name = event.target.value.toLowerCase();\n                                            var newSelectedActions = [];\n                                            if (!name) {\n                                                newSelectedActions = _this4.state.actions;\n                                            } else {\n                                                newSelectedActions = _this4.state.selectedActions.filter(function (userAction) {\n                                                    var parentAction = userAction.action;\n                                                    return parentAction.title.toLowerCase().includes(name) || parentAction.description.toLowerCase().includes(name);\n                                                });\n                                            }\n                                            // update sidebar\n                                            _this4.store.updateState({\n                                                selectedActions: newSelectedActions\n                                            }, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');\n                                        } })\n                                )\n                            ),\n                            SimpleDom.el(\n                                'div',\n                                { 'class': 'row' },\n                                SimpleDom.el(\n                                    'div',\n                                    { 'class': 'col s12' },\n                                    SimpleDom.el(ActionsList, null)\n                                )\n                            )\n                        )\n                    )\n                )\n            );\n        }\n    }]);\n\n    return App;\n}(SimpleDom.Component);\n\n$(document).ready(function () {\n\n    var store = new SimpleDom.Store();\n\n    store.subscribe('ACTION_VIEW_TO_UPDATE', function (state, oldState) {\n        console.log('action view to update');\n        var newSelectedActions = !store.state.selectedTagSlug ? store.actions : store.state.actions.filter(function (action) {\n            return action.tag.startsWith(\"\" + store.state.selectedTagSlug);\n        });\n\n        store.updateState({\n            selectedActions: newSelectedActions\n        }, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');\n    });\n\n    (0, _veil.withVeilAndMessages)(Promise.all([fetchJsonData('/users/actions/get'), fetchJsonData('/users/tags/all')]), true).then(function (_ref) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            actions = _ref2[0],\n            tags = _ref2[1];\n\n        console.log(actions);\n        (0, _utils.fillUptag)(tags);\n        var countByTagSlug = {};\n        (0, _utils.getTagsNumber)(actions, countByTagSlug);\n\n        store.updateState({\n            actions: actions,\n            countByTagSlug: countByTagSlug,\n            selectedActions: actions.slice(),\n            selectedDate: moment(new Date()).format('YYYY-MM-DD'),\n            tags: tags\n        });\n\n        SimpleDom.renderToDom('container', SimpleDom.el(App, null), store);\n\n        // jquery functions\n        flatpickr('.flatpicker', {\n            altInput: true,\n            defaultDate: new Date(),\n            onChange: function onChange(_, date, inst) {\n                (0, _veil.withVeilAndMessages)(fetchJsonData('/users/actions/get?date=' + moment(date).format('YYYY-MM-DD')), true).then(function (actions) {\n                    console.log(actions);\n                    //fillUptag(tags);\n                    var countByTagSlug = {};\n                    (0, _utils.getTagsNumber)(actions, countByTagSlug);\n\n                    store.updateState({\n                        actions: actions,\n                        countByTagSlug: countByTagSlug,\n                        selectedActions: actions.slice(),\n                        selectedDate: date }, 'ACTIONS_LIST_TO_UPDATE', 'SIDEBAR_TO_UPDATE');\n                });\n            }\n        });\n    });\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDcuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FjdGlvbnMvY3VycmVudEFjdGlvbnMuanM/NWZiMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2ZpbGxVcHRhZywgZ2V0VGFnc051bWJlcn0gZnJvbSBcIi4vdXRpbHNcIjtcblxucmVxdWlyZSgnLi4vaG9tZScpO1xuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5yZXF1aXJlKCdtb21lbnQvbG9jYWxlL2ZyJyk7XG5jb25zdCBmbGF0cGlja3IgPSByZXF1aXJlKFwiZmxhdHBpY2tyXCIpO1xuY29uc3QgZnJhbmNlc2UgPSByZXF1aXJlKFwiZmxhdHBpY2tyL2Rpc3QvbDEwbi9mci5qc1wiKS5mcjtcbmZsYXRwaWNrci5sb2NhbGl6ZShmcmFuY2VzZSk7XG5cbmltcG9ydCAqIGFzIFNpbXBsZURvbSBmcm9tICdzaW1wbGVkb20tY29tcG9uZW50JztcbmltcG9ydCB7IHdpdGhWZWlsQW5kTWVzc2FnZXMgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZlaWwvdmVpbCc7XG5pbXBvcnQge1NpZGViYXJBY3Rpb259IGZyb20gJy4vc2lkZWJhckFjdGlvbnMnO1xuaW1wb3J0IHtDcmVhdGVBY3Rpb259IGZyb20gJy4vc3RlcDEnO1xuaW1wb3J0IHtBY3Rpb25DYXJkfSBmcm9tIFwiLi9hY3Rpb25DYXJkXCI7XG5pbXBvcnQgYW5pbWUgZnJvbSAnYW5pbWVqcydcblxuXG5pbXBvcnQgJy4uL2Nzcy9wb3BvdmVycy5sZXNzJztcbmltcG9ydCAnLi4vY3NzL2F2YXRhci5sZXNzJztcbmltcG9ydCAnLi9jdXJyZW50QWN0aW9ucy5sZXNzJztcblxuXG5jbGFzcyBBY3Rpb25zTGlzdCBleHRlbmRzIFNpbXBsZURvbS5Db21wb25lbnQge1xuICAgIGV2ZW50c1RvU3Vic2NyaWJlKCkge1xuICAgICAgICByZXR1cm4gWydBQ1RJT05TX0xJU1RfVE9fVVBEQVRFJ107XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMsIHN0b3JlKSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBzdG9yZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IGFsbENhbGxiYWNrcyA9IGFuaW1lKHtcbiAgICAgICAgICAgIHRhcmdldHM6ICcuY2FyZCcsXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgZGVsYXk6IGZ1bmN0aW9uKGVsLCBpKSB7IHJldHVybiAxMDAgKyAoaSAqIDEwMCk7IH0sXG4gICAgICAgICAgICBkdXJhdGlvbjogZnVuY3Rpb24oZWwsIGkpIHsgcmV0dXJuIDUwMCArIChpICogNTAwKTsgfVxuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhcnRpdGlvbkxpc3QoaW5wdXQsIHNwYWNpbmcpIHtcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICBvdXRwdXRbb3V0cHV0Lmxlbmd0aF0gPSBpbnB1dC5zbGljZShpLCBpICsgc3BhY2luZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IG5iQWN0aW9ucyA9IHRoaXMuc3RhdGUubWluaXNpZGViYXIgPyA0IDogMztcbiAgICAgICAgY29uc3QgY29sU2l6ZSA9IHRoaXMuc3RhdGUubWluaXNpZGViYXIgPyAgJ20zJyA6ICdtNCc7XG4gICAgICAgIGlmICghKHRoaXMuc3RhdGUuc2VsZWN0ZWRBY3Rpb25zIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJlbXB0eVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJsbnIgbG5yLXJvY2tldCBmYS0zeFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImVtcHR5LXRpdGxlXCI+UGFzIGQnYWN0aW9uIGljaS4uLjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZW1wdHktc3VidGl0bGVcIj5SZWNoZXJjaGVyIHVuZSBhY3Rpb24gcXVpIHZvdXMgY29ycmVzcG9uZFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNjcmVhdGVBY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjcmVhdGVBY3Rpb24nKS5tb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nVG9wOiAnMiUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPiBpY2lcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT4gIVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBpZD1cImFjdGlvbnMtY2FyZFwiPlxuICAgICAgICAgICAge3RoaXMucGFydGl0aW9uTGlzdCh0aGlzLnN0YXRlLnNlbGVjdGVkQWN0aW9ucyB8fCBbXSwgbmJBY3Rpb25zKS5tYXAoc3ViYWN0aW9ucyA9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAge3N1YmFjdGlvbnMubWFwKGFjdGlvbiA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz17YGNvbCAke2NvbFNpemV9IHMxMmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBY3Rpb25DYXJkIHVzZXJBY3Rpb249e2FjdGlvbn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbmNsYXNzIE1haW5UaXRsZSBleHRlbmRzIFNpbXBsZURvbS5Db21wb25lbnQge1xuICAgIGV2ZW50c1RvU3Vic2NyaWJlKCkge1xuICAgICAgICByZXR1cm4gWydUSVRMRV9UT19SRUZSRVNIJ107XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGgxIGNsYXNzPVwibWFpbi10aXRsZVwiPlxuICAgICAgICAgICAgICAgIE1lcyBhY3Rpb25zIGVuIGNvdXJzICh7dGhpcy5zdGF0ZS5zZWxlY3RlZEFjdGlvbnMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI2NyZWF0ZUFjdGlvblwiIGNsYXNzPVwicmlnaHQgaGJ0bi1hY3Rpb24gaGJ0bi1tYWluLWNvbG9yIGFkZC1hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NyZWF0ZUFjdGlvbicpLm1vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nVG9wOiAnMiUnXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHdoaXRlLXRleHRcIj5hZGQ8L2k+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuY2xhc3MgQXBwIGV4dGVuZHMgU2ltcGxlRG9tLkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cInRvcFwiIGNsYXNzPVwiYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImNyZWF0ZUFjdGlvblwiIGNsYXNzPVwibW9kYWxcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDcmVhdGVBY3Rpb24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveGVkLWxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lkZWJhckFjdGlvbiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiYWN0aW9uc1wiIGNsYXNzPVwiY29sIHMxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNYWluVGl0bGUvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBhY3Rpb24tZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tZGF0ZS1waWNrZXIgaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibG5yIGxuci1jYWxlbmRhci1mdWxsIHByZWZpeFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZmxhdHBpY2tlclwiIHR5cGU9XCJkYXRlXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1zZWFyY2ggaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibG5yIGxuci1tYWduaWZpZXIgcHJlZml4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIG9ua2V5dXA9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1NlbGVjdGVkQWN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZWxlY3RlZEFjdGlvbnMgPSB0aGlzLnN0YXRlLmFjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWRBY3Rpb25zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEFjdGlvbnMuZmlsdGVyKHVzZXJBY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50QWN0aW9uID0gdXNlckFjdGlvbi5hY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50QWN0aW9uLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEFjdGlvbi5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgc2lkZWJhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEFjdGlvbnM6IG5ld1NlbGVjdGVkQWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICdBQ1RJT05TX0xJU1RfVE9fVVBEQVRFJywgJ01BSU5fVElUTEVfVE9fVVBEQVRFJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHMxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFjdGlvbnNMaXN0IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHN0b3JlID0gbmV3IFNpbXBsZURvbS5TdG9yZSgpO1xuXG4gICAgc3RvcmUuc3Vic2NyaWJlKCdBQ1RJT05fVklFV19UT19VUERBVEUnLCAoc3RhdGUsIG9sZFN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhY3Rpb24gdmlldyB0byB1cGRhdGUnKTtcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRBY3Rpb25zID0gIXN0b3JlLnN0YXRlLnNlbGVjdGVkVGFnU2x1ZyA/IHN0b3JlLmFjdGlvbnNcbiAgICAgICAgICAgIDogc3RvcmUuc3RhdGUuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+XG4gICAgICAgICAgICAgICAgYWN0aW9uLnRhZy5zdGFydHNXaXRoKFwiXCIgKyBzdG9yZS5zdGF0ZS5zZWxlY3RlZFRhZ1NsdWcpKTtcblxuICAgICAgICBzdG9yZS51cGRhdGVTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEFjdGlvbnM6IG5ld1NlbGVjdGVkQWN0aW9uc1xuICAgICAgICB9LCAnQUNUSU9OU19MSVNUX1RPX1VQREFURScsICdNQUlOX1RJVExFX1RPX1VQREFURScpO1xuICAgIH0pO1xuXG4gICAgd2l0aFZlaWxBbmRNZXNzYWdlcyhcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hKc29uRGF0YSgnL3VzZXJzL2FjdGlvbnMvZ2V0JyksXG4gICAgICAgICAgICBmZXRjaEpzb25EYXRhKCcvdXNlcnMvdGFncy9hbGwnKVxuICAgICAgICBdKSxcbiAgICAgICAgdHJ1ZSlcbiAgICAgICAgLnRoZW4oKFthY3Rpb25zLCB0YWdzXSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYWN0aW9ucylcbiAgICAgICAgICAgIGZpbGxVcHRhZyh0YWdzKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50QnlUYWdTbHVnID0ge307XG4gICAgICAgICAgICBnZXRUYWdzTnVtYmVyKGFjdGlvbnMsIGNvdW50QnlUYWdTbHVnKTtcblxuICAgICAgICAgICAgc3RvcmUudXBkYXRlU3RhdGUoeyBcbiAgICAgICAgICAgICAgICBhY3Rpb25zLFxuICAgICAgICAgICAgICAgIGNvdW50QnlUYWdTbHVnLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQWN0aW9uczogYWN0aW9ucy5zbGljZSgpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0ZTogbW9tZW50KG5ldyBEYXRlKCkpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICAgICAgICAgIHRhZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBTaW1wbGVEb20ucmVuZGVyVG9Eb20oJ2NvbnRhaW5lcicsIDxBcHAgLz4sIHN0b3JlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8ganF1ZXJ5IGZ1bmN0aW9uc1xuICAgICAgICAgICAgZmxhdHBpY2tyKCcuZmxhdHBpY2tlcicsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhbHRJbnB1dDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiAoXywgZGF0ZSwgaW5zdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aFZlaWxBbmRNZXNzYWdlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaEpzb25EYXRhKGAvdXNlcnMvYWN0aW9ucy9nZXQ/ZGF0ZT0ke21vbWVudChkYXRlKS5mb3JtYXQoJ1lZWVktTU0tREQnKX1gKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICApLnRoZW4oYWN0aW9ucyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maWxsVXB0YWcodGFncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnRCeVRhZ1NsdWcgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRUYWdzTnVtYmVyKGFjdGlvbnMsIGNvdW50QnlUYWdTbHVnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRCeVRhZ1NsdWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQWN0aW9uczogYWN0aW9ucy5zbGljZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGU6IGRhdGUgfSwgJ0FDVElPTlNfTElTVF9UT19VUERBVEUnLCAnU0lERUJBUl9UT19VUERBVEUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2FjdGlvbnMvY3VycmVudEFjdGlvbnMuanMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFRQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBY0E7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBSkE7QUFNQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFMQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBTEE7QUFpQkE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBREE7QUFEQTtBQURBO0FBV0E7Ozs7QUE1REE7QUFDQTtBQStEQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUxBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVBBO0FBRkE7QUFhQTs7OztBQXBCQTtBQUNBO0FBdUJBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFuQkE7QUFOQTtBQTRCQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBREE7QUEvQkE7QUFEQTtBQUZBO0FBTkE7QUFrREE7Ozs7QUFyREE7QUFDQTtBQXVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbkJBO0FBc0JBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=");

/***/ })

})