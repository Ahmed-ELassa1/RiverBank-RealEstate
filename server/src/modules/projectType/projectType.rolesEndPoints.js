import roles from "../../utils/roles.js";

const projectTypeEndPointsRoles = {
  addProjectType: [roles.Admin],
  updateProjectType: [roles.Admin],
  deleteProjectType: [roles.Admin],
};
export default projectTypeEndPointsRoles;
