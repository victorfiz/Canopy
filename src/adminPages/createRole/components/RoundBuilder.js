import React, {useEffect, useState} from 'react';
import FormField from '../../../components/formField/FormField.js';
import Form from '../../../components/formField/Form.js';
import FormHeader from '../../../components/formField/FormHeader.js';
import FormDropdown from '../../../components/formField/FormDropdown.js';
import Button from '../../../components/button/Button.js';
import TextField from '../../../components/textfield/TextField.js';

function RoundBuilder({
    roleState,
    setRoleState,
    selectedRoundIndex,
}) {

    const [newInterviewTemplateName, setNewInterviewTemplateName] = useState('')
    const [newInterviewTemplateId, setNewInterviewTemplateId] = useState('')

  






    return (
        <div className='lhs-visuals h-full pr-80'>
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
                    placeholder='BlackRock Asset Management'
                    title='Title'
                    formValue={roleState.rounds[selectedRoundIndex].title || ''}
                    setFormValue={(formValue) => {
                        const rounds = roleState.rounds.slice(0, selectedRoundIndex);

                        //get all the rounds after the selected round
                        const roundsAfter = roleState.rounds.slice(selectedRoundIndex + 1, roleState.rounds.length);


                        setRoleState({
                            ...roleState,
                            rounds: [
                                ...rounds,
                                {
                                    ...roleState.rounds[selectedRoundIndex],
                                    title: formValue
                                },
                                ...roundsAfter
                            
                                
                            ]

                        })
                    }}
                />


                <FormField
                    title='Icon Url'
                    containerClassName='mt-5'
                    width='300px'
                    placeholder='URL to png to display'
                    formValue={roleState?.rounds[selectedRoundIndex]?.emoji || ''}
                    setFormValue={(formValue) => {

                        //get all the rounds up to the selected round
                        const rounds = roleState.rounds.slice(0, selectedRoundIndex);

                        //get all the rounds after the selected round
                        const roundsAfter = roleState.rounds.slice(selectedRoundIndex + 1, roleState.rounds.length);


                        setRoleState({
                            ...roleState,
                            rounds: [
                                ...rounds,
                                {
                                    ...roleState.rounds[selectedRoundIndex],
                                    emoji: formValue
                                },
                                ...roundsAfter
                            
                                
                            ]

                        })
                    }}
                />

                <FormField
                    title='Is Locked'
                    containerClassName='mt-5'
                    width='300px'
                    placeholder='true or false'
                    formValue={roleState?.rounds[selectedRoundIndex]?.locked || 'false'}
                    setFormValue={(formValue) => {
                        const rounds = roleState.rounds.slice(0, selectedRoundIndex);

                        //get all the rounds after the selected round
                        const roundsAfter = roleState.rounds.slice(selectedRoundIndex + 1, roleState.rounds.length);


                        setRoleState({
                            ...roleState,
                            rounds: [
                                ...rounds,
                                {
                                    ...roleState.rounds[selectedRoundIndex],
                                    locked: formValue
                                },
                                ...roundsAfter
                            
                                
                            ]

                        })
                    }}
                />

                <TextField 
                    containerClassName='mt-5'
                    title='Templates'
                    width='500px'
                    textContent={roleState?.rounds[selectedRoundIndex]?.templateData || ''}
                    setTextContent={(textContent) => {
                        setRoleState({
                            ...roleState,
                            rounds: [
                                ...roleState.rounds.slice(0, selectedRoundIndex),
                                {
                                    ...roleState.rounds[selectedRoundIndex],
                                    templateData: textContent
                                },
                                ...roleState.rounds.slice(selectedRoundIndex + 1, roleState.rounds.length)
                            ]
                        })
                    }}
                    placeholder={`Template Name, Template Id\nTemplate Name, Template Id\n i.e \n HireVue Practice #1, dwjhd82he`}
                    
                />

             
                








            </Form>
        </div>
    );
}

export default RoundBuilder;
