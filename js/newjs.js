!function (e) {
    function t(t, n) {
        function y() {
            l = m ? e(o[0]).outerWidth(!0) : e(o[0]).outerHeight(!0);
            var t = Math.ceil((m ? i.outerWidth() : i.outerHeight()) / (l * n.display) - 1);
            return c = Math.max(1, Math.ceil(o.length / n.display) - t), h = Math.min(c, Math.max(1, n.start)) - 2, s.css(m ? "width" : "height", l * o.length), r.move(1), b(), r
        }

        function b() {
            n.controls && a.length > 0 && u.length > 0 && (a.click(function () {
                return r.move(-1), !1
            }), u.click(function () {
                return r.move(1), !1
            })), e(document).bind("keypress", function (e) {
                g = !1, e.keyCode == 38 || e.keyCode == 39 ? r.move(1) : (e.keyCode == 40 || e.keyCode == 37) && r.move(-1)
            }), n.interval && t.hover(r.stop, r.start), n.pager && f.length > 0 && e("a", f).click(E)
        }

        function w() {
            n.controls && (a.toggleClass("disable", !(h > 0)), u.toggleClass("disable", !(h + 1 < c)));
            if (n.pager) {
                var t = e(".pagenum", f);
                t.removeClass("active"), e(t[h]).addClass("active")
            }
        }

        function E(t) {
            return e(this).hasClass("pagenum") && r.move(parseInt(this.rel), !0), !1
        }

        function S() {
            n.interval && !d && (clearTimeout(p), p = setTimeout(function () {
                h = h + 1 == c ? -1 : h, v = h + 1 == c ? !1 : h == 0 ? !0 : v, g = !0, r.move(v ? 1 : -1)
            }, n.intervaltime))
        }

        var r = this, i = e(".viewport:first", t), s = e(".overview:first", t), o = s.children(), u = e(".next:first", t), a = e(".prev:first", t), f = e(".action-pager:first", t), l, c, h, p, d, v = !0, m = n.axis == "x", g = !0;
        return this.stop = function () {
            clearTimeout(p), d = !0
        }, this.start = function () {
            d = !1, S()
        }, this.move = function (t, r) {
            h = r ? t : h += t, e("#app-screenshot").cycle(h);
            if (h > -1 && h < c) {
                var i = {};
                i[m ? "left" : "top"] = -(h * l * n.display) + 230, typeof n.beforeAnimate == "function" && n.beforeAnimate.call(this, o[h], h), s.animate(i, {
                    queue: !1,
                    duration: n.animation ? n.duration : 0,
                    complete: function () {
                        typeof n.callback == "function" && n.callback.call(this, o[h], h)
                    }
                }), w(), S()
            }
        }, y()
    }

    e.tiny = e.tiny || {}, e.tiny.carousel = {
        options: {
            start: 1,
            display: 1,
            axis: "x",
            controls: !0,
            pager: !1,
            interval: !1,
            intervaltime: 3e3,
            rewind: !1,
            animation: !0,
            duration: 1e3,
            callback: null,
            beforeAnimate: null
        }
    }, e.fn.tinycarousel = function (n) {
        var n = e.extend({}, e.tiny.carousel.options, n);
        return this.each(function () {
            e(this).data("tcl", new t(e(this), n))
        }), this
    }, e.fn.tinycarousel_start = function () {
        e(this).data("tcl").start()
    }, e.fn.tinycarousel_stop = function () {
        e(this).data("tcl").stop()
    }, e.fn.tinycarousel_move = function (t) {
        e(this).data("tcl").move(t - 1, !0)
    }
}(jQuery), function (e, t) {
    "use strict";
    function r(t) {
        e.fn.cycle.debug && i(t)
    }

    function i() {
        window.console && console.log && console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
    }

    function s(t, n, r) {
        var i = e(t).data("cycle.opts"), s = !!t.cyclePause;
        s && i.paused ? i.paused(t, i, n, r) : !s && i.resumed && i.resumed(t, i, n, r)
    }

    function o(n, r, o) {
        function l(t, n, r) {
            if (!t && n === !0) {
                var s = e(r).data("cycle.opts");
                if (!s)return i("options not found, can not resume"), !1;
                r.cycleTimeout && (clearTimeout(r.cycleTimeout), r.cycleTimeout = 0), p(s.elements, s, 1, !s.backwards)
            }
        }

        n.cycleStop === t && (n.cycleStop = 0);
        if (r === t || r === null) r = {};
        if (r.constructor == String) {
            switch (r) {
                case"destroy":
                case"stop":
                    var u = e(n).data("cycle.opts");
                    if (!u)return !1;
                    return n.cycleStop++, n.cycleTimeout && clearTimeout(n.cycleTimeout), n.cycleTimeout = 0, u.elements && e(u.elements).stop(), e(n).removeData("cycle.opts"), r == "destroy" && a(n, u), !1;
                case"toggle":
                    return n.cyclePause = n.cyclePause === 1 ? 0 : 1, l(n.cyclePause, o, n), s(n), !1;
                case"pause":
                    return n.cyclePause = 1, s(n), !1;
                case"resume":
                    return n.cyclePause = 0, l(!1, o, n), s(n), !1;
                case"prev":
                case"next":
                    u = e(n).data("cycle.opts");
                    if (!u)return i('options not found, "prev/next" ignored'), !1;
                    return e.fn.cycle[r](u), !1;
                default:
                    r = {fx: r}
            }
            return r
        }
        if (r.constructor == Number) {
            var f = r;
            return r = e(n).data("cycle.opts"), r ? f < 0 || f >= r.elements.length ? (i("invalid slide index: " + f), !1) : (r.nextSlide = f, n.cycleTimeout && (clearTimeout(n.cycleTimeout), n.cycleTimeout = 0), typeof o == "string" && (r.oneTimeFx = o), p(r.elements, r, 1, f >= r.currSlide), !1) : (i("options not found, can not advance slide"), !1)
        }
        return r
    }

    function u(t, n) {
        if (!e.support.opacity && n.cleartype && t.style.filter)try {
            t.style.removeAttribute("filter")
        } catch (r) {
        }
    }

    function a(t, n) {
        n.next && e(n.next).unbind(n.prevNextEvent), n.prev && e(n.prev).unbind(n.prevNextEvent), (n.pager || n.pagerAnchorBuilder) && e.each(n.pagerAnchors || [], function () {
            this.unbind().remove()
        }), n.pagerAnchors = null, e(t).unbind("mouseenter.cycle mouseleave.cycle"), n.destroy && n.destroy(n)
    }

    function f(n, r, o, a, f) {
        var d, y = e.extend({}, e.fn.cycle.defaults, a || {}, e.metadata ? n.metadata() : e.meta ? n.data() : {}), b = e.isFunction(n.data) ? n.data(y.metaAttr) : null;
        b && (y = e.extend(y, b)), y.autostop && (y.countdown = y.autostopCount || o.length);
        var w = n[0];
        n.data("cycle.opts", y), y.$cont = n, y.stopCount = w.cycleStop, y.elements = o, y.before = y.before ? [y.before] : [], y.after = y.after ? [y.after] : [], !e.support.opacity && y.cleartype && y.after.push(function () {
            u(this, y)
        }), y.continuous && y.after.push(function () {
            p(o, y, 0, !y.backwards)
        }), l(y), !e.support.opacity && y.cleartype && !y.cleartypeNoBg && g(r), n.css("position") == "static" && n.css("position", "relative"), y.width && n.width(y.width), y.height && y.height != "auto" && n.height(y.height), y.startingSlide !== t ? (y.startingSlide = parseInt(y.startingSlide, 10), y.startingSlide >= o.length || y.startSlide < 0 ? y.startingSlide = 0 : d = !0) : y.backwards ? y.startingSlide = o.length - 1 : y.startingSlide = 0;
        if (y.random) {
            y.randomMap = [];
            for (var E = 0; E < o.length; E++)y.randomMap.push(E);
            y.randomMap.sort(function (e, t) {
                return Math.random() - .5
            });
            if (d)for (var S = 0; S < o.length; S++)y.startingSlide == y.randomMap[S] && (y.randomIndex = S); else y.randomIndex = 1, y.startingSlide = y.randomMap[1]
        } else y.startingSlide >= o.length && (y.startingSlide = 0);
        y.currSlide = y.startingSlide || 0;
        var x = y.startingSlide;
        r.css({position: "absolute", top: 0, left: 0}).hide().each(function (t) {
            var n;
            y.backwards ? n = x ? t <= x ? o.length + (t - x) : x - t : o.length - t : n = x ? t >= x ? o.length - (t - x) : x - t : o.length - t, e(this).css("z-index", n)
        }), e(o[x]).css("opacity", 1).show(), u(o[x], y), y.fit && (y.aspect ? r.each(function () {
            var t = e(this), n = y.aspect === !0 ? t.width() / t.height() : y.aspect;
            y.width && t.width() != y.width && (t.width(y.width), t.height(y.width / n)), y.height && t.height() < y.height && (t.height(y.height), t.width(y.height * n))
        }) : (y.width && r.width(y.width), y.height && y.height != "auto" && r.height(y.height))), y.center && (!y.fit || y.aspect) && r.each(function () {
            var t = e(this);
            t.css({
                "margin-left": y.width ? (y.width - t.width()) / 2 + "px" : 0,
                "margin-top": y.height ? (y.height - t.height()) / 2 + "px" : 0
            })
        }), y.center && !y.fit && !y.slideResize && r.each(function () {
            var t = e(this);
            t.css({
                "margin-left": y.width ? (y.width - t.width()) / 2 + "px" : 0,
                "margin-top": y.height ? (y.height - t.height()) / 2 + "px" : 0
            })
        });
        var T = y.containerResize && !n.innerHeight();
        if (T) {
            var N = 0, C = 0;
            for (var k = 0; k < o.length; k++) {
                var L = e(o[k]), A = L[0], O = L.outerWidth(), M = L.outerHeight();
                O || (O = A.offsetWidth || A.width || L.attr("width")), M || (M = A.offsetHeight || A.height || L.attr("height")), N = O > N ? O : N, C = M > C ? M : C
            }
            N > 0 && C > 0 && n.css({width: N + "px", height: C + "px"})
        }
        var _ = !1;
        y.pause && n.bind("mouseenter.cycle", function () {
            _ = !0, this.cyclePause++, s(w, !0)
        }).bind("mouseleave.cycle", function () {
            _ && this.cyclePause--, s(w, !0)
        });
        if (c(y) === !1)return !1;
        var D = !1;
        a.requeueAttempts = a.requeueAttempts || 0, r.each(function () {
            var t = e(this);
            this.cycleH = y.fit && y.height ? y.height : t.height() || this.offsetHeight || this.height || t.attr("height") || 0, this.cycleW = y.fit && y.width ? y.width : t.width() || this.offsetWidth || this.width || t.attr("width") || 0;
            if (t.is("img")) {
                var n = e.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete, r = e.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete, s = e.browser.opera && (this.cycleW == 42 && this.cycleH == 19 || this.cycleW == 37 && this.cycleH == 17) && !this.complete, o = this.cycleH === 0 && this.cycleW === 0 && !this.complete;
                if (n || r || s || o) {
                    if (f.s && y.requeueOnImageNotLoaded && ++a.requeueAttempts < 100)return i(a.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function () {
                        e(f.s, f.c).cycle(a)
                    }, y.requeueTimeout), D = !0, !1;
                    i("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
                }
            }
            return !0
        });
        if (D)return !1;
        y.cssBefore = y.cssBefore || {}, y.cssAfter = y.cssAfter || {}, y.cssFirst = y.cssFirst || {}, y.animIn = y.animIn || {}, y.animOut = y.animOut || {}, r.not(":eq(" + x + ")").css(y.cssBefore), e(r[x]).css(y.cssFirst);
        if (y.timeout) {
            y.timeout = parseInt(y.timeout, 10), y.speed.constructor == String && (y.speed = e.fx.speeds[y.speed] || parseInt(y.speed, 10)), y.sync || (y.speed = y.speed / 2);
            var P = y.fx == "none" ? 0 : y.fx == "shuffle" ? 500 : 250;
            while (y.timeout - y.speed < P)y.timeout += y.speed
        }
        y.easing && (y.easeIn = y.easeOut = y.easing), y.speedIn || (y.speedIn = y.speed), y.speedOut || (y.speedOut = y.speed), y.slideCount = o.length, y.currSlide = y.lastSlide = x, y.random ? (++y.randomIndex == o.length && (y.randomIndex = 0), y.nextSlide = y.randomMap[y.randomIndex]) : y.backwards ? y.nextSlide = y.startingSlide === 0 ? o.length - 1 : y.startingSlide - 1 : y.nextSlide = y.startingSlide >= o.length - 1 ? 0 : y.startingSlide + 1;
        if (!y.multiFx) {
            var H = e.fn.cycle.transitions[y.fx];
            if (e.isFunction(H)) H(n, r, y); else if (y.fx != "custom" && !y.multiFx)return i("unknown transition: " + y.fx, "; slideshow terminating"), !1
        }
        var B = r[x];
        return y.skipInitializationCallbacks || (y.before.length && y.before[0].apply(B, [B, B, y, !0]), y.after.length && y.after[0].apply(B, [B, B, y, !0])), y.next && e(y.next).bind(y.prevNextEvent, function () {
            return v(y, 1)
        }), y.prev && e(y.prev).bind(y.prevNextEvent, function () {
            return v(y, 0)
        }), (y.pager || y.pagerAnchorBuilder) && m(o, y), h(y, o), y
    }

    function l(t) {
        t.original = {
            before: [],
            after: []
        }, t.original.cssBefore = e.extend({}, t.cssBefore), t.original.cssAfter = e.extend({}, t.cssAfter), t.original.animIn = e.extend({}, t.animIn), t.original.animOut = e.extend({}, t.animOut), e.each(t.before, function () {
            t.original.before.push(this)
        }), e.each(t.after, function () {
            t.original.after.push(this)
        })
    }

    function c(t) {
        var n, s, o = e.fn.cycle.transitions;
        if (t.fx.indexOf(",") > 0) {
            t.multiFx = !0, t.fxs = t.fx.replace(/\s*/g, "").split(",");
            for (n = 0; n < t.fxs.length; n++) {
                var u = t.fxs[n];
                s = o[u];
                if (!s || !o.hasOwnProperty(u) || !e.isFunction(s)) i("discarding unknown transition: ", u), t.fxs.splice(n, 1), n--
            }
            if (!t.fxs.length)return i("No valid transitions named; slideshow terminating."), !1
        } else if (t.fx == "all") {
            t.multiFx = !0, t.fxs = [];
            for (var a in o)o.hasOwnProperty(a) && (s = o[a], o.hasOwnProperty(a) && e.isFunction(s) && t.fxs.push(a))
        }
        if (t.multiFx && t.randomizeEffects) {
            var f = Math.floor(Math.random() * 20) + 30;
            for (n = 0; n < f; n++) {
                var l = Math.floor(Math.random() * t.fxs.length);
                t.fxs.push(t.fxs.splice(l, 1)[0])
            }
            r("randomized fx sequence: ", t.fxs)
        }
        return !0
    }

    function h(t, n) {
        t.addSlide = function (r, i) {
            var s = e(r), o = s[0];
            t.autostopCount || t.countdown++, n[i ? "unshift" : "push"](o), t.els && t.els[i ? "unshift" : "push"](o), t.slideCount = n.length, t.random && (t.randomMap.push(t.slideCount - 1), t.randomMap.sort(function (e, t) {
                return Math.random() - .5
            })), s.css("position", "absolute"), s[i ? "prependTo" : "appendTo"](t.$cont), i && (t.currSlide++, t.nextSlide++), !e.support.opacity && t.cleartype && !t.cleartypeNoBg && g(s), t.fit && t.width && s.width(t.width), t.fit && t.height && t.height != "auto" && s.height(t.height), o.cycleH = t.fit && t.height ? t.height : s.height(), o.cycleW = t.fit && t.width ? t.width : s.width(), s.css(t.cssBefore), (t.pager || t.pagerAnchorBuilder) && e.fn.cycle.createPagerAnchor(n.length - 1, o, e(t.pager), n, t), e.isFunction(t.onAddSlide) ? t.onAddSlide(s) : s.hide()
        }
    }

    function p(n, i, s, o) {
        function m() {
            var e = 0, t = i.timeout;
            i.timeout && !i.continuous ? (e = d(n[i.currSlide], n[i.nextSlide], i, o), i.fx == "shuffle" && (e -= i.speedOut)) : i.continuous && u.cyclePause && (e = 10), e > 0 && (u.cycleTimeout = setTimeout(function () {
                p(n, i, 0, !i.backwards)
            }, e))
        }

        var u = i.$cont[0], a = n[i.currSlide], f = n[i.nextSlide];
        s && i.busy && i.manualTrump && (r("manualTrump in go(), stopping active transition"), e(n).stop(!0, !0), i.busy = 0, clearTimeout(u.cycleTimeout));
        if (i.busy) {
            r("transition active, ignoring new tx request");
            return
        }
        if (u.cycleStop != i.stopCount || u.cycleTimeout === 0 && !s)return;
        if (!s && !u.cyclePause && !i.bounce && (i.autostop && --i.countdown <= 0 || i.nowrap && !i.random && i.nextSlide < i.currSlide)) {
            i.end && i.end(i);
            return
        }
        var l = !1;
        if ((s || !u.cyclePause) && i.nextSlide != i.currSlide) {
            l = !0;
            var c = i.fx;
            a.cycleH = a.cycleH || e(a).height(), a.cycleW = a.cycleW || e(a).width(), f.cycleH = f.cycleH || e(f).height(), f.cycleW = f.cycleW || e(f).width(), i.multiFx && (o && (i.lastFx === t || ++i.lastFx >= i.fxs.length) ? i.lastFx = 0 : !o && (i.lastFx === t || --i.lastFx < 0) && (i.lastFx = i.fxs.length - 1), c = i.fxs[i.lastFx]), i.oneTimeFx && (c = i.oneTimeFx, i.oneTimeFx = null), e.fn.cycle.resetState(i, c), i.before.length && e.each(i.before, function (e, t) {
                if (u.cycleStop != i.stopCount)return;
                t.apply(f, [a, f, i, o])
            });
            var h = function () {
                i.busy = 0, e.each(i.after, function (e, t) {
                    if (u.cycleStop != i.stopCount)return;
                    t.apply(f, [a, f, i, o])
                }), u.cycleStop || m()
            };
            r("tx firing(" + c + "); currSlide: " + i.currSlide + "; nextSlide: " + i.nextSlide), i.busy = 1, i.fxFn ? i.fxFn(a, f, i, h, o, s && i.fastOnEvent) : e.isFunction(e.fn.cycle[i.fx]) ? e.fn.cycle[i.fx](a, f, i, h, o, s && i.fastOnEvent) : e.fn.cycle.custom(a, f, i, h, o, s && i.fastOnEvent)
        } else m();
        if (l || i.nextSlide == i.currSlide) {
            var v;
            i.lastSlide = i.currSlide, i.random ? (i.currSlide = i.nextSlide, ++i.randomIndex == n.length && (i.randomIndex = 0, i.randomMap.sort(function (e, t) {
                return Math.random() - .5
            })), i.nextSlide = i.randomMap[i.randomIndex], i.nextSlide == i.currSlide && (i.nextSlide = i.currSlide == i.slideCount - 1 ? 0 : i.currSlide + 1)) : i.backwards ? (v = i.nextSlide - 1 < 0, v && i.bounce ? (i.backwards = !i.backwards, i.nextSlide = 1, i.currSlide = 0) : (i.nextSlide = v ? n.length - 1 : i.nextSlide - 1, i.currSlide = v ? 0 : i.nextSlide + 1)) : (v = i.nextSlide + 1 == n.length, v && i.bounce ? (i.backwards = !i.backwards, i.nextSlide = n.length - 2, i.currSlide = n.length - 1) : (i.nextSlide = v ? 0 : i.nextSlide + 1, i.currSlide = v ? n.length - 1 : i.nextSlide - 1))
        }
        l && i.pager && i.updateActivePagerLink(i.pager, i.currSlide, i.activePagerClass)
    }

    function d(e, t, n, i) {
        if (n.timeoutFn) {
            var s = n.timeoutFn.call(e, e, t, n, i);
            while (n.fx != "none" && s - n.speed < 250)s += n.speed;
            r("calculated timeout: " + s + "; speed: " + n.speed);
            if (s !== !1)return s
        }
        return n.timeout
    }

    function v(t, n) {
        var r = n ? 1 : -1, i = t.elements, s = t.$cont[0], o = s.cycleTimeout;
        o && (clearTimeout(o), s.cycleTimeout = 0);
        if (t.random && r < 0) t.randomIndex--, --t.randomIndex == -2 ? t.randomIndex = i.length - 2 : t.randomIndex == -1 && (t.randomIndex = i.length - 1), t.nextSlide = t.randomMap[t.randomIndex]; else if (t.random) t.nextSlide = t.randomMap[t.randomIndex]; else {
            t.nextSlide = t.currSlide + r;
            if (t.nextSlide < 0) {
                if (t.nowrap)return !1;
                t.nextSlide = i.length - 1
            } else if (t.nextSlide >= i.length) {
                if (t.nowrap)return !1;
                t.nextSlide = 0
            }
        }
        var u = t.onPrevNextEvent || t.prevNextClick;
        return e.isFunction(u) && u(r > 0, t.nextSlide, i[t.nextSlide]), p(i, t, 1, n), !1
    }

    function m(t, n) {
        var r = e(n.pager);
        e.each(t, function (i, s) {
            e.fn.cycle.createPagerAnchor(i, s, r, t, n)
        }), n.updateActivePagerLink(n.pager, n.startingSlide, n.activePagerClass)
    }

    function g(t) {
        function n(e) {
            return e = parseInt(e, 10).toString(16), e.length < 2 ? "0" + e : e
        }

        function i(t) {
            for (; t && t.nodeName.toLowerCase() != "html"; t = t.parentNode) {
                var r = e.css(t, "background-color");
                if (r && r.indexOf("rgb") >= 0) {
                    var i = r.match(/\d+/g);
                    return "#" + n(i[0]) + n(i[1]) + n(i[2])
                }
                if (r && r != "transparent")return r
            }
            return "#ffffff"
        }

        r("applying clearType background-color hack"), t.each(function () {
            e(this).css("background-color", i(this))
        })
    }

    var n = "2.9999.5";
    e.support === t && (e.support = {opacity: !e.browser.msie}), e.expr[":"].paused = function (e) {
        return e.cyclePause
    }, e.fn.cycle = function (t, n) {
        var s = {s: this.selector, c: this.context};
        return this.length === 0 && t != "stop" ? !e.isReady && s.s ? (i("DOM not ready, queuing slideshow"), e(function () {
            e(s.s, s.c).cycle(t, n)
        }), this) : (i("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this) : this.each(function () {
            var u = o(this, t, n);
            if (u === !1)return;
            u.updateActivePagerLink = u.updateActivePagerLink || e.fn.cycle.updateActivePagerLink, this.cycleTimeout && clearTimeout(this.cycleTimeout), this.cycleTimeout = this.cyclePause = 0, this.cycleStop = 0;
            var a = e(this), l = u.slideExpr ? e(u.slideExpr, this) : a.children(), c = l.get();
            if (c.length < 2) {
                i("terminating; too few slides: " + c.length);
                return
            }
            var h = f(a, l, c, u, s);
            if (h === !1)return;
            var v = h.continuous ? 10 : d(c[h.currSlide], c[h.nextSlide], h, !h.backwards);
            v && (v += h.delay || 0, v < 10 && (v = 10), r("first timeout: " + v), this.cycleTimeout = setTimeout(function () {
                p(c, h, 0, !u.backwards)
            }, v))
        })
    }, e.fn.cycle.resetState = function (t, n) {
        n = n || t.fx, t.before = [], t.after = [], t.cssBefore = e.extend({}, t.original.cssBefore), t.cssAfter = e.extend({}, t.original.cssAfter), t.animIn = e.extend({}, t.original.animIn), t.animOut = e.extend({}, t.original.animOut), t.fxFn = null, e.each(t.original.before, function () {
            t.before.push(this)
        }), e.each(t.original.after, function () {
            t.after.push(this)
        });
        var r = e.fn.cycle.transitions[n];
        e.isFunction(r) && r(t.$cont, e(t.elements), t)
    }, e.fn.cycle.updateActivePagerLink = function (t, n, r) {
        e(t).each(function () {
            e(this).children().removeClass(r).eq(n).addClass(r)
        })
    }, e.fn.cycle.next = function (e) {
        v(e, 1)
    }, e.fn.cycle.prev = function (e) {
        v(e, 0)
    }, e.fn.cycle.createPagerAnchor = function (t, n, i, o, u) {
        var a;
        e.isFunction(u.pagerAnchorBuilder) ? (a = u.pagerAnchorBuilder(t, n), r("pagerAnchorBuilder(" + t + ", el) returned: " + a)) : a = '<a href="#">' + (t + 1) + "</a>";
        if (!a)return;
        var f = e(a);
        if (f.parents("body").length === 0) {
            var l = [];
            i.length > 1 ? (i.each(function () {
                var t = f.clone(!0);
                e(this).append(t), l.push(t[0])
            }), f = e(l)) : f.appendTo(i)
        }
        u.pagerAnchors = u.pagerAnchors || [], u.pagerAnchors.push(f);
        var c = function (n) {
            n.preventDefault(), u.nextSlide = t;
            var r = u.$cont[0], i = r.cycleTimeout;
            i && (clearTimeout(i), r.cycleTimeout = 0);
            var s = u.onPagerEvent || u.pagerClick;
            e.isFunction(s) && s(u.nextSlide, o[u.nextSlide]), p(o, u, 1, u.currSlide < t)
        };
        /mouseenter|mouseover/i.test(u.pagerEvent) ? f.hover(c, function () {
        }) : f.bind(u.pagerEvent, c), !/^click/.test(u.pagerEvent) && !u.allowPagerClickBubble && f.bind("click.cycle", function () {
            return !1
        });
        var h = u.$cont[0], d = !1;
        u.pauseOnPagerHover && f.hover(function () {
            d = !0, h.cyclePause++, s(h, !0, !0)
        }, function () {
            d && h.cyclePause--, s(h, !0, !0)
        })
    }, e.fn.cycle.hopsFromLast = function (e, t) {
        var n, r = e.lastSlide, i = e.currSlide;
        return t ? n = i > r ? i - r : e.slideCount - r : n = i < r ? r - i : r + e.slideCount - i, n
    }, e.fn.cycle.commonReset = function (t, n, r, i, s, o) {
        e(r.elements).not(t).hide(), typeof r.cssBefore.opacity == "undefined" && (r.cssBefore.opacity = 1), r.cssBefore.display = "block", r.slideResize && i !== !1 && n.cycleW > 0 && (r.cssBefore.width = n.cycleW), r.slideResize && s !== !1 && n.cycleH > 0 && (r.cssBefore.height = n.cycleH), r.cssAfter = r.cssAfter || {}, r.cssAfter.display = "none", e(t).css("zIndex", r.slideCount + (o === !0 ? 1 : 0)), e(n).css("zIndex", r.slideCount + (o === !0 ? 0 : 1))
    }, e.fn.cycle.custom = function (t, n, r, i, s, o) {
        var u = e(t), a = e(n), f = r.speedIn, l = r.speedOut, c = r.easeIn, h = r.easeOut;
        a.css(r.cssBefore), o && (typeof o == "number" ? f = l = o : f = l = 1, c = h = null);
        var p = function () {
            a.animate(r.animIn, f, c, function () {
                i()
            })
        };
        u.animate(r.animOut, l, h, function () {
            u.css(r.cssAfter), r.sync || p()
        }), r.sync && p()
    }, e.fn.cycle.transitions = {
        fade: function (t, n, r) {
            n.not(":eq(" + r.currSlide + ")").css("opacity", 0), r.before.push(function (t, n, r) {
                e.fn.cycle.commonReset(t, n, r), r.cssBefore.opacity = 0
            }), r.animIn = {opacity: 1}, r.animOut = {opacity: 0}, r.cssBefore = {top: 0, left: 0}
        }
    }, e.fn.cycle.ver = function () {
        return n
    }, e.fn.cycle.defaults = {
        activePagerClass: "activeSlide",
        after: null,
        allowPagerClickBubble: !1,
        animIn: null,
        animOut: null,
        aspect: !1,
        autostop: 0,
        autostopCount: 0,
        backwards: !1,
        before: null,
        center: null,
        cleartype: !e.support.opacity,
        cleartypeNoBg: !1,
        containerResize: 1,
        continuous: 0,
        cssAfter: null,
        cssBefore: null,
        delay: 0,
        easeIn: null,
        easeOut: null,
        easing: null,
        end: null,
        fastOnEvent: 0,
        fit: 0,
        fx: "fade",
        fxFn: null,
        height: "auto",
        manualTrump: !0,
        metaAttr: "cycle",
        next: null,
        nowrap: 0,
        onPagerEvent: null,
        onPrevNextEvent: null,
        pager: null,
        pagerAnchorBuilder: null,
        pagerEvent: "click.cycle",
        pause: 0,
        pauseOnPagerHover: 0,
        prev: null,
        prevNextEvent: "click.cycle",
        random: 0,
        randomizeEffects: 1,
        requeueOnImageNotLoaded: !0,
        requeueTimeout: 250,
        rev: 0,
        shuffle: null,
        skipInitializationCallbacks: !1,
        slideExpr: null,
        slideResize: 1,
        speed: 1e3,
        speedIn: null,
        speedOut: null,
        startingSlide: t,
        sync: 1,
        timeout: 4e3,
        timeoutFn: null,
        updateActivePagerLink: null,
        width: null
    }
}(jQuery), function (e) {
    "use strict";
    e.fn.cycle.transitions.none = function (t, n, r) {
        r.fxFn = function (t, n, r, i) {
            e(n).show(), e(t).hide(), i()
        }
    }, e.fn.cycle.transitions.fadeout = function (t, n, r) {
        n.not(":eq(" + r.currSlide + ")").css({
            display: "block",
            opacity: 1
        }), r.before.push(function (t, n, r, i, s, o) {
            e(t).css("zIndex", r.slideCount + (o !== !0 ? 1 : 0)), e(n).css("zIndex", r.slideCount + (o !== !0 ? 0 : 1))
        }), r.animIn.opacity = 1, r.animOut.opacity = 0, r.cssBefore.opacity = 1, r.cssBefore.display = "block", r.cssAfter.zIndex = 0
    }, e.fn.cycle.transitions.scrollUp = function (t, n, r) {
        t.css("overflow", "hidden"), r.before.push(e.fn.cycle.commonReset);
        var i = t.height();
        r.cssBefore.top = i, r.cssBefore.left = 0, r.cssFirst.top = 0, r.animIn.top = 0, r.animOut.top = -i
    }, e.fn.cycle.transitions.scrollDown = function (t, n, r) {
        t.css("overflow", "hidden"), r.before.push(e.fn.cycle.commonReset);
        var i = t.height();
        r.cssFirst.top = 0, r.cssBefore.top = -i, r.cssBefore.left = 0, r.animIn.top = 0, r.animOut.top = i
    }, e.fn.cycle.transitions.scrollLeft = function (t, n, r) {
        t.css("overflow", "hidden"), r.before.push(e.fn.cycle.commonReset);
        var i = t.width();
        r.cssFirst.left = 0, r.cssBefore.left = i, r.cssBefore.top = 0, r.animIn.left = 0, r.animOut.left = 0 - i
    }, e.fn.cycle.transitions.scrollRight = function (t, n, r) {
        t.css("overflow", "hidden"), r.before.push(e.fn.cycle.commonReset);
        var i = t.width();
        r.cssFirst.left = 0, r.cssBefore.left = -i, r.cssBefore.top = 0, r.animIn.left = 0, r.animOut.left = i
    }, e.fn.cycle.transitions.scrollHorz = function (t, n, r) {
        t.css("overflow", "hidden").width(), r.before.push(function (t, n, r, i) {
            r.rev && (i = !i), e.fn.cycle.commonReset(t, n, r), r.cssBefore.left = i ? n.cycleW - 1 : 1 - n.cycleW, r.animOut.left = i ? -t.cycleW : t.cycleW
        }), r.cssFirst.left = 0, r.cssBefore.top = 0, r.animIn.left = 0, r.animOut.top = 0
    }, e.fn.cycle.transitions.scrollVert = function (t, n, r) {
        t.css("overflow", "hidden"), r.before.push(function (t, n, r, i) {
            r.rev && (i = !i), e.fn.cycle.commonReset(t, n, r), r.cssBefore.top = i ? 1 - n.cycleH : n.cycleH - 1, r.animOut.top = i ? t.cycleH : -t.cycleH
        }), r.cssFirst.top = 0, r.cssBefore.left = 0, r.animIn.top = 0, r.animOut.left = 0
    }, e.fn.cycle.transitions.slideX = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e(r.elements).not(t).hide(), e.fn.cycle.commonReset(t, n, r, !1, !0), r.animIn.width = n.cycleW
        }), r.cssBefore.left = 0, r.cssBefore.top = 0, r.cssBefore.width = 0, r.animIn.width = "show", r.animOut.width = 0
    }, e.fn.cycle.transitions.slideY = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e(r.elements).not(t).hide(), e.fn.cycle.commonReset(t, n, r, !0, !1), r.animIn.height = n.cycleH
        }), r.cssBefore.left = 0, r.cssBefore.top = 0, r.cssBefore.height = 0, r.animIn.height = "show", r.animOut.height = 0
    }, e.fn.cycle.transitions.shuffle = function (t, n, r) {
        var i, s = t.css("overflow", "visible").width();
        n.css({left: 0, top: 0}), r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !0, !0)
        }), r.speedAdjusted || (r.speed = r.speed / 2, r.speedAdjusted = !0), r.random = 0, r.shuffle = r.shuffle || {
                left: -s,
                top: 15
            }, r.els = [];
        for (i = 0; i < n.length; i++)r.els.push(n[i]);
        for (i = 0; i < r.currSlide; i++)r.els.push(r.els.shift());
        r.fxFn = function (t, n, r, i, s) {
            r.rev && (s = !s);
            var o = s ? e(t) : e(n);
            e(n).css(r.cssBefore);
            var u = r.slideCount;
            o.animate(r.shuffle, r.speedIn, r.easeIn, function () {
                var n = e.fn.cycle.hopsFromLast(r, s);
                for (var a = 0; a < n; a++)s ? r.els.push(r.els.shift()) : r.els.unshift(r.els.pop());
                if (s)for (var f = 0, l = r.els.length; f < l; f++)e(r.els[f]).css("z-index", l - f + u); else {
                    var c = e(t).css("z-index");
                    o.css("z-index", parseInt(c, 10) + 1 + u)
                }
                o.animate({left: 0, top: 0}, r.speedOut, r.easeOut, function () {
                    e(s ? this : t).hide(), i && i()
                })
            })
        }, e.extend(r.cssBefore, {display: "block", opacity: 1, top: 0, left: 0})
    }, e.fn.cycle.transitions.turnUp = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !1), r.cssBefore.top = n.cycleH, r.animIn.height = n.cycleH, r.animOut.width = n.cycleW
        }), r.cssFirst.top = 0, r.cssBefore.left = 0, r.cssBefore.height = 0, r.animIn.top = 0, r.animOut.height = 0
    }, e.fn.cycle.transitions.turnDown = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !1), r.animIn.height = n.cycleH, r.animOut.top = t.cycleH
        }), r.cssFirst.top = 0, r.cssBefore.left = 0, r.cssBefore.top = 0, r.cssBefore.height = 0, r.animOut.height = 0
    }, e.fn.cycle.transitions.turnLeft = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !1, !0), r.cssBefore.left = n.cycleW, r.animIn.width = n.cycleW
        }), r.cssBefore.top = 0, r.cssBefore.width = 0, r.animIn.left = 0, r.animOut.width = 0
    }, e.fn.cycle.transitions.turnRight = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !1, !0), r.animIn.width = n.cycleW, r.animOut.left = t.cycleW
        }), e.extend(r.cssBefore, {top: 0, left: 0, width: 0}), r.animIn.left = 0, r.animOut.width = 0
    }, e.fn.cycle.transitions.zoom = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !1, !1, !0), r.cssBefore.top = n.cycleH / 2, r.cssBefore.left = n.cycleW / 2, e.extend(r.animIn, {
                top: 0,
                left: 0,
                width: n.cycleW,
                height: n.cycleH
            }), e.extend(r.animOut, {width: 0, height: 0, top: t.cycleH / 2, left: t.cycleW / 2})
        }), r.cssFirst.top = 0, r.cssFirst.left = 0, r.cssBefore.width = 0, r.cssBefore.height = 0
    }, e.fn.cycle.transitions.fadeZoom = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !1, !1), r.cssBefore.left = n.cycleW / 2, r.cssBefore.top = n.cycleH / 2, e.extend(r.animIn, {
                top: 0,
                left: 0,
                width: n.cycleW,
                height: n.cycleH
            })
        }), r.cssBefore.width = 0, r.cssBefore.height = 0, r.animOut.opacity = 0
    }, e.fn.cycle.transitions.blindX = function (t, n, r) {
        var i = t.css("overflow", "hidden").width();
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r), r.animIn.width = n.cycleW, r.animOut.left = t.cycleW
        }), r.cssBefore.left = i, r.cssBefore.top = 0, r.animIn.left = 0, r.animOut.left = i
    }, e.fn.cycle.transitions.blindY = function (t, n, r) {
        var i = t.css("overflow", "hidden").height();
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r), r.animIn.height = n.cycleH, r.animOut.top = t.cycleH
        }), r.cssBefore.top = i, r.cssBefore.left = 0, r.animIn.top = 0, r.animOut.top = i
    }, e.fn.cycle.transitions.blindZ = function (t, n, r) {
        var i = t.css("overflow", "hidden").height(), s = t.width();
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r), r.animIn.height = n.cycleH, r.animOut.top = t.cycleH
        }), r.cssBefore.top = i, r.cssBefore.left = s, r.animIn.top = 0, r.animIn.left = 0, r.animOut.top = i, r.animOut.left = s
    }, e.fn.cycle.transitions.growX = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !1, !0), r.cssBefore.left = this.cycleW / 2, r.animIn.left = 0, r.animIn.width = this.cycleW, r.animOut.left = 0
        }), r.cssBefore.top = 0, r.cssBefore.width = 0
    }, e.fn.cycle.transitions.growY = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !1), r.cssBefore.top = this.cycleH / 2, r.animIn.top = 0, r.animIn.height = this.cycleH, r.animOut.top = 0
        }), r.cssBefore.height = 0, r.cssBefore.left = 0
    }, e.fn.cycle.transitions.curtainX = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !1, !0, !0), r.cssBefore.left = n.cycleW / 2, r.animIn.left = 0, r.animIn.width = this.cycleW, r.animOut.left = t.cycleW / 2, r.animOut.width = 0
        }), r.cssBefore.top = 0, r.cssBefore.width = 0
    }, e.fn.cycle.transitions.curtainY = function (t, n, r) {
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !1, !0), r.cssBefore.top = n.cycleH / 2, r.animIn.top = 0, r.animIn.height = n.cycleH, r.animOut.top = t.cycleH / 2, r.animOut.height = 0
        }), r.cssBefore.height = 0, r.cssBefore.left = 0
    }, e.fn.cycle.transitions.cover = function (t, n, r) {
        var i = r.direction || "left", s = t.css("overflow", "hidden").width(), o = t.height();
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r), i == "right" ? r.cssBefore.left = -s : i == "up" ? r.cssBefore.top = o : i == "down" ? r.cssBefore.top = -o : r.cssBefore.left = s
        }), r.animIn.left = 0, r.animIn.top = 0, r.cssBefore.top = 0, r.cssBefore.left = 0
    }, e.fn.cycle.transitions.uncover = function (t, n, r) {
        var i = r.direction || "left", s = t.css("overflow", "hidden").width(), o = t.height();
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !0, !0), i == "right" ? r.animOut.left = s : i == "up" ? r.animOut.top = -o : i == "down" ? r.animOut.top = o : r.animOut.left = -s
        }), r.animIn.left = 0, r.animIn.top = 0, r.cssBefore.top = 0, r.cssBefore.left = 0
    }, e.fn.cycle.transitions.toss = function (t, n, r) {
        var i = t.css("overflow", "visible").width(), s = t.height();
        r.before.push(function (t, n, r) {
            e.fn.cycle.commonReset(t, n, r, !0, !0, !0), !r.animOut.left && !r.animOut.top ? e.extend(r.animOut, {
                left: i * 2,
                top: -s / 2,
                opacity: 0
            }) : r.animOut.opacity = 0
        }), r.cssBefore.left = 0, r.cssBefore.top = 0, r.animIn.left = 0
    }, e.fn.cycle.transitions.wipe = function (t, n, r) {
        var i = t.css("overflow", "hidden").width(), s = t.height();
        r.cssBefore = r.cssBefore || {};
        var o;
        if (r.clip)if (/l2r/.test(r.clip)) o = "rect(0px 0px " + s + "px 0px)"; else if (/r2l/.test(r.clip)) o = "rect(0px " + i + "px " + s + "px " + i + "px)"; else if (/t2b/.test(r.clip)) o = "rect(0px " + i + "px 0px 0px)"; else if (/b2t/.test(r.clip)) o = "rect(" + s + "px " + i + "px " + s + "px 0px)"; else if (/zoom/.test(r.clip)) {
            var u = parseInt(s / 2, 10), a = parseInt(i / 2, 10);
            o = "rect(" + u + "px " + a + "px " + u + "px " + a + "px)"
        }
        r.cssBefore.clip = r.cssBefore.clip || o || "rect(0px 0px 0px 0px)";
        var f = r.cssBefore.clip.match(/(\d+)/g), l = parseInt(f[0], 10), c = parseInt(f[1], 10), h = parseInt(f[2], 10), p = parseInt(f[3], 10);
        r.before.push(function (t, n, r) {
            if (t == n)return;
            var o = e(t), u = e(n);
            e.fn.cycle.commonReset(t, n, r, !0, !0, !1), r.cssAfter.display = "block";
            var a = 1, f = parseInt(r.speedIn / 13, 10) - 1;
            (function d() {
                var e = l ? l - parseInt(a * (l / f), 10) : 0, t = p ? p - parseInt(a * (p / f), 10) : 0, n = h < s ? h + parseInt(a * ((s - h) / f || 1), 10) : s, r = c < i ? c + parseInt(a * ((i - c) / f || 1), 10) : i;
                u.css({clip: "rect(" + e + "px " + r + "px " + n + "px " + t + "px)"}), a++ <= f ? setTimeout(d, 13) : o.css("display", "none")
            })()
        }), e.extend(r.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        }), r.animIn = {left: 0}, r.animOut = {left: 0}
    }
}(jQuery), !function (e) {
    "use strict";
    e(function () {
        e.support.transition = function () {
            var e = function () {
                var e = document.createElement("bootstrap"), t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                }, n;
                for (n in t)if (e.style[n] !== undefined)return t[n]
            }();
            return e && {end: e}
        }()
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]', n = function (n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function (t) {
        function n() {
            s.trigger("closed").remove()
        }

        var r = e(this), i = r.attr("data-target"), s;
        i || (i = r.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), s = e(i), t && t.preventDefault(), s.length || (s = r.hasClass("alert") ? r : r.parent()), s.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())return;
        s.removeClass("in"), e.support.transition && s.hasClass("fade") ? s.on(e.support.transition.end, n) : n()
    }, e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this), i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("button"), s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {loadingText: "loading..."}, e.fn.button.Constructor = t, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window
    .jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function (t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        }, to: function (t) {
            var n = this.$element.find(".item.active"), r = n.parent().children(), i = r.index(n), s = this;
            if (t > r.length - 1 || t < 0)return;
            return this.sliding ? this.$element.one("slid", function () {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        }, pause: function (t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            if (this.sliding)return;
            return this.slide("next")
        }, prev: function () {
            if (this.sliding)return;
            return this.slide("prev")
        }, slide: function (t, n) {
            var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left" : "right", u = t == "next" ? "first" : "last", a = this, f;
            this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {relatedTarget: i[0]});
            if (i.hasClass("active"))return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("carousel"), s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n), o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e(document).on("click.carousel.data-api", "[data-slide]", function (t) {
        var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = e.extend({}, i.data(), n.data());
        i.carousel(s), t.preventDefault()
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t, dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        }, show: function () {
            var t, n, r, i;
            if (this.transitioning)return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning)return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
        }, hide: function () {
            var t;
            if (this.transitioning)return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        }, reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (t, n, r) {
            var i = this, s = function () {
                n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
            };
            this.$element.trigger(n);
            if (n.isDefaultPrevented())return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("collapse"), s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {toggle: !0}, e.fn.collapse.Constructor = t, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
        var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle" : n.data();
        n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
    })
}(window.jQuery), !function (e) {
    "use strict";
    function t() {
        e(r).each(function () {
            n(e(this)).removeClass("open")
        })
    }

    function n(t) {
        var n = t.attr("data-target"), r;
        return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
    }

    var r = "[data-toggle=dropdown]", i = function (t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function () {
            n.parent().removeClass("open")
        })
    };
    i.prototype = {
        constructor: i, toggle: function (r) {
            var i = e(this), s, o;
            if (i.is(".disabled, :disabled"))return;
            return s = n(i), o = s.hasClass("open"), t(), o || (s.toggleClass("open"), i.focus()), !1
        }, keydown: function (t) {
            var r, i, s, o, u, a;
            if (!/(38|40|27)/.test(t.keyCode))return;
            r = e(this), t.preventDefault(), t.stopPropagation();
            if (r.is(".disabled, :disabled"))return;
            o = n(r), u = o.hasClass("open");
            if (!u || u && t.keyCode == 27)return r.click();
            i = e("[role=menu] li:not(.divider) a", o);
            if (!i.length)return;
            a = i.index(i.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < i.length - 1 && a++, ~a || (a = 0), i.eq(a).focus()
        }
    }, e.fn.dropdown = function (t) {
        return this.each(function () {
            var n = e(this), r = n.data("dropdown");
            r || n.data("dropdown", r = new i(this)), typeof t == "string" && r[t].call(n)
        })
    }, e.fn.dropdown.Constructor = i, e(document).on("click.dropdown.data-api touchstart.dropdown.data-api", t).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", r, i.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", r + ", [role=menu]", i.prototype.keydown)
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var t = this, n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())return;
            this.isShown = !0, this.escape(), this.backdrop(function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            })
        }, hide: function (t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())return;
            this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        }, enforceFocus: function () {
            var t = this;
            e(document).on("focusin.modal", function (e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        }, escape: function () {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var t = this, n = setTimeout(function () {
                t.$element.off(e.support.transition.end), t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function () {
                clearTimeout(n), t.hideModal()
            })
        }, hideModal: function (e) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        }, removeBackdrop: function () {
            this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (t) {
            var n = this, r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    }, e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("modal"), s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
        var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")), s = i.data("modal") ? "toggle" : e.extend({remote: !/#/.test(r) && r}, i.data(), n.data());
        t.preventDefault(), i.modal(s).one("hide", function () {
            n.focus()
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t, init: function (t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        }, enter: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay || !n.options.delay.show)return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        }, leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide)return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function () {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        }, show: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                    case"bottom":
                        o = {top: n.top + n.height, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"top":
                        o = {top: n.top - i, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"left":
                        o = {top: n.top + n.height / 2 - i / 2, left: n.left - r};
                        break;
                    case"right":
                        o = {top: n.top + n.height / 2 - i / 2, left: n.left + n.width}
                }
                e.offset(o).addClass(s).addClass("in")
            }
        }, setContent: function () {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        }, hide: function () {
            function t() {
                var t = setTimeout(function () {
                    r.off(e.support.transition.end).detach()
                }, 500);
                r.one(e.support.transition.end, function () {
                    clearTimeout(t), r.detach()
                })
            }

            var n = this, r = this.tip();
            return r.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : r.detach(), this
        }, fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function (t) {
            return e.extend({}, t ? {top: 0, left: 0} : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        }, getTitle: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        }, tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            n[n.tip().hasClass("in") ? "hide" : "show"]()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tooltip"), s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t, setContent: function () {
            var e = this.tip(), t = this.getTitle(), n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content > *")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        }, tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("popover"), s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), !function (e) {
    "use strict";
    function t(t, n) {
        var r = e.proxy(this.process, this), i = e(t).is("body") ? e(window) : e(t), s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }

    t.prototype = {
        constructor: t, refresh: function () {
            var t = this, n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
                var t = e(this), n = t.data("target") || t.attr("href"), r = /^#\w/.test(n) && e(n);
                return r && r.length && [[r.position().top, n]] || null
            }).sort(function (e, t) {
                return e[0] - t[0]
            }).each(function () {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        }, process: function () {
            var e = this.$scrollElement.scrollTop() + this.options.offset, t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = t - this.$scrollElement.height(), r = this.offsets, i = this.targets, s = this.activeTarget, o;
            if (e >= n)return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;)s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        }, activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("scrollspy"), s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {offset: 10}, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t, show: function () {
            var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active"))return;
            i = n.find(".active:last a")[0], o = e.Event("show", {relatedTarget: i}), t.trigger(o);
            if (o.isDefaultPrevented())return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
                t.trigger({type: "shown", relatedTarget: i})
            })
        }, activate: function (t, n, r) {
            function i() {
                s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }

            var s = n.find("> .active"), o = r && e.support.transition && s.hasClass("fade");
            o ? s.one(e.support.transition.end, i) : i(), s.removeClass("in")
        }
    }, e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t, select: function () {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        }, updater: function (e) {
            return e
        }, show: function () {
            var t = e.extend({}, this.$element.offset(), {height: this.$element[0].offsetHeight});
            return this.$menu.css({top: t.top + t.height, left: t.left}), this.$menu.show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function (t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        }, process: function (t) {
            var n = this;
            return t = e.grep(t, function (e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (e) {
            var t = [], n = [], r = [], i;
            while (i = e.shift())i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        }, highlighter: function (e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
                return "<strong>" + t + "</strong>"
            })
        }, render: function (t) {
            var n = this;
            return t = e(t).map(function (t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        }, next: function (t) {
            var n = this.$menu.find(".active").removeClass("active"), r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        }, prev: function (e) {
            var t = this.$menu.find(".active").removeClass("active"), n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        }, listen: function () {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        }, eventSupported: function (e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = typeof this.$element[e] == "function"), t
        }, move: function (e) {
            if (!this.shown)return;
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    e.preventDefault(), this.next()
            }
            e.stopPropagation()
        }, keydown: function (t) {
            this.suppressKeyPressRepeat = !~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        }, keypress: function (e) {
            if (this.suppressKeyPressRepeat)return;
            this.move(e)
        }, keyup: function (e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown)return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        }, blur: function (e) {
            var t = this;
            setTimeout(function () {
                t.hide()
            }, 150)
        }, click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        }, mouseenter: function (t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("typeahead"), s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
        var n = e(this);
        if (n.data("typeahead"))return;
        t.preventDefault(), n.typeahead(n.data())
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function () {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function () {
        if (!this.$element.is(":visible"))return;
        var t = e(document).height(), n = this.$window.scrollTop(), r = this.$element.offset(), i = this.options.offset, s = i.bottom, o = i.top, u = "affix affix-top affix-bottom", a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a)return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    }, e.fn.affix = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("affix"), s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {offset: 0}, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var t = e(this), n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    function n() {
        var t = this, n = setTimeout(function () {
            t.$element.off(e.support.transition.end), r.call(t)
        }, 500);
        this.$element.one(e.support.transition.end, function () {
            clearTimeout(n), r.call(t)
        })
    }

    function r(e) {
        this.$element.hide().trigger("hidden"), i.call(this)
    }

    function i(t) {
        var n = this, r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = e.support.transition && r;
            this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(s, this)) : s.call(this)) : t && t()
    }

    function s() {
        this.$backdrop.remove(), this.$backdrop = null
    }

    function o() {
        var t = this;
        this.isShown && this.options.keyboard ? e(document).on("keyup.dismiss.modal", function (e) {
            e.which == 27 && t.hide()
        }) : this.isShown || e(document).off("keyup.dismiss.modal")
    }

    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this))
    };
    t.prototype = {
        constructor: t, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var t = this, n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())return;
            e("body").addClass("modal-open"), this.isShown = !0, o.call(this), i.call(this, function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in"), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.trigger("shown")
                }) : t.$element.trigger("shown")
            })
        }, hide: function (t) {
            t && t.preventDefault();
            var i = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())return;
            this.isShown = !1, e("body").removeClass("modal-open"), o.call(this), this.$element.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? n.call(this) : r.call(this)
        }
    }, e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("modal"), s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, e.fn.modal.Constructor = t, e(function () {
        e("body").on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
            var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = i.data("modal") ? "toggle" : e.extend({}, i.data(), n.data());
            t.preventDefault(), i.modal(s)
        })
    })
}(window.jQuery), function () {
    var e;
    e = function (e) {
        return $(e).each(function () {
            return $("<img/>")[0].src = this
        })
    }, e(["assets/launch/screenshots/screenshot0.png", "assets/launch/screenshots/screenshot1.png", "assets/launch/screenshots/screenshot2.png", "assets/launch/screenshots/screenshot3.png", "assets/launch/screenshots/screenshot4.png"]), jQuery(function () {
        var e, t, n, r, i, s = this;
        return $("#notified-link").click(function (e) {
            return $("#international-modal").modal("show")
        }), $("#slider-code").tinycarousel({
            pager: !0,
            controls: !1,
            interval: !0,
            intervaltime: 2e3,
            duration: 1e3,
            axis: "y",
            start: 1,
            display: 1,
            beforeAnimate: function (e, t) {
                return $(".dotted-line").fadeOut(1e3, function () {
                    return $(this).css("display", "")
                })
            },
            callback: function (e, t) {
                return $(".callout").each(function (e, t) {
                    return $(t).removeClass("active")
                }), $(".callout[data-index='" + t + "']").addClass("active")
            }
        }), $(".first").fadeIn(), $(".callout").on("click", function () {
            var e;
            return e = $(this).attr("data-index"), $("#slider-code").tinycarousel_move(parseInt(e) + 1)
        }), $(".viewport").css({height: "750px"}), i = function () {
            var e, t, n;
            n = $(window).width(), e = 1280, t = 640;
            if (n < e)return $(".span12").css("padding-left", 440);
            if (n > e)return $(".span12").css("padding-left", 490)
        }, $(document).ready(function () {
            return i()
        }), $(window).resize(i), $("#app-screenshot").cycle({
            fx: "fade",
            speed: 103,
            timeout: 0
        }), e = 1, t = 4500, r = 10, window.tick = function () {
            return n()
        }, n = function () {
            return $(".cycle div:nth-child(" + e + ")").fadeOut(function () {
                return e += 1, e > r && (e = 1), $(".cycle div").each(function (e) {
                    return $(this).hide()
                }), $(".cycle div:nth-child(" + e + ")").fadeIn()
            }), setTimeout(window.tick, t), !0
        }, setTimeout(window.tick, t), null
    })
}.call(this);