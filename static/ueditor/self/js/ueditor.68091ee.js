!
		function() {
			var t = UE.dom.domUtils,
					e = (baidu.editor.ui.uiUtils, UE.utils);
			t.getTextContent = function(t) {
				return "undefined" != typeof t.textContent ? t.textContent : t.innerText
			}, t.getPreviousNode = function(t, e) {
				for (var i, o = function(t) {
					("function" != typeof e || e(t)) && (i = t)
				};;) {
					if ("function" == typeof e && !e(t)) break;
					if (t.previousSibling) {
						o(t.previousSibling);
						break
					}
					if (!t.parentNode) break;
					if (t.parentNode.previousSibling) {
						o(t.parentNode.previousSibling);
						break
					}
					t = t.parentNode
				}
				return i
			}, t.deepTraversal = function(t, e, i, o, n) {
				if (t === e) return void(t && o(t));
				var r, s, l, p, a, d = [],
						h = [],
						u = function(t) {
							return t && -1 === h.indexOf(t) && ("function" != typeof i || i(t)) ? (h.push(t), t && d.push(t), e === t ? !0 : void 0) : void 0
						};
				for (u(t); d.length;) {
					if (r = d.pop(), p = r.nextSibling, a = r.parentNode, "function" == typeof n && n(r)) return;
					if (r.childNodes.length) for (s = 0, l = r.childNodes.length; l > s && !u(r.childNodes[s]); s++);
					p ? u(p) : a && u(a)
				}
				for (s = 0, l = h.length; l > s; s++) o(h[s])
			}, t.splitNode = function(e, i) {
				for (var o, n, r, s = t.getNodeIndex(e), l = e; l.parentNode !== i && l.parentNode;) {
					for (n = l.parentNode, r = o, o = n.cloneNode(), r && 0 !== r.childNodes.length && o.appendChild(r); n.childNodes[s + 1];) o.appendChild(n.childNodes[s + 1]);
					s = t.getNodeIndex(l), l = l.parentNode
				}
				var p = i.cloneNode();
				for (o && 0 !== o.childNodes.length && p.appendChild(o); i.childNodes[s + 1];) r = i.childNodes[s + 1], r && !t.isEmptyContentNode(r) ? p.appendChild(r) : s++;
				0 !== p.childNodes.length && t.insertAfter(i, p), t.insertAfter(i, e)
			}, t.renameNode = function(t, e) {
				var i = document.createElement(e);
				for (var o in t.attributes) t.attributes.hasOwnproperty && i.setAttribute(o, t.attributes[o]);
				for (; t.firstChild;) i.appendChild(t.firstChild);
				return i
			}, t.isZeroWidthSpace = function(t) {
				return 1 === t.length && 8203 === t.charCodeAt(0)
			}, t.isEmptyContentNode = function(e) {
				var i = t.getTextContent(e);
				return "undefined" == typeof i || null === i ? !0 : (i = i.trim(), 0 === i.length || t.isZeroWidthSpace(i))
			}, t.isEmptyUNode = function(e) {
				var i = ["iframe", "img", "hr"].some(function(t) {
					return 0 !== e.getNodesByTagName(t).length
				});
				if (!i) {
					var o = e.innerText();
					i = 0 !== o.length && !t.isZeroWidthSpace(o)
				}
				return !i
			}, t.isFirstChild = function(t, e) {
				for (; t.firstChild;) {
					if (t.firstChild === e) return !0;
					t = t.firstChild
				}
				return !1
			}, t.getElementsByClassName = function(t, e) {
				var i;
				return t.querySelectorAll ? i = t.querySelectorAll("." + e) : t.getElementsByClassName && (i = t.getElementsByClassName(e)), i && (i = Array.prototype.slice.call(i)), i
			}, UE.uNode.prototype.hasClass = function(t) {
				var e = this.getAttr("class"),
						i = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
				return i.test(e)
			}, e.htmlEncode = function(t) {
				var e = "";
				return 0 == t.length ? "" : (e = t.replace(/&/g, "&gt;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = e.replace(/ /g, "&nbsp;"), e = e.replace(/\'/g, "&#39;"), e = e.replace(/\"/g, "&quot;"), e = e.replace(/\n/g, "<br>"))
			}, e.htmlDecode = function(t) {
				var e = "";
				return 0 == t.length ? "" : (e = t.replace(/&gt;/g, "&"), e = e.replace(/&lt;/g, "<"), e = e.replace(/&gt;/g, ">"), e = e.replace(/&nbsp;/g, " "), e = e.replace(/&#39;/g, "'"), e = e.replace(/&quot;/g, '"'), e = e.replace(/&amp;/g, "&"), e = e.replace(/<br>/g, "\n"))
			}, String.prototype.trim || (String.prototype.trim = function() {
				return this.replace(/^[\s??]+|[\s??]+$/g, "")
			}), Array.prototype.some || (Array.prototype.some = function(t) {
				"use strict";
				if (null == this) throw new TypeError("Array.prototype.some called on null or undefined");
				if ("function" != typeof t) throw new TypeError;
				for (var e = Object(this), i = e.length >>> 0, o = arguments.length >= 2 ? arguments[1] : void 0, n = 0; i > n; n++) if (n in e && t.call(o, e[n], n, e)) return !0;
				return !1
			})
		}(), function() {
	var t = UE.ui,
			e = t.uiUtils,
			i = UE.dom.domUtils,
			o = t.AttachPopup = function(t, e, i) {
				this.name = t, this.editor = e, this.options = i || {}, this.init()
			};
	o.prototype.init = function() {
		this.initOptions({}), this.el = this.render(), this.bindEvents()
	}, o.prototype.render = function() {
		var t = this.formatHtml(this.getHtml()),
				o = e.createElementByHtml(t);
		return e.getFixedLayer().appendChild(o), i.setStyles(o, {
			position: "absolute",
			"z-index": "1",
			width: this.options.width || "auto",
			height: this.options.height || "auto"
		}), o
	}, o.prototype.bindEvents = function() {
		var t = this.refresh.bind(this);
		i.on(this.editor.body, "keyup", t), i.on(this.editor.window, "scroll", t), i.on(window, "scroll", t), i.on(window, "resize", t)
	}, o.prototype.getHtml = function() {
		var t = this.options;
		return '<div id="##" class="edui-popup ' + (t.className || "") + " %%" + (t.containerClass || "") + '" > <div id="##_body" class="edui-popup-body"> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + ("function" == typeof t.tpl ? t.tpl() : t.tpl) + "  </div> </div></div>"
	}, o.prototype.setDisplay = function(t) {
		this.isShow = !! t, this.el.style.display = t ? "block" : "none"
	}, o.prototype.show = function(t) {
		this.target = t, this.active = !0, this.setDisplay(!0), this.refresh()
	}, o.prototype.hide = function() {
		this.isShow = !1, this.setDisplay(!1), this.active = !1
	}, o.prototype.refresh = function() {
		function t(t, e, i, o, n) {
			switch (t) {
				case "before":
					return e - o + n;
				case "top":
					return e + n;
				case "middle":
					return e + (i - o) / 2 + n;
				case "bottom":
					return e + i - o + n;
				case "after":
					return e + i + n
			}
		}
		if (this.active) {
			var i, o = this.editor,
					n = this.options,
					r = e.getClientRect(this.target),
					s = e.getClientRect(this.el),
					l = e.getClientRect(this.editor.iframe),
					p = n.marginTop || 0,
					a = n.marginLeft || 0;
			if ("function" == typeof n.position) i = n.position(r, s);
			else {
				var d = n.position || {};
				i = {
					top: t(d.top || "after", r.top, r.height, s.height, p),
					left: t(d.left || "bottom", r.left, r.width, s.width, a)
				}
			}
			if (!this.lastStyle || this.lastStyle.top !== i.top || this.lastStyle.left !== i.left) {
				if (n.view && "undefined" != typeof n.view.top) {
					if (-1 !== n.view.top && n.view.top > i.top) return void(this.isShow && this.setDisplay(!1));
					if (-1 === n.view.top) {
						var h = o.ui.toolbars[0];
						if (h && (h = h.getDom().parentNode)) {
							var u = e.getClientRect(h);
							if (u.bottom > i.top) return void(this.isShow && this.setDisplay(!1))
						}
					}!this.isShow && this.setDisplay(!0)
				} else!this.isShow && this.setDisplay(!0);
				if (n.view && "undefined" != typeof n.view.bottom) {
					if (-1 !== n.view.bottom && n.view.bottom < i.top + s.height) return void(this.isShow && this.setDisplay(!1));
					if (-1 === n.view.bottom && l.bottom < i.top) return void(this.isShow && this.setDisplay(!1));
					!this.isShow && this.setDisplay(!0)
				} else!this.isShow && this.setDisplay(!0);
				i.top = i.top + "px", i.left = i.left + "px", UE.dom.domUtils.setStyles(this.el, i), this.lastStyle = i
			}
		}
	}, o.prototype.destroy = function() {}, UE.utils.inherits(o, t.UIBase)
}();;
!
		function() {
			function e(e) {
				var n = ["IFRAME"];
				return -1 !== n.indexOf(e.tagName) ? !0 : t.isBlockElm(e)
			}
			var t = UE.dom.domUtils,
					n = baidu.editor.ui.uiUtils,
					r = UE.utils,
					a = {
						img: {
							selectBeforeCheck: function(e) {
								var n = t.findParentByTagName(e, "P");
								return n ? n : e
							}
						},
						iframe: {
							selectBeforeCheck: function(e) {
								return 1 !== e.parentNode.children.length ? e.parentNode : e.parentNode
							}
						},
						p: {
							checker: function(e, n) {
								var r = a["*"].checker(e, n);
								return r && "P" === r.tagName ? r : t.hasClass(e, n.options.imgCaptionClass) ? r : null
							}
						},
						hr: {
							filter: !0
						},
						ol: {
							checker: function(e, t) {
								var n = a["*"].checker(e, t);
								return n && "BLOCKQUOTE" === n.tagName ? null : n
							}
						},
						ul: {
							checker: function(e, t) {
								var n = a["*"].checker(e, t);
								return n && "BLOCKQUOTE" === n.tagName ? null : n
							}
						},
						li: {
							checker: function(e, t) {
								var n = a["*"].checker(e, t);
								return n && -1 !== ["UL", "OL"].indexOf(n.tagName) ? null : n
							}
						},
						"*": {
							filter: function(t) {
								return e(t)
							},
							checker: function(r, a) {
								var o = t.findParent(r, function(t) {
									return e(t) && n.contains(a.body, t)
								});
								return o
							},
							handle: function(e, t, n, r, o) {
								var i = a["*"],
										s = i.cmdTagMap[n[0]];
								"function" == typeof s && (s = s(n[0], n[1]));
								var c;
								return i.notAllowHandleNode.some(function(t) {
									return "function" == typeof t ? t(e, r) : e.tagName === t.toUpperCase()
								}) ? void 0 : (i.notAllowReplaceNode.some(function(t) {
									return "function" == typeof t ? t(e, r) : e.tagName === t.toUpperCase()
								}) ? c = "extract" : "*" === s || e.tagName.toLowerCase() === s ? c = "extract" : t.tagName.toLowerCase() === s && (c = "replace"), "function" == typeof i[c] ? i[c](e, t, n, r, o) : void 0)
							},
							extract: function(e, n) {
								function r(e) {
									for (;
											"BODY" !== e.parentNode.tagName;) e = e.parentNode;
									return e
								}
								var a = r(n);
								return t.splitNode(e, a), {
									removedNodeList: [n]
								}
							},
							replace: function(e, n, r, a, o) {
								var i = t.renameNode(e, "p");
								e.parentNode.insertBefore(i, e), o(e, i, !0)
							},
							cmdTagMap: {
								blockquote: "blockquote",
								paragraph: function(e, t) {
									return t[1]
								},
								commodity: "div",
								insertimage: "p",
								horizontal: "hr",
								insertunorderedlist: "li",
								insertorderedlist: "li"
							},
							notAllowReplaceNode: ["div", "iframe", "ul", "ol", function(e) {
								return 0 !== e.getElementsByTagName("img").length
							}, function(e) {
								return 0 !== e.getElementsByTagName("iframe").length
							}, function(e, n) {
								return t.hasClass(e, n.options.imgCaptionClass)
							}],
							notAllowHandleNode: [function(e) {
								return t.findParent(e, function(e) {
									return "false" === e.getAttribute("contenteditable") || /(^|\s+)audio[_a-zA-Z]*(\s+|$)/.test(e.className)
								})
							}]
						}
					};
			UE.plugins.reformat = function() {
				function e(e, a, o, s, c) {
					function f(e, t) {
						var r = "start" === t ? e.startContainer : e.endContainer,
								a = "start" === t ? e.startOffset : e.endOffset;
						if (e.startContainer === e.endContainer) {
							if (r.nodeType === r.TEXT_NODE) return r.parentNode;
							var o = r.childNodes.length,
									i = e.endOffset - e.startOffset;
							if (0 === i) return r;
							if (0 === e.startOffset && 1 === i) {
								if (o === i && e.startContainer.childNodes[0].nodeType === e.startContainer.TEXT_NODE) return r;
								if (2 === o && e.startContainer.lastChild && "<br>" === e.startContainer.lastChild.outerHTML) return r
							}
						}
						return n.contains(e.startContainer, e.endContainer) ? "start" === t ? e.startContainer.childNodes[0] : e.endContainer : (r = e.collapsed ? r : r.nodeType === r.TEXT_NODE ? r : 0 === r.childNodes.length ? r : r.childNodes[0 === a ? 0 : a - 1], 0 !== r.childNodes.length ? "start" === t ? r.firstChild : r.lastChild : r)
					}
					var d = c["*"];
					o = {
						startContainer: o.startContainer,
						endContainer: o.endContainer,
						startOffset: o.startOffset,
						endOffset: o.endOffset,
						collapsed: o.collapsed
					};
					var l = !1,
							u = !1,
							p = function(e, n, r) {
								function a(e) {
									return e.nodeType === e.TEXT_NODE ? e.length : e.childNodes.length
								}
								if (e === o.startContainer) {
									l = !0; {
										o.startContainer
									}
									o.startContainer = n ? n : t.getNextDomNode(e), r || (o.startOffset = 0)
								}
								e === o.endContainer && (l = !0, o.endContainer = n ? n : t.getPreviousNode(o.endContainer, function(e) {
									return i.body.contains(e) && i.body !== e
								}), r || (o.endOffset = a(o.endContainer))), t.remove(e)
							};
					r.each(a, function(a) {
						var o = f(a, "start"),
								i = f(a, "end");
						t.deepTraversal(o, i, function(e) {
							return n.contains(s.body, e)
						}, function(n) {
							var a = n.nodeType === n.TEXT_NODE ? "text" : n.tagName.toLowerCase(),
									o = c[a] || d,
									i = o.filter || d.filter,
									f = o.checker || d.checker,
									l = o.handle || d.handle,
									C = o.selectBeforeCheck || d.selectBeforeCheck,
									h = o.selectAfterCheck || d.selectAfterCheck;
							if (i !== !1 && (i === !0 || (("function" == typeof i || "string" == typeof i) && (i = [i]), i.some(function(e) {
										return "function" == typeof e ? e(n, s) : n.tagName === e.toUpperCase()
									})))) {
								"function" == typeof C && (n = C(n, s));
								var m = f(n, s);
								if (m) {
									"function" == typeof h && (n = h(n, s)), u = !0;
									var g = l(n, m, e, s, p);
									g && g.removedNodeList && r.each(g.removedNodeList, function(e) {
										for (var n; e && "BODY" !== e.tagName && t.isEmptyContentNode(e);) n = e, e = e.parentNode, p(n)
									})
								}
							}
						})
					});
					var C = [function(e) {
						return !e.isContentEditable
					}, function(e) {
						return 0 !== e.getElementsByTagName("iframe").length
					}];
					if (C.some(function(e) {
								return "function" == typeof e ? e(s.body.lastChild) : s.body.lastChild.tagName === e.toUpperCase()
							})) {
						var h = t.createElement(s.document, "p");
						h.innerHTML = "<br>", s.body.appendChild(h)
					}
					u && (s.selection.clearRange(), range = new UE.dom.Range(s.document), range.setStart(o.startContainer, o.startOffset), range.setEnd(o.endContainer, o.endOffset), range.select())
				}
				function o() {
					s = []
				}
				var i = this,
						s = [];
				i.addListener("afterExecCommand", function() {
					try {
						var r = i.selection.getRange().cloneRange();
						s.push(r);
						var c = t.getPreviousNode(r.startContainer, function(e) {
							return n.contains(i.body, e)
						});
						c && c && s.push({
							startContainer: c,
							endContainer: c,
							startOffset: 0,
							endOffset: c.childNodes.length,
							collapsed: !0
						}), e([].slice.call(arguments, 1), s, r, i, a), o()
					} catch (f) {}
				})
			}
		}();;
!
		function() {
			var n = UE.dom.domUtils,
					e = baidu.editor.ui.uiUtils,
					t = (UE.utils, {
						"*": {
							inStrictP: !0,
							noIframe: !0
						},
						insertimage: {
							onlyTopLevel: !0,
							onlyInP: !0
						},
						upload_video: {
							onlyTopLevel: !0,
							onlyInP: !0
						},
						audio: {
							onlyTopLevel: !0,
							onlyInP: !0
						},
						commodity: {
							onlyTopLevel: !0,
							onlyInP: !0
						},
						create_vote: {
							onlyTopLevel: !0,
							onlyInP: !0
						},
						undo: {
							inStrictP: !1
						},
						redo: {
							inStrictP: !1
						},
						inserthtml: {
							inStrictP: !1
						},
						insertcode: {
							onlyTopLevel: !0,
							onlyInP: !0
						}
					}),
					o = ["insertcode", "redo", "undo"];
			UE.plugins.queryCommandStateWrap = function() {
				var r = this,
						i = r.queryCommandState;
				r.queryCommandState = function(a) {
					function l(n) {
						return 0 === n.className.length
					}
					function u(n) {
						var e = t[a];
						return e && "undefined" != typeof e[n] ? e[n] : t["*"][n]
					}
					var d = i.call(this, a);
					if (0 !== d) return d;
					var c = t[a] || t["*"];
					if (!c) return d;
					var f = u("notAllowMultipleRange"),
							m = u("onlyTopLevel"),
							y = u("inStrictP"),
							s = u("onlyInP"),
							v = u("noIframe"),
							P = u("check"),
							p = r.selection.getRange();
					if (f && !p.collapsed) return -1;
					var g = n.findParent(p.startContainer, function(t) {
						return n.isBlockElm(t) && e.contains(r.body, t)
					}, !0);
					if (m && g && "BODY" !== g.parentNode.tagName) return -1;
					if (v && 0 !== g.getElementsByTagName("iframe").length) return -1;
					if (y) {
						var I = n.findParent(p.startContainer, function(n) {
							return "P" === n.tagName && e.contains(r.body, n)
						}, !0);
						if (I && !l(I) || s && !I) return -1
					}
					return "PRE" === g.tagName && -1 === o.indexOf(a) ? -1 : P ? c(d) : d
				}
			}
		}();;
!
		function() {
			var i = UE.utils,
					t = baidu.editor.ui.UIBase,
					a = baidu.editor.ui.myautosave = function(i) {
						this.initOptions(i), this.initSeparator()
					};
			a.prototype = {
				uiName: "myautosave",
				initSeparator: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="myautosave" class="myautosave on"></div>'
				}
			}, i.inherits(a, t)
		}();;
!
		function() {
			UE.dom.domUtils, baidu.editor.ui.uiUtils, UE.utils;
			UE.plugins["blockquote-enter"] = function() {
				var e = this;
				e.addListener("keydown", function(n, t) {
					if (13 === t.keyCode) {
						var i = UE.dom.domUtils,
								a = i.findParentByTagName(e.selection.getRange().startContainer, "p", !0);
						if (a && i.isEmptyContentNode(a)) {
							var o = i.findParentByTagName(a, "blockquote");
							if (o) {
								t.preventDefault();
								var r = o.nextSibling;
								r || (r = document.createElement("p"), r.innerHTML = "<br>", o.parentNode.appendChild(r)), i.isEmptyContentNode(o) && i.remove(o), e.selection.clearRange(), range = new UE.dom.Range(e.document), range.setStart(r, 0), range.setEnd(r, 0), range.select(), i.remove(a)
							}
						}
					}
				})
			}
		}();;
!
		function() {
			function e(e, n) {
				n = n || {}, t[e] = function(i) {
					var a = new t.Button({
						className: "edui-for-" + e,
						title: n.title || i.options.labelMap[e] || i.getLang("labelMap." + e) || "",
						onclick: function() {
							i.execCommand(e)
						}
					});
					return t.buttons[e] = a, i.addListener("selectionchange", function(t, n, o) {
						var s = i.queryCommandState(e); - 1 == s ? (a.setDisabled(!0), a.setChecked(!1)) : o || (a.setDisabled(!1), a.setChecked(s))
					}), a
				}
			} {
				var t = UE.ui;
				baidu.editor.utils, baidu.editor.ui.UIBase
			}
			e("horizontal", {
				title: "分割线"
			}), t.audio = function(e, n, i) {
				i = "音频";
				var a = "audio",
						o = new t.Button({
							className: "edui-for-" + a,
							title: i,
							onclick: function() {
								alert("audio");
								e.fireEvent("for_" + a)
							}
						});
				return t.buttons[a] = o, e.addListener("selectionchange", function(t, n, i) {
					var s = e.queryCommandState(a); - 1 == s ? (o.setDisabled(!0), o.setChecked(!1)) : i || (o.setDisabled(!1), o.setChecked(s))
				}), o
			}, t.h1 = function(e, n, i) {
				i = "H1标题";
				var a = "h1",
						o = new t.Button({
							className: "edui-for-" + a,
							title: i,
							onclick: function() {
								e.execCommand("paragraph", o.isChecked() ? "p" : "h1")
							}
						});
				return t.buttons[a] = o, e.addListener("selectionchange", function(t, n, i) {
					if (!i) {
						var a = e.queryCommandState("Paragraph");
						if (-1 == a) o.setDisabled(!0), o.setChecked(!1);
						else {
							o.setDisabled(!1);
							var s = e.queryCommandValue("Paragraph");
							o.setChecked("h1" === s)
						}
					}
				}), o
			}, t.article_link = function(e, n, i) {
				i = "文章链接";
				var a = "article_link",
						o = new t.Button({
							className: "edui-for-" + a,
							title: i,
							onclick: function() {
								alert("article_link");
								o.isChecked() ? e.execCommand("unlink", o.isChecked() ? "p" : "h1") : "function" == typeof e.fireEvent && e.fireEvent("for_" + a)
							}
						});
				return t.buttons[a] = o, e.addListener("selectionchange", function(t, n, i) {
					if (!i) {
						var a = e.queryCommandState("link");
						if (-1 == a) o.setDisabled(!0), o.setChecked(!1);
						else {
							o.setDisabled(!1);
							var s = e.queryCommandValue("link");
							o.setChecked( !! s)
						}
					}
				}), o
			}
		}();;
!
		function() {
			function e(e) {
				var a = new o("code", e, {
					tpl: i,
					className: "edui-code-popup",
					width: "160px",
					height: "36px",
					view: {
						top: -1,
						bottom: -1
					}
				});
				return a.select = a.el.getElementsByTagName("select")[0], n.on(a.select, "change", function() {
					var a = t(e);
					if (a) {
						var l = this.value;
						a.className = "brush:" + l + ";toolbar:false", n.setAttributes(a, {
							lang: l || c
						})
					}
				}), a.parseLang = function(e) {
					var t = e.getAttribute("lang");
					a.select.value = t || c
				}, a.showCodeSelect = function(e) {
					a.show(e), this.parseLang(e)
				}, a
			}
			function t(e) {
				var t, a = e.selection.getStartElementPath();
				return l.each(a, function(e) {
					return "PRE" == e.nodeName ? (t = e, !1) : void 0
				}), t
			}
			var a = UE.ui,
					l = UE.utils,
					n = UE.dom.domUtils,
					o = a.AttachPopup,
					u = "code",
					c = "-1",
					s = [{
						value: c,
						label: "请选择语言"
					}, {
						value: "C/C++"
					}, {
						value: "Css",
						label: "CSS"
					}, {
						value: "C#",
						label: "C#"
					}, {
						value: "Html",
						label: "html"
					}, {
						value: "Java",
						label: "Java"
					}, {
						value: "Javascript",
						label: "Javascript"
					}, {
						value: "Php",
						label: "PHP"
					}, {
						value: "Python",
						label: "Python"
					}, {
						value: "Go",
						label: "Go"
					}, {
						value: "Scale",
						label: "Scale"
					}, {
						value: "Sql",
						label: "SQL"
					}, {
						value: "Shell",
						label: "Shell"
					}],
					i = '<div class="code-popup-select"><select>' + s.map(function(e) {
								return '<option value="' + e.value + '">' + (e.label || e.value) + "</option>"
							}).join("") + "</select></div>";
			a[u] = function(l) {
				function n() {
					return o || (o = e(l)), o
				}
				var o, c = new a.Button({
					className: "edui-for-" + u,
					title: "代码",
					onclick: function() {
						l.execCommand("insertcode", ""), l.execCommand(u), n().showCodeSelect(t(l))
					}
				});
				return a.buttons[u] = c, l.addListener("selectionchange", function(e, a, o) {
					var u = l.queryCommandState("insertcode"); - 1 == u ? (c.setDisabled(!0), c.setChecked(!1)) : o || (c.setDisabled(!1), c.setChecked(u)), 1 === u ? n().showCodeSelect(t(l)) : n().hide()
				}), c
			}, UE.plugins.insertcodeQueryState = function() {
				var e = this;
				e.commands.insertcode.queryCommandState = function() {
					var e = t(this);
					return e ? 1 : 0
				}
			}
		}();;
!
		function() {
			function e(e) {
				"string" != typeof e && (e = "");
				var e = o.htmlDecode(e).replace(c, "$1");
				return JSON.parse(e)
			}
			function t(e) {
				var t = '<div contenteditable="false" style="display:block; position: relative; margin: 10px; height:150px; line-height: 1.5" data-commodity=\'' + o.htmlEncode(JSON.stringify(e)) + '\'><div style="position: absolute; width: 150px; height: 100%; background-color: #cacaca;"><img style="height:100%; min-height: 100%; width:100%;" src="' + e.img_url + '"></div><div style="margin-left: 150px; box-sizing: border-box; height: 100%; overflow:hidden; padding:38px 20px; background-color: #f4f5f6;"><div style="font-size: 19px; color: #000;text-overflow: ellipsis; white-space: nowrap; overflow: hidden">' + e.title + '</div><div style="margin-top: 10px;font-size: 19px; color: #777"><span class="commodity-card-label">价格:</span><span style="margin-left: 10px;">' + e.price + "</span></div></div></div>";
				return t
			}
			for (var i, n = UE.ui, o = baidu.editor.utils, a = (baidu.editor.ui.UIBase, [
				["ul", "无序列表", "insertunorderedlist"],
				["ol", "有序列表", "insertorderedlist"]
			]), r = 0; i = a[r++];)!
					function(e, t, i) {
						n[e] = function(o) {
							var a = new n.Button({
								className: "edui-for-" + e,
								title: t,
								onclick: function() {
									o.execCommand(i)
								}
							});
							return n.buttons[e] = a, o.addListener("selectionchange", function() {
								var e = o.queryCommandState(i); - 1 == e ? a.setDisabled(!0) : (a.setDisabled(!1), a.setChecked(e))
							}), a
						}
					}(i[0], i[1], i[2]);
			var d = UEDITOR_CONFIG.toolbars[0].indexOf("commodity"),
					c = /{!-- PGC_COMMODITY:(.*?) --}/g; - 1 !== d && UE.registerUI("commodity", function(i, n) {
				function a(e) {
					e.title = o.htmlEncode(e.title);
					var t = JSON.stringify(e);
					return "{!-- PGC_COMMODITY:" + t + " --}"
				}
				var r = new UE.ui.Dialog({
							iframeUrl: i.ui.mapUrl(i.options.iframeUrlMap[n]) + "?" + Math.random(),
							editor: i,
							className: "",
							title: "添加商品",
							name: n + "Dialog",
							cssRules: "width:640px;height:472px;"
						}),
						d = new UE.ui.Button({
							name: "commodity",
							title: "商品",
							onclick: function() {
								r.render(), r.open()
							}
						});
				return i.addListener("selectionchange", function(e, t, n) {
					var o = i.queryCommandState("commodity"); - 1 == o ? (d.setDisabled(!0), d.setChecked(!1)) : n || (d.setDisabled(!1), d.setChecked(o))
				}), i.registerCommand(n, {
					execCommand: function(e, t) {
						var i, n = this;
						"[object Array]" === Object.prototype.toString.call(t) ? $.each(t, function(e, t) {
							setTimeout(function() {
								n.execCommand("insertHTML", "<p>" + a(t) + "</p>")
							}, 100 * e)
						}) : (i = a(t), this.execCommand("insertHTML", "<p>" + i + "</p>")), r.close()
					}
				}), i.registerCommand("commoditycancel", {
					execCommand: function() {
						r.close()
					}
				}), i.addOutputRule(function(e) {
					e.traversal(function(t) {
						if (t.getAttr("data-commodity")) {
							var i = "<p>{!-- PGC_COMMODITY:" + o.htmlDecode(t.getAttr("data-commodity")) + " --}</p>",
									n = UE.htmlparser(i);
							t.setAttr("data-commodity", ""), e.replaceChild(n, t)
						}
					})
				}), i.addInputRule(function(i) {
					i.traversal(function(i) {
						if (i.data && i.data.match(c)) {
							var n = e(i.data),
									o = UE.htmlparser(t(n));
							i.parentNode.parentNode.replaceChild(o.firstChild(), i.parentNode)
						}
					})
				}), ue.ready(function() {
					var e;
					$(i.document).delegate("[data-commodity]", "click", function(t) {
						t.stopPropagation(), document.createRange && (e = document.createRange(), e.selectNode($(this)[0]))
					}), $(i.document).bind("keyup", function(t) {
						(46 === t.keyCode || 8 === t.keyCode) && e && e.deleteContents()
					}).bind("selectionchange", function() {
						e = null
					})
				}), d
			}, d)
		}();;
!
		function() {
			function e(e, i) {
				$.get("/article/get_dongfangIC_uri/", {
					ic_id: e.id,
					term: e.term
				}, function(e) {
					i.call(this, e)
				})
			}
			var i = (UE.ui, baidu.editor.utils, baidu.editor.ui.UIBase, UEDITOR_CONFIG.toolbars[0].indexOf("ic")); - 1 !== i && UE.registerUI("ic", function(i, t) {
				var n = new UE.ui.Dialog({
							iframeUrl: i.ui.mapUrl(i.options.iframeUrlMap[t]) + "?" + Math.random(),
							editor: i,
							className: "",
							title: "正版图库",
							name: t + "Dialog",
							cssRules: "width:656px;height:190px;"
						}),
						a = new UE.ui.Button({
							name: t,
							title: "正版图库",
							onclick: function() {
								n.render(), n.open()
							}
						});
				return i.addListener("selectionchange", function(e, t, n) {
					var o = i.queryCommandState("ic"); - 1 == o ? (a.setDisabled(!0), a.setChecked(!1)) : n || (a.setDisabled(!1), a.setChecked(o))
				}), "undefined" == typeof ic_map && (ic_map = {}), i.registerCommand("insertic", {
					execCommand: function(t, a) {
						e(a, function(e) {
							i.execCommand("insertHTML", '<p><img data-ic="' + e + '" src="https://p.pstatp.com/large/' + e + '"></p>'), n.close()
						})
					}
				}), i.addOutputRule(function(e) {
					var i = {};
					e.traversal(function(e) {
						if ("img" === e.tagName) {
							var t = e.attrs["data-ic"],
									n = "";
							if (t) i[t] = t;
							else {
								if (n = e.attrs.src, !n) return;
								n = n.split("/").pop(), ic_map[n] && (i[n] = n)
							}
						}
					}), ic_map = i
				}), ue.ready(function() {
					var e = $("#edit_body .edui-for-ic"),
							i = $.cookie("seen_ic_cookie");
					i && "seen" == i || !$(".edui-for-ic").length || setTimeout(function() {
						e.popover(function() {
							i && "seen" == i || $.cookie("seen_ic_cookie", "seen", {
								expires: 365,
								path: "/"
							})
						})
					}, 50)
				}), a
			}, i)
		}();;
!
		function() {
			UE.plugins["iframe-loader"] = function() {
				var e = UE.ui,
						t = (e.uiUtils, UE.dom.domUtils),
						n = UE.utils,
						i = 1,
						r = [],
						o = this,
						a = "iframe-hide",
						s = e.iframeLoader = function(e, t, i) {
							var o = this.getId();
							t = n.extend({}, t), t = n.extend(t, {
								src: "javascript:void(0);",
								id: o,
								type: e
							});
							var s = new UE.uNode({
										type: "element",
										tagName: "iframe",
										attrs: t,
										"class": a
									}),
									c = n.extend({}, i);
							return c.id = o, r.push(c), s
						};
				s.prototype.getId = function() {
					return "ueditor-iframe-" + i++
				}, s.execAll = function() {
					var e = this;
					n.each(n.extend([], r), function(t) {
						e.exec(t)
					})
				}, s.exec = function(e) {
					var i = o.document.getElementById(e.id);
					if (i) {
						var s = i.contentWindow,
								c = s.document,
								d = function() {
									t.removeClasses(i, a);
									var r = UE.browser,
											o = r.ie,
											s = (e.css || []).map(function(e) {
												return "<link rel='stylesheet' type='text/css' href='" + n.unhtml(e) + "'/>"
											}).join(""),
											d = (e.js || []).map(function(e) {
												return "<script type='text/javascript' src='" + n.unhtml(e) + "'></script>"
											}).join(""),
											l = (o && r.version < 9 ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head>" + s + "</head><body>" + (e.body || "") + "</body>" + d + "</html>";
									c.write(l)
								};
						"complete" === c.readyState ? d() : t.on(i, "load", d);
						var l = r.indexOf(e); - 1 !== l && r.splice(l, 1)
					}
				}
			}
		}();;
!
		function() {
			var e = UE.dom.domUtils,
					n = (baidu.editor.ui.uiUtils, UE.utils),
					t = 50;
			UE.plugins["image-caption"] = function() {
				function i(e) {
					return e.replace(/<br\/?>/g, "")
				}
				function a() {
					var n = s.selection.getRange(),
							t = "IMG" === n.startContainer.tagName ? n.startContainer.parentNode : n.startContainer.getElementsByTagName && 0 !== n.startContainer.getElementsByTagName("img").length ? n.startContainer : null,
							i = !1;
					!t || t.nextSibling && e.hasClass(t.nextSibling, l) || (e.insertAfter(t, r()), o(t), i = !0);
					var a = e.findParent(n.endContainer, function(n) {
						return e.hasClass(n, l)
					}, !0);
					a || (a = e.getNextDomNode(n.endContainer), a && !e.hasClass(a, l) && (a = null)), a && (!a.previousSibling || a.previousSibling.getElementsByTagName && 0 === a.previousSibling.getElementsByTagName("img").length) && (e.remove(a), i = !0), i && s.fireEvent("saveScene")
				}
				function r(n) {
					var t;
					return n ? (t = new UE.uNode({
						tagName: "p",
						attrs: {
							"class": l
						},
						type: "element"
					}), t.innerHTML(d)) : (t = e.createElement(s.document, "p"), e.addClass(t, l), t.innerHTML = d), t
				}
				function o(t) {
					n.each([t.nextSibling, t.previousSibling], function(n) {
						n && e.isZeroWidthSpace(e.getTextContent(n)) && e.remove(n)
					})
				}
				var s = this,
						l = s.options.imgCaptionClass,
						d = "请点击此处输入图片描述<br>";
				s.on("afterinsertimage", function() {
					var n = s.selection.getRange(),
						t = n.startContainer.previousSibling;
					if (t && "IMG" === t.tagName) {
						if (t.parentNode) {
							var i = r();
							e.insertAfter(t.parentNode, i), n = new UE.dom.Range(s.document);
							var a = i.nextSibling;
							a || (a = e.createElement(s.document, "p"), a.innerHTML = "<br>", e.insertAfter(i, a)), n.setStart(a, 0), n.setEnd(a, 0), n.select()
						}
						o(t), s.fireEvent("saveScene")
					}
				});
				var u, c = !1;
				s.on("keydown", function(n, t) {
					if (13 === t.keyCode) {
						var i = s.selection.getRange().startContainer,
								a = e.findParent(i, function(n) {
									return e.hasClass(n, l)
								}, !0);
						u = a
					}
				}), s.on("keyup", function(n, t) {
					if (13 === t.keyCode || u) {
						if (c) return void(c = !1);
						c = !1;
						var i = s.selection.getRange().startContainer,
								a = e.findParent(i, function(n) {
									return e.hasClass(n, l)
								}, !0);
						a && (a !== u ? e.removeClasses(a, l) : a.previousSibling && e.hasClass(a.previousSibling, l) && e.remove(a.previousSibling), s.fireEvent("saveScene")), u = null
					}
				}), s.on("ready", function() {
					e.on(s.body, "compositionend", function() {
						c = !0
					})
				});
				var g = !1;
				s.on("beforeinserthtml", function(e, n) {
					if (g) return void(g = !1);
					var t = /<p.*?>.*?<img.*?\/>.*?<\/p>/g,
							i = new RegExp("^<p.*?class=[\"'].*?" + l + "[s\"']>"),
							a = !1;
					return n = n.replace(t, function(e, n, t) {
						a = !0;
						var o = t.substr(n + e.length);
						return i.test(o) ? e : e + r().outerHTML
					}), a ? (g = !0, s.execCommand("inserthtml", n), !0) : void 0
				}), s.on("keydown", function(n, t) {
					if (8 === t.keyCode) {
						var i = s.selection.getRange().cloneRange(),
								a = e.findParent(i.endContainer, function(n) {
									return e.hasClass(n, l)
								}, !0);
						a && a.previousSibling && 0 !== a.previousSibling.getElementsByTagName("img").length && (a === i.endContainer || e.isFirstChild(a, i.endContainer)) && (0 === i.endOffset || 1 === i.endOffset && 0 === i.endContainer.childNodes.length && 8203 === (i.endContainer.innerHTML || e.getTextContent(i.endContainer)).charCodeAt(0)) && t.preventDefault()
					}
				}), s.on("keyup", function(e, n) {
					8 === n.keyCode && a()
				}), s.on("ready", function() {
					var n = !1;
					e.on(s.body, "cut", function() {
						n = !0
					}), s.on("keyup", function() {
						n && (a(), n = !1)
					})
				}), s.on("keyup", function(n, t) {
					if (8 === t.keyCode) {
						var i = s.selection.getRange().cloneRange(),
								a = e.findParent(i.endContainer, function(n) {
									return e.hasClass(n, l)
								}, !0);
						a && e.isEmptyContentNode(a) && (a.innerHTML = d, i = new UE.dom.Range(s.document), i.setStart(a, 0), i.setEnd(a, a.childNodes.length), i.select(), s.fireEvent("saveScene"))
					}
				});
				var f;
				s.addListener("selectionchange mousedown", function(n, t) {
					var a;
					if ("selectionchange" === n) {
						var r = s.selection.getRange();
						if (f && e.isEmptyContentNode(f) && (f.innerHTML = d), !r.collapsed) return;
						a = r.startContainer
					} else "mousedown" === n && (a = t.target);
					var o = e.findParent(a, function(n) {
						return e.hasClass(n, l)
					}, !0);
					f = o, o && i(o.innerHTML) === i(d) && (o.innerHTML = "<br>")
				}), s.on("keydown", function(n, t) {
					if (13 === t.keyCode) {
						var i = s.selection.getRange(),
								a = i.startOffset,
								r = i.startContainer;
						if (r && (r.nodeType === r.TEXT_NODE && (a = Array.prototype.slice.call(r.parentNode.childNodes).indexOf(r) + 1, r = r.parentNode), r && 0 !== r.getElementsByTagName("img").length && i.collapsed && r.childNodes.length === a && r.nextSibling && e.hasClass(r.nextSibling, l))) {
							t.preventDefault();
							var o = e.createElement(s.document, "p");
							o.innerHTML = "<br>", e.insertAfter(r.nextSibling, o), i = new UE.dom.Range(s.document), i.setStart(o, 0), i.setEnd(o, 0), i.select()
						}
					}
				}), s.addOutputRule(function(e) {
					e.traversal(function(e) {
						"p" === e.tagName && e.hasClass(l) && e.innerText() === i(d) && e.parentNode.removeChild(e)
					})
				}), s.addInputRule(function(e) {
					n.each(e.getNodesByTagName("img"), function(e) {
						try {
							if ("root" !== e.parentNode.type) {
								var n = e.parentNode.nextSibling();
								n && n.hasClass(l) || e.parentNode.parentNode.insertAfter(r(!0), e.parentNode)
							}
						} catch (t) {}
					})
				}), s.addListener("keydown afterinserthtml", function(n, i) {
					setTimeout(function() {
						var n = s.selection.getRange().cloneRange(),
								a = n.startOffset < t ? n.startOffset : t,
								r = e.findParent(n.endContainer, function(n) {
									return e.hasClass(n, l)
								}, !0);
						if (r) {
							var o = e.getTextContent(r);
							o.length > t && (r.innerHTML = o.slice(0, t), n = new UE.dom.Range(s.document), n.setStart(r.firstChild, a), n.setEnd(r.firstChild, a), n.select(), i.preventDefault && i.preventDefault())
						}
					}, 0)
				}), s.addListener("keydown", function(n, t) {
					if (8 === t.keyCode) {
						var i = s.selection.getRange(),
								a = e.findParent(i.startContainer, function(e) {
									return "BODY" === e.parentNode.tagName
								}, !0);
						if (a) {
							var r = a.previousSibling;
							if (r && e.hasClass(r, l) && 0 === i.startOffset && i.collapsed === !0 && (e.isFirstChild(a, i.startContainer) || i.startContainer === a)) {
								t.preventDefault();
								var o = r.childNodes.length;
								i = new UE.dom.Range(s.document), i.setStart(r, 0), i.setEnd(r, o), i.select()
							}
						}
					}
				})
			}
		}();;
!
		function() {
			UE.dom.domUtils, baidu.editor.ui.uiUtils, UE.utils
		}();;
!
		// function() {
		// 	function e(e, i) {
		// 		$.get("/article/get_dongfangIC_uri/", {
		// 			ic_id: e.id,
		// 			term: e.term
		// 		}, function(e) {
		// 			i.call(this, e)
		// 		})
		// 	}
		// 	UE.ui, baidu.editor.utils, baidu.editor.ui.UIBase;
		// 	UE.plugins.images = function() {
		// 		var i = UEDITOR_CONFIG.toolbars[0].indexOf("images");
		// 		i && UE.registerUI("images", function(i, t) {
		// 			var a = new UE.ui.Dialog({
		// 						iframeUrl: i.ui.mapUrl(i.options.iframeUrlMap[t]) + "?" + Math.random(),
		// 						editor: i,
		// 						className: "",
		// 						title: "图片",
		// 						name: "insertimage",
		// 						cssRules: "width:660px;height:600px;"
		// 					}),
		// 					n = new UE.ui.Button({
		// 						name: t,
		// 						title: "插入图片",
		// 						onclick: function() {
		// 							a.render(), a.open()
		// 						}
		// 					});
		// 			return i.addListener("selectionchange", function(e, t, a) {
		// 				var r = i.queryCommandState("ic"); - 1 == r ? (n.setDisabled(!0), n.setChecked(!1)) : a || (n.setDisabled(!1), n.setChecked(r))
		// 			}), "undefined" == typeof ic_map && (ic_map = {}), i.registerCommand("inserticnew", {
		// 				execCommand: function(t, n) {
		// 					e(n, function(e) {
		// 						alert(1);
		// 						i.execCommand("insertHTML", '<p><img data-ic="' + e + '" src="https://p.pstatp.com/large/' + e + '"></p>'), a.close()
		// 					})
		// 				}
		// 			}), i.addOutputRule(function(e) {
		// 				var i = {};
		// 				e.traversal(function(e) {
		// 					if ("img" === e.tagName) {
		// 						var t = e.attrs["data-ic"],
		// 								a = "";
		// 						if (t) i[t] = t;
		// 						else {
		// 							if (a = e.attrs.src, !a) return;
		// 							a = a.split("/").pop(), ic_map[a] && (i[a] = a)
		// 						}
		// 					}
		// 				}), ic_map = i
		// 			}), n
		// 		}, i)
		// 	}
		// }();;
!
		function() {
			var e = (UE.dom.domUtils, baidu.editor.ui.uiUtils, UE.utils),
					t = UE.ui,
					n = "telephone";
			t.telephone = function(e, n, o) {
				o = "电话";
				var a = "telephone",
						r = new t.Button({
							className: "edui-for-" + a,
							title: o,
							onclick: function() {
								r.isChecked() ? e.execCommand("unlink", r.isChecked() ? "p" : "h1") : "function" == typeof e.fireEvent && e.fireEvent("for_" + a)
							}
						});
				return t.buttons[a] = r, e.addListener("selectionchange", function(t, n, o) {
					if (!o) {
						var a = e.queryCommandState("link");
						if (-1 == a) r.setDisabled(!0), r.setChecked(!1);
						else {
							r.setDisabled(!1);
							var c = e.queryCommandValue("link");
							r.setChecked( !! c)
						}
					}
				}), r
			};
			var o = function(e, t, n) {
						return '<a class="editor-phone-btn ' + e + '" target="_blank" href="' + n + '">' + t + "</a>"
					},
					a = function(e) {
						var t = [];
						return e["book-name"] && t.push(o("editor-phone-btn-book", e["book-name"], e["book-url"])), e["contact-name"] && t.push(o("editor-phone-btn-contact", e["contact-name"], "tel:" + e["contact-phone"])), '<div class="editor-phone-btn-group">' + t.join("") + "</div>"
					};
			UE.plugins.telephone = function() {
				function o(e) {
					"string" != typeof e && (e = "");
					var e = e.replace(c, "$1");
					return e = JSON.parse(e), i.input(e)
				}
				var r = this,
						c = /{!-- PGC_PHONE:(.*?) --}/g,
						i = {
							input: function(e) {
								return {
									"contact-name": e.contact_name,
									"contact-phone": e.contact_phone,
									"book-name": e.book_name,
									"book-url": e.book_url
								}
							},
							output: function(e) {
								return {
									contact_name: e["contact-name"],
									contact_phone: e["contact-phone"],
									book_name: e["book-name"],
									book_url: e["book-url"]
								}
							}
						};
				r.addInputRule(function(r) {
					function i(t) {
						var o = e.extend({}, t);
						return o.style = "height: 37px;", new u(n, o, {
							css: ["//s2.pstatp.com/pgc/v2/resource/pgc_web/static/ueditor/iframe.9323603.css"],
							body: a(t)
						})
					}
					var u = t.iframeLoader;
					e.each(r.getNodesByTagName("tt-phone-group"), function(e) {
						try {
							var t = i(e.attrs);
							e.parentNode.replaceChild(t, e)
						} catch (n) {
							console.log(n)
						}
					}), e.each(r.getNodesByTagName("p"), function(t) {
						if (t = t.children[0], t && t.data && t.data.match(c)) {
							var n = o(e.htmlDecode(t.data)),
									a = i(n);
							t.parentNode.replaceChild(a, t)
						}
					})
				}), r.addOutputRule(function(t) {
					var o = t.getNodesByTagName("iframe").filter(function(e) {
						return e.attrs.type === n
					});
					e.each(o, function(e) {
						try {
							var t = e.attrs,
									n = new UE.uNode({
										type: "element",
										tagName: "p"
									}),
									o = i.output(t);
							n.innerHTML("{!-- PGC_PHONE:" + JSON.stringify(o) + " --}"), "p" === e.parentNode.tagName && e.parentNode.parentNode && 1 === e.parentNode.children.length ? e.parentNode.parentNode.replaceChild(n, e.parentNode) : e.parentNode.replaceChild(n, e)
						} catch (a) {
							console.log(a)
						}
					})
				});
				var u = function() {
					var e = t.iframeLoader;
					e.execAll()
				};
				r.addListener("contentchange", function() {
					setTimeout(function() {
						u()
					}, 0)
				})
			}
		}();;
!
		function() {
			{
				var e = (UE.ui, baidu.editor.utils);
				baidu.editor.ui.UIBase
			}
			UE.plugins.temai = function() {
				function t(t) {
					t.title = e.htmlEncode(t.title);
					var i = JSON.stringify(t);
					return "{!-- PGC_COMMODITY:" + i + " --}"
				}
				function i(t) {
					"string" != typeof t && (t = "");
					var t = e.htmlDecode(t).replace(o, "$1");
					return JSON.parse(t)
				}
				function n(t) {
					var i = '<div contenteditable="false" style="display:block; position: relative; margin: 10px; height:150px; line-height: 1.5" data-commodity=\'' + e.htmlEncode(JSON.stringify(t)) + '\'>        <div style="position: absolute; width: 150px; height: 100%; background-color: #cacaca;"><img style="height:100%; min-height: 100%; width:100%;" src="' + t.img_url + '"></div>        <div style="margin-left: 150px; box-sizing: border-box; height: 100%; overflow:hidden; padding:38px 20px; background-color: #f4f5f6;">        <div style="font-size: 19px; color: #000;text-overflow: ellipsis; white-space: nowrap; overflow: hidden">' + t.title + '</div>        <div style="margin-top: 10px;font-size: 19px; color: #777">        <span class="commodity-card-label">价格:</span><span style="margin-left: 10px;">' + t.price + "</span>        </div></div></div>";
					return i
				}
				var o = /{!-- PGC_COMMODITY:(.*?) --}/g,
						a = UEDITOR_CONFIG.toolbars[0].indexOf("temai"),
						r = !1; - 1 !== a && (r = !0), r && UE.registerUI("temai", function(a, r) {
					var d = new UE.ui.Dialog({
								iframeUrl: a.ui.mapUrl(a.options.iframeUrlMap.temai) + "?" + Math.random(),
								editor: a,
								className: "",
								title: "商品",
								name: r + "Dialog",
								cssRules: "width:640px;height:560px;"
							}),
							c = new UE.ui.Button({
								name: r,
								title: "商品",
								onclick: function() {
									d.render(), d.open()
								}
							});
					return a.addListener("selectionchange", function(e, t, i) {
						var n = a.queryCommandState("commodity"); - 1 == n ? (c.setDisabled(!0), c.setChecked(!1)) : i || (c.setDisabled(!1), c.setChecked(n))
					}), a.registerCommand(r, {
						execCommand: function(e, i) {
							var n, o = this;
							"[object Array]" === Object.prototype.toString.call(i) ? $.each(i, function(e, i) {
								setTimeout(function() {
									o.execCommand("insertHTML", "<p>" + t(i) + "</p>")
								}, 100 * e)
							}) : (n = t(i), this.execCommand("insertHTML", "<p>" + n + "</p>")), d.close()
						}
					}), a.registerCommand("commoditycancel", {
						execCommand: function() {
							d.close()
						}
					}), a.addOutputRule(function(t) {
						t.traversal(function(i) {
							if (i.getAttr("data-commodity")) {
								var n = "<p>{!-- PGC_COMMODITY:" + e.htmlDecode(i.getAttr("data-commodity")) + " --}</p>",
										o = UE.htmlparser(n);
								i.setAttr("data-commodity", ""), t.replaceChild(o, i)
							}
						})
					}), a.addInputRule(function(e) {
						e.traversal(function(e) {
							if (e.data && e.data.match(o)) {
								var t = i(e.data),
										a = UE.htmlparser(n(t));
								e.parentNode.parentNode.replaceChild(a.firstChild(), e.parentNode)
							}
						})
					}), ue.ready(function() {
						var e;
						$(a.document).delegate("[data-commodity]", "click", function(t) {
							t.stopPropagation(), document.createRange && (e = document.createRange(), e.selectNode($(this)[0]))
						}), $(a.document).bind("keyup", function(t) {
							(46 === t.keyCode || 8 === t.keyCode) && e && e.deleteContents()
						}).bind("selectionchange", function() {
							e = null
						})
					}), c
				}, a)
			}
		}();;
!
		function() {
			var e = UE.dom.domUtils;
			UE.plugins.trimEnd = function() {
				{
					var i = this;
					UE.uNode
				}
				i.addOutputRule(function(i) {
					i.traversal(function(t) {
						if (-1 !== ["p", "h1", "blockquote"].indexOf(t.tagName) && e.isEmptyUNode(t)) {
							var r = UE.htmlparser("<p><br/></p>");
							i.insertBefore(r, t), i.removeChild(t)
						}
					});
					for (var t;;) {
						if (t = i.lastChild(), !e.isEmptyUNode(t)) break;
						i.removeChild(t)
					}
				})
			}
		}();
