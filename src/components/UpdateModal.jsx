import React, { useState, useEffect } from "react";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../redux/services/posteo";
import { Modal, Button } from "react-bootstrap";

const UpdateModal = ({ updateShow, handleUpdateClose, idPost }) => {
  const { data, isFetching } = useGetPostQuery(idPost);
  const [updatePost] = useUpdatePostMutation();

  const [formValue, setFormValue] = useState({
    title: "",
    author: "",
    description: "",
  });
  useEffect(() => {
    if (!isFetching) {
      setFormValue(data);
    }
  }, [isFetching]);

  const handleChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const guardarCambios = async () => {
    await updatePost(formValue);
    handleUpdateClose();
  };
  return (
    <Modal show={updateShow} onHide={handleUpdateClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isFetching ? (
          <h3>Cargando data...</h3>
        ) : (
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
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={guardarCambios}>
          Update post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
