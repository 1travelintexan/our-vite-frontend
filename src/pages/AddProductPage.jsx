import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const nav = useNavigate();
  async function handleAddProduct(e) {
    e.preventDefault();
    const ourFormData = new FormData();
    ourFormData.append("file", thumbnail);
    ourFormData.append("upload_preset", "ironhack");
    ourFormData.append("cloud_name", "dnkyulofa");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnkyulofa/image/upload",
        ourFormData
      );
      const newProduct = {
        title,
        thumbnail: response.data.url,
        description,
      };
      //sending the data with axios
      const productCreatedResponse = await axios.post(
        "https://dummyjson.com/products/add",
        newProduct
      );
      console.log("response from with image", productCreatedResponse);
      nav("/products-list");
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setThumbnail("");
      setDescription("");
    }
    //**************** POST with fetch *******/
    // fetch("https://dummyjson.com/products/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newProduct),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log("with fetch", data);
    //   })
    //   .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Add Product Page</h1>
      <form onSubmit={handleAddProduct}>
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
            type="file"
            name="image"
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
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
        <button>Add</button>
      </form>
    </div>
  );
};
