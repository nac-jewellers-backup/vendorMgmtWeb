import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

function FormLayoutDemo(){

const [mobile_number,setName] = useState("");
// Mobile validation message
const [mobile_validate,validat_mob] = useState("");
// Show & Hide previous page
const [Mobile_vefiy,setMobile_vefiy] = useState(1);
const [Otp_vefiy,setOtp_vefiy] = useState(0);
const [Changepwd_vefiy,setChangepwd_vefiy] = useState(0);
// Otp validate
const [otp,setOtp] = useState("")
const [confirmOtp,setConfirmOtp] = useState("");

const postUser = async() => {
    if(mobile_number && mobile_number.length ==10){
       await axios.post('https://rqc4db3lq5.execute-api.us-east-2.amazonaws.com/dev/verify',{ tableName: "nac_cms_admin", mobile_number:mobile_number},{headers:{'x-api-key':'8DCiyiPd0f6ojQaYPwsH42IpPacBXf976Yt4TCIr'}})
    .then(res => {
        const {data} = res.data;        
            console.log(res.data);
            // validat_mob("Valid No") 
            setMobile_vefiy(0)
            setOtp_vefiy(1)
            setConfirmOtp(data.otp);
    }
    ).catch(err=>{
        console.log(err.response.data);
        validat_mob(err.response.data.message)
    })
    }else{
        validat_mob("Enter Valid Mobile No")
    }
}

// Otp == confirmOtp Check
const check_otp =()=>{
    console.log(otp, confirmOtp);
    if (otp.toString() === confirmOtp.toString()){
        setMobile_vefiy(0)
        setOtp_vefiy(0)
        setChangepwd_vefiy(1)
    } else{
        validat_mob("Enter Valid OTP")
    }
}

    return (
        <div className="grid">
             {Mobile_vefiy ?
                <div className="col-12">
                <div className="card">
                    <h5>Enter Your Mobile No</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="mobile_number">Mobile No</label>  
                            <InputText
                                type="text"
                                id="contactpersonNo"
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                maxLength={10}
                                value={mobile_number} onChange={(e) => setName(e.target.value) }
                            />
                        </div>
                            <lable className="ml-2 text-red-600">{mobile_validate}</lable>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button onClick={postUser} label="Submit" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                    </div>
                </div>
            </div>:  <></>}

            {Otp_vefiy ?<div className="col-12">
                <div className="card">
                    <h5>Enter Your OTP</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-2">
                        <InputText
                                type="text"
                                id="contactpersonNo"
                                keyfilter="pint"
                                className='w-full text-2xl text-center'
                                autoComplete='off'
                                maxLength={4}
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                                placeholder='****'
                            />
                        </div>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button label="Verify" icon="pi pi-lock" className="p-button p-component w-2" onClick={check_otp}></Button>
                        </div>
                        <lable className="ml-2 text-red-600">{mobile_validate}</lable>
                    </div>
                </div>
            </div>:<></>}

          {Changepwd_vefiy?<div className="col-12">
                <div className="card">
                    <h5>Change Password</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="firstname2">Old Password</label>
                            <InputText id="firstname2" type="text" placeholder='******' />
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="lastname2">New Password</label>
                            <InputText id="lastname2" type="text" placeholder='******'/>
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="lastname2">Confirm Password</label>
                            <InputText id="lastname2" type="text" placeholder='******'/>
                        </div>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button label="Change Password" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                    </div>
                </div>
            </div>:<></>}
        </div>
    );
};

export default FormLayoutDemo;
