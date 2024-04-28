function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData() { //add async
    //try {
    const response = await fetch(this.path);
    const data = await convertToJson(response);
    return data;
      //return fetch(this.path)
      //.then(convertToJson)
      //.then((data) => data);
    } //catch (error) {
      //throw error;
    //}
  //}  
  async findProductById(id) {
    //const products = await this.getData();
    //return products.find((item) => item.Id === id);
    //try {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);
      //if (!product) {
        //throw new Error(`Product with ID ${id} not found`);
      //}
    return product;
    //} //catch (error) {
      //throw error;
    //}
  }
}
