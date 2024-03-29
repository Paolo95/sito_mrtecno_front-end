import React, { useEffect } from 'react'
import './editOrder.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import ClipLoader from 'react-spinners/ClipLoader';

const EditOrder = () => {

    const params = useParams();
    const { auth } = useAuth();
    const ORDER_DETAILS_URL = `/api/order/orderAdminDetails/${params.orderID}`; 
    const EDIT_ORDER_URL = `/api/order/editOrder`; 
    const [orderDetails, setOrderDetails] = useState([]);
    const [date, setDate] = useState('');
    const [shipping_code, setShippingCode] = useState('');
    const [shipping_carrier, setCarrier] = useState('');
    const [notes, setNotes] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editDone, setEditDone] = useState(false);

    useEffect(() => {

        const getOrders = async () => {
    
          setLoading(true);

          try {
           
            const response = await axios.post(ORDER_DETAILS_URL, 
              { 
                      
              },
              {
                  headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                  },
                  withCredentials: true
              }
            );  
    
            setLoading(false);
            setOrderDetails(response.data);
            const res = response.data;
            setDate(res[0]['order.order_date'])
            setShippingCode(res[0]['order.shipping_code'])
            setCarrier(res[0]['order.shipping_carrier'])
            setOrderStatus(res[0]['order.order_status']);
            setNotes(res[0]['order.notes']);
      
          } catch (err) {
            if (!err?.response) 
              alert('Server non attivo!');
            else if (err.response.status === 500 ){
              alert(err.response?.data);
            }
            else if (err.response.status === 404 ){
              alert(err.response?.data);
            }else {
              alert('Recupero ordine fallito!');
            }
      
          }    
          
        }
        
        getOrders();
    
        // eslint-disable-next-line
    }, []);

    const handleEdit = () => {

        const editOrder = async () => {
    
          setEditDone(true);

            try {
             
              const response = await axios.post(EDIT_ORDER_URL, 
                { 
                    id: params.orderID,
                    editedDate: date,
                    editedShippingCode: shipping_code,
                    editedShippingCarrier: shipping_carrier,
                    editedStatus: orderStatus,
                    notes: notes,
                },
                {
                    headers: {
                      'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
              );  
      
              setEditDone(false);
              alert(response.data);
        
            } catch (err) {
              if (!err?.response) 
                alert('Server non attivo!');
              else if (err.response.status === 500 ){
                alert(err.response?.data);
              }
              else if (err.response.status === 404 ){
                alert(err.response?.data);
              }else {
                alert('Modifica ordine fallita!');
              }
        
            }    
            
        }
          
          editOrder();
      
          // eslint-disable-next-line
    }

    const handleDateChange = (e) => {
        setIsChanged(true);
        setDate(e);
    }

    const handleOrderStatus = (e) => {
      setIsChanged(true);
      setOrderStatus(e);
  }

    const handleShippingChange = (e) => {
        setIsChanged(true);
        setShippingCode(e);
    }

    const handleCarrierChange = (e) => {
        setIsChanged(true);
        setCarrier(e);
    }
    const handleNotesChange = (e) => {
        setIsChanged(true);
        setNotes(e);
    }

  return (

    <section className='editOrder'>
        <div className="editOrder-heading">
            <h2 className='editOrder-title'>{`Modifica ordine n. ${params.orderID}`}</h2>
            <div className="createBtn-div">
                {
                    isChanged ? <button className='btn btn-create' onClick={handleEdit}>
                                Modifica ordine
                                <ClipLoader
                                      color={'white'}
                                      loading={editDone}
                                      size={10}
                                      />
                                </button>
                              : <button disabled className='btn btn-create disabled' onClick={handleEdit}>Modifica ordine</button>
                }
                
            </div>
        </div>                   
                        
        <div className="editOrder-content">
            <div className="editOrder-body">
                <div className="editOrder-card card shadow-sm">
                    <div className="card-body">
                      {
                        loading ? 
                        
                          <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                            <ClipLoader
                            color={'#0f3460'}
                            loading={loading}
                            size={50}
                            />
                          </div> :
                          <>
                          <div className='editOrder-box'>
                            <ul>
                                <li>
                                  <div>
                                    <b>Data ordine: </b>
                                    <input type="date"
                                          className='editable' 
                                          onChange={(e) => handleDateChange(e.target.value)}
                                          defaultValue={orderDetails[0]?.['order.order_date']}/>
                                  </div>                                  
                                </li>

                                <li>
                                  <div>
                                    <b>Stato ordine: </b>
                                    <select className='statusSelect'
                                            onChange={(e) => handleOrderStatus(e.target.value)}
                                            defaultValue={orderStatus === 'In lavorazione' ? 'In lavorazione' : 
                                                          orderStatus === 'In spedizione' ? 'In spedizione' :
                                                          orderStatus === 'Concluso' ? 'Concluso' :
                                                          orderStatus === 'Annullato' ? 'Annullato' : null}>
                                        
                                            <option value={'In lavorazione'}>In lavorazione</option>
                                            <option value={'In spedizione'}>In spedizione</option>
                                            <option value={'Concluso'}>Concluso</option>
                                            <option value={'Annullato'}>Annullato</option>
                                                                              
                                    </select>
                                  </div>
                                  
                                </li>


                                <li>
                                  <div className='productList'>    
                                  <b>Prodotti acquistati:</b>
                                                                
                                    {
                                    orderDetails.map((value, index) => {
                                        return(
                                            <div key={index}>
                                                
                                                <li className='product-item'>                                            
                                                    {value['qty']} x {value['product.product_name']}
                                                    
                                                </li>
                                                <span>{parseFloat(value['priceEach']).toFixed(2)} €</span>                                          
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                </li>
                                

                                <li>
                                  <div>
                                    <b>Spese di spedizione: </b>
                                    {parseFloat(orderDetails[0]?.['order.shipping_cost']).toFixed(2)}€
                                  </div>
                                </li>

                                <li>
                                  <div>
                                    <b>Commissioni pagamento: </b>
                                    {parseFloat(orderDetails[0]?.['order.paypal_fee']).toFixed(2)}€
                                  </div>
                                </li>

                                <li>
                                  <div>
                                    <b>Totale ordine: </b>
                                    <span><b>{parseFloat(orderDetails[0]?.['order_total']).toFixed(2)} €</b></span>
                                  </div>
                              </li>
                            </ul>
                          </div>

                          <div className='editOrder-box top'>
                            <ul>
                              <li>
                                <div>
                                  <b>Metodo di pagamento: </b>
                                  <span>{orderDetails[0]?.['order.payment_method']}</span>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className='editOrder-box top'>
                            <ul>
                              <li>
                                <div>
                                  <b>Modalità di consegna: </b>{orderDetails[0]?.['order.shipping_type']}
                                </div>
                              </li>
                              {
                                orderDetails[0]?.['order.shipping_type'] === 'Corriere' ? 
                                  <>                                  
                                    <li>
                                      <div>
                                        <b>Corriere: </b>
                                        <input className='editable' 
                                              type="text" 
                                              onChange={(e) => handleCarrierChange(e.target.value)}
                                              defaultValue={orderDetails[0]?.['order.shipping_carrier']}/>
                                      </div>
                                    </li>

                                    <li>
                                      <div>
                                        <b>Codice spedizione: </b>
                                        <input className='editable' type="text"
                                              onChange={(e) => handleShippingChange(e.target.value)}
                                              defaultValue={orderDetails[0]?.['order.shipping_code']}/>
                                      </div>
                                    </li>
                                  </>: null
                              }
                              

                              <li>
                                <div>
                                  <b>Indirizzo di spedizione: </b>
                                  {orderDetails[0]?.['order.shipping_address']}
                                </div>
                              </li>

                            </ul>
                          </div>

                          <div className='editOrder-box top'>
                            <ul>
                              <li className='notes'>
                                <div>
                                  <b>Note: </b>
                                  <textarea className='editable' 
                                      rows={7}
                                      onChange={(e) => handleNotesChange(e.target.value)}
                                      defaultValue={orderDetails[0]?.['order.notes']}/>
                                </div>
                            </li>
                            </ul>
                          </div>
                        </>
                      }
                        
                    </div>
                </div>
                            
                            
            </div>
        </div>
    </section>

    
  )
}

export default EditOrder