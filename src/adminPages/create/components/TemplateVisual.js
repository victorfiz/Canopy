import React, { useState } from 'react';
import Button from '../../../components/button/Button.js';
import VerticalBox from '../../../components/verticalBox/VerticalBox.js';
import InfoHover from '../../../components/infoHover/InfoHover';
import { getDifficultyTag } from "../functions/getDifficultyTag.js"


function TemplateVisual({ 
    template, 
}) {


    return (
        <VerticalBox
            height='350px'
        >
            <div className="px-6 py-4">
                <div className=" items-center justify-between mb-2">
                    <div className='template-title'>
                        {template.title}
                    </div>
                    <div className='template-subtitle'>
                        {template.subtitle || ""}

                    </div>

                    <div className='flex'>
                        {getDifficultyTag({ difficulty: template.difficulty })}
                        {template.is_generator &&
                            <InfoHover
                                width={"200px"}
                                marginTop={"42px"}
                                marginLeft={"10px"}
                                infoHoverContent="This interview will always be different. Use it multiple times to practice."
                            >
                                <div className='tag resuable ml-2'>reusable</div>
                            </InfoHover>
                        }
                    </div>

                    <div className='template-description'>

                        {(template.info_tags || ["news analysis", "price chart"]).map((tag, index) => (
                            <div className={(index > 0) ? 'tag sub-tag ml-2' : "tag sub-tag"} key={index}>
                                {tag.toLowerCase()}
                            </div>
                        ))}
                    </div>
                    <Button
                        size="medium"
                        type="secondary"
                        text="Start Interview"
                        fullWidth={true}
                        isAsync={true}
                        loadingText="Preparing interview"
                        onPress={() => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve()
                                }, 2000)
                            })
                        }}
                    >
                    </Button>



                </div>
            </div>

        </VerticalBox>
    );
}

export default TemplateVisual;

