import { grey } from "@material-ui/core/colors";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ alignContent: "center", color: "rgb(194, 190, 190)" }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loading;
