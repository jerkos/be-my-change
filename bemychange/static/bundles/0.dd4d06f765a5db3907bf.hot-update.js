webpackHotUpdate_name_(0,{

/***/ 42:
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/actions/sidebarActions.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.SidebarAction = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _simpledomComponent = __webpack_require__(/*! simpledom-component */ 2);\n\nvar SimpleDom = _interopRequireWildcard(_simpledomComponent);\n\nvar _veil = __webpack_require__(/*! ../components/veil/veil */ 4);\n\n__webpack_require__(/*! ./sidebarActions.less */ 56);\n\n__webpack_require__(/*! ../css/avatar.less */ 28);\n\n__webpack_require__(/*! ../css/tooltips.less */ 13);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n__webpack_require__(/*! ../home */ 3);\n\nvar gravatar = __webpack_require__(/*! gravatar */ 9);\n\nvar technicalId = 1;\n\nvar Tag = function (_SimpleDom$Component) {\n    _inherits(Tag, _SimpleDom$Component);\n\n    function Tag(props, store) {\n        _classCallCheck(this, Tag);\n\n        var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props, store));\n\n        _this.tag = _this.props.tag;\n        _this.editMode = _this.tag === null;\n        _this.isActive = false;\n        _this.isHighlighted = false;\n        return _this;\n    }\n\n    _createClass(Tag, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['REFRESH_TAG_' + this.props.id];\n        }\n    }, {\n        key: 'handleTagActivity',\n        value: function handleTagActivity(event) {\n            $('.sub-tag').removeClass('active');\n            event.stopPropagation();\n            this.isActive = !this.isActive;\n            this.store.updateState({}, 'REFRESH_TAG_' + this.props.id);\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            return SimpleDom.el(\n                'li',\n                { 'class': 'sub-tag ' + (this.isActive ? 'active' : '') + ' ' + (this.isHighlighted ? 'highlighted' : ''),\n                    onclick: function onclick(event) {\n                        event.stopPropagation();\n                        $('.sub-tag').removeClass('highlighted');\n                        if (_this2.editMode) {\n                            return;\n                        }\n                        if (!_this2.isHighlighted) {\n                            _this2.isHighlighted = true;\n                        }\n                        //this.isHighlighted = !this.isHighlighted;\n                        if (_this2.props.onFilterClick) {\n                            _this2.props.onFilterClick(_this2.tag);\n                        }\n                        _this2.store.updateState({\n                            selectedTagSlug: _this2.tag.tag_slug\n                        }, 'ACTION_VIEW_TO_UPDATE', 'REFRESH_TAG_' + _this2.props.id);\n                    }\n                },\n                SimpleDom.predicate(!this.editMode, function () {\n                    var hasIcon = _this2.tag.sons && _this2.tag.sons.length;\n                    var icon = !_this2.isActive ? SimpleDom.el('span', { 'class': 'lnr lnr-chevron-right sub-tag-list-icon',\n                        onclick: function onclick(event) {\n                            return _this2.handleTagActivity(event);\n                        }\n                    }) : SimpleDom.el('span', { 'class': 'lnr lnr-chevron-down sub-tag-list-icon',\n                        onclick: function onclick(event) {\n                            return _this2.handleTagActivity(event);\n                        }\n                    });\n                    return SimpleDom.el(\n                        'div',\n                        { 'class': 'sub-tag-name' },\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'sub-tag-name-item' },\n                            SimpleDom.predicate(hasIcon, function () {\n                                return icon;\n                            }),\n                            _this2.tag.name + ' (' + (_this2.state.countByTagSlug[_this2.tag.tag_slug] || 0) + ')'\n                        ),\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'sub-tag-hover-icons' },\n                            SimpleDom.el('span', {\n                                onclick: function onclick(event) {\n                                    event.stopPropagation();\n                                    _this2.editMode = true;\n                                    _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                                },\n                                'class': 'hbtn-action lnr lnr-pencil sub-tag-edit' }),\n                            SimpleDom.el(\n                                'span',\n                                {\n                                    onclick: function onclick(event) {\n                                        event.stopPropagation();\n                                        _this2.tag.sons.push(null);\n                                        _this2.isActive = true;\n                                        _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                                    },\n                                    'class': 'hbtn-action sub-tag-edit' },\n                                '+'\n                            ),\n                            SimpleDom.predicate(true, function () {\n                                return SimpleDom.el('span', {\n                                    onclick: function onclick(event) {\n                                        event.stopPropagation();\n                                        (0, _veil.withVeilAndMessages)(fetchJsonData('/users/tags/delete/' + _this2.tag.id, { method: 'DELETE' }), true).then(function () {\n                                            var tags = _this2.state.tags.filter(function (tag) {\n                                                return tag.id !== _this2.tag.id;\n                                            });\n                                            _this2.store.updateState({ tags: tags }, [\"SIDEBAR_TO_UPDATE\"]);\n                                        });\n                                    },\n                                    'class': 'hbtn-action lnr lnr-trash sub-tag-edit' });\n                            })\n                        )\n                    );\n                }, function () {\n                    return SimpleDom.el('input', { type: 'text',\n                        'class': 'sub-tag-input',\n                        onblur: function onblur(event) {\n                            event.stopPropagation();\n                            var value = event.target.value;\n                            if (!_this2.tag) {\n                                var sonTag = {\n                                    name: value,\n                                    parent_id: _this2.props.parentTag.id,\n                                    rank: _this2.props.parentTag.rank + 1,\n                                    user_id: currentUser.id\n                                };\n                                (0, _veil.withVeilAndMessages)(fetchJsonData('/users/tags/create', {\n                                    method: 'POST',\n                                    body: JSON.stringify(sonTag)\n                                }), true).then(function (tag) {\n                                    _this2.tag = tag;\n                                    _this2.editMode = false;\n                                    _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                                });\n                                return;\n                            }\n                            (0, _veil.withVeilAndMessages)(fetchJsonData('/users/tags/update', {\n                                method: 'PUT',\n                                body: JSON.stringify({ id: _this2.tag.id, name: value })\n                            }), true).then(function (tag) {\n                                _this2.tag.name = tag.name;\n                                _this2.editMode = false;\n                                _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                            });\n                        },\n                        value: (_this2.tag || {}).name\n                    });\n                }),\n                SimpleDom.predicate(this.tag && this.tag.sons && this.tag.sons.length, function () {\n                    return SimpleDom.el(\n                        'ul',\n                        { 'class': 'sub-tag-list sub-' + _this2.tag.id + ' ' + (_this2.isActive ? 'active' : '') },\n                        _this2.tag.sons.map(function (son, i) {\n                            return SimpleDom.el(Tag, { tag: son, id: technicalId++, parentTag: _this2.tag });\n                        })\n                    );\n                })\n            );\n        }\n    }]);\n\n    return Tag;\n}(SimpleDom.Component);\n\nvar TagList = function (_SimpleDom$Component2) {\n    _inherits(TagList, _SimpleDom$Component2);\n\n    function TagList() {\n        _classCallCheck(this, TagList);\n\n        return _possibleConstructorReturn(this, (TagList.__proto__ || Object.getPrototypeOf(TagList)).apply(this, arguments));\n    }\n\n    _createClass(TagList, [{\n        key: 'render',\n        value: function render() {\n            return SimpleDom.el(\n                'ul',\n                { 'class': 'main-tag-list' },\n                this.state.tags.map(function (tag) {\n                    return SimpleDom.el(Tag, { tag: tag, id: technicalId++ });\n                })\n            );\n        }\n    }]);\n\n    return TagList;\n}(SimpleDom.Component);\n\nvar SidebarAction = exports.SidebarAction = function (_SimpleDom$Component3) {\n    _inherits(SidebarAction, _SimpleDom$Component3);\n\n    function SidebarAction(props, store) {\n        _classCallCheck(this, SidebarAction);\n\n        var _this4 = _possibleConstructorReturn(this, (SidebarAction.__proto__ || Object.getPrototypeOf(SidebarAction)).call(this, props, store));\n\n        _this4.isLoading = false;\n        _this4.hasImage = true;\n        return _this4;\n    }\n\n    _createClass(SidebarAction, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['SIDEBAR_TO_UPDATE'];\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            /*\n            if (this.isLoading) {\n                this.profilImgUrl = gravatar.url(currentUser.email, { s: '50', d: '404' });\n                fetch(this.profilImgUrl, {\n                    method: 'HEAD',\n                    mode: 'cors'\n                })\n                .then(response => {\n                    if (response.status === 404) {\n                        this.hasImage = false;\n                    }\n                    this.isLoading = false;\n                    this.store.updateState({}, 'SIDEBAR_TO_UPDATE');\n                })\n            }\n            */\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this5 = this;\n\n            if (this.isLoading) {\n                return undefined;\n            }\n            return SimpleDom.el(\n                'div',\n                { 'class': 'sidebar-action' },\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'sidebar-action-header' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'toggler-arrow', onclick: function onclick(e) {\n                                var elem = document.getElementsByClassName('sidebar-action')[0];\n                                elem.classList.toggle('sidebar-minified');\n                                var main = document.getElementsByClassName('boxed-layout')[0];\n                                main.classList.toggle('boxed-layout-maximized');\n                                _this5.store.updateState({ minisidebar: !_this5.state.minisidebar }, 'ACTIONS_LIST_TO_UPDATE');\n                            } },\n                        SimpleDom.el('i', { 'class': 'lnr lnr-arrow-left' })\n                    ),\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'sidebar-action-header-img' },\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'avatar-spec avatar-spec-lg',\n                                style: 'color: white; background-color: #5764c6; display:inline-flex; flex-direction: column; justify-content: center; text-align:center;' },\n                            SimpleDom.el('span', { 'class': 'lnr lnr-list' })\n                        )\n                    )\n                ),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'sidebar-action-content' },\n                    SimpleDom.el(TagList, null)\n                ),\n                SimpleDom.el('div', { 'class': 'sidebar-action-spacer' }),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'sidebar-action-footer' },\n                    SimpleDom.el(\n                        'p',\n                        { 'class': 'sidebar-action-copyright' },\n                        '\\xA9 bemychange-2017'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return SidebarAction;\n}(SimpleDom.Component);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMuanM/ODA2ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9ob21lJyk7XG5pbXBvcnQgKiBhcyBTaW1wbGVEb20gZnJvbSAnc2ltcGxlZG9tLWNvbXBvbmVudCc7XG5pbXBvcnQgeyB3aXRoVmVpbEFuZE1lc3NhZ2VzIH0gZnJvbSAnLi4vY29tcG9uZW50cy92ZWlsL3ZlaWwnO1xuXG5pbXBvcnQgJy4vc2lkZWJhckFjdGlvbnMubGVzcyc7XG5pbXBvcnQgJy4uL2Nzcy9hdmF0YXIubGVzcyc7XG5pbXBvcnQgJy4uL2Nzcy90b29sdGlwcy5sZXNzJztcbmNvbnN0IGdyYXZhdGFyID0gcmVxdWlyZSgnZ3JhdmF0YXInKTtcblxuXG5sZXQgdGVjaG5pY2FsSWQgPSAxO1xuXG5jbGFzcyBUYWcgZXh0ZW5kcyBTaW1wbGVEb20uQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBzdG9yZSkge1xuICAgICAgICBzdXBlcihwcm9wcywgc3RvcmUpO1xuICAgICAgICB0aGlzLnRhZyA9IHRoaXMucHJvcHMudGFnO1xuICAgICAgICB0aGlzLmVkaXRNb2RlID0gdGhpcy50YWcgPT09IG51bGw7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0hpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZXZlbnRzVG9TdWJzY3JpYmUoKSB7XG4gICAgICAgIHJldHVybiBbYFJFRlJFU0hfVEFHXyR7dGhpcy5wcm9wcy5pZH1gXTtcbiAgICB9XG5cbiAgICBoYW5kbGVUYWdBY3Rpdml0eShldmVudCkge1xuICAgICAgICAkKCcuc3ViLXRhZycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSAhdGhpcy5pc0FjdGl2ZTtcbiAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7fSwgYFJFRlJFU0hfVEFHXyR7dGhpcy5wcm9wcy5pZH1gKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bGkgY2xhc3M9e2BzdWItdGFnICR7dGhpcy5pc0FjdGl2ZSA/ICdhY3RpdmUnIDogJyd9ICR7dGhpcy5pc0hpZ2hsaWdodGVkID8gJ2hpZ2hsaWdodGVkJzogJyd9YH1cbiAgICAgICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3ViLXRhZycpLnJlbW92ZUNsYXNzKCdoaWdobGlnaHRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghIHRoaXMuaXNIaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0hpZ2hsaWdodGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuaXNIaWdobGlnaHRlZCA9ICF0aGlzLmlzSGlnaGxpZ2h0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uRmlsdGVyQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25GaWx0ZXJDbGljayh0aGlzLnRhZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRhZ1NsdWc6IHRoaXMudGFnLnRhZ19zbHVnXG4gICAgICAgICAgICAgICAgICAgIH0sICdBQ1RJT05fVklFV19UT19VUERBVEUnLCBgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLmlkfWApO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICB7U2ltcGxlRG9tLnByZWRpY2F0ZSghdGhpcy5lZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0ljb24gPSB0aGlzLnRhZy5zb25zICYmIHRoaXMudGFnLnNvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWNvbiA9ICF0aGlzLmlzQWN0aXZlID8gXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxuciBsbnItY2hldnJvbi1yaWdodCBzdWItdGFnLWxpc3QtaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4gdGhpcy5oYW5kbGVUYWdBY3Rpdml0eShldmVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiA8c3BhbiBjbGFzcz1cImxuciBsbnItY2hldnJvbi1kb3duIHN1Yi10YWctbGlzdC1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4gdGhpcy5oYW5kbGVUYWdBY3Rpdml0eShldmVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGFnLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLXRhZy1uYW1lLWl0ZW1cIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtTaW1wbGVEb20ucHJlZGljYXRlKGhhc0ljb24sICgpID0+IGljb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YCR7dGhpcy50YWcubmFtZX0gKCR7dGhpcy5zdGF0ZS5jb3VudEJ5VGFnU2x1Z1t0aGlzLnRhZy50YWdfc2x1Z10gfHwgMH0pYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLXRhZy1ob3Zlci1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe30sIFtgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLmlkfWBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJoYnRuLWFjdGlvbiBsbnIgbG5yLXBlbmNpbCBzdWItdGFnLWVkaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZy5zb25zLnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7fSwgW2BSRUZSRVNIX1RBR18ke3RoaXMucHJvcHMuaWR9YF0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImhidG4tYWN0aW9uIHN1Yi10YWctZWRpdFwiPiYjNDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1NpbXBsZURvbS5wcmVkaWNhdGUodHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IDwgc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhWZWlsQW5kTWVzc2FnZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaEpzb25EYXRhKGAvdXNlcnMvdGFncy9kZWxldGUvJHt0aGlzLnRhZy5pZH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZXRob2Q6ICdERUxFVEUnfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudGhlbigoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnN0YXRlLnRhZ3MuZmlsdGVyKHRhZyA9PiB0YWcuaWQgIT09IHRoaXMudGFnLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe3RhZ3N9LCBbXCJTSURFQkFSX1RPX1VQREFURVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaGJ0bi1hY3Rpb24gbG5yIGxuci10cmFzaCBzdWItdGFnLWVkaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiA8aW5wdXQgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInN1Yi10YWctaW5wdXRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmJsdXI9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNvblRhZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50X2lkOiB0aGlzLnByb3BzLnBhcmVudFRhZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiB0aGlzLnByb3BzLnBhcmVudFRhZy5yYW5rICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiBjdXJyZW50VXNlci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aFZlaWxBbmRNZXNzYWdlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaEpzb25EYXRhKCcvdXNlcnMvdGFncy9jcmVhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzb25UYWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudGhlbigodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWcgPSB0YWc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe30sIFtgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLmlkfWBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aFZlaWxBbmRNZXNzYWdlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoSnNvbkRhdGEoJy91c2Vycy90YWdzL3VwZGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtpZDogdGhpcy50YWcuaWQsIG5hbWU6IHZhbHVlfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS50aGVuKCh0YWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFnLm5hbWUgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe30sIFtgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLmlkfWBdKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsodGhpcy50YWcgfHwge30pLm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7U2ltcGxlRG9tLnByZWRpY2F0ZSh0aGlzLnRhZyAmJiB0aGlzLnRhZy5zb25zICYmIHRoaXMudGFnLnNvbnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz17YHN1Yi10YWctbGlzdCBzdWItJHt0aGlzLnRhZy5pZH0gJHt0aGlzLmlzQWN0aXZlID8gJ2FjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy50YWcuc29ucy5tYXAoKHNvbixpKSA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhZyB0YWc9e3Nvbn0gaWQ9e3RlY2huaWNhbElkKyt9IHBhcmVudFRhZz17dGhpcy50YWd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBUYWdMaXN0IGV4dGVuZHMgU2ltcGxlRG9tLkNvbXBvbmVudCB7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJtYWluLXRhZy1saXN0XCI+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUudGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxUYWcgdGFnPXt0YWd9IGlkPXt0ZWNobmljYWxJZCsrfSAvPlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTaWRlYmFyQWN0aW9uIGV4dGVuZHMgU2ltcGxlRG9tLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIHN0b3JlKSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBzdG9yZSk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzSW1hZ2UgPSB0cnVlO1xuICAgIH1cblxuICAgIGV2ZW50c1RvU3Vic2NyaWJlKCkge1xuICAgICAgICByZXR1cm4gWydTSURFQkFSX1RPX1VQREFURSddO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvKlxuICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsSW1nVXJsID0gZ3JhdmF0YXIudXJsKGN1cnJlbnRVc2VyLmVtYWlsLCB7IHM6ICc1MCcsIGQ6ICc0MDQnIH0pO1xuICAgICAgICAgICAgZmV0Y2godGhpcy5wcm9maWxJbWdVcmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdIRUFEJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzSW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVN0YXRlKHt9LCAnU0lERUJBUl9UT19VUERBVEUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItYWN0aW9uLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlci1hcnJvd1wiIG9uY2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NpZGViYXItYWN0aW9uJylbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC50b2dnbGUoJ3NpZGViYXItbWluaWZpZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdib3hlZC1sYXlvdXQnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnRvZ2dsZSgnYm94ZWQtbGF5b3V0LW1heGltaXplZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7bWluaXNpZGViYXI6ICF0aGlzLnN0YXRlLm1pbmlzaWRlYmFyfSwgJ0FDVElPTlNfTElTVF9UT19VUERBVEUnKTtcbiAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImxuciBsbnItYXJyb3ctbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyLWFjdGlvbi1oZWFkZXItaW1nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXZhdGFyLXNwZWMgYXZhdGFyLXNwZWMtbGdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiY29sb3I6IHdoaXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNTc2NGM2OyBkaXNwbGF5OmlubGluZS1mbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgdGV4dC1hbGlnbjpjZW50ZXI7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsbnIgbG5yLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7LyogPGgyPntjdXJyZW50VXNlci5lbWFpbH08L2gyPiAqL31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1hY3Rpb24tY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8VGFnTGlzdC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItYWN0aW9uLXNwYWNlclwiLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1hY3Rpb24tZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic2lkZWJhci1hY3Rpb24tY29weXJpZ2h0XCI+JmNvcHk7IGJlbXljaGFuZ2UtMjAxNzwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFQQTtBQUNBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFNQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQWpCQTtBQW1CQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFuQkE7QUFMQTtBQTBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBRUE7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyQ0E7QUFBQTtBQXdDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUExSEE7QUE4SEE7Ozs7QUFySkE7QUFDQTtBQXVKQTs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7Ozs7QUFWQTtBQUNBO0FBWUE7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFJQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQVZBO0FBbUJBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQXhCQTtBQThCQTs7OztBQWpFQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})