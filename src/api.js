const BASEURL = "https://fakestoreapi.com";

export async function getProducts() {
  try {
    const response = await fetch(`${BASEURL}/products`);
    const result = await response.json();
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleProduct(id) {
  try {
    const response = await fetch(`${BASEURL}/products/${id}`);
    const result = await response.json();
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
