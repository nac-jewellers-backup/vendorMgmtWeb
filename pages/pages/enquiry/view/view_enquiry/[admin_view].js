import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from "uuid";
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';



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
        document.getElementById('navEnquiry').classList.add('active-route');
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
                        <Button icon={`pi pi-${admin === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false}/>
                        {/* <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/add-order')} /> */}
                    </span>
                </div>
                <hr />
                <div className='mt-3'>
                    <lable className='px-2'>Title</lable>
                    <div className="field col-12 md:col-8">
                            <InputText
                                id="searchName"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off' placeholder="Brouchure Design Pamphlet"
                               />
                    </div>
                    <lable className='px-2'>Description</lable>
                    <div className="field col-12 md:col-8">
                            <InputText
                                id="searchName"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off' placeholder="Create engaging digital brochure with ease. Grab readers' attention with Flipping Book."
                               />
                    </div>
                    <lable className='px-2'>Due Date</lable>
                    <div className="field col-12 md:col-8">
                            <InputText
                                id="searchName"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off' placeholder="28-Aug-2023"
                               />
                    </div>
                    <lable className='px-2'>Vendor Name</lable>
                    <div className="field col-12 md:col-8">
                            <InputText
                                id="searchName"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off' placeholder="S&C Printers"
                               />
                    </div>
                    <lable className='px-2'>Quoted Amount</lable>
                    <div className="field col-12 md:col-8">
                            <InputText
                                id="searchName"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off' placeholder="12000"
                               />
                    </div>

                    <div className="grid px-2 p-0 border-300 border-2 w-5 ml-1 w-8">
                    <div class="flex align-items-center py-0 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Attachments : <span></span></p></div>
                        <div className="col-6 md:col-1 mt-0 px-3">                                   
                            <Button icon="pi pi-download" type="button" className="" rounded severity="warning" Text />
                        </div>  
                        <div class="flex align-items-center py-2 px-3"><i class="pi pi-fw pi-info-circle mr-2 text-1xl"></i><p class="m-0 text-lg">Enquire Status : <span></span></p></div>
                        <div className="col-6 md:col-1 mt-3">
                            <div className="field-checkbox px-1">                                    
                                <Checkbox inputId="checkOption9" name="option" value="active" checked={checkboxValue.indexOf('active') !== -1} onChange={onCheckboxChange} />
                                <span htmlFor="checkOption9" className="status-instock font-bold py-2 ml-2" >Accept</span>
                            </div>
                        </div> 
                    </div>
                
                </div>
                
            </div>            
        </form>
    </>
    )
        
}
