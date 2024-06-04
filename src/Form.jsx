import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
export function Form(){
    
    const schema=yup.object().shape(
        {
            fullname:yup.string().required("full name is required"),
            email: yup.string().required().email(),
            age: yup.number().required("age is required and must be greater then 18").integer().min(18),
            password:yup.string().required().min(4).max(20),
            confirmPassword:yup.string().oneOf([yup.ref("password"),null],"password does not match").required(),
        }
    )
    let{register,handleSubmit,formState: {errors}}=useForm(
        {
            resolver:yupResolver(schema)
        }
    );
    function onSubmit(data){
        console.log(data)
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full name..." {...register("fullname")} />
            <p>{errors.fullname?.message}</p>
            <input type="text" placeholder="Email..." {...register("email")}/>
            <p>{errors.email?.message}</p>
            <input type="number" placeholder="Age..." {...register("age")} />
            <p>{errors.age?.message}</p>
            <input type="password" placeholder="Password..." {...register("password")}/>
            <p>{errors.password?.message}</p>
            <input type="password" placeholder="Confirm password..." {...register("confirmPassword")}/>
            <p>{errors.confirmPassword?.message}</p>
            <input type="submit" id="button" />
        </form>
    )
}