import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";

//Defines the main function component named App.
function App() {
  //Initializes the state variables for the backend data, edit mode, and input fields.
  const [backendData, setBackendData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  //Calls the useEffect hook to fetch data from the API endpoint once the component mounts.
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.users);
      });
  }, []);

  //Handles the deletion of a card by removing it from the state array.
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        console.log("User deleted successfully");
        const updatedData = backendData.filter((user) => user.id !== id);
        setBackendData(updatedData);
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* 
    Handles the editing of a card by setting the edit mode state variable to true
    and updating the input fields with the current card's title and description.
  */
  const handleEdit = (index) => {
    setEditMode(true);
    setEditTitle(backendData[index].title);
    setEditDescription(backendData[index].description);
  };

  /*
    Handles the saving of edited data by updating the state array with the new values
    and setting the edit mode state variable to false.
*/
  const handleSave = (index) => {
    const updateData = [...backendData];
    updateData[index].title = editTitle;
    updateData[index].description = editDescription;
    setBackendData(updateData);
    setEditMode(false);
  };

  //Handles the cancellation of editing by setting the edit mode state variable to false.
  const handleCancel = () => {
    setEditMode(false);
  };

  /*
    Handles the addition of a new card by creating a new object with the input values,
    adding it to the state array, and resetting the input fields.
*/
  const handleAdd = () => {
    const newProject = {
      title: newTitle,
      description: newDescription,
      image: "https://via.placeholder.com/150",
    };
    setBackendData([...backendData, newProject]);
    setNewTitle("");
    setNewDescription("");
  };

  // Renders the card components for each object in the state array along with the input fields for adding a new card.
  return (
    <Container>
      <Row className="mt-5">
        {backendData.map((user, i) => (
          <Col className="d-flex" key={i} sm={6} md={4} lg={3}>
            <Card className="d-flex flex-column justify-content-between align-items-stretch text-center mt-3 w-100">
              <Card.Img variant="top" src={user.image} />
              <Card.Body className="d-flex flex-column">
                {editMode ? (
                  <Form>
                    <Form.Group controlId="editTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="editDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="success" onClick={() => handleSave(i)}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={() => handleCancel()}>
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <>
                    <Card.Title>{user.title}</Card.Title>
                    <Card.Text>{user.description}</Card.Text>
                    <div className="d-flex justify-content-between mt-auto">
                      <Button variant="success" onClick={() => handleEdit(i)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col className="d-flex" sm={6} md={4} lg={3}>
          <Card className="d-flex flex-column justify-content-between align-items-stretch text-center w-100 mt-3">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body className="d-flex flex-column">
              <Form>
                <Form.Group controlId="newTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="newDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={() => handleAdd()}>
                Add
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

/* 
  Source >> https://www.youtube.com/watch?v=w3vs4a03y3I > How to Create an Express/Node + React Project |
*/
