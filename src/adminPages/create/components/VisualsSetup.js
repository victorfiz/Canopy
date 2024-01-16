import React, { useState, useEffect, useRef } from 'react';
import FormField from '../../../components/formField/FormField.js';
import Form from '../../../components/formField/Form.js';
import FormHeader from '../../../components/formField/FormHeader.js';
import TemplateVisual from './TemplateVisual.js';
import FormDropdown from '../../../components/formField/FormDropdown.js';


function VisualsSetup({
    interviewTemplateState,
    setInterviewTemplateState, 
    selectedQuestionIndex

}) {


    return (
        <div className='flex h-full'
        >
            <div className='lhs-visuals border-r h-full pr-80'>
                <Form
                    title='Visuals Setup'
                    className='ml-10'
                    maxHeight='calc(100vh - 180px)'
                >

                    <FormHeader
                        title='Visuals'
                        width='300px'

                    />

                    <FormField
                        containerClassName='mt-3'
                        width='300px'
                        placeholder='Goldman Sach #4'
                        title='Title'
                        formValue={interviewTemplateState.title || ''}
                        setFormValue={(formValue) => {
                            setInterviewTemplateState({
                                ...interviewTemplateState,
                                title: formValue
                            })
                        }}
                    />
                    <FormField
                        title='Subtitle'
                        containerClassName='mt-5'
                        width='300px'
                        placeholder='Second round interview'
                        formValue={interviewTemplateState.subtitle || ''}
                        setFormValue={(formValue) => {
                            setInterviewTemplateState({
                                ...interviewTemplateState,
                                subtitle: formValue
                            })
                        }}
                    />
                    {/* <FormField
                        title='Decorative Tags'
                        containerClassName='mt-5'
                        width='300px'
                        placeholder='markets, equities (2 or 3 max)'
                        formValue={interviewTemplateState.info_tags?.join(', ') || ''}
                        setFormValue={(formValue) => {
                            setInterviewTemplateState({
                                ...interviewTemplateState,
                                info_tags: formValue.split(', ')
                            })
                        }}
                    />
                    <FormField
                        title='Difficulty'
                        containerClassName='mt-5'
                        width='300px'
                        placeholder='easy, medium, or hard'
                        formValue={interviewTemplateState.difficulty || ''}
                        setFormValue={(formValue) => {
                            setInterviewTemplateState({
                                ...interviewTemplateState,
                                difficulty: formValue
                            })
                        }}
                    /> */}


                



                </Form>
            </div>
            <div className='rhs-visuals m-20'>
                {/* <TemplateVisual
                    template={interviewTemplateState}
                /> */}
            </div>
        </div >
    )
}

export default VisualsSetup