import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export const ProductsListPage = ({ allProducts }) => {
  const theData = useContext(ThemeContext);
  console.log("on the list page", theData);
  return (
    <div>
      <h2>Products:</h2>
      <section className="products-container">
        {allProducts.map((oneProduct) => {
          return (
            <div key={oneProduct.id} className="product-card">
              <img src={oneProduct.thumbnail} />
              <Link to={`/product-detail/${oneProduct.id}`}>
                <h3>{oneProduct.title}</h3>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
};
