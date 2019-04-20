class Canvas {
    constructor(document) {
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 1;
        this.vertexSize = 10;
        this.fillStyle = "rgb(209, 127, 46)";
        this.ctx.strokeStyle = "white";
        this.delay = 0;
    }

    drawVertices(vertices) {
        checkValidVertices(vertices);

        let x, y;

        // fill first vertex
        this.ctx.fillStyle = 'white';
        x = vertices[0].x - (this.vertexSize / 2);
        y = vertices[0].y - (this.vertexSize / 2);
        this.ctx.fillRect(x, y, this.vertexSize, this.vertexSize);
        this.ctx.rect(x, y, this.vertexSize, this.vertexSize);

        // the rest of the vertices
        this.ctx.fillStyle = this.fillStyle;
        for (let i = 1; i < vertices.length; i++) {
            x = vertices[i].x - (this.vertexSize / 2);
            y = vertices[i].y - (this.vertexSize / 2);
            this.ctx.beginPath();
            this.ctx.fillRect(x, y, this.vertexSize, this.vertexSize);
            this.ctx.rect(x, y, this.vertexSize, this.vertexSize);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    drawEdgesBetweenVertices(v1, v2) {
        checkValidVertex(v1);
        checkValidVertex(v2);
        this.ctx.beginPath();
        this.ctx.moveTo(v1.x, v1.y);
        this.ctx.lineTo(v2.x, v2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawTour(vertices, edges) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < edges.length; i++) {
                    this.drawEdgesBetweenVertices(edges[i].v1, edges[i].v2);
                }
                this.drawVertices(vertices);
                resolve();
            }, this.delay);
        });
    }

    setDelay(delay) {
        if (delay < 0 || typeof delay !== 'number') {
            throw "Delay must be a positive number"
        }
        this.delay = delay;
    }
}



// Validation check
const checkValidVertices = vertices => {
    if (!Array.isArray(vertices)) {
        throw "Vertices must be an array";
    }
    vertices.every(vertex => {
        checkValidVertex(vertex);
    });
}

const checkValidVertex = vertex => {
    if (typeof vertex !== 'object') {
        throw 'Vertex must be an object';
    }

    if ('x' in vertex && 'y' in vertex) {
        if (typeof vertex.x !== 'number' || typeof vertex.y !== 'number') {
            throw "Vertex x and y must be numbers";
        }
    } else {
        throw 'Vertex must contain x and y';
    }
}

export default Canvas;