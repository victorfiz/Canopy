import React, { useState, useEffect, useRef } from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import Table from '../../../components/table/Table';
function HTMLPreview({
html = "<div></div>"
}) {



    const [selectedQuestionBuilder, setSelectedQuestionBuilder] = useState("setup")

    return (
        <VerticalBox
        width = "800px"
        title={"HTML Preview"}
        height='600px'
        className='overflow-y-scroll'
        > 
        <div 
        dangerouslySetInnerHTML={{ __html: html }} 
        className='p-3'
        />


            </VerticalBox>
    )
}

export default HTMLPreview