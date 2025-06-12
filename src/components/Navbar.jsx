import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products-list">All Products</NavLink>
      <NavLink to="/create-product">Create a Product</NavLink>
    </nav>
  );
};
