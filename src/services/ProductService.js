import http from "../http-common";

class ProductService {
  getAll() {
    return http.get("/posts");
  }
  getById(id) {
    return http.get(`/posts/${id}`);
  }
  create(Data) {
    return http.post("/posts", Data);
  }
  update(Data) {
    return http.put(`/posts/${Data.id}`, Data);
  }
  delete(id) {
    return http.delete(`/posts/${id}`, id);
  }
}

export default new ProductService();
