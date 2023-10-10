import React from "react";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import Swal from "sweetalert2";

export const ConfirmEmail = () => {
  const { accountService } = useService();
  const navigate = useNavigate();


  const { mutateAsync: mutateConfirmEmail } = useMutation((body: any) =>
    accountService.confirmEmail(body)
  );

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const tokenParam = params.token || "";
    const emailParam = params.email || "";

    const reqBody = {
      token: tokenParam,
      email: emailParam,
    };
    mutateConfirmEmail(reqBody)
    .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
  }, [mutateConfirmEmail]);


  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
      Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Email has been successfully verified',
        showConfirmButton: false,
        timer: 1500
      })
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);


  return <div style={{display:"flex", height:"100vh", justifyContent:"center",alignItems:"center", background:"white"}}>
  <h1>Email Conifrmed...</h1>
  <Loading/>
</div>
};
