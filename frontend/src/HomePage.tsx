import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    address: "",
    designation: "",
  });
  useEffect(() => {
    const getData = async () => {
      let resp = await axios.get("http://localhost:5000/users");
      setUsers(() => {
        return resp.data.users;
      });
    };
    getData();
  }, []);

  const handleCreateUser = async () => {
    let resp = await axios.post("http://localhost:5000/user", data);
    setUsers(() => {
      return resp.data.users;
    });
    setData({
      name: "",
      designation: "",
      address: "",
    });
  };

  const handleDelete = async (id: any) => {
    let resp = await axios.delete(`http://localhost:5000/user/${id}`);
    if (resp.data.status === "success") {
      setUsers(() => {
        return resp.data.users;
      });
    }
  };

  const handleUpdate = (id: any) => {
    navigate(`/updateUser/${id}`)
  };

  return (
    <>
      <h1>
        Name:{" "}
        <input
          type="text"
          onChange={(e) => {
            setData({
              ...data,
              name: e.target.value,
            });
          }}
          value={data.name}
        />
      </h1>
      <h1>
        Address:{" "}
        <input
          type="text"
          onChange={(e) => {
            setData({
              ...data,
              address: e.target.value,
            });
          }}
          value={data.address}
        />
      </h1>
      <h1>
        Designation:{" "}
        <input
          type="text"
          onChange={(e) => {
            setData({
              ...data,
              designation: e.target.value,
            });
          }}
          value={data.designation}
        />
      </h1>
      <h1>
        <button
          onClick={() => {
            handleCreateUser();
          }}
        >
          Create user
        </button>
      </h1>
      <h1>
        {users.length > 0 ? "Below are the users" : "No users in the database"}
      </h1>
      {users.map((user: any, id) => {
        return (
          <div key={id}>
            name:<span style={{ color: "blue" }}>{user.name}</span> address:
            <span style={{ color: "blue" }}>{user.address}</span> designation:
            <span style={{ color: "blue" }}>{user.designation}</span>
            <button
              onClick={() => {
                handleDelete(user._id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleUpdate(user._id);
              }}
            >
              update
            </button>
          </div>
        );
      })}
    </>
  );
}

export default HomePage;
