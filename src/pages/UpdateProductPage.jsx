import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UpdateProductPage = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const { productId } = useParams();
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setThumbnail(res.data.thumbnail);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  function handleUpdate(e) {
    e.preventDefault();
    const updatedProduct = {
      title,
      thumbnail,
      description,
    };
    // axios
    //   .put(`https://dummyjson.com/products/${productId}`, updatedProduct)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    // ******* PUT with fetch ***********
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        console.log("response from fetch", res);
        res.json();
      })
      .then((data) => console.log("updated...", data))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>Update Page</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => {
              setThumbnail(e.target.value);
            }}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};
