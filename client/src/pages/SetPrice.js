import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AdminMenu from "../components/Layout/AdminMenu";
import { useAuth } from "../context/auth";
const { Option } = Select;

const SetPrice = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newPrice, setnewPrice] = useState("")
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get price by id
  const getPrice = async () => {
    try {
      console.log(id);
      console.log(auth.user.email);
      const { data } = await axios.get("http://localhost:4000/api/v1/price/get-productpricebyid", {
        "id": id, "userId": auth.user.email
      }
      );

      if (data?.success) {
        setPrice(data?.newprice);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting price");
    }
  };

  useEffect(() => {
    getPrice();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("id", id);
      productData.append("newprice", newPrice);
      productData.append("userId", auth.user.email);
      console.log(productData.id);
      console.log(productData.newPrice);
      console.log(auth.user.email);
      console.log(id);
      console.log(newPrice);
  
      const { data } = axios.post(
        `http://localhost:4000/api/v1/price/create-price`, 
        // productData
        {
          "id": id, newprice: newPrice, userId: auth.user.email
        }
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product-price
  // const handleDelete = async () => {
  //   try {
  //     let answer = window.prompt("Are You Sure want to delete this product ? ");
  //     if (!answer) return;
  //     const { data } = await axios.delete(
  //       `http://localhost:4000/api/v1/product/delete-product/${id}`
  //     );
  //     toast.success("Product DEleted Succfully");
  //     navigate("/dashboard/admin/products");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <br></br>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {/* <AdminMenu /> */}
          </div>
          <div className="col-md-9">
            <h1>Set Price of Product</h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
                disabled
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:4000/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  disabled
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  disabled
                />
              </div>
              
              <div className="mb-3">
                <input
                  type="number"
                  value={newPrice}
                  placeholder="write a new price"
                  className="form-control"
                  onChange={(e) => setnewPrice(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Set the Price
                </button>
              </div>
              {/* <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRICE
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SetPrice;

