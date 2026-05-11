export default class Material {
  constructor({ color = "#ffffff", roughness = 0.5, metallic = 0.0 } = {}) {
    this.color = color;
    this.roughness = roughness;
    this.metallic = metallic;
  }
}
