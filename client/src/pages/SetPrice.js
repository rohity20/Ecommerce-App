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
      // productData.append("name", name);
      // productData.append("description", description);
      // productData.append("price", price);
      // productData.append("quantity", quantity);
      // photo && productData.append("photo", photo);
      // productData.append("category", category);
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

  //delete a product
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

              {/* <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12" >
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                    disabled
                  />
                </label>
              </div> */}
              
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

              {/* <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled
                />
              </div> */}

              {/* <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                  disabled
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div> */}
              
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
                  DELETE PRODUCT
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






// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/auth";
// import Layout from "../components/Layout/Layout";
// import UserMenu from "../components/Layout/UserMenu";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const SetPrice = () => {
//   //context
//   const [auth, setAuth] = useAuth();
//   //state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const params = useParams();
//   const [product, setProduct] = useState({});

//   //get user data
//   useEffect(() => {
//     const { email, name, phone, address } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//   }, [auth?.user]);

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("http://localhost:4000/api/v1/auth/profile", {
//         name,
//         email,
//         password,
//         phone,
//         address,
//       });
//       if (data?.errro) {
//         toast.error(data?.error);
//       } else {
//         setAuth({ ...auth, user: data?.updatedUser });
//         let ls = localStorage.getItem("auth");
//         ls = JSON.parse(ls);
//         ls.user = data.updatedUser;
//         localStorage.setItem("auth", JSON.stringify(ls));
//         toast.success("Profile Updated Successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   //---------
//   useEffect(() => {
//     if (params?.id) 
//        getProduct();
//       // console.log(params?.id)
//   }, [params?.id]);
//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:4000/api/v1/product/get-productbyid/${params.id}`
//       );
//       setProduct(data?.product);
//       setName(data?.name);
//       console.log(product.name);
//       // getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout title={"Your Price Tracker"}>
//       <div className="container-fluid m-3 p-3 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             {/* <UserMenu /> */}
//             Set your own Price of the Product...<br></br>
//             You will get notified via email when the price drop below the given set price....
//           </div>
//           <div className="col-md-8">
//             <div className="form-container" style={{ marginTop: "-40px" }}>
//               <form onSubmit={handleSubmit}>
//                 <h4 className="title">USER PROFILE</h4>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Product Name"
//                     // autoFocus
//                     disabled
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Email "
//                     disabled
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     placeholder="Enter Your Password"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Phone"
//                   />
//                 </div>
//                 {/* <div className="mb-3">
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Address"
//                   />
//                 </div> */}

//                 <button type="submit" className="btn btn-primary">
//                   CREATE PRICE
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default SetPrice;
