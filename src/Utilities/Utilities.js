const generateRandomVertex = (random, xMax, yMax) => {
    const x = Math.ceil(random() * xMax);
    const y = Math.ceil(random() * yMax);
    return { x, y };
}

const generateRandomVertexArray = (vertexGenerator, count, xMax, yMax) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(vertexGenerator(Math.random, xMax, yMax));
    }

    return result;
}

export default {
    generateRandomVertex,
    generateRandomVertexArray
}