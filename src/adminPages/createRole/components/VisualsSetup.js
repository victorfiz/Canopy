import React, { useState } from 'react';
import FormField from '../../../components/formField/FormField.js';
import Form from '../../../components/formField/Form.js';
import FormHeader from '../../../components/formField/FormHeader.js';


const VisualsSetup = ({
    roleState,
    setRoleState,
}) => {
    return (

        <div className='flex h-full'
        >
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
                        formValue={roleState.roleName || ''}
                        setFormValue={(formValue) => {
                            setRoleState({
                                ...roleState,
                                roleName: formValue
                            })
                        }}
                    />
                    <FormField
                        containerClassName='mt-3'
                        width='300px'
                        placeholder='BLACKROCK'
                        title='Role Id'
                        formValue={roleState.roleId || ''}
                        setFormValue={(formValue) => {
                            setRoleState({
                                ...roleState,
                                roleId: formValue
                            })
                        }}
                    />


                    <FormField
                        title='Icon Url'
                        containerClassName='mt-5'
                        width='300px'
                        placeholder='URL to png to display'
                        formValue={roleState.roleIcon || ''}
                        setFormValue={(formValue) => {
                            setRoleState({
                                ...roleState,
                                roleIcon: formValue
                            })
                        }}
                    />

                    <FormField
                        title='Is Coming Soon'
                        containerClassName='mt-5'
                        width='300px'
                        placeholder='true or false'
                        formValue={roleState.roleIsComingSoon || ''}
                        setFormValue={(formValue) => {
                            setRoleState({
                                ...roleState,
                                roleIsComingSoon: formValue
                            })
                        }}
                    />





                </Form>
            </div>

        </div >

    );
};

export default VisualsSetup;
