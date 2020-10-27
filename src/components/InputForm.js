import React from "react";
import { useForm } from "react-hook-form";
import { postProduct } from '../services/HttpServices';
import { Row, Col } from 'react-flexbox-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function InputForm({cancel}) {

  const { register, errors, reset, handleSubmit, formState } = useForm();

  const onSubmit = (data, e) => {

      postProduct(data).then((resp) => {
          if ( resp.status === 201 || resp.status === 200 ) {
            toast.success("Item successfully registered!");
            e.target.reset();
          } else {
            toast.error("Something went wrong...!");
          }
      })
      .catch((error) =>{
        console.log(error);
        toast.error("Something went wrong...!");
      })
  };

   
  return (
    <>
    <form className="form-cs" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs={12}>
          <label>Name</label>
          <input className="input-cs" name="name" type="text" ref={register({ required: true, maxLength: 140 })} />
          {errors.name && (<p className="p-error">Name is required</p>)}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label>Price</label>
          <input className="input-cs" name="value" type="text" ref={register({ required: true, pattern: /^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/ })} />
          {errors.value && (<p className="p-error">Price is required and only numbers</p>)}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <label>Url of Image</label>
          <input className="input-cs" name="imageUrl" type="text" ref={register({ pattern: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ })} />
          {errors.imageUrl && (<p className="p-error">Url invalid</p>)}
        </Col>
      </Row>
      <Row>
        <Col xs={4} md={6}>
          <input className="btn-cs" type="submit" />
        </Col>
        <Col xs={4} md={6}>
          <button className="btn-cs" onClick={() => {cancel(true)} }>Cancel</button>
        </Col>
      </Row>
    </form>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
    />
    </>
  );
}