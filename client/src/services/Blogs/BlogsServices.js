import { HTTPBaseService } from "../HTTPBaseService";

export class BlogsServices extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new BlogsServices(token);
    }

    return this.classInstance;
  }

  // POST
  createBlog = (body) =>
    this.instance
      .post("blog", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getBlogs = (body) =>
    this.instance
      .get("blog", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditBlog = (id, body) =>
    this.instance.put(`blog/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getBlogById = (id) =>
    this.instance.get(`blog/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteBlog = (id) =>
    this.instance.delete(`blog/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedBlogs = (ids) =>
    this.instance.delete(`blog`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
