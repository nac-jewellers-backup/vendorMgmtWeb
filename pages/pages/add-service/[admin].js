import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { getSession } from '../../util';

export default function Admin() {
    const [service_name,setName] = useState("");
    const router = useRouter();
    const { admin } = router.query;
    const page = admin === 'newService' ? 'Add' : 'Edit';
    const [value, setValue] = useState('');
    const [adminList, setAdminList] = useState({ id: uuid(), userName: '', userPassword: '', userMobile: '', userEmail: '', userRole: '', userStatus: '', createdOn: '' });
    const toast = useRef(null);
    const adminRole = [
        { name: 'Super Admin', code: 'Super Admin' },
        { name: 'Admin', code: 'Admin' }
    ];
    const adminStatus = [
        { name: 'Active', code: 'Active' },
        { name: 'Inactive', code: 'Inactive' }
    ];
    const header = (<div className="font-bold mb-3">Pick a password</div>);
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    const toastAlert = (errMessage) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errMessage, life: 3000 });
    };

    // const handleChange = (event) => {
    //     const { id, value } = event.target;
    //     setAdminList({ ...adminList, [id]: value })
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!adminList.userName) { toastAlert('Enter User Name'); }
        else if (!adminList.userMobile) { toastAlert('Enter Mobile Number'); }
        else if (!adminList.userMobile.length !== 10 ) { toastAlert('Enter Valid Mobile Number'); }
        else if (!adminList.userEmail) { toastAlert('Enter EMail Address'); }
        else if (!adminList.userRole) { toastAlert('Select Role'); }
        else if (!adminList.userStatus) { toastAlert('Select Status'); }
    };

    useEffect(() => {
        document.title = page + ' Service | NAC Vendor';
        document.getElementById('navService').classList.add('active-route');
    }, []);

    const [service_validation,validat_Serv] = useState("");

    // Add Service
    const postUser = async(e) => {
    e.preventDefault();
    if(service_name !=""){
       await axios.post(`${process.env.API_URL}/add_service`, {session:getSession(), service:{id: uuid(), service_name:service_name, type: 'add'}},{headers:{'x-api-key':process.env.API_KEY }})
    .then(res => {   
            console.log(res.data);
            router.push("/pages/add-service");
    }
    ).catch(err=>{
        console.log(err.response.data);
        validat_Serv(err.response.data.message)
    })  }else{
        validat_Serv("Enter Valid Service Name")
        }
    }
    return (
        <form method='POST' onSubmit={postUser}>
            <Toast ref={toast} />
            <div className='card'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">{page} Service</h5>
                    <span className="block md:mt-0 p-input-icon-left">
                        <Button icon={`pi pi-${admin === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false}/>
                        <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" type="button" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/add-service')} />
                    </span>
                </div>
                <hr />
                <div className='mt-3'>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <InputText
                                type="text"
                                id="service_name"
                                // keyfilter={/^[a-zA-Z ]*$/}
                                className='w-full'
                                autoComplete='off'
                                maxLength={100}
                                value={service_name} onChange={(e) => setName(e.target.value) }
                            />
                            <label htmlFor="service_name">Service Name</label>
                        </span>
                    </div>
                    <lable className="ml-2 text-red-600">{service_validation}</lable>
                </div>
            </div>
        </form>
    )
}