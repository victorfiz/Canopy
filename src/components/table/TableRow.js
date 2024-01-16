import React, { useState, Children } from 'react';


function TableRow({

    row,
    setSelectedElements,
    selectedElements, 
    widths, 
    index, 
}) {

    return (
        <>

            <div className='table-horizontal'>
                <input
                    className='table-head-checkbox mr-8 ml-4 pointer'
                    type='checkbox'
                    checked={selectedElements.includes(index)}
                    onChange={(event) => {
                        if(event.target.checked){
                            let selectedElementsCopy = [...selectedElements]
                            selectedElementsCopy.push(index)
                            setSelectedElements(selectedElementsCopy)

                        } else {
                            
                            let selectedElementsCopy = [...selectedElements]
                            let indexToRemove = selectedElementsCopy.indexOf(index)
                            selectedElementsCopy.splice(indexToRemove, 1)
                            setSelectedElements(selectedElementsCopy)
                        }
                        
                        
                    }}
                />
                {row.map((el, index) => (
                    <div key={index}
                        className='table-row-item'
                        style={{
                            width: widths[index]
                        }}
                    >
                        {el}
                    </div>
                ))}
            </div>


        </>
    )
}

export default TableRow;