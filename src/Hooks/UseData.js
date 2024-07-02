import { storeData } from "../Utiils/DataSlicer";

function UseData(dispatch) {
  fetchProducts();

  async function fetchProducts() {
    const url = `https://cors-anywhere.herokuapp.com/http://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=20`;
    const apiKey = "72njgfa948d9aS7gs5";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "x-api-key": apiKey,
        },
      });

      const data = await response.json();

      console.log(data, "data");

      dispatch(storeData(data));
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }
}

export default UseData;
