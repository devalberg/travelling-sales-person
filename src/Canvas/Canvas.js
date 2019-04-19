class Canvas {
    constructor(document) {
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 2;
        this.vertexSize = 6;
        this.ctx.fillStyle = "rgb(209, 127, 46)";
        this.ctx.strokeStyle = "grey";
    }

    drawVertices(vertices) {
        checkValidVertices(vertices);

        for (let i = 0; i < vertices.length; i++) {
            const x = vertices[i].x - (this.vertexSize / 2);
            const y = vertices[i].y - (this.vertexSize / 2);
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

    drawTour(vertices, edges, delay) {
        if (typeof delay !== 'number' || delay < 0) {
            throw "Delay must be a positive number or 0"
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < edges.length; i++) {
                    this.drawEdgesBetweenVertices(edges[i].v1, edges[i].v2);
                }
                this.drawVertices(vertices);
                resolve();
            }, delay);
        });
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