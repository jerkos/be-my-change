webpackHotUpdate_name_(1,{

/***/ 44:
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/actions/sidebarActions.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.SidebarAction = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _simpledomComponent = __webpack_require__(/*! simpledom-component */ 1);\n\nvar SimpleDom = _interopRequireWildcard(_simpledomComponent);\n\nvar _veil = __webpack_require__(/*! ../components/veil/veil */ 4);\n\n__webpack_require__(/*! ./sidebarActions.less */ 58);\n\n__webpack_require__(/*! ../css/avatar.less */ 27);\n\n__webpack_require__(/*! ../css/tooltips.less */ 12);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n__webpack_require__(/*! ../home */ 3);\n\n\nvar technicalId = 1;\n\nvar Tag = function (_SimpleDom$Component) {\n    _inherits(Tag, _SimpleDom$Component);\n\n    function Tag(props, store) {\n        _classCallCheck(this, Tag);\n\n        var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props, store));\n\n        _this.tag = _this.props.tag;\n        _this.editMode = _this.tag === null;\n        _this.isActive = _this.state.activeTags.has((_this.tag || {}).tag_slug) || false;\n        _this.isHighlighted = false;\n        return _this;\n    }\n\n    _createClass(Tag, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['REFRESH_TAG_' + this.props.id];\n        }\n    }, {\n        key: 'handleTagActivity',\n        value: function handleTagActivity(event) {\n            $('.sub-tag').removeClass('active');\n            event.stopPropagation();\n            this.isActive = !this.isActive;\n            var newActiveTags = this.state.activeTags;\n\n            if (this.isActive) {\n                newActiveTags.add(this.tag.tag_slug);\n            } else {\n                newActiveTags.delete(this.tag.tag_slug);\n            }\n            this.store.updateState({ activeTags: newActiveTags }, 'REFRESH_TAG_' + this.props.id);\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            return SimpleDom.el(\n                'li',\n                { 'class': 'sub-tag ' + (this.state.activeTags.has((this.tag || {}).tag_slug) ? 'active' : '') + ' ' + (this.isHighlighted ? 'highlighted' : ''),\n                    onclick: function onclick(event) {\n                        event.stopPropagation();\n                        $('.sub-tag').removeClass('highlighted');\n                        if (_this2.editMode) {\n                            return;\n                        }\n                        if (!_this2.isHighlighted) {\n                            _this2.isHighlighted = true;\n                        }\n                        //this.isHighlighted = !this.isHighlighted;\n                        if (_this2.props.onFilterClick) {\n                            _this2.props.onFilterClick(_this2.tag);\n                        }\n                        _this2.store.updateState({\n                            selectedTagSlug: _this2.tag.tag_slug\n                        }, 'ACTION_VIEW_TO_UPDATE', 'REFRESH_TAG_' + _this2.props.id);\n                    }\n                },\n                SimpleDom.predicate(!this.editMode, function () {\n                    var hasIcon = _this2.tag.sons && _this2.tag.sons.length;\n                    var icon = !_this2.isActive ? SimpleDom.el('span', { 'class': 'lnr lnr-plus-circle sub-tag-list-icon',\n                        onclick: function onclick(event) {\n                            return _this2.handleTagActivity(event);\n                        }\n                    }) : SimpleDom.el('span', { 'class': 'lnr lnr-circle-minus sub-tag-list-icon',\n                        onclick: function onclick(event) {\n                            return _this2.handleTagActivity(event);\n                        }\n                    });\n                    return SimpleDom.el(\n                        'div',\n                        { 'class': 'sub-tag-name' },\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'sub-tag-name-item' },\n                            SimpleDom.predicate(hasIcon, function () {\n                                return icon;\n                            }),\n                            _this2.tag.name + ' (' + (_this2.state.countByTagSlug[_this2.tag.tag_slug] || 0) + ')'\n                        ),\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'sub-tag-hover-icons' },\n                            SimpleDom.el('span', {\n                                onclick: function onclick(event) {\n                                    event.stopPropagation();\n                                    _this2.editMode = true;\n                                    _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                                },\n                                'class': 'hbtn-action lnr lnr-pencil sub-tag-edit' }),\n                            SimpleDom.el(\n                                'span',\n                                {\n                                    onclick: function onclick(event) {\n                                        event.stopPropagation();\n                                        _this2.tag.sons.push(null);\n                                        _this2.isActive = true;\n                                        _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                                    },\n                                    'class': 'hbtn-action sub-tag-edit' },\n                                '+'\n                            ),\n                            SimpleDom.predicate(!_this2.state.countByTagSlug[_this2.tag.tag_slug], function () {\n                                return SimpleDom.el('span', {\n                                    onclick: function onclick(event) {\n                                        event.stopPropagation();\n                                        (0, _veil.withVeilAndMessages)(fetchJsonData('/users/tags/delete/' + _this2.tag.id, { method: 'DELETE' }), true).then(function () {\n                                            if (_this2.props.parentTag) {\n                                                var sons = _this2.props.parentTag.sons.filter(function (son) {\n                                                    return son.id !== _this2.tag.id;\n                                                });\n                                                _this2.props.parentTag.sons = sons;\n                                                _this2.isActive = true;\n                                                _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.parentId]);\n                                            } else {\n                                                var tags = _this2.state.tags.filter(function (tag) {\n                                                    return tag.id !== _this2.tag.id;\n                                                });\n                                                _this2.store.updateState({ tags: tags }, [\"SIDEBAR_TO_UPDATE\"]);\n                                            }\n                                        });\n                                    },\n                                    'class': 'hbtn-action lnr lnr-trash sub-tag-edit' });\n                            })\n                        )\n                    );\n                }, function () {\n                    return SimpleDom.el('input', { type: 'text',\n                        'class': 'sub-tag-input',\n                        onblur: function onblur(event) {\n                            event.stopPropagation();\n                            var value = event.target.value;\n                            if (!_this2.tag) {\n                                var sonTag = {\n                                    name: value,\n                                    parent_id: _this2.props.parentTag.id,\n                                    rank: _this2.props.parentTag.rank + 1,\n                                    user_id: currentUser.id\n                                };\n                                (0, _veil.withVeilAndMessages)(fetchJsonData('/users/tags/create', {\n                                    method: 'POST',\n                                    body: JSON.stringify(sonTag)\n                                }), true).then(function (tag) {\n                                    _this2.tag = tag;\n                                    _this2.props.parentTag.sons.pop();\n                                    _this2.props.parentTag.sons.push(tag);\n                                    _this2.editMode = false;\n                                    _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                                });\n                                return;\n                            }\n                            (0, _veil.withVeilAndMessages)(fetchJsonData('/users/tags/update', {\n                                method: 'PUT',\n                                body: JSON.stringify({ id: _this2.tag.id, name: value })\n                            }), true).then(function (tag) {\n                                _this2.tag.name = tag.name;\n                                _this2.editMode = false;\n                                _this2.store.updateState({}, ['REFRESH_TAG_' + _this2.props.id]);\n                            });\n                        },\n                        value: (_this2.tag || {}).name\n                    });\n                }),\n                SimpleDom.predicate(this.tag && this.tag.sons && this.tag.sons.length, function () {\n                    return SimpleDom.el(\n                        'ul',\n                        { 'class': 'sub-tag-list sub-' + _this2.tag.id + ' ' + (_this2.isActive ? 'active' : '') },\n                        _this2.tag.sons.map(function (son, i) {\n                            return SimpleDom.el(Tag, { tag: son, id: technicalId++, parentTag: _this2.tag, parentId: _this2.props.id });\n                        })\n                    );\n                })\n            );\n        }\n    }]);\n\n    return Tag;\n}(SimpleDom.Component);\n\nvar TagList = function (_SimpleDom$Component2) {\n    _inherits(TagList, _SimpleDom$Component2);\n\n    function TagList() {\n        _classCallCheck(this, TagList);\n\n        return _possibleConstructorReturn(this, (TagList.__proto__ || Object.getPrototypeOf(TagList)).apply(this, arguments));\n    }\n\n    _createClass(TagList, [{\n        key: 'render',\n        value: function render() {\n            var _this4 = this;\n\n            return SimpleDom.el(\n                'ul',\n                { 'class': 'main-tag-list' },\n                SimpleDom.el(\n                    'li',\n                    { 'class': 'sub-tag' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'sub-tag-name' },\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'sub-tag-name-item', style: 'flex-basis:100% !important;text-transform:uppercase;text-align:center;padding-right:20px;color:#333 !important;font-weight:500 !important;',\n                                onclick: function onclick() {\n                                    var actions = _this4.state.actions;\n                                    _this4.state.selectedActions = actions;\n                                    _this4.store.updateState({}, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');\n                                }\n                            },\n                            SimpleDom.el('span', { 'class': 'lnr lnr-layers', style: 'font-size:1.7em;margin-right:10px' }),\n                            'Tout s\\xE9lectionner'\n                        )\n                    )\n                ),\n                this.state.tags.map(function (tag) {\n                    return SimpleDom.el(Tag, { tag: tag, id: technicalId++ });\n                })\n            );\n        }\n    }]);\n\n    return TagList;\n}(SimpleDom.Component);\n\nvar SidebarAction = exports.SidebarAction = function (_SimpleDom$Component3) {\n    _inherits(SidebarAction, _SimpleDom$Component3);\n\n    function SidebarAction(props, store) {\n        _classCallCheck(this, SidebarAction);\n\n        var _this5 = _possibleConstructorReturn(this, (SidebarAction.__proto__ || Object.getPrototypeOf(SidebarAction)).call(this, props, store));\n\n        _this5.isLoading = false;\n        _this5.hasImage = true;\n        return _this5;\n    }\n\n    _createClass(SidebarAction, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['SIDEBAR_TO_UPDATE'];\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this6 = this;\n\n            if (this.isLoading) {\n                return undefined;\n            }\n            return SimpleDom.el(\n                'div',\n                { 'class': 'sidebar-action' },\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'sidebar-action-header' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'toggler-arrow', onclick: function onclick() {\n                                var elem = document.getElementsByClassName('sidebar-action')[0];\n                                elem.classList.toggle('sidebar-minified');\n                                var main = document.getElementsByClassName('boxed-layout')[0];\n                                main.classList.toggle('boxed-layout-maximized');\n                                _this6.store.updateState({ minisidebar: !_this6.state.minisidebar }, 'ACTIONS_LIST_TO_UPDATE');\n                            } },\n                        SimpleDom.el('i', { 'class': 'lnr lnr-arrow-left' })\n                    ),\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'sidebar-action-header-img' },\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'avatar-spec avatar-spec-lg',\n                                style: 'color: white; background-color: #5764c6; display:inline-flex; flex-direction: column; justify-content: center; text-align:center;' },\n                            SimpleDom.el('span', { 'class': 'lnr lnr-list' })\n                        )\n                    )\n                ),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'sidebar-action-content' },\n                    SimpleDom.el(TagList, null)\n                ),\n                SimpleDom.el('div', { 'class': 'sidebar-action-spacer' }),\n                SimpleDom.el(\n                    'div',\n                    { 'class': 'sidebar-action-footer' },\n                    SimpleDom.el(\n                        'p',\n                        { 'class': 'sidebar-action-copyright' },\n                        '\\xA9 bemychange-2017'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return SidebarAction;\n}(SimpleDom.Component);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMuanM/ODA2ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9ob21lJyk7XG5pbXBvcnQgKiBhcyBTaW1wbGVEb20gZnJvbSAnc2ltcGxlZG9tLWNvbXBvbmVudCc7XG5pbXBvcnQgeyB3aXRoVmVpbEFuZE1lc3NhZ2VzIH0gZnJvbSAnLi4vY29tcG9uZW50cy92ZWlsL3ZlaWwnO1xuXG5pbXBvcnQgJy4vc2lkZWJhckFjdGlvbnMubGVzcyc7XG5pbXBvcnQgJy4uL2Nzcy9hdmF0YXIubGVzcyc7XG5pbXBvcnQgJy4uL2Nzcy90b29sdGlwcy5sZXNzJztcblxuXG5sZXQgdGVjaG5pY2FsSWQgPSAxO1xuXG5jbGFzcyBUYWcgZXh0ZW5kcyBTaW1wbGVEb20uQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBzdG9yZSkge1xuICAgICAgICBzdXBlcihwcm9wcywgc3RvcmUpO1xuICAgICAgICB0aGlzLnRhZyA9IHRoaXMucHJvcHMudGFnO1xuICAgICAgICB0aGlzLmVkaXRNb2RlID0gdGhpcy50YWcgPT09IG51bGw7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLnN0YXRlLmFjdGl2ZVRhZ3MuaGFzKCh0aGlzLnRhZyB8fCB7fSkudGFnX3NsdWcpIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlzSGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBldmVudHNUb1N1YnNjcmliZSgpIHtcbiAgICAgICAgcmV0dXJuIFtgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLmlkfWBdO1xuICAgIH1cblxuICAgIGhhbmRsZVRhZ0FjdGl2aXR5KGV2ZW50KSB7XG4gICAgICAgICQoJy5zdWItdGFnJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9ICF0aGlzLmlzQWN0aXZlO1xuICAgICAgICBsZXQgbmV3QWN0aXZlVGFncyA9IHRoaXMuc3RhdGUuYWN0aXZlVGFncztcblxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgbmV3QWN0aXZlVGFncy5hZGQodGhpcy50YWcudGFnX3NsdWcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdBY3RpdmVUYWdzLmRlbGV0ZSh0aGlzLnRhZy50YWdfc2x1Zyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7YWN0aXZlVGFnczogbmV3QWN0aXZlVGFnc30sIGBSRUZSRVNIX1RBR18ke3RoaXMucHJvcHMuaWR9YCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzPXtgc3ViLXRhZyAke3RoaXMuc3RhdGUuYWN0aXZlVGFncy5oYXMoKHRoaXMudGFnIHx8IHt9KS50YWdfc2x1ZykgPyAnYWN0aXZlJyA6ICcnfSAke3RoaXMuaXNIaWdobGlnaHRlZCA/ICdoaWdobGlnaHRlZCc6ICcnfWB9XG4gICAgICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnN1Yi10YWcnKS5yZW1vdmVDbGFzcygnaGlnaGxpZ2h0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoISB0aGlzLmlzSGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIaWdobGlnaHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmlzSGlnaGxpZ2h0ZWQgPSAhdGhpcy5pc0hpZ2hsaWdodGVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkZpbHRlckNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRmlsdGVyQ2xpY2sodGhpcy50YWcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWdTbHVnOiB0aGlzLnRhZy50YWdfc2x1Z1xuICAgICAgICAgICAgICAgICAgICB9LCAnQUNUSU9OX1ZJRVdfVE9fVVBEQVRFJywgYFJFRlJFU0hfVEFHXyR7dGhpcy5wcm9wcy5pZH1gKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAge1NpbXBsZURvbS5wcmVkaWNhdGUoIXRoaXMuZWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNJY29uID0gdGhpcy50YWcuc29ucyAmJiB0aGlzLnRhZy5zb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGljb24gPSAhdGhpcy5pc0FjdGl2ZSA/IFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsbnIgbG5yLXBsdXMtY2lyY2xlIHN1Yi10YWctbGlzdC1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB0aGlzLmhhbmRsZVRhZ0FjdGl2aXR5KGV2ZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxzcGFuIGNsYXNzPVwibG5yIGxuci1jaXJjbGUtbWludXMgc3ViLXRhZy1saXN0LWljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB0aGlzLmhhbmRsZVRhZ0FjdGl2aXR5KGV2ZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi10YWctbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGFnLW5hbWUtaXRlbVwiPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1NpbXBsZURvbS5wcmVkaWNhdGUoaGFzSWNvbiwgKCkgPT4gaWNvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtgJHt0aGlzLnRhZy5uYW1lfSAoJHt0aGlzLnN0YXRlLmNvdW50QnlUYWdTbHVnW3RoaXMudGFnLnRhZ19zbHVnXSB8fCAwfSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGFnLWhvdmVyLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7fSwgW2BSRUZSRVNIX1RBR18ke3RoaXMucHJvcHMuaWR9YF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImhidG4tYWN0aW9uIGxuciBsbnItcGVuY2lsIHN1Yi10YWctZWRpdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFnLnNvbnMucHVzaChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVN0YXRlKHt9LCBbYFJFRlJFU0hfVEFHXyR7dGhpcy5wcm9wcy5pZH1gXSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19ICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaGJ0bi1hY3Rpb24gc3ViLXRhZy1lZGl0XCI+JiM0MztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U2ltcGxlRG9tLnByZWRpY2F0ZSghdGhpcy5zdGF0ZS5jb3VudEJ5VGFnU2x1Z1t0aGlzLnRhZy50YWdfc2x1Z10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiA8IHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoVmVpbEFuZE1lc3NhZ2VzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hKc29uRGF0YShgL3VzZXJzL3RhZ3MvZGVsZXRlLyR7dGhpcy50YWcuaWR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWV0aG9kOiAnREVMRVRFJ30pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRoZW4oKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5wYXJlbnRUYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzb25zID0gdGhpcy5wcm9wcy5wYXJlbnRUYWcuc29ucy5maWx0ZXIoc29uID0+IHNvbi5pZCAhPT0gdGhpcy50YWcuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucGFyZW50VGFnLnNvbnMgPSBzb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe30sIFtgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLnBhcmVudElkfWBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFncyA9IHRoaXMuc3RhdGUudGFncy5maWx0ZXIodGFnID0+IHRhZy5pZCAhPT0gdGhpcy50YWcuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe3RhZ3N9LCBbXCJTSURFQkFSX1RPX1VQREFURVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaGJ0bi1hY3Rpb24gbG5yIGxuci10cmFzaCBzdWItdGFnLWVkaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiA8aW5wdXQgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInN1Yi10YWctaW5wdXRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmJsdXI9e2V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNvblRhZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50X2lkOiB0aGlzLnByb3BzLnBhcmVudFRhZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiB0aGlzLnByb3BzLnBhcmVudFRhZy5yYW5rICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiBjdXJyZW50VXNlci5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhWZWlsQW5kTWVzc2FnZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hKc29uRGF0YSgnL3VzZXJzL3RhZ3MvY3JlYXRlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc29uVGFnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRoZW4oKHRhZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFnID0gdGFnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucGFyZW50VGFnLnNvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5wYXJlbnRUYWcuc29ucy5wdXNoKHRhZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe30sIFtgUkVGUkVTSF9UQUdfJHt0aGlzLnByb3BzLmlkfWBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhWZWlsQW5kTWVzc2FnZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaEpzb25EYXRhKCcvdXNlcnMvdGFncy91cGRhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IHRoaXMudGFnLmlkLCBuYW1lOiB2YWx1ZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudGhlbigodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZy5uYW1lID0gdGFnLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVN0YXRlKHt9LCBbYFJFRlJFU0hfVEFHXyR7dGhpcy5wcm9wcy5pZH1gXSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KHRoaXMudGFnIHx8IHt9KS5uYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge1NpbXBsZURvbS5wcmVkaWNhdGUodGhpcy50YWcgJiYgdGhpcy50YWcuc29ucyAmJiB0aGlzLnRhZy5zb25zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9e2BzdWItdGFnLWxpc3Qgc3ViLSR7dGhpcy50YWcuaWR9ICR7dGhpcy5pc0FjdGl2ZSA/ICdhY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMudGFnLnNvbnMubWFwKChzb24saSkgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxUYWcgdGFnPXtzb259IGlkPXt0ZWNobmljYWxJZCsrfSBwYXJlbnRUYWc9e3RoaXMudGFnfSBwYXJlbnRJZD17dGhpcy5wcm9wcy5pZH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIFRhZ0xpc3QgZXh0ZW5kcyBTaW1wbGVEb20uQ29tcG9uZW50IHtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cIm1haW4tdGFnLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzdWItdGFnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGFnLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGFnLW5hbWUtaXRlbVwiIHN0eWxlPVwiZmxleC1iYXNpczoxMDAlICFpbXBvcnRhbnQ7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmctcmlnaHQ6MjBweDtjb2xvcjojMzMzICFpbXBvcnRhbnQ7Zm9udC13ZWlnaHQ6NTAwICFpbXBvcnRhbnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnN0YXRlLmFjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRBY3Rpb25zID0gYWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7fSwgJ0FDVElPTlNfTElTVF9UT19VUERBVEUnLCAnTUFJTl9USVRMRV9UT19VUERBVEUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibG5yIGxuci1sYXllcnNcIiBzdHlsZT1cImZvbnQtc2l6ZToxLjdlbTttYXJnaW4tcmlnaHQ6MTBweFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG91dCBzw6lsZWN0aW9ubmVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS50YWdzLm1hcCh0YWcgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhZyB0YWc9e3RhZ30gaWQ9e3RlY2huaWNhbElkKyt9IC8+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNpZGViYXJBY3Rpb24gZXh0ZW5kcyBTaW1wbGVEb20uQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgc3RvcmUpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIHN0b3JlKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNJbWFnZSA9IHRydWU7XG4gICAgfVxuXG4gICAgZXZlbnRzVG9TdWJzY3JpYmUoKSB7XG4gICAgICAgIHJldHVybiBbJ1NJREVCQVJfVE9fVVBEQVRFJ107XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyLWFjdGlvbi1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZXItYXJyb3dcIiBvbmNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2lkZWJhci1hY3Rpb24nKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZWJhci1taW5pZmllZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JveGVkLWxheW91dCcpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKCdib3hlZC1sYXlvdXQtbWF4aW1pemVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVN0YXRlKHttaW5pc2lkZWJhcjogIXRoaXMuc3RhdGUubWluaXNpZGViYXJ9LCAnQUNUSU9OU19MSVNUX1RPX1VQREFURScpO1xuICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibG5yIGxuci1hcnJvdy1sZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItYWN0aW9uLWhlYWRlci1pbWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXItc3BlYyBhdmF0YXItc3BlYy1sZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJjb2xvcjogd2hpdGU7IGJhY2tncm91bmQtY29sb3I6ICM1NzY0YzY7IGRpc3BsYXk6aW5saW5lLWZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGp1c3RpZnktY29udGVudDogY2VudGVyOyB0ZXh0LWFsaWduOmNlbnRlcjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxuciBsbnItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHsvKiA8aDI+e2N1cnJlbnRVc2VyLmVtYWlsfTwvaDI+ICovfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyLWFjdGlvbi1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxUYWdMaXN0Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1hY3Rpb24tc3BhY2VyXCIvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyLWFjdGlvbi1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzaWRlYmFyLWFjdGlvbi1jb3B5cmlnaHRcIj4mY29weTsgYmVteWNoYW5nZS0yMDE3PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFQQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQWpCQTtBQW1CQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbkJBO0FBbkJBO0FBTEE7QUFpREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXZDQTtBQUFBO0FBMENBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQW5JQTtBQXVJQTs7OztBQXJLQTtBQUNBO0FBdUtBOzs7Ozs7Ozs7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBUEE7QUFBQTtBQURBO0FBREE7QUFjQTtBQUNBO0FBQ0E7QUFqQkE7QUFvQkE7Ozs7QUF4QkE7QUFDQTtBQTBCQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBVkE7QUFtQkE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBeEJBO0FBNkJBOzs7O0FBN0NBIiwic291cmNlUm9vdCI6IiJ9");

/***/ })

})