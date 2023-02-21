import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const ValidationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };
  return (
    <div className="register">
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form">
          <label htmlFor="username">*Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field autoComplete="off" id="username" name="username" />
          <label htmlFor="password">*Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            id="password"
            name="password"
            type="password"
          />
          <p>* required</p>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
