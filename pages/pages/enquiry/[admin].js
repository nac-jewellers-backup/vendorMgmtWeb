import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { PickList } from 'primereact/picklist';

export default function Admin() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [vendor, setVendor] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState([]);

    const onCategoryChange = (e) => {
        let _selectedServices = [...selectedServices];        
        if (e.checked)
            _selectedServices.push(e.value);
        else
            _selectedServices = _selectedServices.filter(service => service.key !== e.value.key);
            setSelectedServices(_selectedServices);
            (_selectedServices.length<0)?setVendor(false):setVendor(false)
    };
    const router = useRouter();
    const { admin } = router.query;
    const page = admin ==='newEnquiry' ? 'Add Enquiry' : 'Edit Enquiry';
    const [value, setValue] = useState('');
    const [adminList, setAdminList] = useState({ id: uuid(), userName: '', userPassword: '', userMobile: '', userEmail: '', userRole: '', userStatus: '', createdOn: '' });
    const toast = useRef(null);   
    const services = [
        {key:'0', name:'Broucher'},
        {key:'1', name:'Box'},
        {key:'2', name:'Pamphlet'},
        {key:'3', name:'Bag'},
        {key:'4', name:'Design'},
        {key:'5', name:'Price Tag'},
        {key:'6', name:'Stamp'}        
    ]
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
    
    const listValue = [
        { name: 'Vendor - 1', code: 'SF' },
        { name: 'Vendor - 2', code: 'LDN' },
        { name: 'Vendor - 3', code: 'PRS' },
        { name: 'Vendor - 4', code: 'IST' },
        { name: 'Vendor - 5', code: 'BRL' },
        { name: 'Vendor - 6', code: 'BRC' },
        { name: 'Vendor - 7', code: 'RM' }
    ];

    const [picklistSourceValue, setPicklistSourceValue] = useState(listValue);
    const [picklistTargetValue, setPicklistTargetValue] = useState([]);

    const [value3, setValue3] = useState('');

    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked) selectedValue.push(e.value);
        else selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setCheckboxValue(selectedValue);
    };

    const handleClick =() =>{
        (selectedServices.length>0)?setVendor(true):setVendor(false)
    }

    const toastAlert = (errMessage) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errMessage, life: 3000 });
    };
    const handleChange = (event) => {
        const { id, value } = event.target;
        setAdminList({ ...adminList, [id]: value })
    };
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
        document.title = page + ' | NAC Vendor';
        document.getElementById('navEnquiry').classList.add('active-route');
    }, []);
    
    return (
        <form method='POST' onSubmit={handleSubmit}>
            <Toast ref={toast} />
            <div className='card'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">{page}</h5>
                    <span className="block md:mt-0 p-input-icon-left">
                        <Button icon={`pi pi-${admin === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false}/>
                        <Button icon="pi pi-arrow-left" severity="danger" type="button" className="ml-1" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/enquiry')} />
                    </span>
                </div>
                <hr />
                <div className='mt-3'>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <InputText
                                id="userName"
                                keyfilter={/^[a-zA-Z ]*$/}
                                className='w-full'
                                autoComplete='off'
                                maxLength={50}
                                value={adminList.userName}
                                onChange={handleChange}
                            />
                            <label htmlFor="userName">Title</label>
                        </span>
                    </div>
                    <div className="field col-12">
                    <span className="p-float-label">
                    <InputTextarea autoResize rows="3" cols="147" />
                    <label htmlFor="userEmail">Description</label>
                    </span>
                    </div>
                    
                    <div className="field col-12">
                        <span className="p-float-label">
                        <Calendar inputId="calendar" value={value3} onChange={(e) => setValue3(e.value)} className="" showIcon />
                        <label htmlFor="userEmail">Deadline Date</label>
                        </span>
                    </div>

                    {admin != 'newEnquiry' ? <div className="field col-12 border-300 border-bottom-1">
                    <h5>Enquiry Status</h5>
                        <div className="grid">
                            <div className="col-12 md:col-1">
                                <div className="field-checkbox">
                                    <Checkbox inputId="checkOption10" name="option" value="open" checked={checkboxValue.indexOf('open') !== -1} onChange={onCheckboxChange} />
                                    <label htmlFor="checkOption10">Open</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-1">
                                <div className="field-checkbox">
                                    <Checkbox inputId="checkOption11" name="option" value="close" checked={checkboxValue.indexOf('close') !== -1} onChange={onCheckboxChange} />
                                    <label htmlFor="checkOption11">Close</label>
                                </div>
                            </div>
                        </div>
                    </div> : <></>}

                    {admin != 'newEnquiry' ? <div className="field col-12 border-300 border-bottom-1">
                    <h5>Status</h5>
                        <div className="grid">
                            <div className="col-12 md:col-1">
                                <div className="field-checkbox">
                                    <Checkbox inputId="checkOption8" name="option" value="active" checked={checkboxValue.indexOf('active') !== -1} onChange={onCheckboxChange} />
                                    <label htmlFor="checkOption8">Active</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-1">
                                <div className="field-checkbox">
                                    <Checkbox inputId="checkOption9" name="option" value="inactive" checked={checkboxValue.indexOf('inactive') !== -1} onChange={onCheckboxChange} />
                                    <label htmlFor="checkOption9">Inactive</label>
                                </div>
                            </div>
                        </div>
                    </div> : <></>}

                    <div className="field col-12 border-300 border-bottom-1">
                        <h5>Services</h5>
                        <div className="grid">                            
                            {services.map((service)=>  
                                <div className="col-12 md:col-1" key={service.key}>
                                    <div className="field-checkbox">
                                        <Checkbox inputId={service.key} name="option" value={service} checked={selectedServices.some((item) => item.key === service.key)} onChange={onCategoryChange} />
                                        <label htmlFor={service.key}>{service.name}</label>
                                    </div>
                                </div>
                        )}
                        </div>
                        <Button label="Choose" className="" type="button" severity="secondary" outlined onClick={handleClick}/>
                    </div>

                    {vendor ? <div className="col-12 xl:col-10">
                        <div className="card">
                            <h5>PickList</h5>
                            <PickList
                                source={picklistSourceValue}
                                target={picklistTargetValue}
                                sourceHeader="From"
                                targetHeader="To"
                                itemTemplate={(item) => <div>{item.name}</div>}
                                onChange={(e) => {
                                    setPicklistSourceValue(e.source);
                                    setPicklistTargetValue(e.target);
                                }}
                                sourceStyle={{ height: '200px' }}
                                targetStyle={{ height: '200px' }}
                            ></PickList>
                        </div>
                     </div>:<></>}

                </div>
            </div>
        </form>
    )
}