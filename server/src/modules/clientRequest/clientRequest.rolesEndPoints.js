import roles from "../../utils/roles.js";

const clientRequestEndPointsRoles = {
  getClientRequest: [roles.Admin],
  updateClientRequest: [roles.Admin],
  deleteClientRequest: [roles.Admin],
};

export default clientRequestEndPointsRoles;
