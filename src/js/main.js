import { Vertex } from './polygon';
import './renderer';
import { MDCRipple } from '@material/ripple';

document.querySelectorAll('.mdc-icon-button').forEach(icon => {
    icon.addEventListener('click', setActiveTool);
    icon.addEventListener('click', setActiveTool);
    new MDCRipple(icon).unbounded = true;
});

window.threshold = 10;

let lastActiveToolIcon;

function setActiveTool() {
    if (lastActiveToolIcon) {
        lastActiveToolIcon.classList.remove('mdc-icon-button--active');
    }

    window.activeTool = this.id.replace('-tool', '');

    this.classList.add('mdc-icon-button--active');
    lastActiveToolIcon = this;
}

document.getElementById('polygon-tool').click();

// const polygon1 = [
//     new Vertex(0, 0),
//     new Vertex(10, 0),
//     new Vertex(10, 10),
//     new Vertex(0, 10),
// ];

// const polygon2 = [
//     new Vertex(0, 0),
//     new Vertex(5, 5),
//     new Vertex(5, 0),
// ];

// console.log(
//     new Vertex(20, 20).getRelativePolygonPlacement(polygon1),
//     new Vertex(5, 5).getRelativePolygonPlacement(polygon1),
//     new Vertex(3, 3).getRelativePolygonPlacement(polygon2),
//     new Vertex(5, 1).getRelativePolygonPlacement(polygon2),
//     new Vertex(8, 1).getRelativePolygonPlacement(polygon2),
//     new Vertex(-1, 10).getRelativePolygonPlacement(polygon1),
// );