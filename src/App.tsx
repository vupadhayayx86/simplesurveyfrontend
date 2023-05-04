import { useEffect, useState } from "react";
import SurveyForm from "./components/SurveyForm";
import { useCookies } from 'react-cookie';

const App=()=>{
  const [cookies, setCookie] = useCookies(['jwtCookieget']);
  const [cookieData,setCookieData]=useState("Hello Cookie")
  useEffect(()=>{
    const coo=cookies.jwtCookieget?cookies.jwtCookieget.value:" no cookies"
    setCookieData(coo)
  },[cookieData])
  return(
    <div className="container p-5">
      
      <h1 className="mb-3"><u>Registration Form</u></h1>
      <h1>Cookie Data{cookieData}</h1>
      <SurveyForm />
    </div>
  )
}

export default App;