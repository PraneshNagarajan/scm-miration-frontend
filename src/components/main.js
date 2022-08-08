import React, { useState } from "react";
import { Form, Col, Row, FormGroup, FormControl, FormLabel, Button, Spinner } from "react-bootstrap";
import { useFormik } from "formik";

const formValidation = (field) => {
    const errors = {}

    if (!field.svnurl) {
        errors.svnurl = "*Required."
    }

    if (!field.svnrepo) {
        errors.svnrepo = "*Required."
    }

    if (!field.svnbranch) {
        errors.svnbranch = "*Required."
    }

    if (!field.svnrevision) {
        errors.svnrevision = "*Required."
    }

    if (!field.svnusername) {
        errors.svnusername = "*Required."
    }

    if (!field.svnpassword) {
        errors.svnpassword = "*Required."
    }

    if (!field.gitusername) {
        errors.gitusername = "*Required."
    }

    if (!field.gitpassword) {
        errors.gitpassword = "*Required."
    }

    return errors
}

const MainPage = () => {

    const [isVisibleField, setIsVisibleField] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading)

    const formik = useFormik({
        initialValues: {
            svnurl: "",
            svnrepo: "",
            svnbranch: "",
            svnrevision: "",
            svnusername: "",
            svnpassword: "",
            gitusername: "",
            gitpassword: ""
        },
        validate: formValidation,
        onSubmit: async (value) => {
            setIsLoading(!isLoading)
        }
    })

    // console.log(formik)
    return (
        <Form className="container" onSubmit={formik.handleSubmit}>
            <h4 className="text-center m-5">SVN - GITHUB Migration</h4>
            <Row>
                <h4 className="my-2">SVN Repo : </h4>
                <Col md="6">
                    <FormGroup className="mt-2">
                        <FormLabel>Enter SVN Repo url :</FormLabel>
                        <FormControl type="text"
                            name="svnurl"
                            value={formik.values.svnurl}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.svnurl && !formik.errors.svnurl}
                            isInvalid={formik.touched.svnurl && formik.errors.svnurl} />
                        {formik.touched.svnurl && !formik.errors.svnurl && <p className="text-muted">* without repo name</p>}
                        {formik.touched.svnurl && formik.errors.svnurl && <p className="text-danger">{formik.errors.svnurl}</p>}
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup className="mt-2">
                        <FormLabel>Enter SVN Repo Name :</FormLabel>
                        <FormControl
                            type="text"
                            name="svnrepo"
                            value={formik.values.svnrepo}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.svnrepo && !formik.errors.svnrepo}
                            isInvalid={formik.touched.svnrepo && formik.errors.svnrepo} />
                        {formik.touched.svnrepo && formik.errors.svnrepo && <p className="text-danger">{formik.errors.svnrepo}</p>}
                    </FormGroup>
                </Col>


                <Col md="6">
                    <FormGroup className="mt-2">
                        <FormLabel>Enter SVN Branch :</FormLabel>
                        <FormControl
                            type="text"
                            name="svnbranch"
                            value={formik.values.svnbranch}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.svnbranch && !formik.errors.svnbranch}
                            isInvalid={formik.touched.svnbranch && formik.errors.svnbranch} />
                        {formik.touched.svnbranch && formik.errors.svnbranch && <p className="text-danger">{formik.errors.svnbranch}</p>}
                    </FormGroup>
                </Col>
                <Col md="6" className="mt-2">
                    <FormGroup>
                        <FormLabel>Enter Revision :</FormLabel>
                        <FormControl
                            type="text"
                            name="svnrevision"
                            value={formik.values.svnrevision}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.svnrevision && !formik.errors.svnrevision}
                            isInvalid={formik.touched.svnrevision && formik.errors.svnrevision} />
                        {formik.touched.svnrevision && formik.errors.svnrevision && <p className="text-danger">{formik.errors.svnrevision}</p>}
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup className="mt-2">
                        <FormLabel>Enter SVN Repo username:</FormLabel>
                        <FormControl
                            type="text"
                            name="svnusername"
                            value={formik.values.svnusername}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.svnusername && !formik.errors.svnusername}
                            isInvalid={formik.touched.svnusername && formik.errors.svnusername} />
                        {formik.touched.svnusername && formik.errors.svnusername && <p className="text-danger">{formik.errors.svnusername}</p>}
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup className="mt-2">
                        <FormLabel>Enter SVN Repo password:</FormLabel>
                        <FormControl
                            type="password"
                            name="svnpassword"
                            value={formik.values.svnpassword}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.svnpassword && !formik.errors.svnpassword}
                            isInvalid={formik.touched.svnpassword && formik.errors.svnpassword} />
                        {formik.touched.svnpassword && formik.errors.svnpassword && <p className="text-danger">{formik.errors.svnpassword}</p>}
                    </FormGroup>
                </Col>
            </Row>
            <Row className="mt-5">
                <h4 className="my-2">GITHUB Repo:</h4>
                <Col md="6">
                    <FormGroup className="mt-2">
                        <FormLabel>Enter GitHub username:</FormLabel>
                        <FormControl
                            type="text"
                            name="gitusername"
                            value={formik.values.gitusername}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.gitusername && !formik.errors.gitusername}
                            isInvalid={formik.touched.gitusername && formik.errors.gitusername} />
                        {formik.touched.gitusername && formik.errors.gitusername && <p className="text-danger">{formik.errors.gitusername}</p>}
                    </FormGroup>
                </Col>
                <Col md="6" className="mt-2">
                    <FormGroup>
                        <FormLabel>Enter GitHub token:</FormLabel>
                        <FormControl
                            type="password"
                            name="gitpassword"
                            value={formik.values.gitpassword}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={formik.touched.gitpassword && !formik.errors.gitpassword}
                            isInvalid={formik.touched.gitpassword && formik.errors.gitpassword} />
                        {formik.touched.gitpassword && formik.errors.gitpassword && <p className="text-danger">{formik.errors.gitpassword}</p>}
                    </FormGroup>
                </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
                {!isLoading && (<Button variant="primary" size="lg" type="submit" disabled={!(formik.dirty && formik.isValid)} >Submit</Button>)}
                {isLoading && (
                    <Button variant="primary" className="mt-2" size="lg" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />{" "}
                        Processing..
                        <span className="visually-hidden">Loading...</span>
                    </Button>
                )}
            </div>
        </Form>
    )

}
export default MainPage