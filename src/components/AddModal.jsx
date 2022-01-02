import React, { useState } from "react";
import { useAddPostMutation } from "../redux/services/posteo";
import { Modal, Button } from "react-bootstrap";

const AddModal = ({ show, handleClose }) => {
  const [addPost] = useAddPostMutation(); //funcion para agregar dato
  //Para actualizar la data

  // const { refetch } = useGetPostsQuery();
  const [formValue, setFormValue] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const agregarPost = async () => {
    if (formValue.title && formValue.author && formValue.description) {
      const post = {
        id: new Date().getTime(),
        ...formValue,
      };

      await addPost(post); //llamo a la funcion que agrega el dato y espero resultado
      // refetch();

      cerrarModal();
    } else {
      alert("Faltan Datos");
    }
  };

  const cerrarModal = () => {
    handleClose();
    setFormValue({
      title: "",
      author: "",
      description: "",
    });
  };
  return (
    <>
      <Modal show={show} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Posts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                value={formValue.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Author</label>
              <input
                className="form-control"
                type="text"
                value={formValue.author}
                name="author"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={formValue.description}
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={agregarPost}>
            Save post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
