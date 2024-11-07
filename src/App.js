import { Data } from './EmployeeData';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Table, Button } from 'react-bootstrap';


function App() {
  const [data, setData] = useState([" "]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);

  const [id, setId] = useState(0)

  useEffect(() => {
    setData(Data)
  }, [])

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';
    if (firstName === '')
      error += 'First name is required.\n';
    if (lastName === '')
      error += 'Last name is required.\n';
    if (age <= 0)
      error += 'Age is required.\n';

    if (error === '') {
      alert("Record Saved");

      const dt = [...data];

      const newObject = {
        id: data.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age
      };

      dt.push(newObject);
      setData(dt);

      // Clear form after save
      handleClear();
    }
    else {
      alert(`Error: ${error}`);
    }
  };

  const handleClear = () => {
    setAge(0);
    setFirstName('');
    setLastName('');
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete ths row?")) {
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
      }
    }
  };

  const handleEdit = (id) => {
    alert(id);
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setId(id)
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age)
    }
  }
  return (
    <>
      <div className='container mt-5' style={{ background: "lightblue", padding: "25px", borderRadius: "8px" }}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter your Age" value={age} onChange={(e) => setAge(e.target.value)} />
          </Form.Group>

          <Button variant="primary" onClick={handleSave}>Save</Button>{' '}
          <Button variant="danger" onClick={handleClear}>Clear</Button>{' '}
        </Form>
      </div>

      <div className='table container mt-5'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>#</td>
              <td>Id</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                      <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
