import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { sendMessage } from "../../../Utils/Api/Services/apiServices";

function ContactSection({ contactData }) {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
  });
  return (
    <>
      {contactData && (
        <div
          className="ftco_section contact_section ftco-no-pb"
          id="contact_section"
        >
          <div className="container">
            <div className="row justify-content-center mb-5 pb-3">
              <div className="col-md-7 heading_section text-center ftco-animate">
                <h1 className="big big-2">Contact Me</h1>
                <h2 className="mb-4">Contact Me</h2>
                {contactData?.description !== "" && (
                  <p>{contactData?.description}</p>
                )}
              </div>
            </div>

            <div className="row d-flex justify-content-center contact-info mb-5">
              {contactData?.address !== "" && (
                <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                  <div className="align-self-stretch box p-4 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="icon-map-signs"></span>
                    </div>
                    <h3 className="mb-4">Address</h3>
                    <p>{contactData?.address}</p>
                  </div>
                </div>
              )}
              {contactData?.phone !== "" && (
                <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                  <div className="align-self-stretch box p-4 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="icon-phone2"></span>
                    </div>
                    <h3 className="mb-4">Contact Number</h3>
                    <p>
                      <a
                        href={`tel//${contactData?.phone}`}
                        style={{ color: "white" }}
                      >
                        {contactData?.phone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {contactData?.email !== "" && (
                <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                  <div className="align-self-stretch box p-4 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="icon-paper-plane"></span>
                    </div>
                    <h3 className="mb-4">Email Address</h3>
                    <p>
                      <a
                        href={`mailto:${contactData?.email}`}
                        style={{ color: "white" }}
                      >
                        {contactData?.email}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {contactData?.website !== "" && (
                <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                  <div className="align-self-stretch box p-4 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="icon-globe"></span>
                    </div>
                    <h3 className="mb-4">Website</h3>
                    <p>
                      <a href={contactData?.website} style={{ color: "white" }}>
                        {contactData?.website}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="row no-gutters block-9 justify-content-center">
              <div className="col-lg-6 order-md-last d-flex">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                      sendMessage(values, setSubmitting, resetForm);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="bg-light p-4 p-md-5 contact-form rounded"
                      style={{width:"100%"}}
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.name && errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Subject"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.subject && errors.subject && (
                          <div className="text-danger">{errors.subject}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <textarea
                          name="message"
                          cols="30"
                          rows="7"
                          className="form-control"
                          placeholder="Message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></textarea>
                        {touched.message && errors.message && (
                          <div className="text-danger">{errors.message}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary py-3 px-5"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactSection;
