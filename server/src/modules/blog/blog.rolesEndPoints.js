import roles from "../../utils/roles.js";

const blogEndPointsRoles = {
  addBlog: [roles.Admin],
  updateBlog: [roles.Admin],
  deleteBlog: [roles.Admin],
};
export default blogEndPointsRoles;
