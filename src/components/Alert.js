import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Alerts = (props) => {
  const navigate = useNavigate();

  return (
    <Modal
      show={props.show}
      backdrop="static"
      keyboard={false}
      scrollable="true"
      onHide={props.closeAlert}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.isButtonVisible ? "Session Experied!" : "Status"}{" "}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.msg.map((res, id) => {
          return (
            <p key={id} className={res.flag ? "text-success" : "text-danger"}>
              {res.msg}
            </p>
          );
        })}
      </Modal.Body>
      {props.isButtonVisible && (
        <Modal.Footer>
          <Button
            onClick={() => {
              props.closeAlert();
              navigate("/auth");
            }}
          >
            Login Agian
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Alerts;
