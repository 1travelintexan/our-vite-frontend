import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { ProductsListPage } from "./pages/ProductsListPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AddProductPage } from "./pages/AddProductPage";
import { UpdateProductPage } from "./pages/UpdateProductPage";
import { Navbar } from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "./contexts/ThemeContext";
import Spinner from "react-bootstrap/Spinner";
function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  //create a variable that equals something in the .env or localhost: 5005
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  //here is where we get the data from the context
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((res) => {
        console.log(res.data.products);
        setAllProducts(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [API_URL]);
  //functions
  function handleDelete(productId) {
    axios
      .delete(`https://dummyjson.com/products/${productId}`)
      .then(() => {
        const filteredProducts = allProducts.filter((oneProduct) => {
          if (oneProduct.id !== productId) {
            return true;
          }
        });

        setAllProducts(filteredProducts);
        nav("/products-list");
      })
      .catch((err) => console.log(err));
  }
  //check if the data is loading, if so.... return spinner
  if (isLoading) {
    return <Spinner animation="grow" variant="info" />;
  }

  return (
    <div className={darkTheme ? "" : "light-theme"}>
      <Navbar />
      <h1>CRUD day!</h1>
      <button
        onClick={() => {
          setDarkTheme(!darkTheme);
        }}
      >
        {darkTheme ? "🌞" : "☾"}
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products-list"
          element={<ProductsListPage allProducts={allProducts} />}
        />
        <Route
          path="/product-detail/:productId"
          element={<ProductDetailPage handleDelete={handleDelete} />}
        />
        <Route path="/create-product" element={<AddProductPage />} />
        <Route
          path="/edit-product/:productId"
          element={<UpdateProductPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
