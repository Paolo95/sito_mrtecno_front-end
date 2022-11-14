import React from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


const Catg = () => {

  const data = [
    {
        cateImg: "./images/category/cat-1.png",
        cateName: "Apple",
      },
      {
        cateImg: "./images/category/cat-2.png",
        cateName: "Samsung",
      },
      {
        cateImg: "./images/category/cat-1.png",
        cateName: "Oppo",
      },
      {
        cateImg: "./images/category/cat-2.png",
        cateName: "Vivo",
      },
      {
        cateImg: "./images/category/cat-1.png",
        cateName: "Redmi",
      },
      {
        cateImg: "./images/category/cat-2.png",
        cateName: "Sony",
      },
  ]

  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(500);

  const [brandOpen, setBrandOpen] = React.useState(true);
  const [priceOpen, setPriceOpen] = React.useState(true);

  const brandHandleOpen = () => {
    setBrandOpen(!brandOpen);
  }

  const priceHandleOpen = () => {
    setPriceOpen(!priceOpen);
  }

  const handleChangeMin = event => {
    setMin(event.target.value);
    
  };

  const handleChangeMax = event => {
    setMax(event.target.value);
    
  };

  return (
    <>
        <div className="category">
          <div className='chead'>
            <div className='tab'>
            
              <button onClick={brandHandleOpen}><h3>Brand</h3>{brandOpen ?             
                <i className='fa fa-chevron-up'></i>: 
                <i className='fa fa-chevron-down'></i>
              }</button>            
                                
                {
                      data.map((value, index) => {
                          return (
                            <div className="dropdown" key={index}>
                            {brandOpen ? (
                              <ul className="menu">
                                <div className="container">
                                <label>                                  
                                  <input type="checkbox" id={value.cateName}/>
                                  <span>{value.cateName}</span>
                                </label>
                                </div>
                              </ul>
                            ) : null}
                          </div>   
                          )
                      })}

            </div>
            <div className="tab">
              <button onClick={priceHandleOpen}><h3>Prezzo</h3>{priceOpen ?             
                <i className='fa fa-chevron-up'></i>: 
                <i className='fa fa-chevron-down'></i>
              } </button>          

              <div className="dropdown">
                {priceOpen ? (
                  <div>
                    
                    <RangeSlider 
                      id={'rangeInput'}
                      min={0}
                      max={500}
                      defaultValue={[0,500]}
                      onInput={([min, max]) => {
                        setMin(min);
                        setMax(max);
                      }
                      }
                      value={[min,max]}
                    />
                  <div className='range-values'>
                    <div className="container">
                      <input id='min_input' type="number" min={0} value={min} onChange={handleChangeMin}/>
                      <input id='max_input' type="number" min={min+1} value={max} onChange={handleChangeMax}/>
                    </div>
                    
                  </div>
                        
                
                  
                </div>
                        
                ) : null}
              </div>
            </div>                         
          </div>        
        </div>
    </>
  )
}

export default Catg