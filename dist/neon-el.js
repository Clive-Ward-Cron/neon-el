function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $ed7b73cd8f8fda0a$export$2e2bcd8739ae039(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}


function $d443089ebc2e15a8$export$2e2bcd8739ae039(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}


function $5c90f01a1e93ad01$export$2e2bcd8739ae039(receiver, privateMap) {
    var descriptor = $ed7b73cd8f8fda0a$export$2e2bcd8739ae039(receiver, privateMap, "get");
    return $d443089ebc2e15a8$export$2e2bcd8739ae039(receiver, descriptor);
}

function $ff08a604e972d7c1$export$2e2bcd8739ae039(obj, privateCollection) {
    if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}


function $a207a3ac25b1c338$export$2e2bcd8739ae039(obj, privateMap, value) {
    $ff08a604e972d7c1$export$2e2bcd8739ae039(obj, privateMap);
    privateMap.set(obj, value);
}


function $20b547a1dcb54124$export$2e2bcd8739ae039(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
        descriptor.value = value;
    }
}


function $c7458e7a3415e664$export$2e2bcd8739ae039(receiver, privateMap, value) {
    var descriptor = $ed7b73cd8f8fda0a$export$2e2bcd8739ae039(receiver, privateMap, "set");
    $20b547a1dcb54124$export$2e2bcd8739ae039(receiver, descriptor, value);
    return value;
}

function $2eec7714a30d92b0$export$2e2bcd8739ae039(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}


function $9cec2274b1d86876$export$2e2bcd8739ae039(obj, privateSet) {
    $ff08a604e972d7c1$export$2e2bcd8739ae039(obj, privateSet);
    privateSet.add(obj);
}

function $cfef344cd38c105c$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}



var $6716112bc694bd6e$exports = {};
/*! dom-to-image-more 06-12-2021 */ !function(e1) {
    var c = {
        escape: function(e) {
            return e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
        },
        parseExtension: t1,
        mimeType: function(e2) {
            e2 = t1(e2).toLowerCase();
            return function() {
                var e = "application/font-woff", t = "image/jpeg";
                return {
                    woff: e,
                    woff2: e,
                    ttf: "application/font-truetype",
                    eot: "application/vnd.ms-fontobject",
                    png: "image/png",
                    jpg: t,
                    jpeg: t,
                    gif: "image/gif",
                    tiff: "image/tiff",
                    svg: "image/svg+xml"
                };
            }()[e2] || "";
        },
        dataAsUrl: function(e, t) {
            return "data:" + t + ";base64," + e;
        },
        isDataUrl: function(e) {
            return -1 !== e.search(/^(data:)/);
        },
        canvasToBlob: function(t2) {
            return t2.toBlob ? new Promise(function(e) {
                t2.toBlob(e);
            }) : function(i) {
                return new Promise(function(e) {
                    for(var t = d(i.toDataURL().split(",")[1]), n = t.length, r = new Uint8Array(n), o = 0; o < n; o++)r[o] = t.charCodeAt(o);
                    e(new Blob([
                        r
                    ], {
                        type: "image/png"
                    }));
                });
            }(t2);
        },
        resolveUrl: function(e, t) {
            var n = document.implementation.createHTMLDocument(), r = n.createElement("base");
            n.head.appendChild(r);
            var o = n.createElement("a");
            return n.body.appendChild(o), r.href = t, o.href = e, o.href;
        },
        getAndEncode: function(a) {
            p.impl.options.cacheBust && (a += (/\?/.test(a) ? "&" : "?") + (new Date).getTime());
            return new Promise(function(n) {
                var e3, t3, r = p.impl.options.httpTimeout, o = new XMLHttpRequest;
                function i(e) {
                    console.error(e), n("");
                }
                o.onreadystatechange = function() {
                    var t;
                    4 === o.readyState && (200 === o.status ? ((t = new FileReader).onloadend = function() {
                        var e = t.result.split(/,/)[1];
                        n(e);
                    }, t.readAsDataURL(o.response)) : e3 ? n(e3) : i("cannot fetch resource: " + a + ", status: " + o.status));
                }, o.ontimeout = function() {
                    e3 ? n(e3) : i("timeout of " + r + "ms occured while fetching resource: " + a);
                }, o.responseType = "blob", o.timeout = r, p.impl.options.useCredentials && (o.withCredentials = !0), o.open("GET", a, !0), o.send(), !p.impl.options.imagePlaceholder || (t3 = p.impl.options.imagePlaceholder.split(/,/)) && t3[1] && (e3 = t3[1]);
            });
        },
        uid: function() {
            var e = 0;
            return function() {
                return "u" + ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4) + e++;
            };
        }(),
        delay: function(n) {
            return function(t) {
                return new Promise(function(e) {
                    setTimeout(function() {
                        e(t);
                    }, n);
                });
            };
        },
        asArray: function(e) {
            for(var t = [], n = e.length, r = 0; r < n; r++)t.push(e[r]);
            return t;
        },
        escapeXhtml: function(e) {
            return e.replace(/%/g, "%25").replace(/#/g, "%23").replace(/\n/g, "%0A");
        },
        makeImage: function(r) {
            return "data:," === r ? Promise.resolve() : new Promise(function(e, t) {
                var n = new Image;
                p.impl.options.useCredentials && (n.crossOrigin = "use-credentials"), n.onload = function() {
                    e(n);
                }, n.onerror = t, n.src = r;
            });
        },
        width: function(e) {
            var t = r1(e, "border-left-width"), n = r1(e, "border-right-width");
            return e.scrollWidth + t + n;
        },
        height: function(e) {
            var t = r1(e, "border-top-width"), n = r1(e, "border-bottom-width");
            return e.scrollHeight + t + n;
        }
    };
    function t1(e) {
        e = /\.([^\.\/]*?)(\?|$)/g.exec(e);
        return e ? e[1] : "";
    }
    function r1(e, t) {
        t = g(e).getPropertyValue(t);
        return parseFloat(t.replace("px", ""));
    }
    var o1, i1 = {
        inlineAll: function(t4, r, o) {
            return n1(t4) ? Promise.resolve(t4).then(a1).then(function(e4) {
                var n = Promise.resolve(t4);
                return e4.forEach(function(t) {
                    n = n.then(function(e) {
                        return u1(e, t, r, o);
                    });
                }), n;
            }) : Promise.resolve(t4);
        },
        shouldProcess: n1,
        impl: {
            readUrls: a1,
            inline: u1
        }
    };
    function n1(e) {
        return -1 !== e.search(o1);
    }
    function a1(e5) {
        for(var t, n = []; null !== (t = o1.exec(e5));)n.push(t[1]);
        return n.filter(function(e) {
            return !c.isDataUrl(e);
        });
    }
    function u1(t, n, r, e6) {
        return Promise.resolve(n).then(function(e) {
            return r ? c.resolveUrl(e, r) : e;
        }).then(e6 || c.getAndEncode).then(function(e) {
            return c.dataAsUrl(e, c.mimeType(n));
        }).then(function(e) {
            return t.replace(new RegExp("(url\\(['\"]?)(" + c.escape(n) + ")(['\"]?\\))", "g"), "$1" + e + "$3");
        });
    }
    var s = {
        resolveAll: function() {
            return l().then(function(e7) {
                return Promise.all(e7.map(function(e) {
                    return e.resolve();
                }));
            }).then(function(e) {
                return e.join("\n");
            });
        },
        impl: {
            readAll: l
        }
    };
    function l() {
        return Promise.resolve(c.asArray(document.styleSheets)).then(function(e8) {
            var n = [];
            return e8.forEach(function(t) {
                if (Object.getPrototypeOf(t).hasOwnProperty("cssRules")) try {
                    c.asArray(t.cssRules || []).forEach(n.push.bind(n));
                } catch (e) {
                    console.log("Error while reading CSS rules from " + t.href, e.toString());
                }
            }), n;
        }).then(function(e9) {
            return e9.filter(function(e) {
                return e.type === CSSRule.FONT_FACE_RULE;
            }).filter(function(e) {
                return i1.shouldProcess(e.style.getPropertyValue("src"));
            });
        }).then(function(e) {
            return e.map(t5);
        });
        function t5(t) {
            return {
                resolve: function() {
                    var e = (t.parentStyleSheet || {}).href;
                    return i1.inlineAll(t.cssText, e);
                },
                src: function() {
                    return t.style.getPropertyValue("src");
                }
            };
        }
    }
    var f = {
        inlineAll: function t6(e10) {
            if (!(e10 instanceof Element)) return Promise.resolve(e10);
            return n2(e10).then(function() {
                return e10 instanceof HTMLImageElement ? h(e10).inline() : Promise.all(c.asArray(e10.childNodes).map(function(e) {
                    return t6(e);
                }));
            });
            function n2(t) {
                var n = t.style.getPropertyValue("background");
                return n ? i1.inlineAll(n).then(function(e) {
                    t.style.setProperty("background", e, n);
                }).then(function() {
                    return t;
                }) : Promise.resolve(t);
            }
        },
        impl: {
            newImage: h
        }
    };
    function h(n) {
        return {
            inline: function(e11) {
                return c.isDataUrl(n.src) ? Promise.resolve() : Promise.resolve(n.src).then(e11 || c.getAndEncode).then(function(e) {
                    return c.dataAsUrl(e, c.mimeType(n.src));
                }).then(function(t) {
                    return new Promise(function(e) {
                        n.onload = e, n.onerror = e, n.src = t;
                    });
                });
            }
        };
    }
    var m = {
        imagePlaceholder: void 0,
        cacheBust: (o1 = /url\(['"]?([^'"]+?)['"]?\)/g, false),
        useCredentials: !1,
        httpTimeout: 30000
    }, p = {
        toSvg: y,
        toPng: function(e12, t) {
            return (t = t || {}).raster = !0, v(e12, t).then(function(e) {
                return e.toDataURL();
            });
        },
        toJpeg: function(e13, t) {
            return (t = t || {}).raster = !0, v(e13, t).then(function(e) {
                return e.toDataURL("image/jpeg", t.quality || 1);
            });
        },
        toBlob: function(e, t) {
            return (t = t || {}).raster = !0, v(e, t).then(c.canvasToBlob);
        },
        toPixelData: function(t, e14) {
            return (e14 = e14 || {}).raster = !0, v(t, e14).then(function(e) {
                return e.getContext("2d").getImageData(0, 0, c.width(t), c.height(t)).data;
            });
        },
        toCanvas: function(e, t) {
            return v(e, t || {});
        },
        impl: {
            fontFaces: s,
            images: f,
            util: c,
            inliner: i1,
            options: {}
        }
    };
    $6716112bc694bd6e$exports = p;
    const g = e1.getComputedStyle || window.getComputedStyle, d = e1.atob || window.atob;
    function y(r2, o2) {
        return function(e) {
            void 0 === e.imagePlaceholder ? p.impl.options.imagePlaceholder = m.imagePlaceholder : p.impl.options.imagePlaceholder = e.imagePlaceholder;
            void 0 === e.cacheBust ? p.impl.options.cacheBust = m.cacheBust : p.impl.options.cacheBust = e.cacheBust;
            void 0 === e.useCredentials ? p.impl.options.useCredentials = m.useCredentials : p.impl.options.useCredentials = e.useCredentials;
        }(o2 = o2 || {}), Promise.resolve(r2).then(function(e15) {
            return function r3(t7, o3, a2, i2) {
                if (!a2 && o3 && !o3(t7)) return Promise.resolve();
                return Promise.resolve(t7).then(e16).then(function(e) {
                    return n3(t7, e);
                }).then(function(e) {
                    return u2(t7, e, i2);
                });
                function e16(e17) {
                    return e17 instanceof HTMLCanvasElement ? c.makeImage(e17.toDataURL()) : "IFRAME" === e17.nodeName ? html2canvas(e17.contentDocument.body).then((e)=>e.toDataURL()
                    ).then(c.makeImage) : e17.cloneNode(!1);
                }
                function n3(e18, t8) {
                    e18 = e18.childNodes;
                    return 0 === e18.length ? Promise.resolve(t8) : n4(t8, c.asArray(e18)).then(function() {
                        return t8;
                    });
                    function n4(t, e19) {
                        var n = Promise.resolve();
                        return e19.forEach(function(e20) {
                            n = n.then(function() {
                                return r3(e20, o3, !1, i2);
                            }).then(function(e) {
                                e && t.appendChild(e);
                            });
                        }), n;
                    }
                }
                function u2(r4, u, t9) {
                    return u instanceof Element ? Promise.resolve().then(e21).then(n5).then(o4).then(i3).then(function() {
                        return u;
                    }) : u;
                    function e21() {
                        function n6(e, t) {
                            t.font = e.font, t.fontFamily = e.fontFamily, t.fontFeatureSettings = e.fontFeatureSettings, t.fontKerning = e.fontKerning, t.fontSize = e.fontSize, t.fontStretch = e.fontStretch, t.fontStyle = e.fontStyle, t.fontVariant = e.fontVariant, t.fontVariantCaps = e.fontVariantCaps, t.fontVariantEastAsian = e.fontVariantEastAsian, t.fontVariantLigatures = e.fontVariantLigatures, t.fontVariantNumeric = e.fontVariantNumeric, t.fontVariationSettings = e.fontVariationSettings, t.fontWeight = e.fontWeight;
                        }
                        function e22(e23, r) {
                            function t10(t, n) {
                                c.asArray(t).forEach(function(e) {
                                    n.setProperty(e, t.getPropertyValue(e), t.getPropertyPriority(e));
                                }), a2 && ([
                                    "inset-block",
                                    "inset-block-start",
                                    "inset-block-end"
                                ].forEach((e)=>r.removeProperty(e)
                                ), [
                                    "left",
                                    "right",
                                    "top",
                                    "bottom"
                                ].forEach((e)=>{
                                    r.getPropertyValue(e) && r.setProperty(e, "0px");
                                }));
                            }
                            e23.cssText ? (r.cssText = e23.cssText, n6(e23, r)) : t10(e23, r);
                        }
                        e22(t9 ? b(r4, a2) : g(r4), u.style);
                    }
                    function n5() {
                        function t11(o) {
                            var i, a = g(r4, o), e24 = a.getPropertyValue("content");
                            function t12() {
                                var e25 = "." + i + ":" + o, t = (a.cssText ? n : r)();
                                return document.createTextNode(e25 + "{" + t + "}");
                                function n() {
                                    return a.cssText + " content: " + a.getPropertyValue("content") + ";";
                                }
                                function r() {
                                    return c.asArray(a).map(e26).join("; ") + ";";
                                    function e26(e) {
                                        return e + ": " + a.getPropertyValue(e) + (a.getPropertyPriority(e) ? " !important" : "");
                                    }
                                }
                            }
                            "" !== e24 && "none" !== e24 && (i = c.uid(), (e24 = u.getAttribute("class")) && u.setAttribute("class", e24 + " " + i), (e24 = document.createElement("style")).appendChild(t12()), u.appendChild(e24));
                        }
                        [
                            ":before",
                            ":after"
                        ].forEach(function(e) {
                            t11(e);
                        });
                    }
                    function o4() {
                        r4 instanceof HTMLTextAreaElement && (u.innerHTML = r4.value), r4 instanceof HTMLInputElement && u.setAttribute("value", r4.value);
                    }
                    function i3() {
                        u instanceof SVGElement && (u.setAttribute("xmlns", "http://www.w3.org/2000/svg"), u instanceof SVGRectElement && [
                            "width",
                            "height"
                        ].forEach(function(e) {
                            var t = u.getAttribute(e);
                            t && u.style.setProperty(e, t);
                        }));
                    }
                }
            }(e15, o2.filter, !0, !o2.raster);
        }).then(P).then(w).then(function(t) {
            o2.bgcolor && (t.style.backgroundColor = o2.bgcolor);
            o2.width && (t.style.width = o2.width + "px");
            o2.height && (t.style.height = o2.height + "px");
            o2.style && Object.keys(o2.style).forEach(function(e) {
                t.style[e] = o2.style[e];
            });
            var e27 = null;
            "function" == typeof o2.onclone && (e27 = o2.onclone(t));
            return Promise.resolve(e27).then(function() {
                return t;
            });
        }).then(function(e28) {
            var t, n;
            return t = o2.width || c.width(r2), n = o2.height || c.height(r2), Promise.resolve(e28).then(function(e) {
                return e.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), (new XMLSerializer).serializeToString(e);
            }).then(c.escapeXhtml).then(function(e) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + e + "</foreignObject>";
            }).then(function(e) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + t + '" height="' + n + '">' + e + "</svg>";
            }).then(function(e) {
                return "data:image/svg+xml;charset=utf-8," + e;
            });
        });
    }
    function v(o, i) {
        return y(o, i).then(c.makeImage).then(c.delay(0)).then(function(e29) {
            var t13 = "number" != typeof i.scale ? 1 : i.scale, n7 = function(e, t) {
                var n = document.createElement("canvas");
                n.width = (i.width || c.width(e)) * t, n.height = (i.height || c.height(e)) * t, i.bgcolor && ((t = n.getContext("2d")).fillStyle = i.bgcolor, t.fillRect(0, 0, n.width, n.height));
                return n;
            }(o, t13), r = n7.getContext("2d");
            return r.mozImageSmoothingEnabled = !1, r.msImageSmoothingEnabled = !1, r.imageSmoothingEnabled = !1, e29 && (r.scale(t13, t13), r.drawImage(e29, 0, 0)), n7;
        });
    }
    function P(n) {
        return s.resolveAll().then(function(e) {
            var t = document.createElement("style");
            return n.appendChild(t), t.appendChild(document.createTextNode(e)), n;
        });
    }
    function w(e) {
        return f.inlineAll(e).then(function() {
            return e;
        });
    }
    function b(e, t) {
        var n, r = document.createElement(e.tagName).style, o = g(e), i = e.style;
        for (n of o){
            var a = o.getPropertyValue(n), u = i.getPropertyValue(n);
            i.setProperty(n, t ? "initial" : "unset"), o.getPropertyValue(n) !== a ? r.setProperty(n, a) : r.removeProperty(n), i.setProperty(n, u);
        }
        return r;
    }
}($6716112bc694bd6e$exports);


function $4c225ee090a8f350$export$74d0f8ed30f6559d(el) {
    // Get the Elements computed style declaration
    try {
        const declaration = getComputedStyle(el);
        // Check if the result is an actual style declaration,
        if (declaration instanceof CSSStyleDeclaration) {
            // Get the declarations keys and values and reduce them
            // into an object of just the used rules
            const obj = Object.entries(declaration).reduce((style, [key, value])=>{
                // Don't assign any blank values or keys or keys that are just numeric.
                if (!value || !key || !isNaN(parseInt(key))) return style;
                style[key] = value;
                return style;
            }, {});
            // Return the style object
            return obj;
        } else return {};
    } catch (error) {
        console.log(error);
        return {};
    }
}
function $4c225ee090a8f350$export$39727932d807f83e(node) {
    // Check if the passed node is a Text Node
    // If it is, wrap it in a span
    if (node.nodeType === Node.TEXT_NODE) {
        // Get the parent node of the text node
        const parent = node.parentElement;
        // Create the new span that will hold the text node
        const newSpan = document.createElement("span");
        // Place the text node into the span node
        // and then place that span into the parent
        newSpan.appendChild(node);
        parent.appendChild(newSpan);
        // Return the reference to the new span containing the text
        return newSpan;
    } else return node;
}


function $549e0f202f0d259c$export$7a2bdede98851ac5(e) {
    // Make an image out of the slotted node and assign it as the background image
    if (this.shadowRoot.querySelector("slot").assignedNodes().length > 0) {
        const originalNodeType = e.target.assignedNodes()[0].nodeType;
        // pass the slots first child to wrapIfTextNode
        // If its a text node it will be returned wrapped in a span,
        // Otherwise it returns the unmodified element node.
        const el = $4c225ee090a8f350$export$39727932d807f83e.bind(this)(e.target.assignedNodes()[0]);
        // After wrapping a text node, short-circut the handler so that the new
        // event with the wrapped node is processed instead.
        //? Keeps domtoimage.toSVG() from being ran unnecessarily
        if (originalNodeType !== Node.ELEMENT_NODE) return;
        // The Element needs to be visible to create an image of it
        if (el.style.opacity === "0") el.style.opacity = 1;
        // Get the width and height from the bounding client rect and get an integer instead of float
        const rect = (el === null || el === void 0 ? void 0 : el.getBoundingClientRect) ? el.getBoundingClientRect() : this.getBoundingClientRect();
        const rectWidth = Math.ceil(rect.width);
        const rectHeight = Math.ceil(rect.height);
        const elStyles = $4c225ee090a8f350$export$74d0f8ed30f6559d(el);
        // Need to declare a set of default styles to overwrite the
        // ones that are generated by domtoimage that cause issues.
        // ! Need to use Bracket Accessor to overwrite the properties properly
        const overwrite = {};
        overwrite["margin-block"] = "0"; // margins were applied in the SVG
        overwrite["white-space"] = "nowrap"; // Fixes unwanted text nodes wrapping
        // User will have to figure their own font compensation amount
        const compensation = this.fontCompensation;
        // Pass the element to be imaged as an SVG to dom-to-image
        // Gives it a width and height of the boundingClientRect along
        // with any margin associated with the el (Adds the font compensation if given)
        // Uses the style object that was genereated from the elements CSSStyleDeclaration and merges any values that are present in the
        // overwrite object
        (/*@__PURE__*/$parcel$interopDefault($6716112bc694bd6e$exports)).toSvg(el, {
            width: rectWidth + parseInt(elStyles.marginRight.replace("px")) + parseInt(elStyles.marginLeft.replace("px")) + compensation,
            height: rectHeight,
            style: Object.assign(elStyles, overwrite)
        }).then((dataURL)=>{
            // TODO: See if I can opt-out of font-face rules in dom-to-image-more
            // Remove the inline base64 font-face style from the returned SVG data
            // and set it as the background image
            this.src = dataURL.replace(/<style>@font-face.*<\/style>/, "").replace(/%0A/g, "");
            // Adjust the width and height of the component
            // or the returned image won't display
            this.width = rectWidth + parseInt(elStyles.marginRight.replace("px")) + parseInt(elStyles.marginLeft.replace("px")) + "px";
            this.height = rectHeight + parseInt(elStyles.marginTop.replace("px")) + parseInt(elStyles.marginBottom.replace("px")) + "px";
            // Don't display the original slotted element
            // or there will be an ugly overlay
            el.style.opacity = 0;
        });
    }
}


var $1b07835e6369f783$export$2e2bcd8739ae039 = `<div class="neonShadow neon"><slot></slot></div>`;


var $b234ea392e67ea5e$exports = {};
$b234ea392e67ea5e$exports = ".neon {\n  margin: inherit;\n  width: inherit;\n  height: inherit;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: contain;\n  align-content: center;\n  justify-content: center;\n  display: grid;\n}\n\n.neonShadow {\n  position: relative;\n}\n\n.neonShadow:after {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  background: inherit;\n  filter: drop-shadow(0 0 10px rgba(0, 0, 0, .5)) blur(20px);\n  z-index: -1;\n  background-position: center;\n  animation: oscillate 1s cubic-bezier(.17, .67, .45, 1.32) infinite alternate;\n  position: absolute;\n}\n\n@keyframes oscillate {\n  from {\n    transform: scale(1);\n  }\n\n  to {\n    transform: scale(1.2);\n  }\n}\n\n";


var $7f7b1cf2d569a3ce$export$2e2bcd8739ae039 = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314 72"><defs><linearGradient id="a" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" stop-color="%239815c3"/><stop offset="100%" stop-color="%237206ff"/></linearGradient></defs><path fill="url(%23a)" stroke="none" d="M79.9 1a283.8 283.8 0 0 1-20.6 39c-4 6.2-7.2 11.5-13.3 16 .1-16.7 7.8-38.5 14-54L48.4 5 33.7 28 13.5 56 1 71l11.8-1.2 9-9.8L42 31c-1.5 8.1-5 21.3-5 29 0 3.4-1 11.3 4 11.3S54.3 61.7 57.4 58c9-10.9 16-21.4 22.6-34 4.8-9.7 8.4-14 0-23ZM247 39a74 74 0 0 0-13 8.4c-2.6 2-5.7 4.2-7.9 6.6-4 4.4-6.2 11.2 0 14.8 3 1.8 8.5 2.2 11.9 2.2h24c2.5 0 5.5.1 7.7-1.2 3.1-1.9 4.5-5.5 5.3-8.8h-41l16-11.3c2.4-1.7 6.6-4.2 8-6.8 2.7-5.5-4.7-9.3-4.4-14.9.5-7.7 12.8-14.3 19.4-16 3.4-1 5.6-1 9-1-3.4 10-12 11.3-18 19 2.5 1.2 6.2 3.2 9 2.8 7.1-1.2 25.5-18.4 14.8-28.5-5.4-5-15.6-2.8-21.8-.6-10.2 3.6-21.6 10.5-22.8 22.3-.5 5 1.5 8.8 3.8 13Zm52 24h-9l15.4-36L313 6c-2.7 0-6.2-.3-8.4 1.6-1.6 1.5-5.5 10.8-6.6 13.4l-11.8 29c-1.5 3.6-5.4 12.3-4.7 16 1 4.6 9.7 6.1 13.3 4 2.5-1.5 3.3-4.5 4.2-7Zm-198 0-14-1c3.4-1.6 6.9-3 10-5.1 11.1-7.4 11.8-17 2-18.6-13.2-2-27.5 13.8-23.3 26.7.6 2 1.6 3.6 3.5 4.5 3.3 2 16.4 2.3 19.3 0 1.9-1.9 2.1-4.2 2.5-6.5Zm42-16c-9.2-2.5-7-8.8-16-8.8-12 0-21 15.3-18.4 24.8 2.6 9.3 14.4 9.6 21.3 4.2 3.3-2.6 4-4.8 5.9-8.2 3.6-6.3 4.6-4 7.2-12Zm17-9-7.5 2.7-5 9.3-8.5 21c2.5 0 6.4.3 8.5-1.2 1.7-1 4.7-6.7 6.3-8.8A45 45 0 0 1 168 48c-1.8 3.9-8 16-6.4 19.7 1.5 3.5 10 4.3 12.8 2.3 2.1-1.6 2.3-4.6 2.6-7h-6c1.6-4.6 7.3-15 6.6-19-2-11.2-17 2-20.6 5 1.6-3.7 4-7 3-11Zm28 10h23l5.3-1 3.7-7h-23l-5.3 1-3.7 7Zm-90-3a24.4 24.4 0 0 1-16 14c2.5-7.9 7.6-13.1 16-14Zm28 1c.5 4.4.8 4.9 4 8-.8 1.7-1.5 3.4-2.7 4.9-7.2 9.2-15.6.2-8.6-8.8 2.2-2.9 4-3.4 7.3-4.1ZM82 59v1l-1-1h1Z"/></svg>`;


var // A private object that holds some default values
_default = /*#__PURE__*/ new WeakMap(), // Create these private variables to be updated later in the connected hook
_neonShadow = /*#__PURE__*/ new WeakMap(), _neon = /*#__PURE__*/ new WeakMap(), // Private Methods for internal component settings
// Updated the filter that is applied to the neonShadow::after pseudo element
_updateFilter = /*#__PURE__*/ new WeakSet();
class $c38b013c361dbfdf$var$NeonEl extends HTMLElement {
    // Set up to watch changes on these attributes
    static get observedAttributes() {
        return [
            "src",
            "alt",
            "margin",
            "width",
            "height",
            "blur-amt",
            "font-compensation"
        ];
    }
    connectedCallback() {
        if (this.isConnected) {
            $c7458e7a3415e664$export$2e2bcd8739ae039(this, _neon, [
                ...this.shadowRoot.styleSheets[0].cssRules
            ].find((rule)=>rule.selectorText === ".neon"
            ).style);
            $c7458e7a3415e664$export$2e2bcd8739ae039(this, _neonShadow, [
                ...this.shadowRoot.styleSheets[0].cssRules
            ].find((rule)=>rule.selectorText === ".neonShadow::after"
            ).style);
            // If necessary attributes/properties aren't set, set their defaults
            if (!this.hasAttribute("src") && this.shadowRoot.querySelector("slot").assignedNodes().length <= 0) this.src = $7f7b1cf2d569a3ce$export$2e2bcd8739ae039;
            if (!this.hasAttribute("blur-amt")) this.blurAmt = $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _default).blurAmt;
            $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).margin = this.margin;
            $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).width = this.width;
            $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).height = this.height;
            // Add an event listener for when the slot changes,
            // To copy the slot contents as an image and set as a blurred background image
            //! The "slotchange" event will fire multiple times when a text node is the slotted node because the text node will be removed, wrapped, and then added again for the image to be generated, this is mitigated in handler.js
            this.shadowRoot.querySelector("slot").addEventListener("slotchange", $549e0f202f0d259c$export$7a2bdede98851ac5.bind(this));
        }
    }
    // Processes the observed/watched attributes as they are changed
    attributeChangedCallback(name, o, n) {
        switch(name){
            case "src":
                $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).backgroundImage = `url('${this.src}')`;
                break;
            case "blur-amt":
                $2eec7714a30d92b0$export$2e2bcd8739ae039(this, _updateFilter, updateFilter).call(this);
                break;
            case "margin":
                $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).margin = this.margin;
                break;
            case "width":
                $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).width = this.width;
                break;
            case "height":
                $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neon).height = this.height;
                break;
            case "font-compensation":
                // If the font-compensation attribute is updated,
                // dispatch the slotchange event
                if (o && o !== n) {
                    this.fontCompensation = n;
                    this.shadowRoot.querySelector("slot").dispatchEvent(new Event("slotchange"));
                }
        }
    }
    // Getters and Setters for each attribute
    get src() {
        return this.getAttribute("src");
    }
    set src(n) {
        this.setAttribute("src", n);
    }
    get alt() {
        if (!this.hasAttribute("alt")) return "";
        return this.getAttribute("alt");
    }
    set alt(n) {
        this.setAttribute("alt", n);
    }
    get blurAmt() {
        return this.getAttribute("blur-amt");
    }
    set blurAmt(n) {
        this.setAttribute("blur-amt", n);
    }
    get margin() {
        if (!this.hasAttribute("margin")) return $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _default).margin;
        return this.getAttribute("margin");
    }
    set margin(n) {
        this.setAttribute("margin", n);
    }
    get width() {
        if (!this.hasAttribute("width")) return $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _default).width;
        return this.getAttribute("width");
    }
    set width(n) {
        this.setAttribute("width", n);
    }
    get height() {
        if (!this.hasAttribute("height")) return $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _default).height;
        return this.getAttribute("height");
    }
    set height(n) {
        this.setAttribute("height", n);
    }
    get fontCompensation() {
        if (!this.hasAttribute("font-compensation")) return $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _default).fontCompensation;
        return parseInt(this.getAttribute("font-compensation"));
    }
    set fontCompensation(n) {
        // The compensation amount MUST be a valid number
        let compensation = parseInt(n);
        if (Number.isNaN(compensation)) compensation = 0;
        this.setAttribute("font-compensation", compensation);
    }
    constructor(){
        super();
        $9cec2274b1d86876$export$2e2bcd8739ae039(this, _updateFilter);
        $a207a3ac25b1c338$export$2e2bcd8739ae039(this, _default, {
            writable: true,
            value: {
                blurAmt: 20,
                margin: "inherit",
                width: "inherit",
                height: "inherit",
                fontCompensation: 0
            }
        });
        $a207a3ac25b1c338$export$2e2bcd8739ae039(this, _neonShadow, {
            writable: true,
            value: null
        });
        $a207a3ac25b1c338$export$2e2bcd8739ae039(this, _neon, {
            writable: true,
            value: null
        });
        // Keeps track of the different instances of Neon-El
        this.neonId = $c38b013c361dbfdf$var$NeonEl.count;
        $c38b013c361dbfdf$var$NeonEl.count = $c38b013c361dbfdf$var$NeonEl.count + 1;
        // Create the Template and Style elements
        const template = document.createElement("template");
        const style = document.createElement("style");
        // Add the imported html for the template structure
        template.innerHTML = $1b07835e6369f783$export$2e2bcd8739ae039;
        // Add the imported CSS to the created style element
        style.textContent = (/*@__PURE__*/$parcel$interopDefault($b234ea392e67ea5e$exports));
        // Create the shadowRoot for the component using the created template
        this.attachShadow({
            mode: "open"
        }).appendChild(template.content.cloneNode(true));
        // Append the created styles to the shadowRoot
        this.shadowRoot.appendChild(style);
    }
}
// Variable will count the number of NeonEls created and use it as an ID
$cfef344cd38c105c$export$2e2bcd8739ae039($c38b013c361dbfdf$var$NeonEl, "count", 0);
function updateFilter() {
    let filter = `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(${this.blurAmt}px)`;
    $5c90f01a1e93ad01$export$2e2bcd8739ae039(this, _neonShadow).filter = filter;
}
customElements.define("neon-el", $c38b013c361dbfdf$var$NeonEl);
var $c38b013c361dbfdf$export$2e2bcd8739ae039 = $c38b013c361dbfdf$var$NeonEl;


export {$c38b013c361dbfdf$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=neon-el.js.map
