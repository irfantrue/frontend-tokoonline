const IsAuth = () => {
  const token = localStorage.getItem("token");

  return token;
};

export default IsAuth;
