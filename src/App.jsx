import React from "react";
import { useGetPostsQuery } from "./redux/services/posteo";

const App = () => {
  const { data, error, isFetching } = useGetPostsQuery();

  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2 ">
          <h1>Posteos JsonServer</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 d-flex justify-content-end">
          <button className="btn btn-primary">
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
                </tr>
              </thead>
              <tbody>
                {data.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
