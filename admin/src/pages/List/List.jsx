import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const categories = [
  "Pizza","Punjabi", "Pasta", "Sandwich", "Rolls",
  "Guj. Dish", "Deserts", "Mexican", "Salad",
];

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(
      `${url}/api/food/remove`,
      { id: foodId },
      { headers: { token } }
    );
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setEditData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setEditImage(null);
    setEditPreview(null);
  };

  const closeEdit = () => {
    setEditItem(null);
    setEditImage(null);
    setEditPreview(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
    setEditPreview(URL.createObjectURL(file));
  };

  const submitEdit = async () => {
    const formData = new FormData();
    formData.append("id", editItem._id);
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("price", editData.price);
    formData.append("category", editData.category);
    if (editImage) formData.append("image", editImage);

    const response = await axios.post(`${url}/api/food/edit`, formData, {
      headers: { token },
    });

    if (response.data.success) {
      toast.success(response.data.message);
      closeEdit();
      fetchList();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <div className="action-btns">
              <span className="edit-btn" onClick={() => openEdit(item)}>✎</span>
              <span className="cursor" onClick={() => removeFood(item._id)}>✕</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <p>Edit Food Item</p>
              <span className="modal-close" onClick={closeEdit}>✕</span>
            </div>

            <div className="modal-body">
              <div className="edit-image-section">
                <img
                  src={editPreview || `${url}/images/${editItem.image}`}
                  alt=""
                  className="edit-preview"
                />
                <label className="change-img-btn">
                  Change Image
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  placeholder="Food name"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  rows={3}
                  placeholder="Description"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    name="price"
                    type="number"
                    value={editData.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={editData.category} onChange={handleEditChange}>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeEdit}>Cancel</button>
              <button className="save-btn" onClick={submitEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;