import React, { useState, Fragment, useRef } from "react";
import { Form, Col, Row, FormGroup, FormControl, FormLabel, Button, Spinner, Dropdown, } from "react-bootstrap";
import { useFormik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import Alerts from "./Alert";

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

    if (!field.svnrevisions) {
        errors.svnrevisions = "*Required."
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
    const multiselectRevisionlRef = useRef()
    const [isSVNValidated, setIsSVNValidated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [branches, setBranches] = useState([])
    const [revisions, setRevisions] = useState([])
    const [selectedRevisions, setSelectedRevisions] = useState([])
    const [show, setShow] = useState(false)
    const [alertMsg, setAlertMsg] = useState([])
    const jwt_token = sessionStorage.getItem("access_token")
    url = "https://52.91.77.217/"

    let headers = {
        'Authorization': `JWT ${jwt_token}` 
      }
      console.log(headers)

    const getBranchInfo = (value) => {
        setIsLoading(true)
        const data = {
            "url": value.svnurl,
            "username": value.svnusername,
            "password": value.svnpassword
        }

        const baseURL = `${url}/svn/${value.svnrepo}`
        axios.post(baseURL, data ,headers ).then(res => {
            setIsSVNValidated(true)
            setBranches(res.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    const getRevisionInfo = (value, branch) => {
        setSelectedRevisions([])
        formik.setFieldValue("svnrevisions", "")
        multiselectRevisionlRef.current.resetSelectedValues()
        setIsLoading(true)
        const data = {
            "url": value.svnurl,
            "username": value.svnusername,
            "password": value.svnpassword
        }
        const baseURL = `/${url}/svn/${value.svnrepo}/branch/${branch}/revisions`
        axios.post(baseURL, data, headers).then(res => {
            let revlist = []
            res.data.map((revision, id) => {
                revlist.push({ id, revision })
            })
            setRevisions(revlist)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            setShow(true)
            setAlertMsg([{ msg: String(err), flag: false }])
        })
    }

    const formik = useFormik({
        initialValues: {
            svnurl: "",
            svnrepo: "",
            svnbranch: "- Select SVN Branch -",
            svnrevisions: "",
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
                "revisions": selectedRevisions,
                "username": value.svnusername,
                "password": value.svnpassword,
                "gitusername": value.gitusername,
                "gitpassword": value.gitpassword
            }
            const baseURL = `${url}/svngitmigrate`
            axios.post(baseURL, data, headers).then(res => {
                setIsLoading(false)
                setShow(true)
                setAlertMsg(res.data)
            }).catch(err => {
                setIsLoading(false)
                setShow(true)
                setAlertMsg([{ msg: String(err), flag: false }])
            })
            setSelectedRevisions([])
            formik.setFieldValue("svnrevisions", "")
            multiselectRevisionlRef.current.resetSelectedValues()
        }
    })

    const onRemove = (list, item) => {
        let options = selectedRevisions
        let index = revisions.findIndex((id) => id === item.revision);
        options.splice(index, 1);
        setSelectedRevisions(options)
        formik.setFieldValue("svnrevisions", options.join(" "));
    };

    const onSelect = (list, item) => {
        let options = selectedRevisions
        options.push(item.revision);
        setSelectedRevisions(options)
        formik.setFieldValue("svnrevisions", options.join(" "))
        formik.setFieldTouched("svnrevisions", true)
    }

    const popupHandler = () => {
        setShow(false)
    }

    return (
        <>
            <Alerts msg={alertMsg} show={show} closeAlert={popupHandler} />
            <Form className="container" onSubmit={formik.handleSubmit}>
                <h4 className="text-center m-4">SVN - GITHUB</h4>
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
                        <Row className="mt-5">
                            <Col md="6">
                                <FormLabel>Select SVN Branch: </FormLabel>
                                <Dropdown className="dropbox">
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
                                <FormLabel>Select Revisions: </FormLabel>
                                <Multiselect
                                    ref={multiselectRevisionlRef}
                                    displayValue="revision"
                                    onRemove={onRemove}
                                    onSelect={onSelect}
                                    options={revisions}
                                    showCheckbox="false"
                                    placeholder={
                                        selectedRevisions.length > 0
                                            ? ""
                                            : "- Select Revision -"
                                    }
                                />
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
        </>
    )

}
export default MainPage