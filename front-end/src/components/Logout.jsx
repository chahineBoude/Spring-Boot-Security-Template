import { Button } from "react-bootstrap";
import { useLocalState } from "../utils/useLocalStorage";

const Logout = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  function logout() {
    setJwt(null);
    alert("Logout successful");
    window.location.reload();
  }
  return (
    <Button
      style={{ marginTop: "5px" }}
      className="btn btn-danger btn-sm"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
};

export default Logout;
