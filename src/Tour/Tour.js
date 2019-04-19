class Tour {
    constructor() {
        this.totalDistance = 0;
        this.vertices = [];
        this.edges = [];
    }

    calculateEdgeLength(edge) {
        const deltaXsqaured = Math.pow(edge.v1.x - edge.v2.x, 2);
        const deltaYsqaured = Math.pow(edge.v1.y - edge.v2.y, 2);
        return Number(Math.sqrt(deltaXsqaured + deltaYsqaured).toFixed(2));
    }

    updateTourProperties() {
        let edges = [];
        let distance = 0;
        for (let i = 0; i < this.vertices.length; i++) {
            if (i < this.vertices.length - 1) {
                edges.push({ v1: this.vertices[i], v2: this.vertices[i + 1] });
                distance += this.calculateEdgeLength({ v1: this.vertices[i], v2: this.vertices[i + 1] });
            } else {
                edges.push({ v1: this.vertices[i], v2: this.vertices[0] });
                distance += this.calculateEdgeLength({ v1: this.vertices[i], v2: this.vertices[0] });
            }
        }
        this.edges = edges;
        this.totalDistance = distance;
    }


}

export default Tour;