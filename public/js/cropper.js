/*!
 * Cropper.js v2.0.0-alpha.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-12-25T08:31:12.767Z
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Cropper =
        e());
})(this, function () {
  'use strict';
  function e(e, t) {
    var i,
      a = Object.keys(e);
    return (
      Object.getOwnPropertySymbols &&
        ((i = Object.getOwnPropertySymbols(e)),
        t &&
          (i = i.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
        a.push.apply(a, i)),
      a
    );
  }
  function k(a) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? e(Object(n), !0).forEach(function (t) {
            var e, i;
            (e = a),
              (t = n[(i = t)]),
              i in e
                ? Object.defineProperty(e, i, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[i] = t);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(n))
        : e(Object(n)).forEach(function (t) {
            Object.defineProperty(a, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return a;
  }
  function i(t) {
    return (i =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              'function' == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          })(t);
  }
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var a = e[i];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        'value' in a && (a.writable = !0),
        Object.defineProperty(t, a.key, a);
    }
  }
  function W(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return a(t);
      })(t) ||
      (function (t) {
        if (
          ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
          null != t['@@iterator']
        )
          return Array.from(t);
      })(t) ||
      (function (t, e) {
        if (t) {
          if ('string' == typeof t) return a(t, e);
          var i = Object.prototype.toString.call(t).slice(8, -1);
          return 'Map' ===
            (i = 'Object' === i && t.constructor ? t.constructor.name : i) ||
            'Set' === i
            ? Array.from(t)
            : 'Arguments' === i ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
            ? a(t, e)
            : void 0;
        }
      })(t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      })()
    );
  }
  function a(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var i = 0, a = new Array(e); i < e; i++) a[i] = t[i];
    return a;
  }
  var t = 'undefined' != typeof window && void 0 !== window.document,
    r = t ? window : {},
    o =
      !(!t || !r.document.documentElement) &&
      'ontouchstart' in r.document.documentElement,
    h = t && 'PointerEvent' in r,
    c = 'cropper',
    O = 'all',
    H = 'crop',
    E = 'move',
    T = 'zoom',
    N = 'e',
    z = 'w',
    Y = 's',
    R = 'n',
    X = 'ne',
    L = 'nw',
    S = 'se',
    A = 'sw',
    s = ''.concat(c, '-crop'),
    d = ''.concat(c, '-disabled'),
    j = ''.concat(c, '-hidden'),
    l = ''.concat(c, '-hide'),
    p = ''.concat(c, '-invisible'),
    u = ''.concat(c, '-modal'),
    m = ''.concat(c, '-move'),
    g = ''.concat(c, 'Action'),
    f = ''.concat(c, 'Preview'),
    v = 'crop',
    w = 'move',
    b = 'none',
    y = 'crop',
    x = 'cropend',
    M = 'cropmove',
    C = 'cropstart',
    D = 'dblclick',
    B = h ? 'pointerdown' : o ? 'touchstart' : 'mousedown',
    I = h ? 'pointermove' : o ? 'touchmove' : 'mousemove',
    P = h ? 'pointerup pointercancel' : o ? 'touchend touchcancel' : 'mouseup',
    U = 'zoom',
    q = 'image/jpeg',
    $ = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,
    Q = /^data:/,
    K = /^data:image\/jpeg;base64,/,
    Z = /^img|canvas$/i,
    G = ['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'],
    V = {
      viewMode: 0,
      dragMode: v,
      initialAspectRatio: NaN,
      aspectRatio: NaN,
      data: null,
      preview: '',
      responsive: !0,
      restore: !0,
      checkCrossOrigin: !0,
      checkOrientation: !0,
      modal: !0,
      guides: !0,
      center: !0,
      highlight: !0,
      background: !0,
      autoCrop: !0,
      autoCropArea: 0.8,
      movable: !0,
      rotatable: !0,
      scalable: !0,
      zoomable: !0,
      zoomOnTouch: !0,
      zoomOnWheel: !0,
      wheelZoomRatio: 0.1,
      cropBoxMovable: !0,
      cropBoxResizable: !0,
      toggleDragModeOnDblclick: !0,
      minCanvasWidth: 0,
      minCanvasHeight: 0,
      maxCanvasWidth: 1 / 0,
      maxCanvasHeight: 1 / 0,
      minCropBoxWidth: 0,
      minCropBoxHeight: 0,
      maxCropBoxWidth: 1 / 0,
      maxCropBoxHeight: 1 / 0,
      minContainerWidth: 200,
      minContainerHeight: 100,
      ready: null,
      cropstart: null,
      cropmove: null,
      cropend: null,
      crop: null,
      zoom: null,
    },
    F = Number.isNaN || r.isNaN;
  function J(t) {
    return 'number' == typeof t && !F(t);
  }
  function _(t) {
    return 0 < t && t < 1 / 0;
  }
  function tt(t) {
    return void 0 === t;
  }
  function et(t) {
    return 'object' === i(t) && null !== t;
  }
  var it = Object.prototype.hasOwnProperty;
  function at(t) {
    if (!et(t)) return !1;
    try {
      var e = t.constructor,
        i = e.prototype;
      return e && i && it.call(i, 'isPrototypeOf');
    } catch (t) {
      return !1;
    }
  }
  function nt(t) {
    return 'function' == typeof t;
  }
  var ot = Array.prototype.slice;
  function rt(t) {
    return Array.from ? Array.from(t) : ot.call(t);
  }
  function ht(i, a) {
    return (
      i &&
        nt(a) &&
        (Array.isArray(i) || J(i.length)
          ? rt(i).forEach(function (t, e) {
              a.call(i, t, e, i);
            })
          : et(i) &&
            Object.keys(i).forEach(function (t) {
              a.call(i, i[t], t, i);
            })),
      i
    );
  }
  var st =
      Object.assign ||
      function (i) {
        for (
          var t = arguments.length, e = new Array(1 < t ? t - 1 : 0), a = 1;
          a < t;
          a++
        )
          e[a - 1] = arguments[a];
        return (
          et(i) &&
            0 < e.length &&
            e.forEach(function (e) {
              et(e) &&
                Object.keys(e).forEach(function (t) {
                  i[t] = e[t];
                });
            }),
          i
        );
      },
    ct = /\.\d*(?:0|9){12}\d*$/;
  function dt(t, e) {
    e = 1 < arguments.length && void 0 !== e ? e : 1e11;
    return ct.test(t) ? Math.round(t * e) / e : t;
  }
  var lt = /^width|height|left|top|marginLeft|marginTop$/;
  function pt(t, e) {
    var i = t.style;
    ht(e, function (t, e) {
      lt.test(e) && J(t) && (t = ''.concat(t, 'px')), (i[e] = t);
    });
  }
  function ut(t, e) {
    var i;
    e &&
      (J(t.length)
        ? ht(t, function (t) {
            ut(t, e);
          })
        : t.classList
        ? t.classList.add(e)
        : (i = t.className.trim())
        ? i.indexOf(e) < 0 && (t.className = ''.concat(i, ' ').concat(e))
        : (t.className = e));
  }
  function mt(t, e) {
    e &&
      (J(t.length)
        ? ht(t, function (t) {
            mt(t, e);
          })
        : t.classList
        ? t.classList.remove(e)
        : 0 <= t.className.indexOf(e) &&
          (t.className = t.className.replace(e, '')));
  }
  function gt(t, e, i) {
    e &&
      (J(t.length)
        ? ht(t, function (t) {
            gt(t, e, i);
          })
        : (i ? ut : mt)(t, e));
  }
  var ft = /([a-z\d])([A-Z])/g;
  function vt(t) {
    return t.replace(ft, '$1-$2').toLowerCase();
  }
  function wt(t, e) {
    return et(t[e])
      ? t[e]
      : t.dataset
      ? t.dataset[e]
      : t.getAttribute('data-'.concat(vt(e)));
  }
  function bt(t, e, i) {
    et(i)
      ? (t[e] = i)
      : t.dataset
      ? (t.dataset[e] = i)
      : t.setAttribute('data-'.concat(vt(e)), i);
  }
  var yt,
    xt,
    Mt = /\s\s*/,
    Ct =
      ((xt = !1),
      t &&
        ((yt = !1),
        (jt = function () {}),
        (Pt = Object.defineProperty({}, 'once', {
          get: function () {
            return (xt = !0), yt;
          },
          set: function (t) {
            yt = t;
          },
        })),
        r.addEventListener('test', jt, Pt),
        r.removeEventListener('test', jt, Pt)),
      xt);
  function Dt(i, t, a, e) {
    var n = 3 < arguments.length && void 0 !== e ? e : {},
      o = a;
    t.trim()
      .split(Mt)
      .forEach(function (t) {
        var e;
        Ct ||
          ((e = i.listeners) &&
            e[t] &&
            e[t][a] &&
            ((o = e[t][a]),
            delete e[t][a],
            0 === Object.keys(e[t]).length && delete e[t],
            0 === Object.keys(e).length && delete i.listeners)),
          i.removeEventListener(t, o, n);
      });
  }
  function Bt(o, t, r, e) {
    var h = 3 < arguments.length && void 0 !== e ? e : {},
      s = r;
    t.trim()
      .split(Mt)
      .forEach(function (a) {
        var t, n;
        h.once &&
          !Ct &&
          ((t = o.listeners),
          (s = function () {
            delete n[a][r], o.removeEventListener(a, s, h);
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
              e[i] = arguments[i];
            r.apply(o, e);
          }),
          (n = void 0 === t ? {} : t)[a] || (n[a] = {}),
          n[a][r] && o.removeEventListener(a, n[a][r], h),
          (n[a][r] = s),
          (o.listeners = n)),
          o.addEventListener(a, s, h);
      });
  }
  function kt(t, e, i) {
    var a;
    return (
      nt(Event) && nt(CustomEvent)
        ? (a = new CustomEvent(e, { detail: i, bubbles: !0, cancelable: !0 }))
        : (a = document.createEvent('CustomEvent')).initCustomEvent(
            e,
            !0,
            !0,
            i
          ),
      t.dispatchEvent(a)
    );
  }
  function Ot(t) {
    t = t.getBoundingClientRect();
    return {
      left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: t.top + (window.pageYOffset - document.documentElement.clientTop),
    };
  }
  var Wt = r.location,
    Ht = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
  function Et(t) {
    t = t.match(Ht);
    return (
      null !== t &&
      (t[1] !== Wt.protocol || t[2] !== Wt.hostname || t[3] !== Wt.port)
    );
  }
  function Tt(t) {
    var e = 'timestamp='.concat(new Date().getTime());
    return t + (-1 === t.indexOf('?') ? '?' : '&') + e;
  }
  function Nt(t) {
    var e = t.rotate,
      i = t.scaleX,
      a = t.scaleY,
      n = t.translateX,
      o = t.translateY,
      t = [];
    J(n) && 0 !== n && t.push('translateX('.concat(n, 'px)')),
      J(o) && 0 !== o && t.push('translateY('.concat(o, 'px)')),
      J(e) && 0 !== e && t.push('rotate('.concat(e, 'deg)')),
      J(i) && 1 !== i && t.push('scaleX('.concat(i, ')')),
      J(a) && 1 !== a && t.push('scaleY('.concat(a, ')'));
    t = t.length ? t.join(' ') : 'none';
    return { WebkitTransform: t, msTransform: t, transform: t };
  }
  function zt(t, e) {
    var i = t.pageX,
      a = t.pageY,
      t = { endX: i, endY: a };
    return e ? t : k({ startX: i, startY: a }, t);
  }
  function Yt(t, e) {
    var i = t.aspectRatio,
      a = t.height,
      n = t.width,
      o = 1 < arguments.length && void 0 !== e ? e : 'contain',
      r = _(n),
      t = _(a);
    return (
      r && t
        ? ((e = a * i),
          ('contain' === o && n < e) || ('cover' === o && e < n)
            ? (a = n / i)
            : (n = a * i))
        : r
        ? (a = n / i)
        : t && (n = a * i),
      { width: n, height: a }
    );
  }
  var Rt = String.fromCharCode;
  var Xt = /^data:.*,/;
  function Lt(t) {
    var e,
      i,
      a,
      n,
      o,
      r,
      h,
      s = new DataView(t);
    try {
      if (255 === s.getUint8(0) && 216 === s.getUint8(1))
        for (var c = s.byteLength, d = 2; d + 1 < c; ) {
          if (255 === s.getUint8(d) && 225 === s.getUint8(d + 1)) {
            i = d;
            break;
          }
          d += 1;
        }
      if (
        (i &&
          ((n = i + 10),
          'Exif' ===
            (function (t, e, i) {
              var a = '';
              i += e;
              for (var n = e; n < i; n += 1) a += Rt(t.getUint8(n));
              return a;
            })(s, i + 4, 4) &&
            ((!(h = 18761 === (o = s.getUint16(n))) && 19789 !== o) ||
              42 !== s.getUint16(n + 2, h) ||
              (8 <= (r = s.getUint32(n + 4, h)) && (a = n + r)))),
        a)
      )
        for (var l, p = s.getUint16(a, h), u = 0; u < p; u += 1)
          if (((l = a + 12 * u + 2), 274 === s.getUint16(l, h))) {
            (l += 8), (e = s.getUint16(l, h)), s.setUint16(l, 1, h);
            break;
          }
    } catch (t) {
      e = 1;
    }
    return e;
  }
  var St = {
      render: function () {
        this.initContainer(),
          this.initCanvas(),
          (this.initialCanvasData = st({}, this.canvasData)),
          this.initCropBox(),
          (this.initialCropBoxData = st({}, this.cropBoxData)),
          this.renderCanvas(),
          this.cropped && this.renderCropBox();
      },
      initContainer: function () {
        var t = this.element,
          e = this.options,
          i = this.container,
          a = this.cropper,
          n = Number(e.minContainerWidth),
          e = Number(e.minContainerHeight);
        ut(a, j), mt(t, j);
        e = {
          width: Math.max(i.offsetWidth, 0 <= n ? n : 200),
          height: Math.max(i.offsetHeight, 0 <= e ? e : 100),
        };
        pt(a, e), ut(t, j), mt(a, j), (this.containerData = e);
      },
      initCanvas: function () {
        var t = this.options,
          e = this.containerData,
          i = this.imageData,
          a = t.viewMode,
          n = Math.abs(i.rotate) % 180 == 90,
          o = n ? i.naturalHeight : i.naturalWidth,
          r = n ? i.naturalWidth : i.naturalHeight,
          t = o / r,
          n = e.width,
          i = e.height;
        n < i * t
          ? 3 === a
            ? (n = i * t)
            : (i = n / t)
          : 3 === a
          ? (i = n / t)
          : (n = i * t);
        o = {
          aspectRatio: t,
          naturalWidth: o,
          naturalHeight: r,
          width: n,
          height: i,
          left: (e.width - n) / 2,
          top: (e.height - i) / 2,
          scale: n / o,
        };
        (o.oldLeft = o.left),
          (o.oldTop = o.top),
          (this.canvasData = o),
          this.limitCanvas(!0, !0);
      },
      limitCanvas: function () {
        var t,
          e,
          i,
          a = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
          n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          o = this.options,
          r = this.containerData,
          h = this.canvasData,
          s = o.viewMode,
          c = r.width,
          d = r.height,
          l = h.aspectRatio,
          p = h.width,
          r = h.height;
        a &&
          ((a = Math.max(o.minCanvasWidth, 0) || 0),
          (t = Math.max(o.minCanvasHeight, 0) || 0),
          (e = Math.max(o.maxCanvasWidth, a) || 1 / 0),
          (i = Math.max(o.maxCanvasHeight, t) || 1 / 0),
          1 < s &&
            ((a = Math.max(a, c)),
            (t = Math.max(t, d)),
            3 === s && (a < t * l ? (a = t * l) : (t = a / l))),
          (a = (o = Yt({ aspectRatio: l, width: a, height: t })).width),
          (t = o.height),
          (e = (l = Yt({ aspectRatio: l, width: e, height: i })).width),
          (i = l.height),
          (h.minWidth = a),
          (h.minHeight = t),
          (h.maxWidth = e),
          (h.maxHeight = i)),
          n &&
            ((t = -p),
            (e = -r),
            (i = c),
            (n = d),
            1 < s &&
              ((p = c - p),
              (r = d - r),
              (t = Math.min(0, p)),
              (e = Math.min(0, r)),
              (i = Math.max(0, p)),
              (n = Math.max(0, r))),
            (h.minLeft = t),
            (h.minTop = e),
            (h.maxLeft = i),
            (h.maxTop = n));
      },
      renderCanvas: function () {
        var t,
          e,
          i,
          a = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
          n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          o = this.imageData,
          r = this.canvasData,
          h = this.cropBoxData;
        n &&
          ((t = (i = (function (t) {
            var e = t.width,
              i = t.height,
              a = t.degree;
            if (90 == (a = Math.abs(a) % 180)) return { width: i, height: e };
            var n = ((a % 90) * Math.PI) / 180,
              o = Math.sin(n),
              t = Math.cos(n),
              n = e * t + i * o,
              t = e * o + i * t;
            return 90 < a ? { width: t, height: n } : { width: n, height: t };
          })({
            width: o.naturalWidth * Math.abs(o.scaleX || 1),
            height: o.naturalHeight * Math.abs(o.scaleY || 1),
            degree: o.rotate || 0,
          })).width),
          (e = i.height),
          (o = r.width * (t / r.naturalWidth)),
          (i = r.height * (e / r.naturalHeight)),
          (r.left -= (o - r.width) / 2),
          (r.top -= (i - r.height) / 2),
          (r.width = o),
          (r.height = i),
          (r.aspectRatio = t / e),
          (r.naturalWidth = t),
          (r.naturalHeight = e),
          this.limitCanvas(!0, !1)),
          (r.width > r.maxWidth || r.width < r.minWidth) &&
            (r.left = r.oldLeft),
          (r.height > r.maxHeight || r.height < r.minHeight) &&
            (r.top = r.oldTop),
          (r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth)),
          (r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight)),
          (r.scale = r.width / r.naturalWidth),
          this.limitCanvas(!1, !0),
          (r.left = Math.min(Math.max(r.left, r.minLeft), r.maxLeft)),
          (r.top = Math.min(Math.max(r.top, r.minTop), r.maxTop)),
          r.left === r.oldLeft && (h.left = h.oldLeft),
          r.top === r.oldTop && (h.top = h.oldTop),
          (r.oldLeft = r.left),
          (r.oldTop = r.top),
          pt(
            this.canvas,
            st(
              { width: r.width, height: r.height },
              Nt({ translateX: r.left, translateY: r.top })
            )
          ),
          this.renderImage(),
          a &&
            (this.cropped
              ? (n ? this.initCropBox() : this.limitCropBox(!0, !0),
                this.renderCropBox())
              : this.output());
      },
      renderImage: function () {
        var t = this.imageData,
          e = this.canvasData,
          i = t.naturalWidth * (e.width / e.naturalWidth),
          a = t.naturalHeight * (e.height / e.naturalHeight);
        st(t, {
          width: i,
          height: a,
          left: (e.width - i) / 2,
          top: (e.height - a) / 2,
        }),
          pt(
            this.image,
            st(
              { width: t.width, height: t.height },
              Nt(st({ translateX: t.left, translateY: t.top }, t))
            )
          );
      },
      initCropBox: function () {
        var t = this.options,
          e = this.canvasData,
          i = t.aspectRatio || t.initialAspectRatio,
          a = e.width,
          n = e.height;
        i && (a < n * i ? (n = a / i) : (a = n * i));
        n = { width: a, height: n };
        (this.cropBoxData = n),
          this.limitCropBox(!0, !0),
          (n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth)),
          (n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight));
        t = Number(t.autoCropArea) || 0.8;
        (n.width = Math.max(n.minWidth, n.width * t)),
          (n.height = Math.max(n.minHeight, n.height * t)),
          (n.left = e.left + (e.width - n.width) / 2),
          (n.top = e.top + (e.height - n.height) / 2),
          (n.oldLeft = n.left),
          (n.oldTop = n.top),
          (n.naturalWidth = n.width / e.scale),
          (n.naturalHeight = n.height / e.scale);
      },
      limitCropBox: function () {
        var t,
          e,
          i,
          a = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
          n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          o = this.options,
          r = this.canvasData,
          h = this.cropBoxData,
          s = o.aspectRatio,
          c = o.viewMode,
          d = r.width,
          l = r.height,
          p = r.left,
          r = r.top;
        a &&
          ((a = Math.max(o.minCropBoxWidth, 0) || 0),
          (t = Math.max(o.minCropBoxHeight, 0) || 0),
          (e = Math.max(o.maxCropBoxWidth, a) || 1 / 0),
          (i = Math.max(o.maxCropBoxHeight, t) || 1 / 0),
          0 < c &&
            ((a = Math.min(d, a)),
            (t = Math.min(l, t)),
            (e = Math.min(d, e)),
            (i = Math.min(l, i))),
          0 < s &&
            ((a = (o = Yt({ aspectRatio: s, width: a, height: t })).width),
            (t = o.height),
            (e = (s = Yt({ aspectRatio: s, width: e, height: i })).width),
            (i = s.height)),
          (h.minWidth = a),
          (h.minHeight = t),
          (h.maxWidth = e),
          (h.maxHeight = i)),
          n &&
            ((e = t = -1 / 0),
            (n = i = 1 / 0),
            0 < c &&
              ((i = (t = p) + d - h.width), (n = (e = r) + l - h.height)),
            (h.minLeft = t),
            (h.minTop = e),
            (h.maxLeft = i),
            (h.maxTop = n));
      },
      renderCropBox: function () {
        var t = this.options,
          e = this.containerData,
          i = this.canvasData,
          a = this.cropBoxData;
        (a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft),
          (a.height > a.maxHeight || a.height < a.minHeight) &&
            (a.top = a.oldTop),
          (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
          (a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight)),
          this.limitCropBox(!1, !0),
          (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
          (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
          (a.oldLeft = a.left),
          (a.oldTop = a.top),
          (a.naturalWidth = a.width / i.scale),
          (a.naturalHeight = a.height / i.scale),
          t.movable &&
            t.cropBoxMovable &&
            bt(
              this.face,
              g,
              a.width >= e.width && a.height >= e.height ? E : O
            ),
          pt(
            this.cropBox,
            st(
              { width: a.width, height: a.height },
              Nt({ translateX: a.left, translateY: a.top })
            )
          ),
          this.disabled || this.output();
      },
      output: function () {
        this.preview(), kt(this.element, y, this.getData());
      },
    },
    At = {
      initPreview: function () {
        var t = this.element,
          i = this.crossOrigin,
          e = this.options.preview,
          a = i ? this.crossOriginUrl : this.url,
          n = t.alt || 'The image to preview',
          o = document.createElement('img');
        i && (o.crossOrigin = i),
          (o.src = a),
          (o.alt = n),
          this.viewBox.appendChild(o),
          (this.viewBoxImage = o),
          e &&
            ('string' == typeof (o = e)
              ? (o = t.ownerDocument.querySelectorAll(e))
              : e.querySelector && (o = [e]),
            ht((this.previews = o), function (t) {
              var e = document.createElement('img');
              bt(t, f, {
                width: t.offsetWidth,
                height: t.offsetHeight,
                html: t.innerHTML,
              }),
                i && (e.crossOrigin = i),
                (e.src = a),
                (e.alt = n),
                (e.style.cssText =
                  'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"'),
                (t.innerHTML = ''),
                t.appendChild(e);
            }));
      },
      resetPreview: function () {
        ht(this.previews, function (t) {
          var e = wt(t, f);
          pt(t, { width: e.width, height: e.height }),
            (t.innerHTML = e.html),
            (function (e, i) {
              if (et(e[i]))
                try {
                  delete e[i];
                } catch (t) {
                  e[i] = void 0;
                }
              else if (e.dataset)
                try {
                  delete e.dataset[i];
                } catch (t) {
                  e.dataset[i] = void 0;
                }
              else e.removeAttribute('data-'.concat(vt(i)));
            })(t, f);
        });
      },
      preview: function () {
        var r = this.imageData,
          t = this.canvasData,
          e = this.cropBoxData,
          h = e.width,
          s = e.height,
          c = r.width,
          d = r.height,
          l = e.left - t.left - r.left,
          p = e.top - t.top - r.top;
        this.cropped &&
          !this.disabled &&
          (pt(
            this.viewBoxImage,
            st(
              { width: c, height: d },
              Nt(st({ translateX: -l, translateY: -p }, r))
            )
          ),
          ht(this.previews, function (t) {
            var e = wt(t, f),
              i = e.width,
              a = e.height,
              n = i,
              o = a,
              e = 1;
            h && (o = s * (e = i / h)),
              s && a < o && ((n = h * (e = a / s)), (o = a)),
              pt(t, { width: n, height: o }),
              pt(
                t.getElementsByTagName('img')[0],
                st(
                  { width: c * e, height: d * e },
                  Nt(st({ translateX: -l * e, translateY: -p * e }, r))
                )
              );
          }));
      },
    },
    h = {
      bind: function () {
        var t = this.element,
          e = this.options,
          i = this.cropper;
        nt(e.cropstart) && Bt(t, C, e.cropstart),
          nt(e.cropmove) && Bt(t, M, e.cropmove),
          nt(e.cropend) && Bt(t, x, e.cropend),
          nt(e.crop) && Bt(t, y, e.crop),
          nt(e.zoom) && Bt(t, U, e.zoom),
          Bt(i, B, (this.onCropStart = this.cropStart.bind(this))),
          e.zoomable &&
            e.zoomOnWheel &&
            Bt(i, 'wheel', (this.onWheel = this.wheel.bind(this)), {
              passive: !1,
              capture: !0,
            }),
          e.toggleDragModeOnDblclick &&
            Bt(i, D, (this.onDblclick = this.dblclick.bind(this))),
          Bt(t.ownerDocument, I, (this.onCropMove = this.cropMove.bind(this))),
          Bt(t.ownerDocument, P, (this.onCropEnd = this.cropEnd.bind(this))),
          e.responsive &&
            Bt(window, 'resize', (this.onResize = this.resize.bind(this)));
      },
      unbind: function () {
        var t = this.element,
          e = this.options,
          i = this.cropper;
        nt(e.cropstart) && Dt(t, C, e.cropstart),
          nt(e.cropmove) && Dt(t, M, e.cropmove),
          nt(e.cropend) && Dt(t, x, e.cropend),
          nt(e.crop) && Dt(t, y, e.crop),
          nt(e.zoom) && Dt(t, U, e.zoom),
          Dt(i, B, this.onCropStart),
          e.zoomable &&
            e.zoomOnWheel &&
            Dt(i, 'wheel', this.onWheel, { passive: !1, capture: !0 }),
          e.toggleDragModeOnDblclick && Dt(i, D, this.onDblclick),
          Dt(t.ownerDocument, I, this.onCropMove),
          Dt(t.ownerDocument, P, this.onCropEnd),
          e.responsive && Dt(window, 'resize', this.onResize);
      },
    },
    o = {
      resize: function () {
        var t, e, i, a, n, o, r;
        this.disabled ||
          ((t = this.options),
          (e = this.container),
          (a = this.containerData),
          (i = e.offsetWidth / a.width),
          (a = e.offsetHeight / a.height),
          1 != (n = Math.abs(i - 1) > Math.abs(a - 1) ? i : a) &&
            (t.restore &&
              ((o = this.getCanvasData()), (r = this.getCropBoxData())),
            this.render(),
            t.restore &&
              (this.setCanvasData(
                ht(o, function (t, e) {
                  o[e] = t * n;
                })
              ),
              this.setCropBoxData(
                ht(r, function (t, e) {
                  r[e] = t * n;
                })
              ))));
      },
      dblclick: function () {
        var t, e;
        this.disabled ||
          this.options.dragMode === b ||
          this.setDragMode(
            ((t = this.dragBox),
            (e = s),
            (
              t.classList
                ? t.classList.contains(e)
                : -1 < t.className.indexOf(e)
            )
              ? w
              : v)
          );
      },
      wheel: function (t) {
        var e = this,
          i = Number(this.options.wheelZoomRatio) || 0.1,
          a = 1;
        this.disabled ||
          (t.preventDefault(),
          this.wheeling ||
            ((this.wheeling = !0),
            setTimeout(function () {
              e.wheeling = !1;
            }, 50),
            t.deltaY
              ? (a = 0 < t.deltaY ? 1 : -1)
              : t.wheelDelta
              ? (a = -t.wheelDelta / 120)
              : t.detail && (a = 0 < t.detail ? 1 : -1),
            this.zoom(-a * i, t)));
      },
      cropStart: function (t) {
        var e,
          i = t.buttons,
          a = t.button;
        this.disabled ||
          (('mousedown' === t.type ||
            ('pointerdown' === t.type && 'mouse' === t.pointerType)) &&
            ((J(i) && 1 !== i) || (J(a) && 0 !== a) || t.ctrlKey)) ||
          ((a = this.options),
          (e = this.pointers),
          t.changedTouches
            ? ht(t.changedTouches, function (t) {
                e[t.identifier] = zt(t);
              })
            : (e[t.pointerId || 0] = zt(t)),
          (a =
            1 < Object.keys(e).length && a.zoomable && a.zoomOnTouch
              ? T
              : wt(t.target, g)),
          $.test(a) &&
            !1 !== kt(this.element, C, { originalEvent: t, action: a }) &&
            (t.preventDefault(),
            (this.action = a),
            (this.cropping = !1),
            a === H && ((this.cropping = !0), ut(this.dragBox, u))));
      },
      cropMove: function (t) {
        var e,
          i = this.action;
        !this.disabled &&
          i &&
          ((e = this.pointers),
          t.preventDefault(),
          !1 !== kt(this.element, M, { originalEvent: t, action: i }) &&
            (t.changedTouches
              ? ht(t.changedTouches, function (t) {
                  st(e[t.identifier] || {}, zt(t, !0));
                })
              : st(e[t.pointerId || 0] || {}, zt(t, !0)),
            this.change(t)));
      },
      cropEnd: function (t) {
        var e, i;
        this.disabled ||
          ((e = this.action),
          (i = this.pointers),
          t.changedTouches
            ? ht(t.changedTouches, function (t) {
                delete i[t.identifier];
              })
            : delete i[t.pointerId || 0],
          e &&
            (t.preventDefault(),
            Object.keys(i).length || (this.action = ''),
            this.cropping &&
              ((this.cropping = !1),
              gt(this.dragBox, u, this.cropped && this.options.modal)),
            kt(this.element, x, { originalEvent: t, action: e })));
      },
    },
    t = {
      change: function (t) {
        var e = this.options,
          i = this.canvasData,
          a = this.containerData,
          n = this.cropBoxData,
          o = this.pointers,
          r = this.action,
          h = e.aspectRatio,
          s = n.left,
          c = n.top,
          d = n.width,
          l = n.height,
          p = s + d,
          u = c + l,
          m = 0,
          g = 0,
          f = a.width,
          v = a.height,
          w = !0;
        !h && t.shiftKey && (h = d && l ? d / l : 1),
          0 < e.viewMode &&
            ((m = n.minLeft),
            (g = n.minTop),
            (f = m + Math.min(a.width, i.width, i.left + i.width)),
            (v = g + Math.min(a.height, i.height, i.top + i.height)));
        function b(t) {
          switch (t) {
            case N:
              p + D.x > f && (D.x = f - p);
              break;
            case z:
              s + D.x < m && (D.x = m - s);
              break;
            case R:
              c + D.y < g && (D.y = g - c);
              break;
            case Y:
              u + D.y > v && (D.y = v - u);
          }
        }
        var y,
          x,
          M,
          C = o[Object.keys(o)[0]],
          D = { x: C.endX - C.startX, y: C.endY - C.startY };
        switch (r) {
          case O:
            (s += D.x), (c += D.y);
            break;
          case N:
            if (0 <= D.x && (f <= p || (h && (c <= g || v <= u)))) {
              w = !1;
              break;
            }
            b(N),
              (d += D.x) < 0 && ((r = z), (s -= d = -d)),
              h && (c += (n.height - (l = d / h)) / 2);
            break;
          case R:
            if (D.y <= 0 && (c <= g || (h && (s <= m || f <= p)))) {
              w = !1;
              break;
            }
            b(R),
              (l -= D.y),
              (c += D.y),
              l < 0 && ((r = Y), (c -= l = -l)),
              h && (s += (n.width - (d = l * h)) / 2);
            break;
          case z:
            if (D.x <= 0 && (s <= m || (h && (c <= g || v <= u)))) {
              w = !1;
              break;
            }
            b(z),
              (d -= D.x),
              (s += D.x),
              d < 0 && ((r = N), (s -= d = -d)),
              h && (c += (n.height - (l = d / h)) / 2);
            break;
          case Y:
            if (0 <= D.y && (v <= u || (h && (s <= m || f <= p)))) {
              w = !1;
              break;
            }
            b(Y),
              (l += D.y) < 0 && ((r = R), (c -= l = -l)),
              h && (s += (n.width - (d = l * h)) / 2);
            break;
          case X:
            if (h) {
              if (D.y <= 0 && (c <= g || f <= p)) {
                w = !1;
                break;
              }
              b(R), (l -= D.y), (c += D.y), (d = l * h);
            } else
              b(R),
                b(N),
                !(0 <= D.x) || p < f
                  ? (d += D.x)
                  : D.y <= 0 && c <= g && (w = !1),
                (D.y <= 0 && !(g < c)) || ((l -= D.y), (c += D.y));
            d < 0 && l < 0
              ? ((r = A), (c -= l = -l), (s -= d = -d))
              : d < 0
              ? ((r = L), (s -= d = -d))
              : l < 0 && ((r = S), (c -= l = -l));
            break;
          case L:
            if (h) {
              if (D.y <= 0 && (c <= g || s <= m)) {
                w = !1;
                break;
              }
              b(R), (l -= D.y), (c += D.y), (s += n.width - (d = l * h));
            } else
              b(R),
                b(z),
                !(D.x <= 0) || m < s
                  ? ((d -= D.x), (s += D.x))
                  : D.y <= 0 && c <= g && (w = !1),
                (D.y <= 0 && !(g < c)) || ((l -= D.y), (c += D.y));
            d < 0 && l < 0
              ? ((r = S), (c -= l = -l), (s -= d = -d))
              : d < 0
              ? ((r = X), (s -= d = -d))
              : l < 0 && ((r = A), (c -= l = -l));
            break;
          case A:
            if (h) {
              if (D.x <= 0 && (s <= m || v <= u)) {
                w = !1;
                break;
              }
              b(z), (d -= D.x), (s += D.x), (l = d / h);
            } else
              b(Y),
                b(z),
                !(D.x <= 0) || m < s
                  ? ((d -= D.x), (s += D.x))
                  : 0 <= D.y && v <= u && (w = !1),
                (0 <= D.y && !(u < v)) || (l += D.y);
            d < 0 && l < 0
              ? ((r = X), (c -= l = -l), (s -= d = -d))
              : d < 0
              ? ((r = S), (s -= d = -d))
              : l < 0 && ((r = L), (c -= l = -l));
            break;
          case S:
            if (h) {
              if (0 <= D.x && (f <= p || v <= u)) {
                w = !1;
                break;
              }
              b(N), (l = (d += D.x) / h);
            } else
              b(Y),
                b(N),
                !(0 <= D.x) || p < f
                  ? (d += D.x)
                  : 0 <= D.y && v <= u && (w = !1),
                (0 <= D.y && !(u < v)) || (l += D.y);
            d < 0 && l < 0
              ? ((r = L), (c -= l = -l), (s -= d = -d))
              : d < 0
              ? ((r = A), (s -= d = -d))
              : l < 0 && ((r = X), (c -= l = -l));
            break;
          case E:
            this.move(D.x, D.y), (w = !1);
            break;
          case T:
            this.zoom(
              ((x = k({}, (y = o))),
              (M = 0),
              ht(y, function (n, t) {
                delete x[t],
                  ht(x, function (t) {
                    var e = Math.abs(n.startX - t.startX),
                      i = Math.abs(n.startY - t.startY),
                      a = Math.abs(n.endX - t.endX),
                      t = Math.abs(n.endY - t.endY),
                      i = Math.sqrt(e * e + i * i),
                      i = (Math.sqrt(a * a + t * t) - i) / i;
                    Math.abs(i) > Math.abs(M) && (M = i);
                  });
              }),
              M),
              t
            ),
              (w = !1);
            break;
          case H:
            r = '';
            if (
              (D.x && D.y
                ? (B =
                    (180 * Math.atan(Math.abs(D.x) / Math.abs(D.y))) /
                    Math.PI) < 5
                  ? h && (r = 0 < D.y ? Y : R)
                  : 85 < B
                  ? h && (r = 0 < D.y ? N : z)
                  : (r = 0 < D.x ? (0 < D.y ? S : X) : 0 < D.y ? A : L)
                : h &&
                  (1 < Math.abs(D.x)
                    ? (r = 0 < D.x ? N : z)
                    : 1 < Math.abs(D.y) && (r = 0 < D.y ? Y : R)),
              !r)
            ) {
              w = !1;
              break;
            }
            var B = Ot(this.cropper),
              s = C.startX - B.left,
              c = C.startY - B.top,
              d = n.minWidth,
              l = n.minHeight;
            D.x < 0 && (s -= d),
              D.y < 0 && (c -= l),
              this.cropped ||
                (mt(this.cropBox, j),
                (this.cropped = !0),
                0 < e.viewMode && this.limitCropBox(!0, !0));
        }
        w &&
          ((n.width = d),
          (n.height = l),
          (n.left = s),
          (n.top = c),
          (this.action = r),
          this.renderCropBox()),
          ht(o, function (t) {
            (t.startX = t.endX), (t.startY = t.endY);
          });
      },
    },
    jt = {
      crop: function () {
        return (
          !this.ready ||
            this.cropped ||
            this.disabled ||
            ((this.cropped = !0),
            this.limitCropBox(!0, !0),
            this.options.modal && ut(this.dragBox, u),
            mt(this.cropBox, j),
            this.setCropBoxData(this.initialCropBoxData)),
          this
        );
      },
      reset: function () {
        return (
          this.ready &&
            !this.disabled &&
            ((this.imageData = st({}, this.initialImageData)),
            (this.canvasData = st({}, this.initialCanvasData)),
            (this.cropBoxData = st({}, this.initialCropBoxData)),
            this.renderCanvas(),
            this.cropped && this.renderCropBox()),
          this
        );
      },
      clear: function () {
        return (
          this.cropped &&
            !this.disabled &&
            (st(this.cropBoxData, { left: 0, top: 0, width: 0, height: 0 }),
            (this.cropped = !1),
            this.renderCropBox(),
            this.limitCanvas(!0, !0),
            this.renderCanvas(),
            mt(this.dragBox, u),
            ut(this.cropBox, j)),
          this
        );
      },
      replace: function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        return (
          !this.disabled &&
            e &&
            (this.isImg && (this.element.src = e),
            t
              ? ((this.url = e),
                (this.image.src = e),
                this.ready &&
                  ((this.viewBoxImage.src = e),
                  ht(this.previews, function (t) {
                    t.getElementsByTagName('img')[0].src = e;
                  })))
              : (this.isImg && (this.replaced = !0),
                (this.options.data = null),
                this.uncreate(),
                this.load(e))),
          this
        );
      },
      enable: function () {
        return (
          this.ready &&
            this.disabled &&
            ((this.disabled = !1), mt(this.cropper, d)),
          this
        );
      },
      disable: function () {
        return (
          this.ready &&
            !this.disabled &&
            ((this.disabled = !0), ut(this.cropper, d)),
          this
        );
      },
      destroy: function () {
        var t = this.element;
        return (
          t[c] &&
            ((t[c] = void 0),
            this.isImg && this.replaced && (t.src = this.originalUrl),
            this.uncreate()),
          this
        );
      },
      move: function (t) {
        var e =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t,
          i = this.canvasData,
          a = i.left,
          i = i.top;
        return this.moveTo(
          tt(t) ? t : a + Number(t),
          tt(e) ? e : i + Number(e)
        );
      },
      moveTo: function (t) {
        var e =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t,
          i = this.canvasData,
          a = this.cropBoxData,
          n = !1;
        return (
          (t = Number(t)),
          (e = Number(e)),
          this.ready &&
            !this.disabled &&
            this.options.movable &&
            (J(t) && ((a.left -= i.left - t), (i.left = t), (n = !0)),
            J(e) && ((a.top -= i.top - e), (i.top = e), (n = !0)),
            n && this.renderCanvas(!0)),
          this
        );
      },
      zoom: function (t) {
        var e =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : null,
          i = this.canvasData;
        return (
          (t = Number(t)),
          this.zoomTo(
            (i.width * (t = t < 0 ? 1 / (1 - t) : 1 + t)) / i.naturalWidth,
            null,
            e
          )
        );
      },
      zoomTo: function (t) {
        var i,
          a,
          n,
          e =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : null,
          o =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : null,
          r = this.options,
          h = this.canvasData,
          s = this.cropBoxData,
          c = h.width,
          d = h.height,
          l = s.width,
          p = s.height;
        if (
          0 <= (t = Number(t)) &&
          this.ready &&
          !this.disabled &&
          r.zoomable
        ) {
          var u = h.naturalWidth * t,
            m = h.naturalHeight * t;
          if (
            1 < r.viewMode &&
            (u < h.minWidth ||
              u > h.maxWidth ||
              m < h.minHeight ||
              m < h.minHeight)
          )
            return this;
          var g = u - c,
            f = m - d,
            v = s.naturalWidth * t,
            w = s.naturalHeight * t,
            b = v - l,
            y = w - p;
          if (
            !1 ===
            kt(this.element, U, {
              scale: t,
              oldScale: h.scale,
              originalEvent: o,
            })
          )
            return this;
          o
            ? ((r = this.pointers),
              (t = Ot(this.cropper)),
              (e =
                r && Object.keys(r).length
                  ? ((n = a = i = 0),
                    ht(r, function (t) {
                      var e = t.startX,
                        t = t.startY;
                      (i += e), (a += t), (n += 1);
                    }),
                    { pageX: (i /= n), pageY: (a /= n) })
                  : { pageX: o.pageX, pageY: o.pageY }),
              (h.left -= g * ((e.pageX - t.left - h.left) / c)),
              (h.top -= f * ((e.pageY - t.top - h.top) / d)),
              (s.left -= b * ((e.pageX - t.left - s.left) / l)),
              (s.top -= y * ((e.pageY - t.top - s.top) / p)))
            : at(e) && J(e.x) && J(e.y)
            ? ((h.left -= g * ((e.x - h.left) / c)),
              (h.top -= f * ((e.y - h.top) / d)),
              (s.left -= b * ((e.x - s.left) / l)),
              (s.top -= y * ((e.y - s.top) / p)))
            : ((h.left -= g / 2),
              (h.top -= f / 2),
              (s.left -= b / 2),
              (s.top -= y / 2)),
            (h.width = u),
            (h.height = m),
            (s.width = v),
            (s.height = w),
            this.renderCanvas(!0);
        }
        return this;
      },
      rotate: function (t) {
        return this.rotateTo((this.imageData.rotate || 0) + Number(t));
      },
      rotateTo: function (t) {
        return (
          J((t = Number(t))) &&
            this.ready &&
            !this.disabled &&
            this.options.rotatable &&
            ((this.imageData.rotate = t % 360), this.renderCanvas(!0, !0)),
          this
        );
      },
      scaleX: function (t) {
        var e = this.imageData.scaleY;
        return this.scale(t, J(e) ? e : 1);
      },
      scaleY: function (t) {
        var e = this.imageData.scaleX;
        return this.scale(J(e) ? e : 1, t);
      },
      scale: function (t) {
        var e =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t,
          i = this.imageData,
          a = !1;
        return (
          (t = Number(t)),
          (e = Number(e)),
          this.ready &&
            !this.disabled &&
            this.options.scalable &&
            (J(t) && ((i.scaleX = t), (a = !0)),
            J(e) && ((i.scaleY = e), (a = !0)),
            a && this.renderCanvas(!0, !0)),
          this
        );
      },
      getData: function () {
        var i,
          a,
          t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
          e = this.options,
          n = this.imageData,
          o = this.canvasData,
          r = this.cropBoxData;
        return (
          this.ready && this.cropped
            ? ((i = {
                x: r.left - o.left,
                y: r.top - o.top,
                width: r.width,
                height: r.height,
              }),
              (a = n.width / n.naturalWidth),
              ht(i, function (t, e) {
                i[e] = t / a;
              }),
              t &&
                ((r = Math.round(i.y + i.height)),
                (t = Math.round(i.x + i.width)),
                (i.x = Math.round(i.x)),
                (i.y = Math.round(i.y)),
                (i.width = t - i.x),
                (i.height = r - i.y)))
            : (i = { x: 0, y: 0, width: 0, height: 0 }),
          e.rotatable && (i.rotate = n.rotate || 0),
          e.scalable &&
            ((i.scaleX = n.scaleX || 1), (i.scaleY = n.scaleY || 1)),
          i
        );
      },
      setData: function (t) {
        var e,
          i = this.options,
          a = this.imageData,
          n = this.canvasData,
          o = {};
        return (
          this.ready &&
            !this.disabled &&
            at(t) &&
            ((e = !1),
            i.rotatable &&
              J(t.rotate) &&
              t.rotate !== a.rotate &&
              ((a.rotate = t.rotate), (e = !0)),
            i.scalable &&
              (J(t.scaleX) &&
                t.scaleX !== a.scaleX &&
                ((a.scaleX = t.scaleX), (e = !0)),
              J(t.scaleY) &&
                t.scaleY !== a.scaleY &&
                ((a.scaleY = t.scaleY), (e = !0))),
            e && this.renderCanvas(!0, !0),
            (a = a.width / a.naturalWidth),
            J(t.x) && (o.left = t.x * a + n.left),
            J(t.y) && (o.top = t.y * a + n.top),
            J(t.width) && (o.width = t.width * a),
            J(t.height) && (o.height = t.height * a),
            this.setCropBoxData(o)),
          this
        );
      },
      getContainerData: function () {
        return this.ready ? st({}, this.containerData) : {};
      },
      getImageData: function () {
        return this.sized ? st({}, this.imageData) : {};
      },
      getCanvasData: function () {
        var e = this.canvasData,
          i = {};
        return (
          this.ready &&
            ht(G, function (t) {
              i[t] = e[t];
            }),
          i
        );
      },
      setCanvasData: function (t) {
        var e = this.canvasData,
          i = e.aspectRatio;
        return (
          this.ready &&
            !this.disabled &&
            at(t) &&
            (J(t.left) && (e.left = t.left),
            J(t.top) && (e.top = t.top),
            J(t.width)
              ? ((e.width = t.width), (e.height = t.width / i))
              : J(t.height) &&
                ((e.height = t.height), (e.width = t.height * i)),
            this.renderCanvas(!0)),
          this
        );
      },
      getCropBoxData: function () {
        var e = this.cropBoxData,
          i = {};
        return (
          this.ready &&
            this.cropped &&
            ht(G, function (t) {
              i[t] = e[t];
            }),
          i
        );
      },
      setCropBoxData: function (t) {
        var e,
          i,
          a = this.cropBoxData,
          n = this.options.aspectRatio;
        return (
          this.ready &&
            this.cropped &&
            !this.disabled &&
            at(t) &&
            (J(t.left) && (a.left = t.left),
            J(t.top) && (a.top = t.top),
            J(t.width) &&
              t.width !== a.width &&
              ((e = !0), (a.width = t.width)),
            J(t.height) &&
              t.height !== a.height &&
              ((i = !0), (a.height = t.height)),
            n && (e ? (a.height = a.width / n) : i && (a.width = a.height * n)),
            this.renderCropBox()),
          this
        );
      },
      getCroppedCanvas: function () {
        var t =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        if (!this.ready || !window.HTMLCanvasElement) return null;
        var e,
          i,
          a,
          n,
          o,
          r,
          h,
          s,
          c,
          d,
          l,
          p,
          u = this.canvasData,
          m =
            ((w = this.image),
            (e = this.imageData),
            (i = u),
            (y = t),
            (a = e.aspectRatio),
            (n = e.naturalWidth),
            (b = e.naturalHeight),
            (o = void 0 === (p = e.rotate) ? 0 : p),
            (m = void 0 === (v = e.scaleX) ? 1 : v),
            (g = void 0 === (d = e.scaleY) ? 1 : d),
            (r = i.aspectRatio),
            (h = i.naturalWidth),
            (s = i.naturalHeight),
            (c = void 0 === (l = y.fillColor) ? 'transparent' : l),
            (x = y.imageSmoothingEnabled),
            (f = void 0 === x || x),
            (v = void 0 === (p = y.imageSmoothingQuality) ? 'low' : p),
            (d = void 0 === (e = y.maxWidth) ? 1 / 0 : e),
            (l = void 0 === (i = y.maxHeight) ? 1 / 0 : i),
            (p = void 0 === (x = y.minWidth) ? 0 : x),
            (i = void 0 === (e = y.minHeight) ? 0 : e),
            (y = (x = document.createElement('canvas')).getContext('2d')),
            (e = Yt({ aspectRatio: r, width: d, height: l })),
            (r = Yt({ aspectRatio: r, width: p, height: i }, 'cover')),
            (h = Math.min(e.width, Math.max(r.width, h))),
            (s = Math.min(e.height, Math.max(r.height, s))),
            (l = Yt({ aspectRatio: a, width: d, height: l })),
            (i = Yt({ aspectRatio: a, width: p, height: i }, 'cover')),
            (n = Math.min(l.width, Math.max(i.width, n))),
            (b = Math.min(l.height, Math.max(i.height, b))),
            (b = [-n / 2, -b / 2, n, b]),
            (x.width = dt(h)),
            (x.height = dt(s)),
            (y.fillStyle = c),
            y.fillRect(0, 0, h, s),
            y.save(),
            y.translate(h / 2, s / 2),
            y.rotate((o * Math.PI) / 180),
            y.scale(m, g),
            (y.imageSmoothingEnabled = f),
            (y.imageSmoothingQuality = v),
            y.drawImage.apply(
              y,
              [w].concat(
                W(
                  b.map(function (t) {
                    return Math.floor(dt(t));
                  })
                )
              )
            ),
            y.restore(),
            x);
        if (!this.cropped) return m;
        var g = this.getData(),
          f = g.x,
          v = g.y,
          w = g.width,
          b = g.height,
          y = m.width / Math.floor(u.naturalWidth);
        1 != y && ((f *= y), (v *= y), (w *= y), (b *= y));
        var x = w / b,
          g = Yt({
            aspectRatio: x,
            width: t.maxWidth || 1 / 0,
            height: t.maxHeight || 1 / 0,
          }),
          u = Yt(
            {
              aspectRatio: x,
              width: t.minWidth || 0,
              height: t.minHeight || 0,
            },
            'cover'
          ),
          x = Yt({
            aspectRatio: x,
            width: t.width || (1 != y ? m.width : w),
            height: t.height || (1 != y ? m.height : b),
          }),
          y = x.width,
          x = x.height,
          y = Math.min(g.width, Math.max(u.width, y)),
          x = Math.min(g.height, Math.max(u.height, x)),
          g = document.createElement('canvas'),
          u = g.getContext('2d');
        (g.width = dt(y)),
          (g.height = dt(x)),
          (u.fillStyle = t.fillColor || 'transparent'),
          u.fillRect(0, 0, y, x);
        (x = t.imageSmoothingEnabled), (t = t.imageSmoothingQuality);
        (u.imageSmoothingEnabled = void 0 === x || x),
          t && (u.imageSmoothingQuality = t);
        var M,
          C,
          D,
          B,
          k,
          x = m.width,
          t = m.height,
          f = f,
          v = v;
        f <= -w || x < f
          ? (B = C = M = f = 0)
          : f <= 0
          ? ((C = -f), (f = 0), (B = M = Math.min(x, w + f)))
          : f <= x && ((C = 0), (B = M = Math.min(w, x - f))),
          M <= 0 || v <= -b || t < v
            ? (k = D = O = v = 0)
            : v <= 0
            ? ((D = -v), (v = 0), (k = O = Math.min(t, b + v)))
            : v <= t && ((D = 0), (k = O = Math.min(b, t - v)));
        var O = [f, v, M, O];
        return (
          0 < B && 0 < k && O.push(C * (w = y / w), D * w, B * w, k * w),
          u.drawImage.apply(
            u,
            [m].concat(
              W(
                O.map(function (t) {
                  return Math.floor(dt(t));
                })
              )
            )
          ),
          g
        );
      },
      setAspectRatio: function (t) {
        var e = this.options;
        return (
          this.disabled ||
            tt(t) ||
            ((e.aspectRatio = Math.max(0, t) || NaN),
            this.ready &&
              (this.initCropBox(), this.cropped && this.renderCropBox())),
          this
        );
      },
      setDragMode: function (t) {
        var e,
          i,
          a = this.options,
          n = this.dragBox,
          o = this.face;
        return (
          this.ready &&
            !this.disabled &&
            ((i = a.movable && t === w),
            (a.dragMode = t = (e = t === v) || i ? t : b),
            bt(n, g, t),
            gt(n, s, e),
            gt(n, m, i),
            a.cropBoxMovable || (bt(o, g, t), gt(o, s, e), gt(o, m, i))),
          this
        );
      },
    },
    It = r.Cropper,
    Pt = (function () {
      function i(t) {
        var e =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if (
          (!(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, i),
          !t || !Z.test(t.tagName))
        )
          throw new Error(
            'The first argument is required and must be an <img> or <canvas> element.'
          );
        (this.element = t),
          (this.options = st({}, V, at(e) && e)),
          (this.cropped = !1),
          (this.disabled = !1),
          (this.pointers = {}),
          (this.ready = !1),
          (this.reloading = !1),
          (this.replaced = !1),
          (this.sized = !1),
          (this.sizing = !1),
          this.init();
      }
      var t, e, a;
      return (
        (t = i),
        (a = [
          {
            key: 'noConflict',
            value: function () {
              return (window.Cropper = It), i;
            },
          },
          {
            key: 'setDefaults',
            value: function (t) {
              st(V, at(t) && t);
            },
          },
        ]),
        (e = [
          {
            key: 'init',
            value: function () {
              var t,
                e = this.element,
                i = e.tagName.toLowerCase();
              if (!e[c]) {
                if (((e[c] = this), 'img' === i)) {
                  if (
                    ((this.isImg = !0),
                    (t = e.getAttribute('src') || ''),
                    !(this.originalUrl = t))
                  )
                    return;
                  t = e.src;
                } else
                  'canvas' === i &&
                    window.HTMLCanvasElement &&
                    (t = e.toDataURL());
                this.load(t);
              }
            },
          },
          {
            key: 'load',
            value: function (t) {
              var e,
                i,
                a,
                n,
                o,
                r,
                h = this;
              t &&
                ((this.url = t),
                (this.imageData = {}),
                (e = this.element),
                (i = this.options).rotatable ||
                  i.scalable ||
                  (i.checkOrientation = !1),
                i.checkOrientation && window.ArrayBuffer
                  ? Q.test(t)
                    ? K.test(t)
                      ? this.read(
                          ((r = (r = t).replace(Xt, '')),
                          (a = atob(r)),
                          (r = new ArrayBuffer(a.length)),
                          ht((n = new Uint8Array(r)), function (t, e) {
                            n[e] = a.charCodeAt(e);
                          }),
                          r)
                        )
                      : this.clone()
                    : ((o = new XMLHttpRequest()),
                      (r = this.clone.bind(this)),
                      (this.reloading = !0),
                      ((this.xhr = o).onabort = r),
                      (o.onerror = r),
                      (o.ontimeout = r),
                      (o.onprogress = function () {
                        o.getResponseHeader('content-type') !== q && o.abort();
                      }),
                      (o.onload = function () {
                        h.read(o.response);
                      }),
                      (o.onloadend = function () {
                        (h.reloading = !1), (h.xhr = null);
                      }),
                      i.checkCrossOrigin &&
                        Et(t) &&
                        e.crossOrigin &&
                        (t = Tt(t)),
                      o.open('GET', t, !0),
                      (o.responseType = 'arraybuffer'),
                      (o.withCredentials = 'use-credentials' === e.crossOrigin),
                      o.send())
                  : this.clone());
            },
          },
          {
            key: 'read',
            value: function (t) {
              var e = this.options,
                i = this.imageData,
                a = Lt(t),
                n = 0,
                o = 1,
                r = 1;
              1 < a &&
                ((this.url = (function (t, e) {
                  for (var i = [], a = new Uint8Array(t); 0 < a.length; )
                    i.push(Rt.apply(null, rt(a.subarray(0, 8192)))),
                      (a = a.subarray(8192));
                  return 'data:'.concat(e, ';base64,').concat(btoa(i.join('')));
                })(t, q)),
                (n = (a = (function (t) {
                  var e = 0,
                    i = 1,
                    a = 1;
                  switch (t) {
                    case 2:
                      i = -1;
                      break;
                    case 3:
                      e = -180;
                      break;
                    case 4:
                      a = -1;
                      break;
                    case 5:
                      (e = 90), (a = -1);
                      break;
                    case 6:
                      e = 90;
                      break;
                    case 7:
                      (e = 90), (i = -1);
                      break;
                    case 8:
                      e = -90;
                  }
                  return { rotate: e, scaleX: i, scaleY: a };
                })(a)).rotate),
                (o = a.scaleX),
                (r = a.scaleY)),
                e.rotatable && (i.rotate = n),
                e.scalable && ((i.scaleX = o), (i.scaleY = r)),
                this.clone();
            },
          },
          {
            key: 'clone',
            value: function () {
              var t = this.element,
                e = this.url,
                i = t.crossOrigin,
                a = e;
              this.options.checkCrossOrigin &&
                Et(e) &&
                ((i = i || 'anonymous'), (a = Tt(e))),
                (this.crossOrigin = i),
                (this.crossOriginUrl = a);
              var n = document.createElement('img');
              i && (n.crossOrigin = i),
                (n.src = a || e),
                (n.alt = t.alt || 'The image to crop'),
                ((this.image = n).onload = this.start.bind(this)),
                (n.onerror = this.stop.bind(this)),
                ut(n, l),
                t.parentNode.insertBefore(n, t.nextSibling);
            },
          },
          {
            key: 'start',
            value: function () {
              var i = this,
                t = this.image;
              (t.onload = null), (t.onerror = null), (this.sizing = !0);
              function e(t, e) {
                st(i.imageData, {
                  naturalWidth: t,
                  naturalHeight: e,
                  aspectRatio: t / e,
                }),
                  (i.initialImageData = st({}, i.imageData)),
                  (i.sizing = !1),
                  (i.sized = !0),
                  i.build();
              }
              var a,
                n,
                o =
                  r.navigator &&
                  /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(
                    r.navigator.userAgent
                  );
              !t.naturalWidth || o
                ? ((a = document.createElement('img')),
                  (n = document.body || document.documentElement),
                  ((this.sizingImage = a).onload = function () {
                    e(a.width, a.height), o || n.removeChild(a);
                  }),
                  (a.src = t.src),
                  o ||
                    ((a.style.cssText =
                      'left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;'),
                    n.appendChild(a)))
                : e(t.naturalWidth, t.naturalHeight);
            },
          },
          {
            key: 'stop',
            value: function () {
              var t = this.image;
              (t.onload = null),
                (t.onerror = null),
                t.parentNode.removeChild(t),
                (this.image = null);
            },
          },
          {
            key: 'build',
            value: function () {
              var t, e, i, a, n, o, r, h, s;
              this.sized &&
                !this.ready &&
                ((t = this.element),
                (e = this.options),
                (i = this.image),
                (a = t.parentNode),
                ((s = document.createElement('div')).innerHTML =
                  '<div class="cropper-container" touch-action="none"><div class="cropper-canvas"></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><div class="cropper-view-box"></div><div class="cropper-dashed dashed-h"></div><div class="cropper-dashed dashed-v"></div><div class="cropper-center"></div><div class="cropper-face"></div><div class="cropper-line line-e" data-cropper-action="e"></div><div class="cropper-line line-n" data-cropper-action="n"></div><div class="cropper-line line-w" data-cropper-action="w"></div><div class="cropper-line line-s" data-cropper-action="s"></div><div class="cropper-point point-e" data-cropper-action="e"></div><div class="cropper-point point-n" data-cropper-action="n"></div><div class="cropper-point point-w" data-cropper-action="w"></div><div class="cropper-point point-s" data-cropper-action="s"></div><div class="cropper-point point-ne" data-cropper-action="ne"></div><div class="cropper-point point-nw" data-cropper-action="nw"></div><div class="cropper-point point-sw" data-cropper-action="sw"></div><div class="cropper-point point-se" data-cropper-action="se"></div></div></div>'),
                (o = (n = s.querySelector(
                  '.'.concat(c, '-container')
                )).querySelector('.'.concat(c, '-canvas'))),
                (r = n.querySelector('.'.concat(c, '-drag-box'))),
                (s = (h = n.querySelector(
                  '.'.concat(c, '-crop-box')
                )).querySelector('.'.concat(c, '-face'))),
                (this.container = a),
                (this.cropper = n),
                (this.canvas = o),
                (this.dragBox = r),
                (this.cropBox = h),
                (this.viewBox = n.querySelector('.'.concat(c, '-view-box'))),
                (this.face = s),
                o.appendChild(i),
                ut(t, j),
                a.insertBefore(n, t.nextSibling),
                this.isImg || mt(i, l),
                this.initPreview(),
                this.bind(),
                (e.initialAspectRatio =
                  Math.max(0, e.initialAspectRatio) || NaN),
                (e.aspectRatio = Math.max(0, e.aspectRatio) || NaN),
                (e.viewMode =
                  Math.max(0, Math.min(3, Math.round(e.viewMode))) || 0),
                ut(h, j),
                e.guides ||
                  ut(h.getElementsByClassName(''.concat(c, '-dashed')), j),
                e.center ||
                  ut(h.getElementsByClassName(''.concat(c, '-center')), j),
                e.background && ut(n, ''.concat(c, '-bg')),
                e.highlight || ut(s, p),
                e.cropBoxMovable && (ut(s, m), bt(s, g, O)),
                e.cropBoxResizable ||
                  (ut(h.getElementsByClassName(''.concat(c, '-line')), j),
                  ut(h.getElementsByClassName(''.concat(c, '-point')), j)),
                this.render(),
                (this.ready = !0),
                this.setDragMode(e.dragMode),
                e.autoCrop && this.crop(),
                this.setData(e.data),
                nt(e.ready) && Bt(t, 'ready', e.ready, { once: !0 }),
                kt(t, 'ready'));
            },
          },
          {
            key: 'unbuild',
            value: function () {
              this.ready &&
                ((this.ready = !1),
                this.unbind(),
                this.resetPreview(),
                this.cropper.parentNode.removeChild(this.cropper),
                mt(this.element, j));
            },
          },
          {
            key: 'uncreate',
            value: function () {
              this.ready
                ? (this.unbuild(), (this.ready = !1), (this.cropped = !1))
                : this.sizing
                ? ((this.sizingImage.onload = null),
                  (this.sizing = !1),
                  (this.sized = !1))
                : this.reloading
                ? ((this.xhr.onabort = null), this.xhr.abort())
                : this.image && this.stop();
            },
          },
        ]) && n(t.prototype, e),
        a && n(t, a),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        i
      );
    })();
  return st(Pt.prototype, St, At, h, o, t, jt), Pt;
});
