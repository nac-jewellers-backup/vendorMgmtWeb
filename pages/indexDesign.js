import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { ProductService } from '../demo/service/ProductService';
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Enquiry Data',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Order Data',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const lineDataPayment = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Payment',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.2
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const [products2, setProducts2] = useState(null);    
    const [lineOptions, setLineOptions] = useState(null);    
    
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
        ProductService.getProductsSmall2().then((data) => setProducts2(data));       
    }, [])

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Enquiries</span>
                            <div className="text-900 font-medium text-xl">160</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-phone text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Quotation Raised </span>
                            <div className="text-900 font-medium text-xl">42</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-file text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Orders Confirmed</span>
                            <div className="text-900 font-medium text-xl">42</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-check-circle text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Quotation Due</span>
                            <div className="text-900 font-medium text-xl">42</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-paperclip text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">For Approval</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Orders</span>
                            <div className="text-900 font-medium text-xl">150</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-yellow-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Orders Amount</span>
                            <div className="text-900 font-medium text-xl">&#8377; 15000</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-yellow-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                          <span className="text-cyan-500 text-xl">&#8377; </span>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
            <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Paid Amount</span>
                            <div className="text-900 font-medium text-xl">&#8377; 250000</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-yellow-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <span className="text-green-500 text-xl">&#8377; </span>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Pending Payments</span>
                            <div className="text-900 font-medium text-xl">&#8377; 80000</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-yellow-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className="text-red-500 text-xl">&#8377; </span>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">For Vendors </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Payment Due</span>
                            <div className="text-900 font-medium text-xl"> 42</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-question-circle text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">In Last 5 Days </span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Live Orders</span>
                            <div className="text-900 font-medium text-xl">12</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Now</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Closed Orders</span>
                            <div className="text-900 font-medium text-xl">138 </div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-box text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Till Now</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Vendors</span>
                            <div className="text-900 font-medium text-xl">42</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-users text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Total </span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
           
                <div className="card" style={{height:'500px'}}>
                    <h5>Overview Enquiries & Orders</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <h5>Recent 5 Enquiries</h5>
                    <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
                    <Column field="name" header="Title" sortable style={{ width: '40%' }} />
                        <Column field="description" header="Enquiry" sortable style={{ width: '30%' }} />
                        <Column field="price" header="Service" sortable style={{ width: '20%' }} body={(data) => formatCurrency(data.price)} />
                        <Column field="category" header="Deadline" sortable style={{ width: '10%' }} />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                
                <div className="card" style={{height:'500px'}}> 
                    <h5>Payment Chart</h5>
                    <Chart type="line" data={lineDataPayment} options={lineOptions} />
                </div>
                
                <div className="card">
                    <h5>Recent 5 Orders</h5>
                    <DataTable value={products2} rows={5} paginator responsiveLayout="scroll">
                        <Column field="name" header="Vendor Name" sortable style={{ width: '40%' }} />
                        <Column field="description" header="Contact person" sortable style={{ width: '35%' }} />
                        <Column field="price" header="Mobile" sortable style={{ width: '20%' }} body={(data) => formatCurrency(data.price)} />
                        <Column field="category" header="Link" sortable style={{ width: '5%' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
