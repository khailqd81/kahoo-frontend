// import React from 'react';
// import { Formik, Form, Field } from 'formik';

// function validateEmail(value) {
//     let error;
//     if (!value) {
//         error = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//         error = 'Invalid email address';
//     }
//     return error;
// }

// function validateUsername(value) {
//     let error;
//     if (!value) {
//         error = 'Required';
//     }
//     return error;
// }

// function RegisterForm({handleSubmitForm}) {
//     return (
//         <Formik
//             initialValues={{
//                 username: '',
//                 password: '',
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//             }}
//             onSubmit={values => {
//                 console.log(values);
//                 handleSubmitForm(values);
//             }}
//         >
//             {({ errors, touched, isValidating }) => (
//                 <Form>
//                     <div>
//                         <label className='form-label' htmlFor='username'>Username</label>
//                         <Field className="form-control" name="username" validate={validateUsername} />
//                         {errors.username && touched.username && <div className='text-danger fst-italic'>{errors.username}</div>}
//                     </div>

//                     <div className='mt-2'>
//                         <label className='form-label' htmlFor='password'>Password</label>
//                         <Field className="form-control" name="password" validate={validateUsername} type="password"/>
//                         {errors.password && touched.password && <div className='text-danger fst-italic'>{errors.password}</div>}
//                     </div>
//                     <div className='mt-2'>
//                         <label className='form-label' htmlFor='email'>Email</label>
//                         <Field className="form-control" name="email" validate={validateEmail} />
//                         {errors.email && touched.email && <div className='text-danger fst-italic'>{errors.email}</div>}
//                     </div>
//                     <div className='mt-2'>
//                         <label className='form-label' htmlFor='firstName'>FirstName</label>
//                         <Field className="form-control" name="firstName" validate={validateUsername} />
//                         {errors.firstName && touched.firstName && <div className='text-danger fst-italic'>{errors.firstName}</div>}
//                     </div>
//                     <div className='mt-2'>
//                         <label className='form-label' htmlFor='lastName'>LastName</label>
//                         <Field className="form-control" name="lastName" validate={validateUsername} />
//                         {errors.lastName && touched.lastName && <div className='text-danger fst-italic'>{errors.lastName}</div>}
//                     </div>
//                     <button className='btn btn-primary mt-4 mb-2' type="submit">Submit</button>
//                 </Form>
//             )}
//         </Formik>
//     )
// };

// export default RegisterForm
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
const schema = yup.object().shape({
    username: yup.string().required("is required"),
    password: yup.string().required("is required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().email("invalid email format").required("is required"),
  }).required();

function RegisterForm(){
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
});

const navigate = useNavigate();

const mutation = useMutation((data) => {
    console.log("data in mutation: ", data)
    return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/register`, {...data,  roles:[data.roles]});
}
)
const onSubmit = (data) => {
    mutation.mutate(data)
};

if (mutation.isSuccess) {
    navigate("/");
}

return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-fit mx-auto my-4 py-6 px-10 shadow-lg border rounded bg-white absolute left-[50%] -translate-x-1/2">
        <p className="text-center">Sign Up Form</p>
        {mutation.isError && <p className="border border-red-500 text-red-500 p-2 text-center my-2">{mutation.error.response?.data?.message || mutation.error.message}</p>}

        <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input name="username"  type="text" className="min-w-[30vw] px-4 py-2 rounded mb-1 mt-2 border border-gray-400 outline-cyan-300" {...register("username")} placeholder="Username" />
            <p className="mb-4 text-red-500 text-sm">{errors.username?.message}</p>
        </div>

        <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="min-w-[30vw] px-4 py-2 rounded mb-1 mt-2 border border-gray-400 outline-cyan-300" {...register("password")} placeholder="Password" />
            <p className="mb-4 text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input name="confirmPassword" type="password" className="min-w-[30vw] px-4 py-2 rounded mb-1 mt-2 border border-gray-400 outline-cyan-300" {...register("confirmPassword")} placeholder="Confirm Password" />
            <p className="mb-4 text-red-500 text-sm">{errors.confirmPassword?.message}</p>
        </div>
        <div className="flex flex-col">
            <label htmlFor="firstName">Firstname</label>
            <input name="firstName" type="text" className="min-w-[30vw] px-4 py-2 rounded mb-1 mt-2 border border-gray-400 outline-cyan-300" {...register("firstName")} placeholder="Firstname" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="lastName">Lastname</label>
            <input name="lastName" type="text" className="min-w-[30vw] px-4 py-2 rounded mb-1 mt-2 border border-gray-400 outline-cyan-300" {...register("lastName")} placeholder="Lastname" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" className="min-w-[30vw] px-4 py-2 rounded mb-1 mt-2 border border-gray-400 outline-cyan-300" {...register("email")} placeholder="Email" />
            <p className="mb-4 text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col">
            <label htmlFor="roles">Roles</label>
            <select className="outline-none px-4 py-2 border border-gray-400 mb-8" {...register("roles")}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
            </select>
            <p className="mb-4 text-red-500 text-sm">{errors.roles?.message}</p>
        </div>
        <button type="submit" className="py-1 rounded w-full text-center bg-green-400 block hover:bg-green-300" >Sign up</button>
        <Link className="text-center mb-2 mt-4 block w-full underline" to="/login">Login</Link>
    </form>
);
}

export default RegisterForm;