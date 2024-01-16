import React, { useState, Children } from 'react';


function TableHead({
    headings, 
    rows, 
    widths, 
    selectedElements,
    setSelectedElements

}) {

    return (
        <>

            <div className='table-head'>
                <input 
                className='table-head-checkbox mr-8 ml-4 pointer' 
                type='checkbox' 
                checked={selectedElements.length === rows.length}
                onChange={(event) => {
                    if(selectedElements.length === rows.length){
                        setSelectedElements([])
                        return;
                    }
                    
                    let selectedElementsCopy = []
                    for(let i = 0; i < rows.length; i++){
                        selectedElementsCopy.push(i)
                    }
                    setSelectedElements(selectedElementsCopy)
                    
                }}
                
                />
                {headings.map((heading, index) => (
                    <div key={index} 
                    className='table-head-item'
                    style={{
                        width: widths[index]
                    }}
                    >
                        {heading}
                    </div>
                ))}
            </div>
            
            
        </>
    )
}

export default TableHead;