var canvas, ctx;
var width, height;
var centerX, centerY;
var mouse = {x: 0, y: 0};
var near, mid;
var minSize, maxSize;
var imgWidth, imgHeight;
var imgTop;

function onResize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    width = parseInt(w);
    height = parseInt(h);
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = parseInt(width) >> 1;
    centerY = parseInt(height) >> 1;

    resizeLogo();
}

function onOrientationChange() {
    onResize();
}

function onLoad() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    canvas = $("#c");
    ctx = canvas.get(0).getContext("2d");
    width = parseInt(w);
    height = parseInt(h);
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = parseInt(width) >> 1;
    centerY = parseInt(height) >> 1;
    near = width * 0.022388;
    mid = width * 0.014925;
    minSize = width * 0.022388;
    maxSize = width * 0.059701;
    
    $("#menuResponsiveImage").click(function () {
        if ($("#hiddenMenuResponsive").is(":hidden")) {
            $("#hiddenMenuResponsive").slideDown("slow");
        } else {
            $("#hiddenMenuResponsive").slideUp("slow");
        }
    });
    
    //init();
    initLogo();
}

function initLogo() {
    imgWidth = parseInt($("#logo").width());
    imgHeight = parseInt($("#logo").height());

    var half = parseInt(imgHeight) >> 1;

    imgTop = (centerY - half) + "px";

    $("#logo").css("top", imgTop);
}

function resizeLogo() {
    initLogo();
}

var geometries = [];
var particles = [];
var NUM = 32;
var FOCAL_LENGTH = 250;
var TWO_PI = 2 * Math.PI;

function Random(minimum, maximum){
    if (!minimum) return Math.random();
    if (!maximum) return Math.round(Math.random() * minimum);
    
    return Math.random() * (maximum - minimum) + minimum;
}

function clr(color, alpha, random) {
    var h = parseInt(color, 16);
    var a = !alpha ? 1 : alpha < 0 ? 0 : alpha > 1 ? 1 : alpha.toFixed( 2);
    var c = color.slice( 1);
    
    if (random) h = Random(h);

    var r = h >> 16 & 0xff;
    var g = h >> 8 & 0xff;
    var b = h & 0xff;

    return [r, g, b, a];
}

function colorToString(color) {
    return "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + color[3] + ")";
}

var Cube = function () {}

Cube.prototype.ballDraw = function (b) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rotation);
    ctx.scale(b.scaleX, b.scaleY);
    ctx.fillStyle = b.color;
    ctx.globalAlpha = this.width > 30 ? 1 : this.width > 20 ? 0.5 : 0.2;
    ctx.arc(0, 0, b.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.arc(0, 0, b.r * 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

Cube.prototype.draw = function ( p) {
    var	angleX = (mouse.y - this.y) * 0.0001,
        angleY = (mouse.x - this.x) * 0.0001;
        
    var i, len = this.numBall;
        
    for (i = 0; i < len; i++) {
        this.move(p[i], angleX, angleY);
        this.ballDraw(p[i]);
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = this.width > 30 ? 1 : this.width > 20 ? 0.5 : 0.2;
    ctx.moveTo(p[0].x, p[0].y);
    ctx.lineTo(p[1].x, p[1].y);
    ctx.lineTo(p[2].x, p[2].y);
    ctx.lineTo(p[3].x, p[3].y);
    ctx.lineTo(p[0].x, p[0].y);
    ctx.lineTo(p[4].x, p[4].y);
    ctx.lineTo(p[5].x, p[5].y);
    ctx.lineTo(p[6].x, p[6].y);
    ctx.lineTo(p[7].x, p[7].y);
    ctx.lineTo(p[4].x, p[4].y);
    ctx.moveTo(p[1].x, p[1].y);
    ctx.lineTo(p[5].x, p[5].y);
    ctx.moveTo(p[2].x, p[2].y);
    ctx.lineTo(p[6].x, p[6].y);
    ctx.moveTo(p[3].x, p[3].y);
    ctx.lineTo(p[7].x, p[7].y);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.lineTo(p[1].x, p[1].y);
    ctx.lineTo(p[2].x, p[2].y);
    ctx.lineTo(p[3].x, p[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p[4].x, p[4].y);
    ctx.lineTo(p[5].x, p[5].y);
    ctx.lineTo(p[6].x, p[6].y);
    ctx.lineTo(p[7].x, p[7].y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.lineTo(p[1].x, p[1].y);
    ctx.lineTo(p[5].x, p[5].y);
    ctx.lineTo(p[4].x, p[4].y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p[1].x, p[1].y);
    ctx.lineTo(p[2].x, p[2].y);
    ctx.lineTo(p[6].x, p[6].y);
    ctx.lineTo(p[5].x, p[5].y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p[2].x, p[2].y);
    ctx.lineTo(p[3].x, p[3].y);
    ctx.lineTo(p[7].x, p[7].y);
    ctx.lineTo(p[6].x, p[6].y);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p[3].x, p[3].y);
    ctx.lineTo(p[0].x, p[0].y);
    ctx.lineTo(p[4].x, p[4].y);
    ctx.lineTo(p[7].x, p[7].y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

(function (global) {
    "use strict";
    
    var VERTICES = 3;
    
    global.Face3 = function (vertexA, vertexB, vertexC, lineWidth, lineColor, color, edgeToDelete) {
        this.vertices = [
            new Vertex(vertexA[0], vertexA[1], vertexA[2]),
            new Vertex(vertexB[0], vertexB[1], vertexB[2]),
            new Vertex(vertexC[0], vertexC[1], vertexC[2])
        ];
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.color = color;
        this.face = new Face(this.vertices[0], this.vertices[1], this.vertices[2], lineWidth, lineColor, color, edgeToDelete);
    };
    
    Face3.prototype = {
        set_focal_length: function (fl) {
            for (var i = VERTICES; i--;) this.vertices[i].focalLength = fl;
        },
        get_focal_length: function () {
            return [this.vertices[0].focalLength, this.vertices[1].focalLength, this.vertices[2].focalLength];
        },
        set_vanishing_point: function (vp_x, vp_y) {
            for (var i = VERTICES; i--;) this.vertices[i].set_vanishing_point(vp_x, vp_y);
        },
        set_center: function (x, y, z) {
            for (var i = VERTICES; i--;) this.vertices[i].set_center(x, y, z);
        },
        set_light: function (x, y, z, brightness) {
            this.face.light = new Lighting(x, y, z, brightness);
        },
        set_brightness: function (brightness) {
            this.face.light.set_brightness(brightness);
        },
        get_depth: function () {
            return Math.min(this.face.a.z, this.face.b.z, this.face.c.z);
        },
        backfaceCullingON: function () {
            this.face.culling = true;
        },
        backfaceCullingOFF: function () {
            this.face.culling = false;
        },
        rotate: function (angle_x, angle_y) {
            for (var i = VERTICES; i--;) {
                this.vertices[i].rotate_x(angle_x);
                this.vertices[i].rotate_y(angle_y);
            }
        },
        render: function (ctx) {
            this.face.render(ctx);
        }
    };
    
    global.Face4 = function (vertexA, vertexB, vertexC, vertexD, lineWidth, lineColor, color) {
        this.a = vertexA;
        this.b = vertexB;
        this.c = vertexC;
        this.d = vertexD;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.color = color;
        this.polygons = [
            new Face3(this.a, this.b, this.c, lineWidth, lineColor, color, [0, 2]),
            new Face3(this.d, this.a, this.c, lineWidth, lineColor, color, [1, 2])
        ];
    };
    
    Face4.prototype = {
        set_focal_length: function (fl) {
            for (var i = 2; i--;) this.polygons[i].set_focal_length(fl);
        },
        get_focal_length: function () {
            var former = this.polygons[0].get_focal_length(),
                latter = this.polygons[1].get_focal_length();
            return former.concat(latter);
        },
        set_vanishing_point: function (vp_x, vp_y) {
            for (var i = 2; i--;) this.polygons[i].set_vanishing_point(vp_x, vp_y);
        },
        set_center: function (x, y, z) {
            for (var i = 2; i--;) this.polygons[i].set_center(x, y, z);
        },
        set_light: function (x, y, z, brightness) {
            for (var i = 2; i--;) this.polygons[i].set_light(x, y, z, brightness);
        },
        set_brightness: function (brightness) {
            for (var i = 2; i--;) this.polygons[i].set_brightness(brightness);
        },
        get_depth: function () {
            return Math.min(this.polygons[0].face.a.z, this.polygons[0].face.b.z, this.polygons[0].face.c.z,
                            this.polygons[1].face.a.z, this.polygons[1].face.b.z, this.polygons[1].face.c.z);
        },
        backfaceCullingON: function () {
            for (var i = 2; i--;) this.polygons[i].backfaceCullingON();
        },
        backfaceCullingOFF: function () {
            for (var i = 2; i--;) this.polygons[i].backfaceCullingOFF();
        },
        rotate: function (angle_x, angle_y) {
            for (var i = 2; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            for (var i = 0, len = 2; i < len; i++) this.polygons[i].render(ctx);
        }
    };
    
    global.Face5 = function (vertexA, vertexB, vertexC, vertexD, vertexE, lineWidth, lineColor, color) {
        this.a = vertexA;
        this.b = vertexB;
        this.c = vertexC;
        this.d = vertexD;
        this.e = vertexE;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.color = color;
        this.polygons = [
            new Face3(this.a, this.b, this.d, lineWidth, lineColor, color, [0, 2]),
            new Face3(this.b, this.c, this.d, lineWidth, lineColor, color, [0, 2]),
            new Face3(this.d, this.e, this.a, lineWidth, lineColor, color, [0, 2])
        ];
    };
    
    Face5.prototype = {
        set_focal_length: function (fl) {
            for (var i = 3; i--;) this.polygons[i].set_focal_length(fl);
        },
        get_focal_length: function () {
            var former = this.polygons[0].get_focal_length(),
                middle = this.polygons[1].get_focal_length(),
                latter = this.polygons[2].get_focal_length(),
                first = former.concat(middle);
            return first.concat(latter);
        },
        set_vanishing_point: function (vp_x, vp_y) {
            for (var i = 3; i--;) this.polygons[i].set_vanishing_point(vp_x, vp_y);
        },
        set_center: function (x, y, z) {
            for (var i = 3; i--;) this.polygons[i].set_center(x, y, z);
        },
        set_light: function (x, y, z, brightness) {
            for (var i = 3; i--;) this.polygons[i].set_light(x, y, z, brightness);
        },
        set_brightness: function (brightness) {
            for (var i = 3; i--;) this.polygons[i].set_brightness(brightness);
        },
        get_depth: function () {
            return Math.min(this.polygons[0].face.a.z, this.polygons[0].face.b.z, this.polygons[0].face.c.z,
                            this.polygons[1].face.a.z, this.polygons[1].face.b.z, this.polygons[1].face.c.z,
                            this.polygons[2].face.a.z, this.polygons[2].face.b.z, this.polygons[2].face.c.z);
        },
        backfaceCullingON: function () {
            for (var i = 3; i--;) this.polygons[i].backfaceCullingON();
        },
        backfaceCullingOFF: function () {
            for (var i = 3; i--;) this.polygons[i].backfaceCullingOFF();
        },
        rotate: function (angle_x, angle_y) {
            for (var i = 3; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            for (var i = 0, len = 3; i < len; i++) this.polygons[i].render(ctx);
        }
    };
    
    var Vertex = function (x, y, z, color, width){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.radius = 1 > width * 0.001470588 ? 1 : width * 0.001470588;
        this.vp_x = 0;
        this.vp_y = 0;
        this.cx = 0;
        this.cy = 0;
        this.cz = 0;
        this.color = color;
        this.width = width;
    };

    Vertex.prototype = {
        render: function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.get_screen_x(), this.get_screen_y());
            ctx.fillStyle = colorToString(this.color);

            var alpha = this.width > 30 ? 1 : this.width > 20 ? 0.5 : 0.2;

            ctx.globalAlpha = alpha;
            ctx.arc(0, 0, this.radius, 0, TWO_PI);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = alpha / 2.0;
            ctx.arc(0, 0, this.radius * 2, 0, TWO_PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        set_vanishing_point: function (vp_x, vp_y) {
            this.vp_x = vp_x;
            this.vp_y = vp_y;
        },
        set_center: function (cx, cy, cz) {
            this.cx = cx;
            this.cy = cy;
            this.cz = cz;
        },
        rotate_x: function (angle_x) {
            var cos_x = Math.cos(angle_x),
                sin_x = Math.sin(angle_x),
                y1 = this.y * cos_x - this.z * sin_x,
                z1 = this.z * cos_x + this.y * sin_x;
            this.y = y1;
            this.z = z1;
        },
        rotate_y: function (angle_y) {
            var cos_y = Math.cos(angle_y),
                sin_y = Math.sin(angle_y),
                x1 = this.x * cos_y - this.z * sin_y,
                z1 = this.z * cos_y + this.x * sin_y;
            this.x = x1;
            this.z = z1;
        },
        rotate_z: function (angle_z) {
            var cos_z = Math.cos(angle_z),
                sin_z = Math.sin(angle_z),
                x1 = this.x * cos_z - this.y * sin_z,
                y1 = this.y * cos_z + this.x * sin_z;
            this.x = x1;
            this.y = y1;
        },
        get_screen_x: function () {
            var scale = this.focalLength / (this.focalLength + this.z + this.cz);
            return this.vp_x + (this.cx + this.x) * scale;
        },
        get_screen_y: function () {
            var scale = this.focalLength / (this.focalLength + this.z + this.cz);
            return this.vp_y + (this.cy + this.y) * scale;
        }
    };
    
    var Face = function (a, b, c, lineWidth, lineColor, color, edgeToDelete) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.lineColor = lineColor;
        this.color = color;
        this.lineWidth = lineWidth;
        this.culling = false;
        this.light = null;
        this.edgeToDelete = edgeToDelete;
    };

    Face.prototype = {
        render: function (ctx) {
            if (this.culling) if (this.is_backface()) return;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.shading();
            ctx.moveTo(this.a.get_screen_x(), this.a.get_screen_y());
            ctx.lineTo(this.b.get_screen_x(), this.b.get_screen_y());
            ctx.lineTo(this.c.get_screen_x(), this.c.get_screen_y());
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = colorToString(this.lineColor);

            if ((typeof this.edgeToDelete) === "undefined") {
                ctx.moveTo(this.a.get_screen_x(), this.a.get_screen_y());
                ctx.lineTo(this.b.get_screen_x(), this.b.get_screen_y());
                ctx.lineTo(this.c.get_screen_x(), this.c.get_screen_y());
                ctx.closePath();
            } else if (this.edgeToDelete[0] === 0 && this.edgeToDelete[1] === 1) {
                ctx.moveTo(this.a.get_screen_x(), this.a.get_screen_y());
                ctx.lineTo(this.c.get_screen_x(), this.c.get_screen_y());
                ctx.closePath();
                ctx.moveTo(this.b.get_screen_x(), this.b.get_screen_y());
                ctx.lineTo(this.c.get_screen_x(), this.c.get_screen_y());
                ctx.closePath();
            } else if (this.edgeToDelete[0] === 0 && this.edgeToDelete[1] === 2) {
                ctx.moveTo(this.a.get_screen_x(), this.a.get_screen_y());
                ctx.lineTo(this.b.get_screen_x(), this.b.get_screen_y());
                ctx.closePath();
                ctx.moveTo(this.b.get_screen_x(), this.b.get_screen_y());
                ctx.lineTo(this.c.get_screen_x(), this.c.get_screen_y());
                ctx.closePath();
            } else if (this.edgeToDelete[0] === 1 && this.edgeToDelete[1] === 2) {
                ctx.moveTo(this.a.get_screen_x(), this.a.get_screen_y());
                ctx.lineTo(this.b.get_screen_x(), this.b.get_screen_y());
                ctx.closePath();
                ctx.moveTo(this.a.get_screen_x(), this.a.get_screen_y());
                ctx.lineTo(this.c.get_screen_x(), this.c.get_screen_y());
                ctx.closePath();
            }

            ctx.stroke();
            ctx.restore();
        },
        is_backface: function () {
            var cax = this.c.get_screen_x() - this.a.get_screen_x(),
                cay = this.c.get_screen_y() - this.a.get_screen_y(),
                bcx = this.b.get_screen_x() - this.c.get_screen_x(),
                bcy = this.b.get_screen_y() - this.c.get_screen_y();
            return (cax * bcy > cay * bcx);
        },
        shading: function () {
            var ab = {
                x: this.a.x - this.b.x,
                y: this.a.y - this.b.y,
                z: this.a.z - this.b.z
            };
            var bc = {
                x: this.b.x - this.c.x,
                y: this.b.y - this.c.y,
                z: this.b.z - this.c.z
            };
            var norm = {
                x: ab.y * bc.z - ab.z * bc.y,
                y: -(ab.x * bc.z - ab.z * bc.x),
                z: ab.x * bc.y - ab.y * bc.x
            };
            var dot_prod = norm.x * this.light.x + norm.y * this.light.y + norm.z * this.light.z,
                norm_mag = Math.sqrt(norm.x * norm.x + norm.y * norm.y + norm.z * norm.z),
                light_mag = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z),
                light_factor = (Math.acos(dot_prod / (norm_mag * light_mag)) / Math.PI) * this.light.brightness,
                r = this.color[0], g = this.color[1], b = this.color[2];
            r *= light_factor;
            g *= light_factor;
            b *= light_factor;

            return "rgba(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + "," + this.color[3] + ")";
        }
    };
    
    var Lighting = function (x, y, z, brightness) {
        this.x = x || -100;
        this.y = y || -100;
        this.z = z || -100;
        this.brightness = brightness || 1;
    };
    Lighting.prototype = {
        set_brightness: function (b) {
            this.brightness = b;
        }
    };
    
}(window));

var PlatonicSolid = (function () {
    "use strict";
    
    var ps = {},
        TETRAHEDRON = 4,
        HEXAHEDRON = 6,
        OCTAHEDRON = 8,
        DODECAHEDRON = 12,
        ICOSAHEDRON = 20;
    
    ps.Tetrahedron = function (x, y, radius, lineWidth, color, center_coordinate, light_factor) {
        this.x = x || 0;
        this.y = y || 0;
        this.r = radius || 50;
        this.lw = lineWidth || 1;
        this.color = color || [200, 200, 200, 1];
        this.center = center_coordinate || [0, 0, 0];
        this.lf = light_factor || [-100, -100, -100, 1];
        this.polygons = new Array(4);
        this.depth = -(this.r * Math.sqrt(2));
        //
        // Volume of equilateral tetrahedron == Area of equilateral tetrahedron * the inner circle radius / 3
        //
        var r = this.r, disX = r * 13 * Math.sqrt(13) / 64, disYDOWN = r * 3 / 16,
            vertices = [
                [-disX, disYDOWN, -disX],
                [0, -r, 0],
                [disX, disYDOWN, -disX],
                [0, disYDOWN, disX]
           ];
        this.polygons[0] = new Face3(vertices[2], vertices[0], vertices[1], this.lw, this.color);
        this.polygons[1] = new Face3(vertices[0], vertices[3], vertices[1], this.lw, this.color);
        this.polygons[2] = new Face3(vertices[3], vertices[2], vertices[1], this.lw, this.color);
        this.polygons[3] = new Face3(vertices[2], vertices[3], vertices[0], this.lw, this.color);
        for (var i = TETRAHEDRON; i--;) {
            this.polygons[i].set_vanishing_point(this.x, this.y);
            this.polygons[i].set_center(this.center[0], this.center[1], this.center[2]);
            this.polygons[i].set_light(this.lf[0], this.lf[1], this.lf[2], this.lf[3]);
        }
    };
    ps.Tetrahedron.prototype = {
        get_depth: function () {
            return this.depth;
        },
        rotate: function (angle_x, angle_y) {
            for (var i = TETRAHEDRON; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            this.polygons.sort(function (a, b) {
                return (b.get_depth() - a.get_depth());
            });
            for (var i = 0, len = TETRAHEDRON; i < len; i++) this.polygons[i].render(ctx);
        }
    };

    ps.Hexahedron = function (x, y, radius, lineWidth, color, center_coordinate, light_factor) {
        this.x = x || 0;
        this.y = y || 0;
        this.r = radius || 50;
        this.lw = lineWidth || 1;
        this.color = color || [200, 200, 200, 1];
        this.center = center_coordinate || [0, 0, 0];
        this.lf = light_factor || [-100, -100, -100, 1];
        this.polygons = new Array(6);
        this.depth = -this.r;
        var disX = this.r * Math.sqrt(2) / Math.sqrt(3), disY = this.r * 2 / (2 * Math.sqrt(3)), 
            vertices = [
                [-disX, disY, 0], [-disX, -disY, 0],
                [0, -disY, -disX], [0, disY, -disX],
                [disX, disY, 0], [disX, -disY, 0],
                [0, -disY, disX], [0, disY, disX]
           ];
        this.polygons[0] = new Face4(vertices[0], vertices[1], vertices[2], vertices[3], this.lw, this.color);
        this.polygons[1] = new Face4(vertices[4], vertices[3], vertices[2], vertices[5], this.lw, this.color);
        this.polygons[2] = new Face4(vertices[4], vertices[5], vertices[6], vertices[7], this.lw, this.color);
        this.polygons[3] = new Face4(vertices[7], vertices[6], vertices[1], vertices[0], this.lw, this.color);
        this.polygons[4] = new Face4(vertices[2], vertices[1], vertices[6], vertices[5], this.lw, this.color);
        this.polygons[5] = new Face4(vertices[7], vertices[0], vertices[3], vertices[4], this.lw, this.color);
        for (var i = HEXAHEDRON; i--;) {
            this.polygons[i].set_vanishing_point(this.x, this.y);
            this.polygons[i].set_center(this.center[0], this.center[1], this.center[2]);
            this.polygons[i].set_light(this.lf[0], this.lf[1], this.lf[2], this.lf[3]);
        }
    };
    ps.Hexahedron.prototype = {
        get_depth: function () {
            return this.depth;
        },
        rotate: function (angle_x, angle_y) {
            for (var i = HEXAHEDRON; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            this.polygons.sort(function (a, b) {
                return (b.get_depth() - a.get_depth());
            });
            for (var i = 0, len = HEXAHEDRON; i < len; i++) this.polygons[i].render(ctx);
        }
    };
    
    ps.Octahedron = function (x, y, radius, lineWidth, color, center_coordinate, light_factor) {
        this.x = x || 0;
        this.y = y || 0;
        this.r = radius || 50;
        this.lw = lineWidth || 1;
        this.color = color || [200, 200, 200, 1];
        this.center = center_coordinate || [0, 0, 0];
        this.lf = light_factor || [-100, -100, -100, 1];
        this.polygons = new Array(8);
        this.depth = -this.r;
        var r = this.r,
            vertices = [
                [-r, 0, 0], [r, 0, 0],
                [0, -r, 0], [0, r, 0],
                [0, 0, -r], [0, 0, r]
           ];
        this.polygons[0] = new Face3(vertices[2], vertices[0], vertices[5], this.lw, this.color);
        this.polygons[1] = new Face3(vertices[2], vertices[5], vertices[1], this.lw, this.color);
        this.polygons[2] = new Face3(vertices[5], vertices[0], vertices[3], this.lw, this.color);
        this.polygons[3] = new Face3(vertices[5], vertices[3], vertices[1], this.lw, this.color);
        this.polygons[4] = new Face3(vertices[2], vertices[4], vertices[0], this.lw, this.color);
        this.polygons[5] = new Face3(vertices[2], vertices[1], vertices[4], this.lw, this.color);
        this.polygons[6] = new Face3(vertices[0], vertices[4], vertices[3], this.lw, this.color);
        this.polygons[7] = new Face3(vertices[1], vertices[3], vertices[4], this.lw, this.color);
        for (var i = OCTAHEDRON; i--;) {
            this.polygons[i].set_vanishing_point(this.x, this.y);
            this.polygons[i].set_center(this.center[0], this.center[1], this.center[2]);
            this.polygons[i].set_light(this.lf[0], this.lf[1], this.lf[2], this.lf[3]);
        }
    };
    ps.Octahedron.prototype = {
        get_depth: function () {
            return this.depth;
        },
        rotate: function (angle_x, angle_y) {
            for (var i = OCTAHEDRON; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            this.polygons.sort(function (a, b) {
                return (b.get_depth() - a.get_depth());
            });
            for (var i = 0, len = OCTAHEDRON; i < len; i++) this.polygons[i].render(ctx);
        }
    };
    
    ps.Dodecahedron = function (x, y, radius, lineWidth, color, center_coordinate, light_factor) {
        this.x = x || 0;
        this.y = y || 0;
        this.r = radius || 50;
        this.lw = lineWidth || 1;
        this.color = color || [200, 200, 200, 1];
        this.center = center_coordinate || [0, 0, 0];
        this.lf = light_factor || [-100, -100, -100, 1];
        this.polygons = new Array(12);
        this.depth = -this.r;
        var r = this.r / Math.sqrt(3), phi = (1 + Math.sqrt(5)) / 2, GR = r * phi, rGR = r * (1 / phi),
            vertices = [
                [-r, r, r], [r, r, r],
                [-r, -r, r], [r, -r, r],
                [-r, r, -r], [r, r, -r],
                [-r, -r, -r], [r, -r, -r],
                [0, rGR, GR], [0, -rGR, GR],
                [0, rGR, -GR], [0, -rGR, -GR],
                [rGR, GR, 0], [-rGR, GR, 0],
                [rGR, -GR, 0], [-rGR, -GR, 0],
                [GR, 0, rGR], [-GR, 0, rGR],
                [GR, 0, -rGR], [-GR, 0, -rGR]
           ];
        this.polygons[0] =  new Face5(vertices[10], vertices[4],  vertices[19], vertices[6],  vertices[11], this.lw, this.color);
        this.polygons[1] =  new Face5(vertices[19], vertices[17], vertices[2],  vertices[15], vertices[6],  this.lw, this.color);
        this.polygons[2] =  new Face5(vertices[4],  vertices[13], vertices[0],  vertices[17], vertices[19], this.lw, this.color);
        this.polygons[3] =  new Face5(vertices[0],  vertices[8],  vertices[9],  vertices[2],  vertices[17], this.lw, this.color);
        this.polygons[4] =  new Face5(vertices[8],  vertices[1],  vertices[16], vertices[3],  vertices[9],  this.lw, this.color);
        this.polygons[5] =  new Face5(vertices[16], vertices[18], vertices[7],  vertices[14], vertices[3],  this.lw, this.color);
        this.polygons[6] =  new Face5(vertices[1],  vertices[12], vertices[5],  vertices[18], vertices[16], this.lw, this.color);
        this.polygons[7] =  new Face5(vertices[5],  vertices[10], vertices[11], vertices[7],  vertices[18], this.lw, this.color);
        this.polygons[8] =  new Face5(vertices[7],  vertices[11], vertices[6],  vertices[15], vertices[14], this.lw, this.color);
        this.polygons[9] =  new Face5(vertices[2],  vertices[9],  vertices[3],  vertices[14], vertices[15], this.lw, this.color);
        this.polygons[10] = new Face5(vertices[12], vertices[13], vertices[4],  vertices[10], vertices[5],  this.lw, this.color);
        this.polygons[11] = new Face5(vertices[13], vertices[12], vertices[1],  vertices[8],  vertices[0],  this.lw, this.color);
        for (var i = DODECAHEDRON; i--;) {
            this.polygons[i].set_vanishing_point(this.x, this.y);
            this.polygons[i].set_center(this.center[0], this.center[1], this.center[2]);
            this.polygons[i].set_light(this.lf[0], this.lf[1], this.lf[2], this.lf[3]);
            this.polygons[i].backfaceCullingOFF();
        }
    };
    ps.Dodecahedron.prototype = {
        get_depth: function () {
            return this.depth;
        },
        rotate: function (angle_x, angle_y) {
            for (var i = DODECAHEDRON; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            this.polygons.sort(function (a, b) {
                return (b.get_depth() - a.get_depth());
            });
            for (var i = 0, len = DODECAHEDRON; i < len; i++) this.polygons[i].render(ctx);
        }
    };
    
    ps.Icosahedron = function (x, y, radius, lineWidth, color, center_coordinate, light_factor) {
        this.x = x || 0;
        this.y = y || 0;
        this.r = radius || 50;
        this.lw = lineWidth || 1;
        this.color = color || [200, 200, 200, 1];
        this.center = center_coordinate || [0, 0, 0];
        this.lf = light_factor || [-100, -100, -100, 1];
        this.polygons = new Array(8);
        this.depth = -this.r;
        var r = (2 * this.r - 7) / Math.sqrt(5), GR = (r + Math.sqrt(5)) / 2,
            vertices = [
                [0, r, GR], [0, r, -GR],
                [0, -r, GR], [0, -r, -GR],
                [r, GR, 0], [r, -GR, 0],
                [-r, GR, 0], [-r, -GR, 0],
                [GR, 0, r], [-GR, 0, r],
                [GR, 0, -r], [-GR, 0, -r]
           ];
        this.polygons[0] =  new Face3(vertices[10], vertices[11], vertices[3],  this.lw, this.color);
        this.polygons[1] =  new Face3(vertices[3],  vertices[11], vertices[7],  this.lw, this.color);
        this.polygons[2] =  new Face3(vertices[3],  vertices[7],  vertices[2],  this.lw, this.color);
        this.polygons[3] =  new Face3(vertices[2],  vertices[7],  vertices[9],  this.lw, this.color);
        this.polygons[4] =  new Face3(vertices[2],  vertices[9],  vertices[8],  this.lw, this.color);
        this.polygons[5] =  new Face3(vertices[5],  vertices[2],  vertices[8],  this.lw, this.color);
        this.polygons[6] =  new Face3(vertices[3],  vertices[2],  vertices[5],  this.lw, this.color);
        this.polygons[7] =  new Face3(vertices[10], vertices[3],  vertices[5],  this.lw, this.color);
        this.polygons[8] =  new Face3(vertices[1],  vertices[11], vertices[10], this.lw, this.color);
        this.polygons[9] =  new Face3(vertices[6],  vertices[11], vertices[1],  this.lw, this.color);
        this.polygons[10] = new Face3(vertices[0],  vertices[6],  vertices[1],  this.lw, this.color);
        this.polygons[11] = new Face3(vertices[9],  vertices[6],  vertices[0],  this.lw, this.color);
        this.polygons[12] = new Face3(vertices[8],  vertices[9],  vertices[0],  this.lw, this.color);
        this.polygons[13] = new Face3(vertices[8],  vertices[0],  vertices[4],  this.lw, this.color);
        this.polygons[14] = new Face3(vertices[4],  vertices[0],  vertices[1],  this.lw, this.color);
        this.polygons[15] = new Face3(vertices[4],  vertices[1],  vertices[10], this.lw, this.color); 
        this.polygons[16] = new Face3(vertices[10], vertices[5],  vertices[4],  this.lw, this.color);
        this.polygons[17] = new Face3(vertices[5],  vertices[8],  vertices[4],  this.lw, this.color);
        this.polygons[18] = new Face3(vertices[6],  vertices[7],  vertices[11], this.lw, this.color);
        this.polygons[19] = new Face3(vertices[6],  vertices[9],  vertices[7],  this.lw, this.color);
        for (var i = ICOSAHEDRON; i--;) {
            this.polygons[i].set_vanishing_point(this.x, this.y);
            this.polygons[i].set_center(this.center[0], this.center[1], this.center[2]);
            this.polygons[i].set_light(this.lf[0], this.lf[1], this.lf[2], this.lf[3]);
        }
    };
    ps.Icosahedron.prototype = {
        get_depth: function () {
            return this.depth;
        },
        rotate: function (angle_x, angle_y) {
            for (var i = ICOSAHEDRON; i--;) this.polygons[i].rotate(angle_x, angle_y);
        },
        render: function (ctx) {
            this.polygons.sort(function (a, b) {
                return (b.get_depth() - a.get_depth());
            });
            for (var i = 0, len = ICOSAHEDRON; i < len; i++) this.polygons[i].render(ctx);
        }
    };
    
    return ps;
    
}());

function draw() {
    ctx.clearRect(0, 0, width, height);

///////
    var angle_x = 0.02,
        angle_y = 0.04;
    
    tetrahedron.rotate(angle_x, angle_y);
    hexahedron.rotate(angle_x, angle_y);
    octahedron.rotate(angle_x, angle_y);
    dodecahedron.rotate(angle_x, angle_y);
    icosahedron.rotate(angle_x, angle_y);
    
    tetrahedron.render(ctx);
    hexahedron.render(ctx);
    octahedron.render(ctx);
    dodecahedron.render(ctx);
    icosahedron.render(ctx);
///////
    
    var i, len = num_c;
    var distX = centerX - mouse.x;
    var distY = centerY - mouse.y;
    
    for(i = 0; i < len; i++) {
        cubes[i].draw(particles[i]);
        
        if(cubes[i].width > near) {
            cubes[i].x = cubes[i].vpX + distX * 0.17;
            cubes[i].y = cubes[i].vpY + distY * 0.17;
        } else if (cubes[i].width > mid) {
            cubes[i].x = cubes[i].vpX + distX * 0.1;
            cubes[i].y = cubes[i].vpY + distY * 0.1;
        } else {
            cubes[i].x = cubes[i].vpX + distX * 0.05;
            cubes[i].y = cubes[i].vpY + distY * 0.05;
        }
    }
}

function init() {
    window.onmousemove = function (e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }

///////
    tetrahedron = new PlatonicSolid.Tetrahedron(w / 4, centerY, 50);
    hexahedron = new PlatonicSolid.Hexahedron(centerX, centerY, 50);
    octahedron = new PlatonicSolid.Octahedron(3 * w / 4, centerY, 50);
    dodecahedron = new PlatonicSolid.Dodecahedron(centerX, h / 4 - 50, 50);
    icosahedron = new PlatonicSolid.Icosahedron(centerX, h * 3 / 4 + 50, 50);
///////

    var quarter = num_c / 4;
    var i;

    for (i = 0; i < num_c; i++) {
        var c = new Cube(
            Random(minSize, maxSize),
            (i < quarter ? Random(centerX >> 1) : i < 2 * quarter ? Random(centerX >> 1, centerX) : i < 3 * quarter ? Random(centerX, centerX * 1.5) : Random(centerX * 1.5, width)),
            Random(height),
            clr("ffffff", 1, true)
      );
        
        cubes.push(c);
        particles.push(new Array(8));
    }

    for(i = 0; i < num_c; i++) {
        particles[i][0] = cubes[i].ball( cubes[i].width,  cubes[i].width,  cubes[i].width, cubes[i].color);
        particles[i][1] = cubes[i].ball( cubes[i].width,  cubes[i].width, -cubes[i].width, cubes[i].color);
        particles[i][2] = cubes[i].ball(-cubes[i].width,  cubes[i].width, -cubes[i].width, cubes[i].color);
        particles[i][3] = cubes[i].ball(-cubes[i].width,  cubes[i].width,  cubes[i].width, cubes[i].color);
        particles[i][4] = cubes[i].ball( cubes[i].width, -cubes[i].width,  cubes[i].width, cubes[i].color);
        particles[i][5] = cubes[i].ball( cubes[i].width, -cubes[i].width, -cubes[i].width, cubes[i].color);
        particles[i][6] = cubes[i].ball(-cubes[i].width, -cubes[i].width, -cubes[i].width, cubes[i].color);
        particles[i][7] = cubes[i].ball(-cubes[i].width, -cubes[i].width,  cubes[i].width, cubes[i].color);
    }

    setInterval(function () {
        draw();
    }, 1000 / 60);
}



window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);
window.addEventListener("load", onLoad, false);