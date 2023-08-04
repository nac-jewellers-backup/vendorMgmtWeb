import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';


export default function Admin() {
    const [checkboxValue, setCheckboxValue] = useState([]);
    const router = useRouter();
    const { admin } = router.query;
    const [userList, setUserList] = useState([{
        id: uuid(),
        userName: '1',
        userMobile: 'SM30001',
        userEmail: '80000',
        userRole: '27-Jul-2023',
        userStatus: 'Cash',
    }]);
    
  
        let emptyProduct = {
            id: null,
            name: '',
            image: null,
            description: '',
            category: null,
            price: 0,
            quantity: 0,
            rating: 0,
            inventoryStatus: 'INSTOCK'
        };
        
    const page = admin === 'newOrder' ? 'Add Order' : 'Vendor Quotes';
    const [value, setValue] = useState('');
    const [adminList, setAdminList] = useState({ id: uuid(), titleName: '', description: '', vendorName: '', orderDate: '', orderAmt: '', balancetAmt: ''});
    const toast = useRef(null);
    const adminRole = [
        { name: 'Super Admin', code: 'Super Admin' },
        { name: 'Admin', code: 'Admin' }
    ];
    const adminStatus = [
        { name: 'Active', code: 'Active' },
        { name: 'Inactive', code: 'Inactive' }
    ];

    const [dropdownItem, setDropdownItem] = useState(null);
    const [dropdownValues, setDropdownValues] = useState(null);
    const dropdownItems = [
        { name: 'Select One', code: '' },
        { name: 'Online', code: 'Online' },
        { name: 'Cash', code: 'Cash' },
        { name: 'Cheque', code: 'Cheque' },
        { name: 'DD', code: 'DD' }
    ];

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [value3, setValue3] = useState('');

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


    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.code = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );

    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked) selectedValue.push(e.value);
        else selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setCheckboxValue(selectedValue);
    };

    const toastAlert = (errMessage) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errMessage, life: 3000 });
    };
    const handleChange = (event) => {
        const { id, value } = event.target;
        setAdminList({ ...adminList, [id]: value })
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!adminList.titleName) { toastAlert('Enter Title'); }
        else if (!adminList.description) { toastAlert('Enter Description'); }
        else if (!adminList.vendorName) { toastAlert('Enter Vendor'); }
        else if (!adminList.orderDate) { toastAlert('Enter Order Date'); }
        else if (!adminList.orderAmt) { toastAlert('Enter Order Amount'); } 
        else if (!adminList.balancetAmt) { toastAlert('Enter Balance amount'); } 
    };
    useEffect(() => {
        document.title = page + ' | NAC Vendor';
        document.getElementById('navOrder').classList.add('active-route');
    }, []);

    const paymentMethod = (event)=>{
        setDropdownItem(event.value);
        setDropdownValues(event.value.code)
    }
    
    return (
        <>
        <form method='POST' onSubmit={handleSubmit}>
            <Toast ref={toast} />
            <div className='card'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">{page}</h5>
                    <span className="block md:mt-0 p-input-icon-left">
                        {/* <Button icon={`pi pi-${admin === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false}/> */}
                        {/* <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/add-order')} /> */}
                    </span>
                </div>
                <hr />
                <div className='mt-3'>
                <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Title : <span>Brouchure Design Pamphlet</span></p></div>
                <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Description : <span>Create engaging digital brochure with ease. Grab readers' attention with FlippingBook.</span></p></div>                
                <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Due Date : <span>28-Aug-2023</span></p></div>
                <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Vendor Name: <span>S&C Printers</span></p></div>
                <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Quoted Amount : <span>12000</span></p></div>
                <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Attachments : <span><Button icon="pi pi-download" severity="success" tooltip='Invoice' tooltipOptions={{position:'top'}}></Button></span></p></div>

                    <div className="field col-12 py-5 px-3">                    
                        <div className="grid">
                        <p>Enquire Status : </p>
                            <div className="col-12 md:col-1">
                                <div className="field-checkbox">                                    
                                    <Checkbox inputId="checkOption8" name="option" value="active" checked={checkboxValue.indexOf('active') !== -1} onChange={onCheckboxChange} />
                                    <label htmlFor="checkOption9">Accept</label>
                                </div>
                            </div>                            
                            <button aria-label="Submit" class="p-button p-component"><span class="p-button-label p-c">Update</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    

    
    </>
    )
        
}
