import { createContext, useEffect, useReducer, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

//this is the context that can be accessed by all the components of the website globally

const StorContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // this is the function that helps to add item to the cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  //function to remove the items from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  //use to request the data from the API endPoint
  //tells react that the component need to do somethings after render

  useEffect(() => {
    console.log(cartItems);
  }),
    [cartItems];

  //function for calculating the total cart price of the cart items by comparing it

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  //function to load food items from database
  const fetchFood = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  //this is the used effect inorder to keep the user logged in even if he refreshed
  //no logout on refresh
  useEffect(() => {
    async function loadData() {
      await fetchFood();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StorContextProvider;
