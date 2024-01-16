import React, { useState, Children } from 'react';

function HorizontalMenu({
    items,
    className, 
    onPress = () => {}, 
    border = true,
}) {

    const [selected, setSelected] = useState(0);

    return (
        < div className={`${className} flex ${border?"border-b border-solid border-[#eee]":""}`}>
      
            {items.map((item, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => {
                            console.log("onPress")
                            item.onPress()
                            setSelected(index)
                        }}
                        className={selected==index?'inline-block header-opt pl-2 pr-2 mr-4 selected-page-opt':"inline-block mr-4 header-opt pl-2 pr-2"}
                    >
                        {item.display}
                    </div>
                )

            })}

        </div>
    )
}

export default HorizontalMenu;