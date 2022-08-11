import { Modal } from "react-bootstrap";

const Alerts = (props) => {

    return (
        <Modal
            show={props.show}
            backdrop="static"
            keyboard={false}
            scrollable="true"
            onHide={props.closeAlert}
        >
            <Modal.Header closeButton>
                <Modal.Title>Status</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.msg.map(res => {
                    return (<p className={res.flag ? "text-success" : "text-danger"}>{res.msg}</p>)
                })}
            </Modal.Body>
        </Modal>
    )
}

export default Alerts