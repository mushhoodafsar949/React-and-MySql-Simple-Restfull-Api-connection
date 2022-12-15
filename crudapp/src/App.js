import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [myname, setName] = useState("");
  const [myemail, setEmail] = useState("");

  const [detailsList, setDetailslist] = useState([]);

  const addDetails= () => {
    Axios.post("http://localhost:3000/insertintotable", {
      name: myname,
      email: myemail
    }).then(() => {
      setDetailslist([
        ...detailsList,
        {
          name: myname,
          email: myemail
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3000/getdetails").then((response) => {
      setDetailslist(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3000/updatedetails", { name: myname,email:myemail, id: id }).then(
      (response) => {
        setDetailslist(
          detailsList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.myname,
                  email: val.myemail
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
      setDetailslist(
        detailsList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
     
        <button onClick={addDetails}>Add Details</button>
      </div>

      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {detailsList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Email: {val.email}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;