const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  let json = res.json();
  if (res.ok) {
    return json;
  } else {
    throw new { name: "servicesError", message: json }();
  }
}

export default class ExternalServices {
  async getData(category) {
    const res = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(res);
    return data.Result;
  }

  async findProductById(id) {
    const res = await fetch(`${baseURL}product/${id}`);
    const product = await convertToJson(res);
    return product.Result;
  }

  static async checkout(data) {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return await fetch("http://server-nodejs.cit.byui.edu:3000/checkout", options)
  }
}
