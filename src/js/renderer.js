import { Application, Graphics } from "pixi.js";
import { Vertex } from './polygon';

let polygonColor = 0xff9e22;
let dotColor = 0x09af00;
let dotThickness = 10;
let backgroundColor = 0x424242;
let snapValue = 10;

window.threshold = dotThickness;

const app = new Application(window.innerWidth, window.innerHeight, {
    antialias: true,
    backgroundColor: backgroundColor,
});

document.body.appendChild(app.view);

let polygonVertices = [];

app.view.addEventListener('click', event => {
    switch (window.activeTool) {
        case 'dot':
            useDotTool(event);
            checkDotPlacement();
            break;
        case 'color':
            useColorTool(event);
            break;
        case 'polygon':
            usePolygonTool(event);
            break;
        case 'erase':
            console.log('erase');
            useEraseTool();
            break;
        default:
            break;
    }
});

function useEraseTool() {
    polygonVertices = [];
    app.stage.children = [];
}

function checkDotPlacement() {
    let polygonPoints;
    for (let i = app.stage.children.length - 2; i >= 0; i--) {
        if (app.stage.children[i].graphicsData[0].shape.type === 0) {
            polygonPoints = app.stage.children[i].graphicsData[0].points;
            break;
        }
    }

    const { x, y } = app.stage.children[app.stage.children.length - 1].graphicsData[0].shape;

    let polygon = [];
    for (let i = 0; i < polygonPoints.length; i += 2) {
        polygon.push(new Vertex(polygonPoints[i], polygonPoints[i + 1]));
    }

    console.log(new Vertex(x, y).getRelativePolygonPlacement(polygon));
}

function usColorTool(event) {
    polygonVertices.forEach(vertex => app.stage.children.pop());
    polygonVertices = [];
}

function useDotTool(event) {
    polygonVertices.forEach(vertex => app.stage.children.pop());
    polygonVertices = [];

    drawDot(event.clientX, event.clientY);
}

function usePolygonTool(event) {
    const lastVertex = polygonVertices[polygonVertices.length - 1];

    polygonVertices.length
        ? drawLine({ ...lastVertex }, { x: event.clientX, y: event.clientY })
        : drawDot(event.clientX, event.clientY, polygonColor, 4);

    polygonVertices.push({ x: event.clientX, y: event.clientY });

    if (polygonVertices.length > 2) {
        const xDiff = Math.abs(event.clientX - polygonVertices[0].x);
        const yDiff = Math.abs(event.clientY - polygonVertices[0].y);

        if (xDiff < snapValue && yDiff < snapValue) {
            polygonVertices.pop();
            polygonVertices.forEach(vertex => app.stage.children.pop());
            // delete the dot
            app.stage.children.pop();
            drawPolygon(polygonVertices);
            polygonVertices = [];
        }
    }
}

/**
 * @param {{x:number, y:number}} start 
 * @param {{x:number, y:number}} end 
 */
function drawLine(start, end) {
    const graphics = new Graphics();
    graphics.lineStyle(4, polygonColor);
    graphics.beginFill(0x000000, 0);
    graphics.moveTo(start.x, start.y);
    graphics.lineTo(end.x, end.y);
    graphics.endFill();
    app.stage.addChild(graphics);
}

function drawDot(x, y, color = dotColor, thickness = dotThickness) {
    const graphics = new Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(color);
    graphics.drawCircle(x, y, thickness / 2);
    graphics.endFill();
    app.stage.addChild(graphics);
}

function drawPolygon(coords) {
    const graphics = new Graphics();
    graphics.lineStyle(4, polygonColor);
    graphics.beginFill(polygonColor);
    let _coords = [];
    coords.forEach(coord => _coords.push(coord.x, coord.y));
    graphics.drawPolygon([..._coords]);
    graphics.endFill();
    app.stage.addChild(graphics);
}

let redos = [];

window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'z':
        case 'Z':
            if (event.ctrlKey) {
                if (event.altKey) {
                    redo();
                } else {
                    undo();
                }
            }
            break;
        case 'y':
        case 'Y':
            if (event.ctrlKey) {
                redo();
            }
            break;

        default:
            break;
    }
});

function undo() {
    redos.push(app.stage.children.pop());
    polygonVertices.pop();
};

function redo() {
    app.stage.addChild(redos.pop());
}