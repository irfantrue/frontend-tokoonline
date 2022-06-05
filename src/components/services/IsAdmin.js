const IsAdmin = () => {
  const token = localStorage.getItem("role");

  return token !== "User";
};

export default IsAdmin;
