import roles from "../../utils/roles.js";

const projectEndPointsRoles = {
  addProject: [roles.Admin],
  updateProject: [roles.Admin],
  deleteProject: [roles.Admin],
};
export default projectEndPointsRoles;
