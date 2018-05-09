(function() {
    window.UEDITOR_HOME_URL = '/static/ueditor/';
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();
    var l = "//s2.pstatp.com/pgc/v2/resource/pgc_web/static/ueditor/iframe.9323603.css";
    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: URL,
        serverUrl: "/api/common/image/deal",
        toolbars: [
            ['h1', 'bold', 'blockquote', 'ul', 'ol', 'horizontal', '|', 'insertimage', 'upload_video', '|', 'removeformat', 'undo', 'redo']
//            ['h1', 'bold', 'blockquote', 'ul', 'ol', 'horizontal', '|', 'insertimage', '|', 'removeformat', 'undo', 'redo']
        ],
        labelMap: {
            'h1': 'H1标题',
            'ul': '无序列表',
            'ol': '有序列表',
            'images': '插入图片'
        },
        iframeCssUrl: l,
        initialFrameHeight: 600,
        enableAutoSave: !1,
        saveInterval: 500,
        imagePopup: !1,
        pasteplain: !0,
        filterTxtRules: function() {
            function e(e) {
                e.tagName = "p", e.attrs = {}, e.setStyle()
            }

            function t(e) {
                e.attrs = {}, e.traversal(function(t) {
                    if ("element" === t.type && "img" !== t.tagName) e.removeChild(t, !0);
                    else if ("img" === t.tagName) {
                        var a = t.getAttr("src"); - 1 !== a.indexOf("xmtbang.com") && (a = decodeURIComponent(a.replace(/^http:\/\/(.*)\/\?url=/, "")), t.setAttr("src", a))
                    }
                })
            }
            return {
                "-": "script style object iframe embed input select",
                p: function(e) {
                    var t = window.UEDITOR_CONFIG.imgCaptionClass,
                        a = {},
                        i = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
                    i.test(e.attrs["class"]) && (a["class"] = t), e.attrs = a
                },
                div: {
                    $: {}
                },
                img: {
                    $: {
                        src: 1,
                        id: 1
                    }
                },
                strong: t,
                ul: {
                    $: {}
                },
                ol: {
                    $: {}
                },
                li: {
                    p: 0,
                    $: {}
                },
                table: {
                    $: {}
                },
                thead: {
                    $: {}
                },
                tbody: {
                    $: {}
                },
                th: {
                    $: {}
                },
                tr: {
                    $: {}
                },
                td: {
                    $: {}
                },
                blockquote: {
                    $: {}
                },
                code: {
                    $: {}
                },
                h1: {
                    span: 0,
                    $: {}
                },
                hr: {
                    $: {}
                },
                caption: e,
                h2: e,
                h3: e,
                h4: e,
                h5: e,
                h6: e,
                pre: {
                    $: {
                        lang: 1
                    }
                }
            }
        }(),
        enableContextMenu: false,
        elementPathEnabled: false,
        wordCount: false,
        autoHeightEnabled: !1,
        autotypeset: {
            mergeEmptyline: !0,
            removeClass: !1,
            removeEmptyline: !0,
            pasteFilter: !0,
            clearFontSize: !0,
            clearFontFamily: !0,
            leftTrim: !0
        },
        imgCaptionClass: "pgc-img-caption",
        sourceEditor: "textarea",
        xssFilterRules: true,
        inputXssFilter: true,
        outputXssFilter: true,
        whitList: {
            a: ['target', 'href', 'title', 'class', 'style'],
            abbr: ['title', 'class', 'style'],
            address: ['class', 'style'],
            area: ['shape', 'coords', 'href', 'alt'],
            article: [],
            aside: [],
            audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
            b: ['class', 'style'],
            bdi: ['dir'],
            bdo: ['dir'],
            big: [],
            blockquote: ['cite', 'class', 'style'],
            br: [],
            caption: ['class', 'style'],
            center: [],
            cite: [],
            code: ['class', 'style'],
            col: ['align', 'valign', 'span', 'width', 'class', 'style'],
            colgroup: ['align', 'valign', 'span', 'width', 'class', 'style'],
            dd: ['class', 'style'],
            del: ['datetime'],
            details: ['open'],
            div: ['class', 'style'],
            dl: ['class', 'style'],
            dt: ['class', 'style'],
            em: ['class', 'style'],
            font: ['color', 'size', 'face'],
            footer: [],
            h1: ['class', 'style'],
            h2: ['class', 'style'],
            h3: ['class', 'style'],
            h4: ['class', 'style'],
            h5: ['class', 'style'],
            h6: ['class', 'style'],
            header: [],
            hr: [],
            i: ['class', 'style'],
            img: ['src', 'alt', 'title', 'width', 'height', 'id', '_0', '_1', 'loadingclass', 'class', 'data-latex'],
            ins: ['datetime'],
            li: ['class', 'style'],
            mark: [],
            nav: [],
            ol: ['class', 'style'],
            p: ['class', 'style'],
            pre: ['class', 'style'],
            s: [],
            section: [],
            small: [],
            span: ['class', 'style'],
            sub: ['class', 'style'],
            sup: ['class', 'style'],
            strong: ['class', 'style'],
            table: ['width', 'border', 'align', 'valign', 'class', 'style'],
            tbody: ['align', 'valign', 'class', 'style'],
            td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
            tfoot: ['align', 'valign', 'class', 'style'],
            th: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
            thead: ['align', 'valign', 'class', 'style'],
            tr: ['rowspan', 'align', 'valign', 'class', 'style'],
            tt: [],
            u: [],
            iframe: [],
            ul: ['class', 'style'],
            video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style'],
            source: ['src', 'type'],
            embed: ['type', 'class', 'pluginspage', 'src', 'width', 'height', 'align', 'style', 'wmode', 'play', 'loop', 'menu', 'allowscriptaccess', 'allowfullscreen'],
            iframe: ['src', 'class', 'height', 'width', 'max-width', 'max-height', 'align', 'frameborder', 'allowfullscreen']
        }
    };

    function getUEBasePath(docUrl, confUrl) {
        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath())
    }

    function getConfigFilePath() {
        var configPath = document.getElementsByTagName('script');
        return configPath[configPath.length - 1].src
    }

    function getBasePath(docUrl, confUrl) {
        var basePath = confUrl;
        if (/^(\/|\\\\)/.test(confUrl)) {
            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '')
        } else if (!/^[a-z]+:/i.test(confUrl)) {
            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');
            basePath = docUrl + "" + confUrl
        }
        return optimizationPath(basePath)
    }

    function optimizationPath(path) {
        var protocol = /^[a-z]+:\/\//.exec(path)[0],
            tmp = null,
            res = [];
        path = path.replace(protocol, "").split("?")[0].split("#")[0];
        path = path.replace(/\\/g, '/').split(/\//);
        path[path.length - 1] = "";
        while (path.length) {
            if ((tmp = path.shift()) === "..") {
                res.pop()
            } else if (tmp !== ".") {
                res.push(tmp)
            }
        }
        return protocol + res.join("/")
    }
    window.UE = {
        getUEBasePath: getUEBasePath
    }
})();
