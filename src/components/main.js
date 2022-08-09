import React, { useState, Fragment } from "react";
import { Form, Col, Row, FormGroup, FormControl, FormLabel, Button, Spinner, Dropdown, } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

const formValidation = (field) => {
    const errors = {}

    if (!field.svnurl) {
        errors.svnurl = "*Required."
    }

    if (!field.svnrepo) {
        errors.svnrepo = "*Required."
    }

    if (!field.svnbranch || field.svnbranch.includes('-')) {
        errors.svnbranch = "*Required."
    }

    if (!field.svnrevision || field.svnrevision.includes('-')) {
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
    const [isSVNValidated, setIsSVNValidated] = useState(false)
    const [isVisibleField, setIsVisibleField] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [branches, setBranches] = useState([])
    const [revisions, setRevisions] = useState([])

    const getBranchInfo = (value) => {
        setIsLoading(true)
        const data = {
            "url": value.svnurl + value.svnrepo,
            "username": value.svnusername,
            "password": value.svnpassword
        }
        const baseURL = "http://localhost:5000/svnbranches"
        axios.post(baseURL, data).then(res => {
            setIsSVNValidated(true)
            setBranches(res.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    const getRevisionInfo = (value, branch) => {
        setIsLoading(true)
        const data = {
            "url": value.svnurl + value.svnrepo,
            "branch": branch,
            "username": value.svnusername,
            "password": value.svnpassword
        }
        const baseURL = "http://localhost:5000/svnrevisions"
        axios.post(baseURL, data).then(res => {
            setRevisions(res.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    const formik = useFormik({
        initialValues: {
            svnurl: "",
            svnrepo: "",
            svnbranch: "- Select SVN Branch -",
            svnrevision: "- Select Revision -",
            svnusername: "",
            svnpassword: "",
            gitusername: "",
            gitpassword: ""
        },
        validate: formValidation,
        onSubmit: async (value) => {
            setIsLoading(true)
            const data = {
                "url": value.svnurl + value.svnrepo,
                "repo": value.svnrepo,
                "branch": value.svnbranch,
                "revision": value.svnrevision,
                "username": value.svnusername,
                "password": value.svnpassword,
                "gitusername" : value.gitusername,
                "gitpassword" : value.gitpassword
            }
            const baseURL = "http://localhost:5000/svngitmigrate"
            axios.post(baseURL, data).then(res => {
                alert(res.data)
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
            })
        }
    })

    console.log(formik)
    return (
        <Form className="container" onSubmit={formik.handleSubmit}>
            <h4 className="text-center m-5">SVN - GITHUB</h4>
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
            {!isSVNValidated &&
                <div className="d-flex justify-content-center mt-5">
                    {!isLoading && (<Button variant="primary" size="lg" onClick={(e) => { getBranchInfo(formik.values) }}>Submit</Button>)}
                    {isLoading && (
                        <Button variant="primary" className="mt-2" size="lg" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{" "}
                            Fetching..
                            <span className="visually-hidden">Loading...</span>
                        </Button>
                    )}
                </div>
            }

            {isSVNValidated &&
                <>
                    <Row>
                        <Col md="6">
                            <Dropdown className="dropbox mt-5">
                                <Dropdown.Toggle
                                    name="svnbranch"
                                    onBlur={formik.handleBlur}
                                    variant={`outline-${!formik.touched.svnbranch
                                        ? `primary`
                                        : !formik.values.svnbranch.includes(
                                            "-"
                                        ) && formik.touched.svnbranch
                                            ? `success`
                                            : formik.values.svnbranch.includes("-") &&
                                                formik.touched.svnbranch
                                                ? `danger`
                                                : ``
                                        }`}
                                    className="w-100"
                                >
                                    {formik.values.svnbranch}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100" >
                                    {branches.map(
                                        (branch, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <Dropdown.Item
                                                        className="text-center"
                                                        active={formik.values.svnbranch.includes(
                                                            branch
                                                        )}
                                                        onClick={() => {
                                                            formik.setFieldValue(
                                                                "svnbranch",
                                                                branch
                                                            )
                                                            getRevisionInfo(formik.values, branch)
                                                        }}
                                                    >
                                                        {branch}
                                                    </Dropdown.Item>
                                                    {branches
                                                        .length -
                                                        1 >
                                                        index && <Dropdown.Divider />}
                                                </Fragment>
                                            );
                                        }
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md="6">
                            <Dropdown className="dropbox mt-5">
                                <Dropdown.Toggle
                                    name="svnrevision"
                                    onBlur={formik.handleBlur}
                                    variant={`outline-${!formik.touched.svnrevision
                                        ? `primary`
                                        : !formik.values.svnrevision.includes(
                                            "-"
                                        ) && formik.touched.svnrevision
                                            ? `success`
                                            : formik.values.svnrevision.includes("-") &&
                                                formik.touched.svnrevision
                                                ? `danger`
                                                : ``
                                        }`}
                                    className="w-100"
                                >
                                    {formik.values.svnrevision}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100" >
                                    {revisions.map(
                                        (revision, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <Dropdown.Item
                                                        className="text-center"
                                                        active={formik.values.svnrevision.includes(
                                                            revision
                                                        )}
                                                        onClick={() =>
                                                            formik.setFieldValue(
                                                                "svnrevision",
                                                                revision
                                                            )
                                                        }
                                                    >
                                                        {revision}
                                                    </Dropdown.Item>
                                                    {revisions
                                                        .length -
                                                        1 >
                                                        index && <Dropdown.Divider />}
                                                </Fragment>
                                            );
                                        }
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
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
                </>
            }

            {isSVNValidated &&
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
            }
        </Form>
    )

}
export default MainPage