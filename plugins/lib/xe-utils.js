/**
 * xe-utils.js v3.5.14
 * MIT License.
 * @preserve
 */
!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (n.XEUtils = t());
})(this, function () {
  "use strict";
  var D = {
      cookies: { path: "/" },
      treeOptions: { parentKey: "parentId", key: "id", children: "children" },
      parseDateFormat: "yyyy-MM-dd HH:mm:ss",
      firstDayOfWeek: 1,
    },
    r = function () {};
  function n(a) {
    return function (n, t) {
      var r = Rn(t) ? t : D.firstDayOfWeek,
        e = lr(n, 0, r, r);
      if ($t(e)) {
        var u = new Date(e.getFullYear(), e.getMonth(), e.getDate()),
          i = a(e),
          o = i.getDay();
        return (
          r < o && i.setDate(7 - o + r + 1),
          o < r && i.setDate(r - o + 1),
          Math.floor((m(u) - m(i)) / H + 1)
        );
      }
      return NaN;
    };
  }
  function t(n, e) {
    var u = Object[n];
    return function (t) {
      var r = [];
      if (t) {
        if (u) return u(t);
        ht(
          t,
          1 < e
            ? function (n) {
                r.push(["" + n, t[n]]);
              }
            : function () {
                r.push(arguments[e]);
              }
        );
      }
      return r;
    };
  }
  function e(e, u) {
    return function (n, t) {
      if (n) {
        if (n[e]) return n[e](t);
        if (zn(n) || Fn(n)) return u(n, t);
        for (var r in n) if (jn(n, r) && t === n[r]) return r;
      }
      return -1;
    };
  }
  function u(t) {
    return function (n) {
      return "[object " + t + "]" === U.call(n);
    };
  }
  function i(t) {
    return function (n) {
      return typeof n === t;
    };
  }
  function o(o, a, f, c, l) {
    return function (n, t, r) {
      if (n && t) {
        if (o && n[o]) return n[o](t, r);
        if (a && Fn(n)) {
          for (var e = 0, u = n.length; e < u; e++)
            if (!!t.call(r, n[e], e, n) === c) return [!0, !1, e, n[e]][f];
        } else
          for (var i in n)
            if (jn(n, i) && !!t.call(r, n[i], i, n) === c)
              return [!0, !1, i, n[i]][f];
      }
      return l;
    };
  }
  function a(u) {
    return function (n, t, r) {
      if (n && Tn(t)) {
        if (Fn(n) || zn(n)) return u(n, t, r);
        for (var e in n) if (jn(n, e) && t.call(r, n[e], e, n)) return e;
      }
      return -1;
    };
  }
  function f(l) {
    return function (n, t) {
      var r = Ft(n),
        e = r;
      if (r) {
        t >>= 0;
        var u = It(r).split("."),
          i = u[0],
          o = u[1] || "",
          a = o.substring(0, t + 1),
          f = i + (a ? "." + a : "");
        if (t >= o.length) return Ft(f);
        if (((f = r), 0 < t)) {
          var c = Math.pow(10, t);
          e = Math[l](N(f, c)) / c;
        } else e = Math[l](f);
      }
      return e;
    };
  }
  function c(o) {
    return function (r, e) {
      var u, i;
      return r && r.length
        ? (On(r, function (n, t) {
            e && (n = Tn(e) ? e(n, t, r) : gt(n, e)),
              An(n) || (!An(u) && !o(u, n)) || ((i = t), (u = n));
          }),
          r[i])
        : u;
    };
  }
  function l(c, l) {
    return function (r, e) {
      var n,
        t,
        u = {},
        i = [],
        o = this,
        a = arguments,
        f = a.length;
      if (!Tn(e)) {
        for (t = 1; t < f; t++) (n = a[t]), i.push.apply(i, Fn(n) ? n : [n]);
        e = 0;
      }
      return (
        ht(r, function (n, t) {
          ((
            e
              ? e.call(o, n, t, r)
              : -1 <
                it(i, function (n) {
                  return n === t;
                })
          )
            ? c
            : l) && (u[t] = n);
        }),
        u
      );
    };
  }
  function s(r) {
    return function (n) {
      if (n) {
        var t = r(n && n.replace ? n.replace(/,/g, "") : n);
        if (!isNaN(t)) return t;
      }
      return 0;
    };
  }
  function h(o) {
    return function (n, t, r, e) {
      var u = r || {},
        i = u.children || "children";
      return o(null, n, t, e, [], [], i, u);
    };
  }
  function p(n, t) {
    return n === t;
  }
  function g(t, r) {
    try {
      delete t[r];
    } catch (n) {
      t[r] = void 0;
    }
  }
  function v(r, e, u, i, n, t, o) {
    if (r === e) return !0;
    if (r && e && !Rn(r) && !Rn(e) && !zn(r) && !zn(e)) {
      if ($n(r)) return u("" + r, "" + e, n, t, o);
      if (Cn(r) || _n(r)) return u(+r, +e, n, t, o);
      var a,
        f,
        c,
        l = Fn(r),
        s = Fn(e);
      if (l || s ? l && s : r.constructor === e.constructor)
        return (
          (f = at(r)),
          (c = at(e)),
          i && (a = i(r, e, n)),
          f.length === c.length &&
            (Wn(a)
              ? sn(f, function (n, t) {
                  return (
                    n === c[t] && v(r[n], e[c[t]], u, i, l || s ? t : n, r, e)
                  );
                })
              : !!a)
        );
    }
    return u(r, e, n, t, o);
  }
  function d(t) {
    var r = new RegExp("(?:" + at(t).join("|") + ")", "g");
    return function (n) {
      return xr(n).replace(r, function (n) {
        return t[n];
      });
    };
  }
  function b(n) {
    return n.getFullYear();
  }
  function M(n) {
    return n.getMonth();
  }
  function m(n) {
    return n.getTime();
  }
  function y(n) {
    return n
      ? n.splice && n.join
        ? n
        : ("" + n)
            .replace(/(\[\d+\])\.?/g, "$1.")
            .replace(/\.$/, "")
            .split(".")
      : [];
  }
  function S() {
    return Z ? Z.origin || Z.protocol + "//" + Z.host : "";
  }
  function O(n) {
    return Date.UTC(
      n.y,
      n.M || 0,
      n.d || 1,
      n.H || 0,
      n.m || 0,
      n.s || 0,
      n.S || 0
    );
  }
  function w(n) {
    return m(((t = n), new Date(b(t), M(t), t.getDate())));
    var t;
  }
  function N(n, t) {
    var r = It(n),
      e = It(t);
    return (
      (parseInt(r.replace(".", "")) * parseInt(e.replace(".", ""))) /
      Math.pow(10, k(r) + k(e))
    );
  }
  function x() {
    return new Date();
  }
  function E(n, t) {
    var r = It(n),
      e = It(t),
      u = Math.pow(10, Math.max(k(r), k(e)));
    return (_t(n, u) + _t(t, u)) / u;
  }
  function k(n) {
    return (n.split(".")[1] || "").length;
  }
  function j(n, t) {
    var r = It(n),
      e = It(t),
      u = k(r),
      i = k(e) - u,
      o = i < 0,
      a = Math.pow(10, o ? Math.abs(i) : i);
    return _t(r.replace(".", "") / e.replace(".", ""), o ? 1 / a : a);
  }
  function A(n, t) {
    return n.substring(0, t) + "." + n.substring(t, n.length);
  }
  function W(n) {
    return n.toLowerCase();
  }
  function F(n, t) {
    if (n.repeat) return n.repeat(t);
    var r = isNaN(t) ? [] : new Array(q(t));
    return r.join(n) + (0 < r.length ? n : "");
  }
  function I(n, t, r) {
    return n.substring(t, r);
  }
  function T(n) {
    return n.toUpperCase();
  }
  (r.VERSION = "3.5.13"),
    (r.mixin = function () {
      On(arguments, function (n) {
        ht(n, function (t, n) {
          r[n] = Tn(t)
            ? function () {
                var n = t.apply(r.$context, arguments);
                return (r.$context = null), n;
              }
            : t;
        });
      });
    }),
    (r.setup = function (n) {
      return V(D, n);
    });
  var _ = "undefined",
    z = "last",
    R = "first",
    $ = 864e5,
    H = 7 * $,
    Z = typeof location === _ ? 0 : location,
    C = typeof window === _ ? 0 : window,
    Y = typeof document === _ ? 0 : document,
    L = encodeURIComponent,
    P = decodeURIComponent,
    U = Object.prototype.toString,
    q = parseInt,
    B = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
    },
    J = /(.+)?\[(\d+)\]$/,
    K = Object.assign;
  function Q(t, n, r) {
    for (var e, u = n.length, i = 1; i < u; i++)
      (e = n[i]),
        On(
          at(n[i]),
          r
            ? function (n) {
                t[n] = St(e[n], r);
              }
            : function (n) {
                t[n] = e[n];
              }
        );
    return t;
  }
  var V = function (n) {
    if (n) {
      var t = arguments;
      if (!0 !== n) return K ? K.apply(Object, t) : Q(n, t);
      if (1 < t.length) return Q((n = Fn(n[1]) ? [] : {}), t, !0);
    }
    return n;
  };
  function X(n, t, r) {
    if (n) for (var e in n) jn(n, e) && t.call(r, n[e], e, n);
  }
  function G(t, r, e) {
    wn(at(t), function (n) {
      r.call(e, t[n], n, t);
    });
  }
  function nn(r, n) {
    return (Zn(r) && Zn(n)) || (Fn(r) && Fn(n))
      ? (ht(n, function (n, t) {
          r[t] = nn(r[t], n);
        }),
        r)
      : n;
  }
  function tn(r, e, u) {
    var i = [];
    if (e) {
      Tn(e) || (e = Er(e));
      var o,
        a = {};
      ht(r, function (n, t) {
        (o = e.call(u, n, t, r)), a[o] || ((a[o] = 1), i.push(n));
      });
    } else
      ht(r, function (n) {
        vn(i, n) || i.push(n);
      });
    return i;
  }
  var rn = fn,
    en = "asc",
    un = "desc";
  function on(n, t) {
    return Wn(n)
      ? 1
      : Pn(n)
      ? Wn(t)
        ? -1
        : 1
      : n && n.localeCompare
      ? n.localeCompare(t)
      : t < n
      ? 1
      : -1;
  }
  function an(u, i, o) {
    return function (n, t) {
      var r = n[u],
        e = t[u];
      return r === e ? (o ? o(n, t) : 0) : i.order === un ? on(e, r) : on(r, e);
    };
  }
  function fn(n, t, r) {
    if (n) {
      if (An(t)) return bn(n).sort(on);
      for (
        var e,
          u = yn(n, function (n) {
            return { data: n };
          }),
          i =
            ((a = n),
            (f = u),
            (l = r),
            (s = []),
            On((c = Fn((c = t)) ? c : [c]), function (n, r) {
              if (n) {
                var t,
                  e = n;
                Fn(n)
                  ? ((e = n[0]), (t = n[1]))
                  : Zn(n) && ((e = n.field), (t = n.order)),
                  s.push({ field: e, order: t || en }),
                  On(
                    f,
                    Tn(e)
                      ? function (n, t) {
                          n[r] = e.call(l, n.data, t, a);
                        }
                      : function (n) {
                          n[r] = e ? gt(n.data, e) : n.data;
                        }
                  );
              }
            }),
            s),
          o = i.length - 1;
        0 <= o;

      )
        (e = an(o, i[o], e)), o--;
      return e && (u = u.sort(e)), yn(u, Er("data"));
    }
    var a, f, c, l, s;
    return [];
  }
  function cn(n) {
    for (var t, r = [], e = ft(n), u = e.length - 1; 0 <= u; u--)
      (t = 0 < u ? Nt(0, u) : 0), r.push(e[t]), e.splice(t, 1);
    return r;
  }
  var ln = o("some", 1, 0, !0, !1),
    sn = o("every", 1, 1, !1, !0);
  function hn(n, t, r) {
    var e = [],
      u = arguments.length;
    if (n) {
      if (((t = 2 <= u ? Ft(t) : 0), (r = 3 <= u ? Ft(r) : n.length), n.slice))
        return n.slice(t, r);
      for (; t < r; t++) e.push(n[t]);
    }
    return e;
  }
  var pn = o("find", 1, 3, !0);
  var gn = o("", 0, 2, !0);
  function vn(n, t) {
    if (n) {
      if (n.includes) return n.includes(t);
      for (var r in n) if (jn(n, r) && t === n[r]) return !0;
    }
    return !1;
  }
  function dn(n, t) {
    if (n.indexOf) return n.indexOf(t);
    for (var r = 0, e = n.length; r < e; r++) if (t === n[r]) return r;
  }
  function mn(n, t) {
    if (n.lastIndexOf) return n.lastIndexOf(t);
    for (var r = n.length - 1; 0 <= r; r--) if (t === n[r]) return r;
    return -1;
  }
  function yn(n, t, r) {
    var e = [];
    if (n && 1 < arguments.length) {
      if (n.map) return n.map(t, r);
      ht(n, function () {
        e.push(t.apply(r, arguments));
      });
    }
    return e;
  }
  function Dn(n) {
    var t,
      r,
      e,
      u = [];
    if (n && n.length)
      for (
        t = 0,
          e = (r = Et(n, function (n) {
            return n ? n.length : 0;
          }))
            ? r.length
            : 0;
        t < e;
        t++
      )
        u.push(Sn(n, t));
    return u;
  }
  function bn(n) {
    return yn(n, function (n) {
      return n;
    });
  }
  function Mn(n, t) {
    var r,
      e = 0;
    if (Fn(n) && Fn(t)) {
      for (r = t.length; e < r; e++) if (!vn(n, t[e])) return !1;
      return !0;
    }
    return vn(n, t);
  }
  function Sn(n, t) {
    return yn(n, Er(t));
  }
  function On(n, t, r) {
    if (n)
      if (n.forEach) n.forEach(t, r);
      else for (var e = 0, u = n.length; e < u; e++) t.call(r, n[e], e, n);
  }
  function wn(n, t, r) {
    for (var e = n.length - 1; 0 <= e; e--) t.call(r, n[e], e, n);
  }
  var Nn = h(function n(t, r, e, u, i, o, a, f) {
    var c, l, s, h, p, g;
    if (r)
      for (l = 0, s = r.length; l < s; l++) {
        if (
          ((c = r[l]),
          (h = i.concat(["" + l])),
          (p = o.concat([c])),
          e.call(u, c, l, r, h, t, p))
        )
          return { index: l, item: c, path: h, items: r, parent: t, nodes: p };
        if (a && c && (g = n(c, c[a], e, u, h.concat([a]), p, a, f))) return g;
      }
  });
  var xn = h(function r(e, u, i, o, a, f, c, l) {
    var s, h;
    ht(u, function (n, t) {
      (s = a.concat(["" + t])),
        (h = f.concat([n])),
        i.call(o, n, t, u, s, e, h),
        n && c && (s.push(c), r(n, n[c], i, o, s, h, c, l));
    });
  });
  var En = h(function r(e, u, i, o, a, f, c, l) {
    var s,
      h,
      p,
      g = l.mapChildren || c;
    return yn(u, function (n, t) {
      return (
        (s = a.concat(["" + t])),
        (h = f.concat([n])),
        (p = i.call(o, n, t, u, s, e, h)) &&
          n &&
          c &&
          n[c] &&
          (p[g] = r(n, n[c], i, o, s, h, c, l)),
        p
      );
    });
  });
  var kn = h(function (n, t, r, e, u, i, o, a) {
    return (function r(e, u, i, o, a, f, c, l, s) {
      var h,
        p,
        g,
        v,
        d,
        m = [],
        y = s.original,
        D = s.data,
        b = s.mapChildren || l;
      return (
        On(i, function (n, t) {
          (h = f.concat(["" + t])),
            (p = c.concat([n])),
            (v = e || o.call(a, n, t, i, h, u, p)),
            (d = l && n[l]),
            v || d
              ? (y ? (g = n) : ((g = V({}, n)), D && (g[D] = n)),
                (g[b] = r(v, n, n[l], o, a, h, p, l, s)),
                (v || g[b].length) && m.push(g))
              : v && m.push(g);
        }),
        m
      );
    })(0, n, t, r, e, u, i, o, a);
  });
  function jn(n, t) {
    return !(!n || !n.hasOwnProperty) && n.hasOwnProperty(t);
  }
  function An(n) {
    return Pn(n) || Wn(n);
  }
  var Wn = i(_),
    Fn = Array.isArray || u("Array");
  var In = function (n) {
      return !Pn(n) && !isNaN(n) && !Fn(n) && n % 1 == 0;
    },
    Tn = i("function"),
    _n = i("boolean"),
    zn = i("string"),
    Rn = i("number"),
    $n = u("RegExp"),
    Hn = i("object");
  function Zn(n) {
    return !!n && n.constructor === Object;
  }
  var Cn = u("Date"),
    Yn = u("Error");
  function Ln(n) {
    for (var t in n) return !1;
    return !0;
  }
  function Pn(n) {
    return null === n;
  }
  var Un = typeof Symbol !== _;
  function qn(n) {
    return Un && Symbol.isSymbol ? Symbol.isSymbol(n) : "symbol" == typeof n;
  }
  var Bn = u("Arguments");
  var Jn = typeof FormData !== _;
  var Kn = typeof Map !== _;
  var Qn = typeof WeakMap !== _;
  var Vn = typeof Set !== _;
  var Xn = typeof WeakSet !== _;
  function Gn(n) {
    var t,
      r = n ? ur(n) : x();
    return (
      !!Cn(r) &&
      (t = r.getFullYear()) % 4 == 0 &&
      (t % 100 != 0 || t % 400 == 0)
    );
  }
  function nt(n, t) {
    return v(n, t, p);
  }
  var tt = 0;
  function rt(n) {
    var t = 0;
    return zn(n) || Fn(n)
      ? n.length
      : (ht(n, function () {
          t++;
        }),
        t);
  }
  var et = e("indexOf", dn),
    ut = e("lastIndexOf", mn),
    it = a(function (n, t, r) {
      for (var e = 0, u = n.length; e < u; e++)
        if (t.call(r, n[e], e, n)) return e;
      return -1;
    }),
    ot = a(function (n, t, r) {
      for (var e = n.length - 1; 0 <= e; e--)
        if (t.call(r, n[e], e, n)) return e;
      return -1;
    });
  var at = t("keys", 1),
    ft = t("values", 0),
    ct = t("entries", 2),
    lt = l(1, 0),
    st = l(0, 1);
  function ht(n, t, r) {
    return n ? (Fn(n) ? On : X)(n, t, r) : n;
  }
  function pt(n, t, r) {
    return n ? (Fn(n) ? wn : G)(n, t, r) : n;
  }
  function gt(n, t, r) {
    if (An(n)) return r;
    var e = (function (n, t) {
      if (n) {
        var r,
          e,
          u,
          i = 0;
        if (n[t] || jn(n, t)) return n[t];
        if (((e = y(t)), (u = e.length)))
          for (r = n; i < u; i++)
            if (
              ((o = r),
              (a = e[i]),
              void 0,
              (f = a ? a.match(J) : ""),
              An(
                (r = f
                  ? f[1]
                    ? o[f[1]]
                      ? o[f[1]][f[2]]
                      : void 0
                    : o[f[2]]
                  : o[a])
              ))
            )
              return i === u - 1 ? r : void 0;
        return r;
      }
      var o, a, f;
    })(n, t);
    return Wn(e) ? r : e;
  }
  var vt = /(.+)?\[(\d+)\]$/;
  function dt(n, t, r, e, u) {
    if (n[t]) return r && (n[t] = u), n[t];
    var i,
      o,
      a = t ? t.match(vt) : null;
    if (r) o = u;
    else {
      var f = e ? e.match(vt) : null;
      o = f && !f[1] ? new Array(q(f[2]) + 1) : {};
    }
    return (
      a
        ? a[1]
          ? ((i = q(a[2])),
            n[a[1]]
              ? r
                ? (n[a[1]][i] = o)
                : n[a[1]][i]
                ? (o = n[a[1]][i])
                : (n[a[1]][i] = o)
              : ((n[a[1]] = new Array(i + 1)), (n[a[1]][i] = o)))
          : (n[a[2]] = o)
        : (n[t] = o),
      o
    );
  }
  function mt(n) {
    return "__proto__" === n || "constructor" === n || "prototype" === n;
  }
  function yt(r, e, u) {
    var i,
      n,
      o = {};
    return (
      r &&
        (e && Hn(e)
          ? ((n = e),
            (e = function () {
              return Ln(n);
            }))
          : Tn(e) || (e = Er(e)),
        ht(r, function (n, t) {
          (i = e ? e.call(u, n, t, r) : n), o[i] ? o[i].push(n) : (o[i] = [n]);
        })),
      o
    );
  }
  function Dt(n, t) {
    var r = n.__proto__.constructor;
    return t ? new r(t) : new r();
  }
  function bt(n, t) {
    return t ? Mt(n, t) : n;
  }
  function Mt(n, r) {
    if (n)
      switch (U.call(n)) {
        case "[object Object]":
          var e = Object.create(n.__proto__);
          return (
            X(n, function (n, t) {
              e[t] = bt(n, r);
            }),
            e
          );
        case "[object Date]":
        case "[object RegExp]":
          return Dt(n, n.valueOf());
        case "[object Array]":
        case "[object Arguments]":
          var t = [];
          return (
            On(n, function (n) {
              t.push(bt(n, r));
            }),
            t
          );
        case "[object Set]":
          var u = Dt(n);
          return (
            u.forEach(function (n) {
              u.add(bt(n, r));
            }),
            u
          );
        case "[object Map]":
          var i = Dt(n);
          return (
            i.forEach(function (n, t) {
              i.set(t, bt(n, r));
            }),
            i
          );
      }
    return n;
  }
  function St(n, t) {
    return n ? Mt(n, t) : n;
  }
  function Ot(r, e, n) {
    if (r) {
      var t,
        u = 1 < arguments.length && (Pn(e) || !Hn(e)),
        i = u ? n : e;
      if (Zn(r))
        X(
          r,
          u
            ? function (n, t) {
                r[t] = e;
              }
            : function (n, t) {
                g(r, t);
              }
        ),
          i && V(r, i);
      else if (Fn(r)) {
        if (u) for (t = r.length; 0 < t; ) r[--t] = e;
        else r.length = 0;
        i && r.push.apply(r, i);
      }
    }
    return r;
  }
  function wt(r, e, u) {
    if (r) {
      if (An(e)) return Ot(r);
      var i = [],
        o = [];
      return (
        Tn(e) ||
          ((a = e),
          (e = function (n, t) {
            return t === a;
          })),
        ht(r, function (n, t, r) {
          e.call(u, n, t, r) && i.push(t);
        }),
        Fn(r)
          ? pt(i, function (n, t) {
              o.push(r[n]), r.splice(n, 1);
            })
          : ((o = {}),
            On(i, function (n) {
              (o[n] = r[n]), g(r, n);
            })),
        o
      );
    }
    var a;
    return r;
  }
  function Nt(n, t) {
    return t <= n ? n : (n >>= 0) + Math.round(Math.random() * ((t || 9) - n));
  }
  var xt = c(function (n, t) {
      return t < n;
    }),
    Et = c(function (n, t) {
      return n < t;
    });
  var kt = f("round"),
    jt = f("ceil"),
    At = f("floor");
  function Wt(n, t) {
    var r = xr(kt(n, (t >>= 0))).split("."),
      e = r[0],
      u = r[1] || "",
      i = t - u.length;
    return t ? (0 < i ? e + "." + u + F("0", i) : e + A(u, Math.abs(i))) : e;
  }
  var Ft = s(parseFloat);
  function It(n) {
    var t = "" + n,
      r = t.match(/^([-+]?)((\d+)|((\d+)?[.](\d+)?))e([-+]{1})([0-9]+)$/);
    if (r) {
      var e = n < 0 ? "-" : "",
        u = r[3] || "",
        i = r[5] || "",
        o = r[6] || "",
        a = r[7],
        f = r[8],
        c = f - o.length,
        l = f - u.length,
        s = f - i.length;
      return "+" === a
        ? u
          ? e + u + F("0", f)
          : 0 < c
          ? e + i + o + F("0", c)
          : e + i + A(o, f)
        : u
        ? 0 < l
          ? e + "0." + F("0", Math.abs(l)) + u
          : e + A(u, l)
        : 0 < s
        ? e + "0." + F("0", Math.abs(s)) + i + o
        : e + A(i, s) + o;
    }
    return t;
  }
  var Tt = s(q);
  function _t(n, t) {
    return N(Ft(n), Ft(t));
  }
  function zt(n, t, r) {
    var e = 0;
    return (
      ht(
        n,
        t
          ? Tn(t)
            ? function () {
                e = E(e, t.apply(r, arguments));
              }
            : function (n) {
                e = E(e, gt(n, t));
              }
          : function (n) {
              e = E(e, n);
            }
      ),
      e
    );
  }
  var Rt =
    Date.now ||
    function () {
      return m(x());
    };
  function $t(n) {
    return Cn(n) && !isNaN(m(n));
  }
  function Ht(n) {
    return "(\\d{" + n + "})";
  }
  function Zt(n) {
    return isNaN(n) ? n : q(n);
  }
  for (
    var Ct = Ht(2),
      Yt = Ht("1,2"),
      Lt = Ht("1,7"),
      Pt = Ht("3,4"),
      Ut = ".{1}" + Yt,
      qt = "(([zZ])|([-+]\\d{2}:?\\d{2}))",
      Bt = [Pt, Ut, Ut, Ut, Ut, Ut, ".{1}" + Lt, qt],
      Jt = [],
      Kt = Bt.length - 1;
    0 <= Kt;
    Kt--
  ) {
    for (var Qt = "", Vt = 0; Vt < Kt + 1; Vt++) Qt += Bt[Vt];
    Jt.push(new RegExp("^" + Qt + "$"));
  }
  var Xt = [
      ["yyyy", Pt],
      ["yy", Ct],
      ["MM", Ct],
      ["M", Yt],
      ["dd", Ct],
      ["d", Yt],
      ["HH", Ct],
      ["H", Yt],
      ["mm", Ct],
      ["m", Yt],
      ["ss", Ct],
      ["s", Yt],
      ["SSS", Ht(3)],
      ["S", Lt],
      ["Z", qt],
    ],
    Gt = {},
    nr = ["\\[([^\\]]+)\\]"];
  for (Vt = 0; Vt < Xt.length; Vt++) {
    var tr = Xt[Vt];
    (Gt[tr[0]] = tr[1] + "?"), nr.push(tr[0]);
  }
  var rr = new RegExp(nr.join("|"), "g"),
    er = {};
  function ur(n, t) {
    if (n) {
      var r = Cn(n);
      if (r || (!t && /^[0-9]{11,15}$/.test(n)))
        return new Date(r ? m(n) : q(n));
      if (zn(n)) {
        var e = t
          ? (function (n, t) {
              var r = er[t];
              if (!r) {
                var e = [],
                  u = t
                    .replace(/([$(){}*+.?\\^|])/g, "\\$1")
                    .replace(rr, function (n, t) {
                      var r = n.charAt(0);
                      return "[" === r ? t : (e.push(r), Gt[n]);
                    });
                r = er[t] = { _i: e, _r: new RegExp(u) };
              }
              var i = {},
                o = n.match(r._r);
              if (o) {
                for (var a = r._i, f = 1, c = o.length; f < c; f++)
                  i[a[f - 1]] = o[f];
                return i;
              }
              return i;
            })(n, t)
          : (function (n) {
              for (var t, r = {}, e = 0, u = Jt.length; e < u; e++)
                if ((t = n.match(Jt[e]))) {
                  (r.y = t[1]),
                    (r.M = t[2]),
                    (r.d = t[3]),
                    (r.H = t[4]),
                    (r.m = t[5]),
                    (r.s = t[6]),
                    (r.S = t[7]),
                    (r.Z = t[8]);
                  break;
                }
              return r;
            })(n);
        if (e.y)
          return (
            e.M && (e.M = Zt(e.M) - 1),
            e.S &&
              (e.S =
                (u = Zt(e.S.substring(0, 3))) < 10
                  ? 100 * u
                  : u < 100
                  ? 10 * u
                  : u),
            e.Z
              ? (function (n) {
                  if (/^[zZ]/.test(n.Z)) return new Date(O(n));
                  var t = n.Z.match(/([-+])(\d{2}):?(\d{2})/);
                  return t
                    ? new Date(
                        O(n) -
                          ("-" === t[1] ? -1 : 1) * q(t[2]) * 36e5 +
                          6e4 * q(t[3])
                      )
                    : new Date("");
                })(e)
              : new Date(
                  e.y,
                  e.M || 0,
                  e.d || 1,
                  e.H || 0,
                  e.m || 0,
                  e.s || 0,
                  e.S || 0
                )
          );
      }
    }
    var u;
    return new Date("");
  }
  function ir(n, t, r, e) {
    var u = t[r];
    return u ? (Tn(u) ? u(e, r, n) : u[e]) : e;
  }
  var or =
    /\[([^\]]+)]|y{2,4}|M{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|Z{1,2}|W{1,2}|D{1,3}|[aAeEq]/g;
  function ar(e, n, r) {
    if (e) {
      if ($t((e = ur(e)))) {
        var t = n || D.parseDateFormat || D.formatString,
          u = e.getHours(),
          i = u < 12 ? "am" : "pm",
          o = V(
            {},
            D.parseDateRules || D.formatStringMatchs,
            r ? r.formats : null
          ),
          a = function (n, t) {
            return ("" + b(e)).substr(4 - t);
          },
          f = function (n, t) {
            return wr(M(e) + 1, t, "0");
          },
          c = function (n, t) {
            return wr(e.getDate(), t, "0");
          },
          l = function (n, t) {
            return wr(u, t, "0");
          },
          s = function (n, t) {
            return wr(u <= 12 ? u : u - 12, t, "0");
          },
          h = function (n, t) {
            return wr(e.getMinutes(), t, "0");
          },
          p = function (n, t) {
            return wr(e.getSeconds(), t, "0");
          },
          g = function (n, t) {
            return wr(e.getMilliseconds(), t, "0");
          },
          v = function (n, t) {
            var r = (e.getTimezoneOffset() / 60) * -1;
            return ir(
              e,
              o,
              n,
              (0 <= r ? "+" : "-") + wr(r, 2, "0") + (1 === t ? ":" : "") + "00"
            );
          },
          d = function (n, t) {
            return wr(
              ir(e, o, n, pr(e, (r ? r.firstDay : null) || D.firstDayOfWeek)),
              t,
              "0"
            );
          },
          m = function (n, t) {
            return wr(ir(e, o, n, hr(e)), t, "0");
          },
          y = {
            yyyy: a,
            yy: a,
            MM: f,
            M: f,
            dd: c,
            d: c,
            HH: l,
            H: l,
            hh: s,
            h: s,
            mm: h,
            m: h,
            ss: p,
            s: p,
            SSS: g,
            S: g,
            ZZ: v,
            Z: v,
            WW: d,
            W: d,
            DDD: m,
            D: m,
            a: function (n) {
              return ir(e, o, n, i);
            },
            A: function (n) {
              return ir(e, o, n, T(i));
            },
            e: function (n) {
              return ir(e, o, n, e.getDay());
            },
            E: function (n) {
              return ir(e, o, n, e.getDay());
            },
            q: function (n) {
              return ir(e, o, n, Math.floor((M(e) + 3) / 3));
            },
          };
        return t.replace(or, function (n, t) {
          return t || (y[n] ? y[n](n, n.length) : n);
        });
      }
      return "Invalid Date";
    }
    return "";
  }
  function fr(n, t, r) {
    var e;
    if (
      $t((n = ur(n))) &&
      (t && ((e = t && !isNaN(t) ? t : 0), n.setFullYear(b(n) + e)),
      r || !isNaN(r))
    ) {
      if (r === R) return new Date(b(n), 0, 1);
      if (r === z) return n.setMonth(11), cr(n, 0, z);
      n.setMonth(r);
    }
    return n;
  }
  function cr(n, t, r) {
    var e = t && !isNaN(t) ? t : 0;
    if ($t((n = ur(n)))) {
      if (r === R) return new Date(b(n), M(n) + e, 1);
      if (r === z) return new Date(m(cr(n, e + 1, R)) - 1);
      if ((Rn(r) && n.setDate(r), e)) {
        var u = n.getDate();
        if ((n.setMonth(M(n) + e), u !== n.getDate()))
          return n.setDate(1), new Date(m(n) - $);
      }
    }
    return n;
  }
  function lr(n, t, r, e) {
    if ($t((n = ur(n)))) {
      var u = Rn(r),
        i = Rn(e),
        o = m(n);
      if (u || i) {
        var a = i ? e : D.firstDayOfWeek,
          f = n.getDay(),
          c = u ? r : f;
        if (f !== c) {
          var l = 0;
          f < a ? (l = -(7 - a + f)) : a < f && (l = a - f),
            (o +=
              a < c
                ? ((0 === c ? 7 : c) - a + l) * $
                : c < a
                ? (7 - a + c + l) * $
                : l * $);
        }
      }
      return t && !isNaN(t) && (o += t * H), new Date(o);
    }
    return n;
  }
  function sr(n, t, r) {
    if ($t((n = ur(n))) && !isNaN(t)) {
      if ((n.setDate(n.getDate() + q(t)), r === R))
        return new Date(b(n), M(n), n.getDate());
      if (r === z) return new Date(m(sr(n, 1, R)) - 1);
    }
    return n;
  }
  function hr(n) {
    return $t((n = ur(n))) ? Math.floor((w(n) - w(fr(n, 0, R))) / $) + 1 : NaN;
  }
  var pr = n(function (n) {
      return new Date(n.getFullYear(), 0, 1);
    }),
    gr = n(function (n) {
      return new Date(n.getFullYear(), n.getMonth(), 1);
    });
  var vr = [
    ["yyyy", 31536e6],
    ["MM", 2592e6],
    ["dd", 864e5],
    ["HH", 36e5],
    ["mm", 6e4],
    ["ss", 1e3],
    ["S", 0],
  ];
  function dr(n) {
    return n && n.trim ? n.trim() : yr(mr(n));
  }
  function mr(n) {
    return n && n.trimLeft
      ? n.trimLeft()
      : xr(n).replace(/^[\s\uFEFF\xA0]+/g, "");
  }
  function yr(n) {
    return n && n.trimRight
      ? n.trimRight()
      : xr(n).replace(/[\s\uFEFF\xA0]+$/g, "");
  }
  var Dr = d(B),
    br = {};
  ht(B, function (n, t) {
    br[B[t]] = t;
  });
  var Mr = d(br),
    Sr = {};
  var Or = {};
  function wr(n, t, r) {
    var e = xr(n);
    return (
      (t >>= 0),
      (r = Wn(r) ? " " : "" + r),
      e.padStart
        ? e.padStart(t, r)
        : t > e.length
        ? ((t -= e.length) > r.length && (r += F(r, t / r.length)),
          r.slice(0, t) + e)
        : e
    );
  }
  function Nr(n, r, t) {
    return xr(n).replace(
      (t || D).tmplRE || /\{{2}([.\w[\]\s]+)\}{2}/g,
      function (n, t) {
        return gt(r, dr(t));
      }
    );
  }
  function xr(n) {
    return Rn(n) ? It(n) : "" + (An(n) ? "" : n);
  }
  function Er(t, r) {
    return function (n) {
      return Pn(n) ? r : n[t];
    };
  }
  function kr(n) {
    return Ar(n.split("?")[1] || "");
  }
  function jr(n) {
    var t,
      e,
      r,
      u,
      i = "" + n;
    return (
      0 === i.indexOf("//")
        ? (i = (Z ? Z.protocol : "") + i)
        : 0 === i.indexOf("/") && (i = S() + i),
      (r = i.replace(/#.*/, "").match(/(\?.*)/)),
      ((u = {
        href: i,
        hash: "",
        host: "",
        hostname: "",
        protocol: "",
        port: "",
        search: r && r[1] && 1 < r[1].length ? r[1] : "",
      }).path = i
        .replace(/^([a-z0-9.+-]*:)\/\//, function (n, t) {
          return (u.protocol = t), "";
        })
        .replace(/^([a-z0-9.+-]*)(:\d+)?\/?/, function (n, t, r) {
          return (
            (e = r || ""),
            (u.port = e.replace(":", "")),
            (u.hostname = t),
            (u.host = t + e),
            "/"
          );
        })
        .replace(/(#.*)/, function (n, t) {
          return (u.hash = 1 < t.length ? t : ""), "";
        })),
      (t = u.hash.match(/#((.*)\?|(.*))/)),
      (u.pathname = u.path.replace(/(\?|#.*).*/, "")),
      (u.origin = u.protocol + "//" + u.host),
      (u.hashKey = (t && (t[2] || t[1])) || ""),
      (u.hashQuery = kr(u.hash)),
      (u.searchQuery = kr(u.search)),
      u
    );
  }
  function Ar(n) {
    var t,
      r = {};
    return (
      n &&
        zn(n) &&
        On(n.split("&"), function (n) {
          (t = n.split("=")), (r[P(t[0])] = P(t[1] || ""));
        }),
      r
    );
  }
  function Wr(n) {
    try {
      return n.setItem("__xe_t", 1), n.removeItem("__xe_t"), !0;
    } catch (n) {
      return !1;
    }
  }
  function Fr(n) {
    return -1 < navigator.userAgent.indexOf(n);
  }
  function Ir(n, t) {
    var r = parseFloat(t),
      e = x(),
      u = m(e);
    switch (n) {
      case "y":
        return m(fr(e, r));
      case "M":
        return m(cr(e, r));
      case "d":
        return m(sr(e, r));
      case "h":
      case "H":
        return u + 60 * r * 60 * 1e3;
      case "m":
        return u + 60 * r * 1e3;
      case "s":
        return u + 1e3 * r;
    }
    return u;
  }
  function Tr(n) {
    return (Cn(n) ? n : new Date(n)).toUTCString();
  }
  function _r(n, t, r) {
    if (Y) {
      var e,
        u,
        i,
        o,
        a,
        f,
        c = [],
        l = arguments;
      return (
        Fn(n)
          ? (c = n)
          : 1 < l.length
          ? (c = [V({ name: n, value: t }, r)])
          : Hn(n) && (c = [n]),
        0 < c.length
          ? (On(c, function (n) {
              (e = V({}, D.cookies, n)),
                (i = []),
                e.name &&
                  ((u = e.expires),
                  i.push(
                    L(e.name) +
                      "=" +
                      L(Hn(e.value) ? JSON.stringify(e.value) : e.value)
                  ),
                  u &&
                    ((u = isNaN(u)
                      ? u.replace(
                          /^([0-9]+)(y|M|d|H|h|m|s)$/,
                          function (n, t, r) {
                            return Tr(Ir(r, t));
                          }
                        )
                      : /^[0-9]{11,13}$/.test(u) || Cn(u)
                      ? Tr(u)
                      : Tr(Ir("d", u))),
                    (e.expires = u)),
                  On(["expires", "path", "domain", "secure"], function (n) {
                    Wn(e[n]) ||
                      i.push(e[n] && "secure" === n ? n : n + "=" + e[n]);
                  })),
                (Y.cookie = i.join("; "));
            }),
            !0)
          : ((o = {}),
            (a = Y.cookie) &&
              On(a.split("; "), function (n) {
                (f = n.indexOf("=")),
                  (o[P(n.substring(0, f))] = P(n.substring(f + 1) || ""));
              }),
            1 === l.length ? o[n] : o)
      );
    }
    return !1;
  }
  function zr(n) {
    return _r(n);
  }
  function Rr(n, t, r) {
    return _r(n, t, r), _r;
  }
  function $r(n, t) {
    _r(n, "", V({ expires: -1 }, D.cookies, t));
  }
  function Hr() {
    return at(_r());
  }
  return (
    V(_r, {
      has: function (n) {
        return vn(Hr(), n);
      },
      set: Rr,
      setItem: Rr,
      get: zr,
      getItem: zr,
      remove: $r,
      removeItem: $r,
      keys: Hr,
      getJSON: function () {
        return _r();
      },
    }),
    V(r, {
      assign: V,
      objectEach: X,
      lastObjectEach: G,
      objectMap: function (r, e, u) {
        var i = {};
        if (r) {
          if (!e) return r;
          Tn(e) || (e = Er(e)),
            ht(r, function (n, t) {
              i[t] = e.call(u, n, t, r);
            });
        }
        return i;
      },
      merge: function (n) {
        n || (n = {});
        for (var t, r = arguments, e = r.length, u = 1; u < e; u++)
          (t = r[u]) && nn(n, t);
        return n;
      },
      uniq: tn,
      union: function () {
        for (var n = arguments, t = [], r = 0, e = n.length; r < e; r++)
          t = t.concat(bn(n[r]));
        return tn(t);
      },
      sortBy: rn,
      orderBy: fn,
      shuffle: cn,
      sample: function (n, t) {
        var r = cn(n);
        return arguments.length <= 1
          ? r[0]
          : (t < r.length && (r.length = t || 0), r);
      },
      some: ln,
      every: sn,
      slice: hn,
      filter: function (r, e, u) {
        var i = [];
        if (r && e) {
          if (r.filter) return r.filter(e, u);
          ht(r, function (n, t) {
            e.call(u, n, t, r) && i.push(n);
          });
        }
        return i;
      },
      find: pn,
      findLast: function (n, t, r) {
        if (n) {
          Fn(n) || (n = ft(n));
          for (var e = n.length - 1; 0 <= e; e--)
            if (t.call(r, n[e], e, n)) return n[e];
        }
      },
      findKey: gn,
      includes: vn,
      arrayIndexOf: dn,
      arrayLastIndexOf: mn,
      map: yn,
      reduce: function (n, t, r) {
        if (n) {
          var e,
            u,
            i = 0,
            o = r,
            a = 2 < arguments.length,
            f = at(n);
          if (n.length && n.reduce)
            return (
              (u = function () {
                return t.apply(null, arguments);
              }),
              a ? n.reduce(u, o) : n.reduce(u)
            );
          for (a && ((i = 1), (o = n[f[0]])), e = f.length; i < e; i++)
            o = t.call(null, o, n[f[i]], i, n);
          return o;
        }
      },
      copyWithin: function (n, t, r, e) {
        if (Fn(n) && n.copyWithin) return n.copyWithin(t, r, e);
        var u,
          i,
          o = t >> 0,
          a = r >> 0,
          f = n.length,
          c = 3 < arguments.length ? e >> 0 : f;
        if (
          o < f &&
          0 <= (o = 0 <= o ? o : f + o) &&
          (a = 0 <= a ? a : f + a) < (c = 0 <= c ? c : f + c)
        )
          for (u = 0, i = n.slice(a, c); o < f && !(i.length <= u); o++)
            n[o] = i[u++];
        return n;
      },
      chunk: function (n, t) {
        var r,
          e = [],
          u = t >> 0 || 1;
        if (Fn(n))
          if (0 <= u && n.length > u)
            for (r = 0; r < n.length; ) e.push(n.slice(r, r + u)), (r += u);
          else e = n.length ? [n] : n;
        return e;
      },
      zip: function () {
        return Dn(arguments);
      },
      unzip: Dn,
      zipObject: function (n, r) {
        var e = {};
        return (
          (r = r || []),
          ht(ft(n), function (n, t) {
            e[n] = r[t];
          }),
          e
        );
      },
      flatten: function (n, t) {
        return Fn(n)
          ? (function t(n, r) {
              var e = [];
              return (
                On(n, function (n) {
                  e = e.concat(Fn(n) ? (r ? t(n, r) : n) : [n]);
                }),
                e
              );
            })(n, t)
          : [];
      },
      toArray: bn,
      includeArrays: Mn,
      pluck: Sn,
      invoke: function (n, t) {
        for (
          var r, e = arguments, u = [], i = [], o = 2, a = e.length;
          o < a;
          o++
        )
          u.push(e[o]);
        if (Fn(t)) {
          for (a = t.length - 1, o = 0; o < a; o++) i.push(t[o]);
          t = t[a];
        }
        return yn(n, function (n) {
          if (
            (i.length &&
              (n = (function (n, t) {
                for (var r = 0, e = t.length; n && r < e; ) n = n[t[r++]];
                return e && n ? n : 0;
              })(n, i)),
            (r = n[t] || t) && r.apply)
          )
            return r.apply(n, u);
        });
      },
      arrayEach: On,
      lastArrayEach: wn,
      toArrayTree: function (n, t) {
        var r,
          e,
          u,
          i,
          o = V({}, D.treeOptions, t),
          a = o.strict,
          f = o.key,
          c = o.parentKey,
          l = o.children,
          s = o.mapChildren,
          h = o.sortKey,
          p = o.reverse,
          g = o.data,
          v = [],
          d = {},
          m = {};
        return (
          h && ((n = fn(St(n), h)), p && (n = n.reverse())),
          ht(n, function (n) {
            (r = n[f]), (m[r] = !0);
          }),
          ht(n, function (n) {
            (r = n[f]),
              g ? ((e = {})[g] = n) : (e = n),
              (u = n[c]),
              (d[r] = d[r] || []),
              (d[u] = d[u] || []),
              d[u].push(e),
              (e[f] = r),
              (e[c] = u),
              (e[l] = d[r]),
              s && (e[s] = d[r]),
              (!a || (a && An(u))) && (m[u] || v.push(e));
          }),
          a &&
            ((i = l),
            ht(n, function (n) {
              n[i] && !n[i].length && wt(n, i);
            })),
          v
        );
      },
      toTreeArray: function (n, t) {
        return (function r(e, n, u) {
          var i = u.children,
            o = u.data,
            a = u.clear;
          return (
            ht(n, function (n) {
              var t = n[i];
              o && (n = n[o]),
                e.push(n),
                t && t.length && r(e, t, u),
                a && delete n[i];
            }),
            e
          );
        })([], n, V({}, D.treeOptions, t));
      },
      findTree: Nn,
      eachTree: xn,
      mapTree: En,
      filterTree: function (n, o, t, a) {
        var f = [];
        return (
          n &&
            o &&
            xn(
              n,
              function (n, t, r, e, u, i) {
                o.call(a, n, t, r, e, u, i) && f.push(n);
              },
              t
            ),
          f
        );
      },
      searchTree: kn,
      hasOwnProp: jn,
      eqNull: An,
      isNaN: function (n) {
        return Rn(n) && isNaN(n);
      },
      isFinite: function (n) {
        return Rn(n) && isFinite(n);
      },
      isUndefined: Wn,
      isArray: Fn,
      isFloat: function (n) {
        return !(Pn(n) || isNaN(n) || Fn(n) || In(n));
      },
      isInteger: In,
      isFunction: Tn,
      isBoolean: _n,
      isString: zn,
      isNumber: Rn,
      isRegExp: $n,
      isObject: Hn,
      isPlainObject: Zn,
      isDate: Cn,
      isError: Yn,
      isTypeError: function (n) {
        return !!n && n.constructor === TypeError;
      },
      isEmpty: Ln,
      isNull: Pn,
      isSymbol: qn,
      isArguments: Bn,
      isElement: function (n) {
        return !!(n && zn(n.nodeName) && Rn(n.nodeType));
      },
      isDocument: function (n) {
        return !(!n || !Y || 9 !== n.nodeType);
      },
      isWindow: function (n) {
        return C && !(!n || n !== n.window);
      },
      isFormData: function (n) {
        return Jn && n instanceof FormData;
      },
      isMap: function (n) {
        return Kn && n instanceof Map;
      },
      isWeakMap: function (n) {
        return Qn && n instanceof WeakMap;
      },
      isSet: function (n) {
        return Vn && n instanceof Set;
      },
      isWeakSet: function (n) {
        return Xn && n instanceof WeakSet;
      },
      isLeapYear: Gn,
      isMatch: function (r, e) {
        var n = at(r),
          t = at(e);
        return (
          !t.length ||
          (Mn(n, t)
            ? ln(t, function (t) {
                return (
                  -1 <
                  it(n, function (n) {
                    return n === t && nt(r[n], e[t]);
                  })
                );
              })
            : nt(r, e))
        );
      },
      isEqual: nt,
      isEqualWith: function (n, t, o) {
        return Tn(o)
          ? v(
              n,
              t,
              function (n, t, r, e, u) {
                var i = o(n, t, r, e, u);
                return Wn(i) ? p(n, t) : !!i;
              },
              o
            )
          : v(n, t, p);
      },
      getType: function (n) {
        return Pn(n)
          ? "null"
          : qn(n)
          ? "symbol"
          : Cn(n)
          ? "date"
          : Fn(n)
          ? "array"
          : $n(n)
          ? "regexp"
          : Yn(n)
          ? "error"
          : typeof n;
      },
      uniqueId: function (n) {
        return [n, ++tt].join("");
      },
      getSize: rt,
      indexOf: et,
      lastIndexOf: ut,
      findIndexOf: it,
      findLastIndexOf: ot,
      toStringJSON: function (n) {
        if (Zn(n)) return n;
        if (zn(n))
          try {
            return JSON.parse(n);
          } catch (n) {}
        return {};
      },
      toJSONString: function (n) {
        return An(n) ? "" : JSON.stringify(n);
      },
      keys: at,
      values: ft,
      entries: ct,
      pick: lt,
      omit: st,
      first: function (n) {
        return ft(n)[0];
      },
      last: function (n) {
        var t = ft(n);
        return t[t.length - 1];
      },
      each: ht,
      forOf: function (n, t, r) {
        if (n)
          if (Fn(n))
            for (
              var e = 0, u = n.length;
              e < u && !1 !== t.call(r, n[e], e, n);
              e++
            );
          else
            for (var i in n)
              if (jn(n, i) && !1 === t.call(r, n[i], i, n)) break;
      },
      lastForOf: function (n, t, r) {
        var e, u;
        if (n)
          if (Fn(n))
            for (e = n.length - 1; 0 <= e && !1 !== t.call(r, n[e], e, n); e--);
          else
            for (
              e = (u = at(n)).length - 1;
              0 <= e && !1 !== t.call(r, n[u[e]], u[e], n);
              e--
            );
      },
      lastEach: pt,
      has: function (n, t) {
        if (n) {
          if (jn(n, t)) return !0;
          var r,
            e,
            u,
            i,
            o,
            a,
            f = y(t),
            c = 0,
            l = f.length;
          for (
            o = n;
            c < l &&
            ((a = !1),
            (i = (r = f[c]) ? r.match(J) : "")
              ? ((e = i[1]),
                (u = i[2]),
                e
                  ? o[e] && jn(o[e], u) && ((a = !0), (o = o[e][u]))
                  : jn(o, u) && ((a = !0), (o = o[u])))
              : jn(o, r) && ((a = !0), (o = o[r])),
            a);
            c++
          )
            if (c === l - 1) return !0;
        }
        return !1;
      },
      get: gt,
      set: function (n, t, r) {
        if (n)
          if ((!n[t] && !jn(n, t)) || mt(t)) {
            for (var e = n, u = y(t), i = u.length, o = 0; o < i; o++)
              if (!mt(u[o])) {
                var a = o === i - 1;
                e = dt(e, u[o], a, a ? null : u[o + 1], r);
              }
          } else n[t] = r;
        return n;
      },
      groupBy: yt,
      countBy: function (n, t, r) {
        var e = yt(n, t, r || this);
        return (
          X(e, function (n, t) {
            e[t] = n.length;
          }),
          e
        );
      },
      clone: St,
      clear: Ot,
      remove: wt,
      range: function (n, t, r) {
        var e,
          u,
          i = [],
          o = arguments;
        if (
          (o.length < 2 && ((t = o[0]), (n = 0)),
          (u = t >> 0),
          (e = n >> 0) < t)
        )
          for (r = r >> 0 || 1; e < u; e += r) i.push(e);
        return i;
      },
      destructuring: function (t, n) {
        if (t && n) {
          var r = V.apply(this, [{}].concat(hn(arguments, 1))),
            e = at(r);
          On(at(t), function (n) {
            vn(e, n) && (t[n] = r[n]);
          });
        }
        return t;
      },
      random: Nt,
      min: xt,
      max: Et,
      commafy: function (n, t) {
        var r,
          e,
          u,
          i,
          o,
          a = V({}, D.commafyOptions, t),
          f = a.digits;
        return (
          Rn(n)
            ? ((r = (a.ceil ? jt : a.floor ? At : kt)(n, f)),
              (i = (e = It(f ? Wt(r, f) : r).split("."))[0]),
              (o = e[1]),
              (u = i && r < 0) && (i = i.substring(1, i.length)))
            : (i = (e = (r = xr(n).replace(/,/g, "")) ? [r] : [])[0]),
          e.length
            ? (u ? "-" : "") +
              i.replace(
                new RegExp(
                  "(?=(?!(\\b))(.{" + (a.spaceNumber || 3) + "})+$)",
                  "g"
                ),
                a.separator || ","
              ) +
              (o ? "." + o : "")
            : r
        );
      },
      round: kt,
      ceil: jt,
      floor: At,
      toFixed: Wt,
      toNumber: Ft,
      toNumberString: It,
      toInteger: Tt,
      add: function (n, t) {
        return E(Ft(n), Ft(t));
      },
      subtract: function (n, t) {
        var r = Ft(n),
          e = Ft(t),
          u = It(r),
          i = It(e),
          o = k(u),
          a = k(i),
          f = Math.pow(10, Math.max(o, a));
        return parseFloat(Wt((r * f - e * f) / f, a <= o ? o : a));
      },
      multiply: _t,
      divide: function (n, t) {
        return j(Ft(n), Ft(t));
      },
      sum: zt,
      mean: function (n, t, r) {
        return j(zt(n, t, r), rt(n));
      },
      now: Rt,
      timestamp: function (n, t) {
        if (n) {
          var r = ur(n, t);
          return Cn(r) ? m(r) : r;
        }
        return Rt();
      },
      isValidDate: $t,
      isDateSame: function (n, t, r) {
        return (
          !(!n || !t) && "Invalid Date" !== (n = ar(n, r)) && n === ar(t, r)
        );
      },
      toStringDate: ur,
      toDateString: ar,
      getWhatYear: fr,
      getWhatQuarter: function (n, t, r) {
        var e,
          u,
          i = t && !isNaN(t) ? 3 * t : 0;
        return $t((n = ur(n)))
          ? ((e =
              3 *
              (((u = n.getMonth()) < 3 ? 1 : u < 6 ? 2 : u < 9 ? 3 : 4) - 1)),
            n.setMonth(e),
            cr(n, i, r))
          : n;
      },
      getWhatMonth: cr,
      getWhatWeek: lr,
      getWhatDay: sr,
      getYearDay: hr,
      getYearWeek: pr,
      getMonthWeek: gr,
      getDayOfYear: function (n, t) {
        return $t((n = ur(n))) ? (Gn(fr(n, t)) ? 366 : 365) : NaN;
      },
      getDayOfMonth: function (n, t) {
        return $t((n = ur(n)))
          ? Math.floor((m(cr(n, t, z)) - m(cr(n, t, R))) / $) + 1
          : NaN;
      },
      getDateDiff: function (n, t) {
        var r,
          e,
          u,
          i,
          o,
          a,
          f = { done: !1, time: 0 };
        if (
          ((n = ur(n)),
          (t = t ? ur(t) : x()),
          $t(n) && $t(t) && (r = m(n)) < (e = m(t)))
        )
          for (
            i = f.time = e - r, f.done = !0, a = 0, o = vr.length;
            a < o;
            a++
          )
            i >= (u = vr[a])[1]
              ? a === o - 1
                ? (f[u[0]] = i || 0)
                : ((f[u[0]] = Math.floor(i / u[1])), (i -= f[u[0]] * u[1]))
              : (f[u[0]] = 0);
        return f;
      },
      trim: dr,
      trimLeft: mr,
      trimRight: yr,
      escape: Dr,
      unescape: Mr,
      camelCase: function (n) {
        if (((n = xr(n)), Sr[n])) return Sr[n];
        var u = n.length,
          t = n.replace(/([-]+)/g, function (n, t, r) {
            return r && r + t.length < u ? "-" : "";
          });
        return (
          (u = t.length),
          (t = t
            .replace(/([A-Z]+)/g, function (n, t, r) {
              var e = t.length;
              return (
                (t = W(t)),
                r
                  ? 2 < e && r + e < u
                    ? T(I(t, 0, 1)) + I(t, 1, e - 1) + T(I(t, e - 1, e))
                    : T(I(t, 0, 1)) + I(t, 1, e)
                  : 1 < e && r + e < u
                  ? I(t, 0, e - 1) + T(I(t, e - 1, e))
                  : t
              );
            })
            .replace(/(-[a-zA-Z])/g, function (n, t) {
              return T(I(t, 1, t.length));
            })),
          (Sr[n] = t)
        );
      },
      kebabCase: function (n) {
        if (((n = xr(n)), Or[n])) return Or[n];
        if (/^[A-Z]+$/.test(n)) return W(n);
        var e = n
          .replace(/^([a-z])([A-Z]+)([a-z]+)$/, function (n, t, r, e) {
            var u = r.length;
            return 1 < u
              ? t + "-" + W(I(r, 0, u - 1)) + "-" + W(I(r, u - 1, u)) + e
              : W(t + "-" + r + e);
          })
          .replace(/^([A-Z]+)([a-z]+)?$/, function (n, t, r) {
            var e = t.length;
            return W(I(t, 0, e - 1) + "-" + I(t, e - 1, e) + (r || ""));
          })
          .replace(/([a-z]?)([A-Z]+)([a-z]?)/g, function (n, t, r, e, u) {
            var i = r.length;
            return 1 < i && (t && (t += "-"), e)
              ? (t || "") + W(I(r, 0, i - 1)) + "-" + W(I(r, i - 1, i)) + e
              : (t || "") + (u ? "-" : "") + W(r) + (e || "");
          });
        return (
          (e = e.replace(/([-]+)/g, function (n, t, r) {
            return r && r + t.length < e.length ? "-" : "";
          })),
          (Or[n] = e)
        );
      },
      repeat: function (n, t) {
        return F(xr(n), t);
      },
      padStart: wr,
      padEnd: function (n, t, r) {
        var e = xr(n);
        return (
          (t >>= 0),
          (r = Wn(r) ? " " : "" + r),
          e.padEnd
            ? e.padEnd(t, r)
            : t > e.length
            ? ((t -= e.length) > r.length && (r += F(r, t / r.length)),
              e + r.slice(0, t))
            : e
        );
      },
      startsWith: function (n, t, r) {
        var e = xr(n);
        return 0 === (1 === arguments.length ? e : e.substring(r)).indexOf(t);
      },
      endsWith: function (n, t, r) {
        var e = xr(n),
          u = arguments.length;
        return (
          1 < u &&
          (2 < u
            ? e.substring(0, r).indexOf(t) === r - 1
            : e.indexOf(t) === e.length - 1)
        );
      },
      template: Nr,
      toFormatString: function (n, t) {
        return Nr(n, t, { tmplRE: /\{([.\w[\]\s]+)\}/g });
      },
      toString: xr,
      toValueString: xr,
      noop: function () {},
      property: Er,
      bind: function (n, t) {
        var r = hn(arguments, 2);
        return function () {
          return n.apply(t, hn(arguments).concat(r));
        };
      },
      once: function (n, t) {
        var r = !1,
          e = null,
          u = hn(arguments, 2);
        return function () {
          return r || ((e = n.apply(t, hn(arguments).concat(u))), (r = !0)), e;
        };
      },
      after: function (t, r, e) {
        var u = 0,
          i = [];
        return function () {
          var n = arguments;
          ++u <= t && i.push(n[0]), t <= u && r.apply(e, [i].concat(hn(n)));
        };
      },
      before: function (t, r, e) {
        var u = 0,
          i = [];
        return (
          (e = e || this),
          function () {
            var n = arguments;
            ++u < t && (i.push(n[0]), r.apply(e, [i].concat(hn(n))));
          }
        );
      },
      throttle: function (n, t, r) {
        var e,
          u,
          i = r || {},
          o = !1,
          a = 0,
          f = !("leading" in i) || i.leading,
          c = "trailing" in i && i.trailing,
          l = function () {
            (o = !0), n.apply(u, e), (a = setTimeout(s, t));
          },
          s = function () {
            (a = 0), o || !0 !== c || l();
          },
          h = function () {
            (e = arguments),
              (u = this),
              (o = !1),
              0 === a && (!0 === f ? l() : !0 === c && (a = setTimeout(s, t)));
          };
        return (
          (h.cancel = function () {
            var n = 0 !== a;
            return clearTimeout(a), (u = e = null), (o = !1), (a = 0), n;
          }),
          h
        );
      },
      debounce: function (n, t, r) {
        var e,
          u,
          i = r || {},
          o = !1,
          a = 0,
          f = "boolean" == typeof r,
          c = "leading" in i ? i.leading : f,
          l = "trailing" in i ? i.trailing : !f,
          s = function () {
            (o = !0), (a = 0), n.apply(u, e);
          },
          h = function () {
            !0 === c && (a = 0), o || !0 !== l || s();
          },
          p = function () {
            (o = !1),
              (e = arguments),
              (u = this),
              0 === a ? !0 === c && s() : clearTimeout(a),
              (a = setTimeout(h, t));
          };
        return (
          (p.cancel = function () {
            var n = 0 !== a;
            return clearTimeout(a), (u = e = null), (a = 0), n;
          }),
          p
        );
      },
      delay: function (n, t) {
        var r = hn(arguments, 2),
          e = this;
        return setTimeout(function () {
          n.apply(e, r);
        }, t);
      },
      unserialize: Ar,
      serialize: function (n) {
        var r,
          e = [];
        return (
          ht(n, function (n, t) {
            Wn(n) ||
              ((r = Fn(n)),
              Zn(n) || r
                ? (e = e.concat(
                    (function r(n, e, u) {
                      var i,
                        o = [];
                      return (
                        ht(n, function (n, t) {
                          (i = Fn(n)),
                            Zn(n) || i
                              ? (o = o.concat(r(n, e + "[" + t + "]", i)))
                              : o.push(
                                  L(e + "[" + (u ? "" : t) + "]") +
                                    "=" +
                                    L(Pn(n) ? "" : n)
                                );
                        }),
                        o
                      );
                    })(n, t, r)
                  ))
                : e.push(L(t) + "=" + L(Pn(n) ? "" : n)));
          }),
          e.join("&").replace(/%20/g, "+")
        );
      },
      parseUrl: jr,
      getBaseURL: function () {
        if (Z) {
          var n = Z.pathname,
            t = ut(n, "/") + 1;
          return S() + (t === n.length ? n : n.substring(0, t));
        }
        return "";
      },
      locat: function () {
        return Z ? jr(Z.href) : {};
      },
      browse: function () {
        var t,
          n,
          r,
          e = !1,
          u = !1,
          i = !1,
          o = { isNode: !1, isMobile: e, isPC: !1, isDoc: !!Y };
        if (C || typeof process === _) {
          (r = Fr("Edge")),
            (n = Fr("Chrome")),
            (e =
              /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(
                navigator.userAgent
              )),
            o.isDoc &&
              ((t = Y.body || Y.documentElement),
              On(["webkit", "khtml", "moz", "ms", "o"], function (n) {
                o["-" + n] = !!t[n + "MatchesSelector"];
              }));
          try {
            u = Wr(C.localStorage);
          } catch (n) {}
          try {
            i = Wr(C.sessionStorage);
          } catch (n) {}
          V(o, {
            edge: r,
            firefox: Fr("Firefox"),
            msie: !r && o["-ms"],
            safari: !n && !r && Fr("Safari"),
            isMobile: e,
            isPC: !e,
            isLocalStorage: u,
            isSessionStorage: i,
          });
        } else o.isNode = !0;
        return o;
      },
      cookie: _r,
    }),
    r
  );
});
