export default class Mesh {
  constructor(vertices = [], indices = []) {
    this.vertices = vertices;
    this.indices = indices;
  }

  static createTriangle() {
    return new Mesh([0, 1, 0, -1, -1, 0, 1, -1, 0], [0, 1, 2]);
  }
}
