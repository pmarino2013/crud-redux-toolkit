import React, { useState } from "react";
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "./redux/services/posteo";

const App = () => {
  const [show, setShow] = useState(false); //Para mostrar Modal para agregar Post
  const [updateShow, setUpdateShow] = useState(false); //Para mostrar modal update
  const [idPost, setIdPost] = useState(); //

  const { data, error, isFetching } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => {
    setUpdateShow(true);
  };

  const borrarPost = async (id) => {
    let validar = window.confirm(`Está seguro que quiere borrar el post}?`);

    if (validar) {
      await deletePost(id);
    }
  };

  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2 ">
          <h1>Posteos JsonServer</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleShow}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-8 offset-md-2">
          {error ? (
            <h3>No hay datos que mostrar</h3>
          ) : isFetching ? (
            <h3>Cargando info...</h3>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.description}</td>
                    <td>
                      <div className="d-flex">
                        <i
                          className="fa fa-pencil-square-o mb-1"
                          role="button"
                          aria-hidden="true"
                          onClick={() => {
                            setIdPost(post.id);
                            handleUpdateShow();
                          }}
                        ></i>
                      </div>
                      <div className="d-flex">
                        <i
                          className="fa fa-trash-o"
                          role="button"
                          aria-hidden="true"
                          onClick={() => {
                            borrarPost(post.id);
                          }}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AddModal show={show} handleClose={handleClose} />
      {updateShow && (
        <UpdateModal
          updateShow={updateShow}
          handleUpdateClose={handleUpdateClose}
          idPost={idPost}
        />
      )}
    </div>
  );
};

export default App;
