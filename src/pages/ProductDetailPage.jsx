import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ProductDetailPage = ({ handleDelete }) => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <div>
      <h2>{product.title}'s Page</h2>
      <img src={product.thumbnail} />
      <h2>Description: {product.description}</h2>
      <button onClick={() => handleDelete(productId)}>Delete</button>
      <Link to={`/edit-product/${productId}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};
