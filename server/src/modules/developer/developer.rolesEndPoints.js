import roles from "../../utils/roles.js";

const developerEndPointsRoles = {
  addDeveloper: [roles.Admin],
  updateDeveloper: [roles.Admin],
  deleteDeveloper: [roles.Admin],
};
export default developerEndPointsRoles;
