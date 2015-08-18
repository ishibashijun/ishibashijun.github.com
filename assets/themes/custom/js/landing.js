var canvas, ctx;
var width, height;
var centerX, centerY;
var mouse = {x: 0, y: 0};
var near, mid;
var minSize, maxSize;

function onResize() {
    width = canvas.width();
    height = canvas.height();
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = width >> 1;
    centerY = height >> 1;
}

function onOrientationChange() {
    width = canvas.width();
    height = canvas.height();
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = width >> 1;
    centerY = height >> 1;
}

function onLoad() {
    canvas = $("#c");
    ctx = canvas.get(0).getContext("2d");
    width = canvas.width();
    height = canvas.height();
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = width >> 1;
    centerY = height >> 1;
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
    
    $(".link").hover(
        function () {
            var leftBracket = $(this).text().replace("{", "[");
            
            $(this).html(leftBracket);
            
            var rightBracket = $(this).text().replace("}", "]");
            
            $(this).html(rightBracket);
        },
        function () {
            var leftBracket = $(this).text().replace("[", "{");
            
            $(this).html(leftBracket);
            
            var rightBracket = $(this).text().replace("]", "}");
            
            $(this).html(rightBracket);
        }
    );
    
    init();
}

var cubes = [],
    particles = [],
    num_c = 32,
    fl = 250;

function Random(minimum, maximum){
    if (!minimum) return Math.random();
    if (!maximum) return Math.round(Math.random() * minimum);
    
    return Math.random() * (maximum - minimum) + minimum;
}

function clr(color, alpha, random) {
    var h = parseInt(color, 16);
    var a = !alpha ? 1 : alpha < 0 ? 0 : alpha > 1 ? 1 : alpha.toFixed( 2 );
    var c = color.slice( 1 );
    
    if (random) h = Random(h);

    var r = h >> 16 & 0xff;
    var g = h >> 8 & 0xff;
    var b = h & 0xff;

    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function Cube(width, x, y, color) {
    this.width = width >> 1;
    this.x = x;
    this.y = y;
    this.vpX = x;
    this.vpY = y;
    this.color = color;
    this.numBall = 8;
}

Cube.prototype.ball = function ( posX, posY, posZ, color ) {
    var self = {
        x: 0,
        y: 0,
        r: 1 > width * 0.001470588 ? 1 : width * 0.001470588,
        color: color,
        posX: posX,
        posY: posY,
        posZ: posZ,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
    };
    
    return self;
};

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

Cube.prototype.rotateX = function (b, angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        y1 = b.posY * cos - b.posZ * sin,
        z1 = b.posZ * cos + b.posY * sin;
        
    b.posY = y1;
    b.posZ = z1;
};

Cube.prototype.rotateY = function (b, angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        x1 = b.posX * cos - b.posZ * sin,
        z1 = b.posZ * cos + b.posX * sin;
        
    b.posX = x1;
    b.posZ = z1;
};

Cube.prototype.setPerspective = function (b) {
    if(b.posZ > -fl) {
        var scale = fl / (fl + b.posZ);
        
        b.scaleX = b.scaleY = scale;
        b.x = this.x + b.posX * scale;
        b.y = this.y + b.posY * scale;
    }
};

Cube.prototype.move = function (b, ax, ay) {
    this.rotateX(b, ax);
    this.rotateY(b, ay);
    this.setPerspective(b);
};

Cube.prototype.draw = function ( p ) {
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

function draw() {
    ctx.clearRect(0, 0, width, height);
    
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