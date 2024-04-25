import roles from "../../utils/roles.js";

const cityEndPointsRoles = {
  addCity: [roles.Admin],
  updateCity: [roles.Admin],
  deleteCity: [roles.Admin],
};
export default cityEndPointsRoles;
