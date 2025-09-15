export default {
  beforeCreate: async (req) => {
    if (!req.data.email.includes("@")) {
      req.reject(400, "Email inválido");
    }
  }
};
