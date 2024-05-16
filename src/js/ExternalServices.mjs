const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
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
    fetch("https://wdd330-backend.onrender.com:3000/checkout", options).then((res) => {
      console.log(res);
    });
  }
}
