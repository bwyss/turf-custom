(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.turf = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            var destination = require("@turf/destination"),
                helpers = require("@turf/helpers"),
                polygon = helpers.polygon;
            module.exports = function(e, r, o, n) {
                o = o || 64;
                for (var t = [], i = 0; i < o; i++) t.push(destination(e, r, 360 * i / o, n).geometry.coordinates);
                return t.push(t[0]), polygon([t])
            };
        }, {
            "@turf/destination": 2,
            "@turf/helpers": 3
        }],
        2: [function(require, module, exports) {
            var getCoord = require("@turf/invariant").getCoord,
                helpers = require("@turf/helpers"),
                point = helpers.point,
                distanceToRadians = helpers.distanceToRadians;
            module.exports = function(a, t, s, n) {
                var e = Math.PI / 180,
                    i = 180 / Math.PI,
                    o = getCoord(a),
                    h = e * o[0],
                    r = e * o[1],
                    M = e * s,
                    d = distanceToRadians(t, n),
                    c = Math.asin(Math.sin(r) * Math.cos(d) + Math.cos(r) * Math.sin(d) * Math.cos(M)),
                    p = h + Math.atan2(Math.sin(M) * Math.sin(d) * Math.cos(r), Math.cos(d) - Math.sin(r) * Math.sin(c));
                return point([i * p, i * c])
            };

        }, {
            "@turf/helpers": 3,
            "@turf/invariant": 4
        }],
        3: [function(require, module, exports) {
            function feature(e, r) {
                return {
                    type: "Feature",
                    properties: r || {},
                    geometry: e
                }
            }
            module.exports.feature = feature, module.exports.point = function(e, r) {
                if (!Array.isArray(e)) throw new Error("Coordinates must be an array");
                if (e.length < 2) throw new Error("Coordinates must be at least 2 numbers long");
                return feature({
                    type: "Point",
                    coordinates: e.slice()
                }, r)
            }, module.exports.polygon = function(e, r) {
                if (!e) throw new Error("No coordinates passed");
                for (var o = 0; o < e.length; o++) {
                    var t = e[o];
                    if (t.length < 4) throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
                    for (var n = 0; n < t[t.length - 1].length; n++)
                        if (t[t.length - 1][n] !== t[0][n]) throw new Error("First and last Position are not equivalent.")
                }
                return feature({
                    type: "Polygon",
                    coordinates: e
                }, r)
            }, module.exports.lineString = function(e, r) {
                if (!e) throw new Error("No coordinates passed");
                return feature({
                    type: "LineString",
                    coordinates: e
                }, r)
            }, module.exports.featureCollection = function(e) {
                return {
                    type: "FeatureCollection",
                    features: e
                }
            }, module.exports.multiLineString = function(e, r) {
                if (!e) throw new Error("No coordinates passed");
                return feature({
                    type: "MultiLineString",
                    coordinates: e
                }, r)
            }, module.exports.multiPoint = function(e, r) {
                if (!e) throw new Error("No coordinates passed");
                return feature({
                    type: "MultiPoint",
                    coordinates: e
                }, r)
            }, module.exports.multiPolygon = function(e, r) {
                if (!e) throw new Error("No coordinates passed");
                return feature({
                    type: "MultiPolygon",
                    coordinates: e
                }, r)
            }, module.exports.geometryCollection = function(e, r) {
                return feature({
                    type: "GeometryCollection",
                    geometries: e
                }, r)
            };
            var factors = {
                miles: 3960,
                nauticalmiles: 3441.145,
                degrees: 57.2957795,
                radians: 1,
                inches: 250905600,
                yards: 6969600,
                meters: 6373e3,
                metres: 6373e3,
                kilometers: 6373,
                kilometres: 6373
            };
            module.exports.radiansToDistance = function(e, r) {
                var o = factors[r || "kilometers"];
                if (void 0 === o) throw new Error("Invalid unit");
                return e * o
            }, module.exports.distanceToRadians = function(e, r) {
                var o = factors[r || "kilometers"];
                if (void 0 === o) throw new Error("Invalid unit");
                return e / o
            }, module.exports.distanceToDegrees = function(e, r) {
                var o = factors[r || "kilometers"];
                if (void 0 === o) throw new Error("Invalid unit");
                return e / o * 57.2958
            };
        }, {}],
        4: [function(require, module, exports) {
            function getCoord(e) {
                if (Array.isArray(e) && "number" == typeof e[0] && "number" == typeof e[1]) return e;
                if (e) {
                    if ("Feature" === e.type && e.geometry && "Point" === e.geometry.type && Array.isArray(e.geometry.coordinates)) return e.geometry.coordinates;
                    if ("Point" === e.type && Array.isArray(e.coordinates)) return e.coordinates
                }
                throw new Error("A coordinate, feature, or point geometry is required")
            }

            function geojsonType(e, r, t) {
                if (!r || !t) throw new Error("type and name required");
                if (!e || e.type !== r) throw new Error("Invalid input to " + t + ": must be a " + r + ", given " + e.type)
            }

            function featureOf(e, r, t) {
                if (!t) throw new Error(".featureOf() requires a name");
                if (!e || "Feature" !== e.type || !e.geometry) throw new Error("Invalid input to " + t + ", Feature with geometry required");
                if (!e.geometry || e.geometry.type !== r) throw new Error("Invalid input to " + t + ": must be a " + r + ", given " + e.geometry.type)
            }

            function collectionOf(e, r, t) {
                if (!t) throw new Error(".collectionOf() requires a name");
                if (!e || "FeatureCollection" !== e.type) throw new Error("Invalid input to " + t + ", FeatureCollection required");
                for (var o = 0; o < e.features.length; o++) {
                    var n = e.features[o];
                    if (!n || "Feature" !== n.type || !n.geometry) throw new Error("Invalid input to " + t + ", Feature with geometry required");
                    if (!n.geometry || n.geometry.type !== r) throw new Error("Invalid input to " + t + ": must be a " + r + ", given " + n.geometry.type)
                }
            }
            module.exports.geojsonType = geojsonType, module.exports.collectionOf = collectionOf, module.exports.featureOf = featureOf, module.exports.getCoord = getCoord;
        }, {}],
        5: [function(require, module, exports) {
            module.exports = {
                circle: require("@turf/circle")
            };
        }, {
            "@turf/circle": 1
        }]
    }, {}, [5])(5)
});