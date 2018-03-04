webpackHotUpdate_name_(0,{

/***/ 76:
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./src/actions/actionInfoSlider/actionInfoSlider.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.ActionInfo = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\n__webpack_require__(/*! ../../home */ 3);\n\nvar _simpledomComponent = __webpack_require__(/*! simpledom-component */ 1);\n\nvar SimpleDom = _interopRequireWildcard(_simpledomComponent);\n\n__webpack_require__(/*! ./actionInfoSlider.less */ 78);\n\n__webpack_require__(/*! ../../css/empty.less */ 39);\n\nvar _veil = __webpack_require__(/*! ../../components/veil/veil */ 4);\n\nvar _utils = __webpack_require__(/*! ../utils */ 30);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar moment = __webpack_require__(/*! moment */ 5);\n__webpack_require__(/*! moment/locale/fr */ 8);\nvar SimpleMDE = __webpack_require__(/*! simplemde */ 40);\n\nvar ModifiableTextArea = function (_SimpleDom$Component) {\n    _inherits(ModifiableTextArea, _SimpleDom$Component);\n\n    _createClass(ModifiableTextArea, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['ENTRY_TO_REFRESH_' + this.props.id];\n        }\n    }]);\n\n    function ModifiableTextArea(props, store) {\n        _classCallCheck(this, ModifiableTextArea);\n\n        var _this = _possibleConstructorReturn(this, (ModifiableTextArea.__proto__ || Object.getPrototypeOf(ModifiableTextArea)).call(this, props, store));\n\n        _this.editMode = _this.props.editMode || false;\n        _this.mdeEditor = undefined;\n        _this.markdownContent = _this.props.content || '';\n        _this.validateButtonText = _this.props.buttonText || 'Valider';\n        return _this;\n    }\n\n    _createClass(ModifiableTextArea, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            if (this.editMode) {\n                this.mdeEditor = new SimpleMDE({\n                    element: document.getElementById('entryEditor' + this.props.id)\n                });\n            } else {\n                var element = document.getElementById('entryTarget' + this.props.id);\n                if (this.mdeEditor) {\n                    this.markdownContent = this.mdeEditor.value();\n                }\n                element.innerHTML = SimpleMDE.prototype.markdown(this.markdownContent);\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this2 = this;\n\n            if (this.editMode) {\n                return SimpleDom.el(\n                    'div',\n                    { style: 'overflow: scroll' },\n                    SimpleDom.el(\n                        'textarea',\n                        { id: 'entryEditor' + this.props.id },\n                        this.markdownContent\n                    ),\n                    SimpleDom.el(\n                        'button',\n                        { 'class': 'btn right',\n                            onclick: function onclick() {\n                                _this2.editMode = false;\n                                _this2.markdownContent = _this2.mdeEditor.value();\n                                _this2.props.onValidate(_this2.markdownContent).then(function () {\n                                    return _this2.store.updateState({}, 'ENTRY_TO_REFRESH_' + _this2.props.id);\n                                });\n                            }\n                        },\n                        this.validateButtonText\n                    )\n                );\n            }\n            return SimpleDom.el(\n                'div',\n                { 'class': 'mde-container' },\n                SimpleDom.el(\n                    'a',\n                    { href: '#', 'class': 'hbtn hbtn-action edit-button',\n                        onClick: function onClick() {\n                            _this2.editMode = true;\n                            _this2.store.updateState({}, 'ENTRY_TO_REFRESH_' + _this2.props.id);\n                        }\n                    },\n                    SimpleDom.el('i', { 'class': 'lnr lnr-pencil' })\n                ),\n                SimpleDom.el('p', { id: 'entryTarget' + this.props.id })\n            );\n        }\n    }]);\n\n    return ModifiableTextArea;\n}(SimpleDom.Component);\n\nvar JournalEntry = function (_SimpleDom$Component2) {\n    _inherits(JournalEntry, _SimpleDom$Component2);\n\n    function JournalEntry(props, store) {\n        _classCallCheck(this, JournalEntry);\n\n        var _this3 = _possibleConstructorReturn(this, (JournalEntry.__proto__ || Object.getPrototypeOf(JournalEntry)).call(this, props, store));\n\n        _this3.entry = _this3.props.entry;\n        _this3.markdownContent = (_this3.props.entry || {}).content || '';\n        return _this3;\n    }\n\n    _createClass(JournalEntry, [{\n        key: 'render',\n        value: function render() {\n            var _this4 = this;\n\n            technicalId++;\n            return SimpleDom.el(\n                'li',\n                { 'class': 'collection-item', style: 'position: relative' },\n                SimpleDom.el(\n                    'span',\n                    { 'class': 'title' },\n                    moment(this.entry.created_at).format('dddd DD MMMM YYYY') || moment().format('dddd DD MMMM YYYY')\n                ),\n                SimpleDom.el(ModifiableTextArea, {\n                    id: technicalId,\n                    content: this.markdownContent,\n                    onValidate: function onValidate(markdownContent) {\n                        return (0, _veil.withVeilAndMessages)(fetchJsonData('/users/actions/0/commentaries', {\n                            method: 'PUT',\n                            body: JSON.stringify({\n                                content: markdownContent,\n                                commentaryId: _this4.entry.id\n                            })\n                        }), true).then(function (commentary) {\n                            return _this4.entry = commentary;\n                        });\n                    }\n                })\n            );\n        }\n    }]);\n\n    return JournalEntry;\n}(SimpleDom.Component);\n\nvar technicalId = 0;\n\nvar JournalEntries = function (_SimpleDom$Component3) {\n    _inherits(JournalEntries, _SimpleDom$Component3);\n\n    _createClass(JournalEntries, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['JOURNAL_ENTRIES_TO_REFRESH'];\n        }\n    }]);\n\n    function JournalEntries(props, store) {\n        _classCallCheck(this, JournalEntries);\n\n        var _this5 = _possibleConstructorReturn(this, (JournalEntries.__proto__ || Object.getPrototypeOf(JournalEntries)).call(this, props, store));\n\n        _this5.editMode = false;\n        _this5.entries = _this5.props.entries;\n        console.log(_this5.entries);\n        return _this5;\n    }\n\n    _createClass(JournalEntries, [{\n        key: 'render',\n        value: function render() {\n            var _this6 = this;\n\n            return SimpleDom.el(\n                'div',\n                { 'class': 'action-info-journal' },\n                SimpleDom.predicate(this.entries.length, function () {\n                    return SimpleDom.el(\n                        'ul',\n                        { 'class': 'collection action-info-journal-list' },\n                        _this6.entries.map(function (entry) {\n                            return SimpleDom.el(JournalEntry, { entry: entry });\n                        })\n                    );\n                }, function () {\n                    return SimpleDom.el(\n                        'section',\n                        { 'class': 'empty' },\n                        SimpleDom.el(\n                            'div',\n                            { 'class': 'empty-icon' },\n                            SimpleDom.el('i', { 'class': 'lnr lnr-rocket fa-3x' })\n                        ),\n                        SimpleDom.el(\n                            'h4',\n                            { 'class': 'empty-title' },\n                            'Votre journal est encore vide...'\n                        ),\n                        SimpleDom.el(\n                            'p',\n                            { 'class': 'empty-subtitle' },\n                            'Ecrivez votre premier ressenti !'\n                        )\n                    );\n                }),\n                SimpleDom.predicate(this.editMode, function () {\n                    return SimpleDom.el(ModifiableTextArea, {\n                        id: technicalId++,\n                        content: '',\n                        editMode: true,\n                        onValidate: function onValidate(markdownContent) {\n                            _this6.editMode = false;\n                            var journal = {\n                                content: markdownContent,\n                                action_id: _this6.props.userAction.action_id,\n                                is_journal: true\n                            };\n                            return (0, _veil.withVeilAndMessages)(fetchJsonData('/users/actions/' + _this6.props.userAction.action_id + '/commentaries', {\n                                method: 'POST',\n                                body: JSON.stringify(journal)\n                            }), true).then(function (commentary) {\n                                _this6.entries.push(commentary);\n                                _this6.store.updateState({}, 'JOURNAL_ENTRIES_TO_REFRESH');\n                            });\n                        } });\n                }, function () {\n                    return SimpleDom.el(\n                        'a',\n                        { 'class': 'hbtn hbtn-action', onclick: function onclick() {\n                                _this6.editMode = true;\n                                _this6.store.updateState({}, 'JOURNAL_ENTRIES_TO_REFRESH');\n                            } },\n                        '+'\n                    );\n                })\n            );\n        }\n    }]);\n\n    return JournalEntries;\n}(SimpleDom.Component);\n\nvar ActionInfo = exports.ActionInfo = function (_SimpleDom$Component4) {\n    _inherits(ActionInfo, _SimpleDom$Component4);\n\n    _createClass(ActionInfo, [{\n        key: 'eventsToSubscribe',\n        value: function eventsToSubscribe() {\n            return ['ACTION_INFO_TO_REFRESH'];\n        }\n    }]);\n\n    function ActionInfo(props, store) {\n        _classCallCheck(this, ActionInfo);\n\n        var _this7 = _possibleConstructorReturn(this, (ActionInfo.__proto__ || Object.getPrototypeOf(ActionInfo)).call(this, props, store));\n\n        _this7.userAction = _this7.props.userAction;\n        _this7.action = _this7.userAction.action;\n        store.updateState({ journalEntries: _this7.props.journalEntries });\n        _this7.journalEntries = _this7.props.journalEntries;\n        _this7.descriptionContentAsText = _this7.action.description || '';\n        _this7.mdeDescriptionEditor = undefined;\n        return _this7;\n    }\n\n    _createClass(ActionInfo, [{\n        key: 'render',\n        value: function render() {\n            var _this8 = this;\n\n            return SimpleDom.el(\n                'div',\n                { 'class': 'action-info' },\n                SimpleDom.el(\n                    'h4',\n                    { 'class': 'action-info-title' },\n                    this.action.title\n                ),\n                SimpleDom.el(\n                    'h6',\n                    { 'class': 'action-info-subtitle' },\n                    'Description'\n                ),\n                SimpleDom.el(ModifiableTextArea, {\n                    id: technicalId++,\n                    content: this.descriptionContentAsText,\n                    onValidate: function onValidate(markdownContent) {\n                        return (0, _veil.withVeilAndMessages)(fetchJsonData('/users/actions/create', {\n                            method: 'PUT',\n                            body: JSON.stringify({\n                                actionDescription: markdownContent,\n                                actionId: _this8.action.id\n                            })\n                        })).then(function () {\n                            _this8.userAction.action.description = markdownContent;\n                            _this8.store.updateState({}, 'ACTION_INFO_TO_REFRESH');\n                        });\n                    }\n                }),\n                SimpleDom.el(\n                    'h6',\n                    { 'class': 'action-info-subtitle' },\n                    'Journal'\n                ),\n                SimpleDom.el(JournalEntries, {\n                    entries: this.journalEntries,\n                    userAction: this.userAction\n                }),\n                SimpleDom.el(\n                    'h6',\n                    { 'class': 'action-info-subtitle' },\n                    'Tags'\n                ),\n                SimpleDom.el(\n                    'div',\n                    { style: 'position: relative; min-height: 50px;' },\n                    SimpleDom.el(\n                        'div',\n                        { 'class': 'card-image-tag',\n                            onclick: function onclick(e) {\n                                e.preventDefault();\n                                e.stopPropagation();\n                                //$(`#card-edit-tag-${this.userAction.id}`).modal('open');\n                            } },\n                        (0, _utils.getFullTag)(this.userAction, this.props.tags)\n                    ),\n                    SimpleDom.el(\n                        'a',\n                        { href: '#', 'class': 'hbtn hbtn-action' },\n                        '+'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return ActionInfo;\n}(SimpleDom.Component);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FjdGlvbnMvYWN0aW9uSW5mb1NsaWRlci9hY3Rpb25JbmZvU2xpZGVyLmpzPzIzYzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9ob21lJztcbmltcG9ydCAqIGFzIFNpbXBsZURvbSBmcm9tICdzaW1wbGVkb20tY29tcG9uZW50JztcblxuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5yZXF1aXJlKCdtb21lbnQvbG9jYWxlL2ZyJyk7XG5jb25zdCBTaW1wbGVNREUgPSByZXF1aXJlKCdzaW1wbGVtZGUnKTtcblxuaW1wb3J0ICcuL2FjdGlvbkluZm9TbGlkZXIubGVzcyc7XG5pbXBvcnQgJy4uLy4uL2Nzcy9lbXB0eS5sZXNzJztcbmltcG9ydCB7d2l0aFZlaWxBbmRNZXNzYWdlc30gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvdmVpbC92ZWlsXCI7XG5pbXBvcnQge2dldEZ1bGxUYWd9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5cbmNsYXNzIE1vZGlmaWFibGVUZXh0QXJlYSBleHRlbmRzIFNpbXBsZURvbS5Db21wb25lbnQge1xuXG4gICAgZXZlbnRzVG9TdWJzY3JpYmUoKSB7XG4gICAgICAgIHJldHVybiBbYEVOVFJZX1RPX1JFRlJFU0hfJHt0aGlzLnByb3BzLmlkfWBdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzLHN0b3JlKSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBzdG9yZSk7XG4gICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0aGlzLnByb3BzLmVkaXRNb2RlIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLm1kZUVkaXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tYXJrZG93bkNvbnRlbnQgPSB0aGlzLnByb3BzLmNvbnRlbnQgfHwgJyc7XG4gICAgICAgIHRoaXMudmFsaWRhdGVCdXR0b25UZXh0ID0gdGhpcy5wcm9wcy5idXR0b25UZXh0IHx8ICdWYWxpZGVyJztcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMubWRlRWRpdG9yID0gbmV3IFNpbXBsZU1ERSh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGVudHJ5RWRpdG9yJHt0aGlzLnByb3BzLmlkfWApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZW50cnlUYXJnZXQke3RoaXMucHJvcHMuaWR9YCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tZGVFZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtkb3duQ29udGVudCA9IHRoaXMubWRlRWRpdG9yLnZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFNpbXBsZU1ERS5wcm90b3R5cGUubWFya2Rvd24odGhpcy5tYXJrZG93bkNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6IHNjcm9sbFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgaWQ9e2BlbnRyeUVkaXRvciR7dGhpcy5wcm9wcy5pZH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLm1hcmtkb3duQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgPC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biByaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2Rvd25Db250ZW50ID0gdGhpcy5tZGVFZGl0b3IudmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbGlkYXRlKHRoaXMubWFya2Rvd25Db250ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7fSwgYEVOVFJZX1RPX1JFRlJFU0hfJHt0aGlzLnByb3BzLmlkfWApKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnZhbGlkYXRlQnV0dG9uVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJoYnRuIGhidG4tYWN0aW9uIGVkaXQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVN0YXRlKHt9LCBgRU5UUllfVE9fUkVGUkVTSF8ke3RoaXMucHJvcHMuaWR9YClcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJsbnIgbG5yLXBlbmNpbFwiLz5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPHAgaWQ9e2BlbnRyeVRhcmdldCR7dGhpcy5wcm9wcy5pZH1gfT5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuY2xhc3MgSm91cm5hbEVudHJ5IGV4dGVuZHMgU2ltcGxlRG9tLkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyxzdG9yZSkge1xuICAgICAgICBzdXBlcihwcm9wcywgc3RvcmUpO1xuICAgICAgICB0aGlzLmVudHJ5ID0gdGhpcy5wcm9wcy5lbnRyeTtcbiAgICAgICAgdGhpcy5tYXJrZG93bkNvbnRlbnQgPSAodGhpcy5wcm9wcy5lbnRyeSB8fCB7fSkuY29udGVudCB8fCAnJztcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRlY2huaWNhbElkKys7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAge21vbWVudCh0aGlzLmVudHJ5LmNyZWF0ZWRfYXQpLmZvcm1hdCgnZGRkZCBERCBNTU1NIFlZWVknKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50KCkuZm9ybWF0KCdkZGRkIEREIE1NTU0gWVlZWScpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8TW9kaWZpYWJsZVRleHRBcmVhXG4gICAgICAgICAgICAgICAgICAgIGlkPXt0ZWNobmljYWxJZH1cbiAgICAgICAgICAgICAgICAgICAgY29udGVudD17dGhpcy5tYXJrZG93bkNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgIG9uVmFsaWRhdGU9e21hcmtkb3duQ29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2l0aFZlaWxBbmRNZXNzYWdlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaEpzb25EYXRhKGAvdXNlcnMvYWN0aW9ucy8wL2NvbW1lbnRhcmllc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogbWFya2Rvd25Db250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudGFyeUlkOiB0aGlzLmVudHJ5LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgKS50aGVuKGNvbW1lbnRhcnkgPT4gdGhpcy5lbnRyeSA9IGNvbW1lbnRhcnkpXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5sZXQgdGVjaG5pY2FsSWQgPSAwO1xuY2xhc3MgSm91cm5hbEVudHJpZXMgZXh0ZW5kcyBTaW1wbGVEb20uQ29tcG9uZW50IHtcblxuICAgIGV2ZW50c1RvU3Vic2NyaWJlKCkge1xuICAgICAgICByZXR1cm4gWydKT1VSTkFMX0VOVFJJRVNfVE9fUkVGUkVTSCddO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBzdG9yZSkge1xuICAgICAgICBzdXBlcihwcm9wcywgc3RvcmUpO1xuICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW50cmllcyA9IHRoaXMucHJvcHMuZW50cmllcztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lbnRyaWVzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWluZm8tam91cm5hbFwiPlxuICAgICAgICAgICAgICAgIHtTaW1wbGVEb20ucHJlZGljYXRlKHRoaXMuZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IDx1bCBjbGFzcz1cImNvbGxlY3Rpb24gYWN0aW9uLWluZm8tam91cm5hbC1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5lbnRyaWVzLm1hcChlbnRyeSA9PiA8Sm91cm5hbEVudHJ5IGVudHJ5PXtlbnRyeX0vPil9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibG5yIGxuci1yb2NrZXQgZmEtM3hcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJlbXB0eS10aXRsZVwiPlZvdHJlIGpvdXJuYWwgZXN0IGVuY29yZSB2aWRlLi4uPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJlbXB0eS1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWNyaXZleiB2b3RyZSBwcmVtaWVyIHJlc3NlbnRpICFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtTaW1wbGVEb20ucHJlZGljYXRlKHRoaXMuZWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1vZGlmaWFibGVUZXh0QXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17dGVjaG5pY2FsSWQrK31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD17Jyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbGlkYXRlPXttYXJrZG93bkNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgam91cm5hbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBtYXJrZG93bkNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uX2lkOiB0aGlzLnByb3BzLnVzZXJBY3Rpb24uYWN0aW9uX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX2pvdXJuYWw6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2l0aFZlaWxBbmRNZXNzYWdlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaEpzb25EYXRhKGAvdXNlcnMvYWN0aW9ucy8ke3RoaXMucHJvcHMudXNlckFjdGlvbi5hY3Rpb25faWR9L2NvbW1lbnRhcmllc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGpvdXJuYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS50aGVuKGNvbW1lbnRhcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50cmllcy5wdXNoKGNvbW1lbnRhcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlU3RhdGUoe30sICdKT1VSTkFMX0VOVFJJRVNfVE9fUkVGUkVTSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gPGEgY2xhc3M9XCJoYnRuIGhidG4tYWN0aW9uXCIgb25jbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVN0YXRlKHt9LCAnSk9VUk5BTF9FTlRSSUVTX1RPX1JFRlJFU0gnKTtcbiAgICAgICAgICAgICAgICAgICAgfX0+KzwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uSW5mbyBleHRlbmRzIFNpbXBsZURvbS5Db21wb25lbnQge1xuICAgIGV2ZW50c1RvU3Vic2NyaWJlKCkge1xuICAgICAgICByZXR1cm4gWydBQ1RJT05fSU5GT19UT19SRUZSRVNIJ107XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMsIHN0b3JlKSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBzdG9yZSk7XG4gICAgICAgIHRoaXMudXNlckFjdGlvbiA9IHRoaXMucHJvcHMudXNlckFjdGlvbjtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSB0aGlzLnVzZXJBY3Rpb24uYWN0aW9uO1xuICAgICAgICBzdG9yZS51cGRhdGVTdGF0ZSh7am91cm5hbEVudHJpZXM6IHRoaXMucHJvcHMuam91cm5hbEVudHJpZXN9KTtcbiAgICAgICAgdGhpcy5qb3VybmFsRW50cmllcyA9IHRoaXMucHJvcHMuam91cm5hbEVudHJpZXM7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25Db250ZW50QXNUZXh0ID0gdGhpcy5hY3Rpb24uZGVzY3JpcHRpb24gfHwgJyc7XG4gICAgICAgIHRoaXMubWRlRGVzY3JpcHRpb25FZGl0b3IgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1pbmZvXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiYWN0aW9uLWluZm8tdGl0bGVcIj57dGhpcy5hY3Rpb24udGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICA8aDYgY2xhc3M9XCJhY3Rpb24taW5mby1zdWJ0aXRsZVwiPkRlc2NyaXB0aW9uPC9oNj5cbiAgICAgICAgICAgICAgICA8TW9kaWZpYWJsZVRleHRBcmVhXG4gICAgICAgICAgICAgICAgICAgIGlkPXt0ZWNobmljYWxJZCsrfVxuICAgICAgICAgICAgICAgICAgICBjb250ZW50PXt0aGlzLmRlc2NyaXB0aW9uQ29udGVudEFzVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgb25WYWxpZGF0ZT17bWFya2Rvd25Db250ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aXRoVmVpbEFuZE1lc3NhZ2VzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoSnNvbkRhdGEoJy91c2Vycy9hY3Rpb25zL2NyZWF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uRGVzY3JpcHRpb246IG1hcmtkb3duQ29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbklkOiB0aGlzLmFjdGlvbi5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckFjdGlvbi5hY3Rpb24uZGVzY3JpcHRpb24gPSBtYXJrZG93bkNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVTdGF0ZSh7fSwgJ0FDVElPTl9JTkZPX1RPX1JFRlJFU0gnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxoNiBjbGFzcz1cImFjdGlvbi1pbmZvLXN1YnRpdGxlXCI+Sm91cm5hbDwvaDY+XG4gICAgICAgICAgICAgICAgPEpvdXJuYWxFbnRyaWVzXG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXM9e3RoaXMuam91cm5hbEVudHJpZXN9XG4gICAgICAgICAgICAgICAgICAgIHVzZXJBY3Rpb249e3RoaXMudXNlckFjdGlvbn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxoNiBjbGFzcz1cImFjdGlvbi1pbmZvLXN1YnRpdGxlXCI+VGFnczwvaDY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgbWluLWhlaWdodDogNTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2UtdGFnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoYCNjYXJkLWVkaXQtdGFnLSR7dGhpcy51c2VyQWN0aW9uLmlkfWApLm1vZGFsKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Z2V0RnVsbFRhZyh0aGlzLnVzZXJBY3Rpb24sIHRoaXMucHJvcHMudGFncyl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiaGJ0biBoYnRuLWFjdGlvblwiPis8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9hY3Rpb25zL2FjdGlvbkluZm9TbGlkZXIvYWN0aW9uSW5mb1NsaWRlci5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7O0FBUkE7QUFDQTtBQUNBO0FBQ0E7QUFPQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBTkE7QUFRQTtBQVJBO0FBSkE7QUFnQkE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFOQTtBQVFBO0FBVEE7QUFhQTs7OztBQTlEQTtBQUNBO0FBaUVBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQVFBO0FBQUE7QUFDQTtBQWRBO0FBTEE7QUF1QkE7Ozs7QUFsQ0E7QUFDQTtBQW9DQTtBQUNBO0FBQUE7Ozs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFLQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMQTtBQVVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFFQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBOUNBO0FBcURBOzs7O0FBcEVBO0FBQ0E7QUFzRUE7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFRQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQWhCQTtBQWtCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVEE7QUEzQkE7QUF3Q0E7Ozs7QUF6REEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ })

})