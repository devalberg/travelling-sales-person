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

const readFile = async (file) => {
    try {
        const fileContents = await readUploadedFileAsText(file);
        const vertices = fileContents
            .split('\n')
            .map(line => line.trim().split(' '))
            .map(line => ({ x: Number(line[0]), y: Number(line[1]) }));

        return vertices;
    } catch (e) {
        console.log(e);
    }
}

const readUploadedFileAsText = (inputFile) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
            fileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.readAsText(inputFile);
    });
}

export default {
    generateRandomVertex,
    generateRandomVertexArray,
    readFile
}