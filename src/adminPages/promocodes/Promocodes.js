import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/adminHeader/Header';
import Table from '../../components/table/Table';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { createPromoCodesListener } from './functions/createPromoCodesListener';
import Form from '../../components/formField/Form';
import FormField from '../../components/formField/FormField';
import TextField from '../../components/textfield/TextField';
import Footer from '../../components/footer/Footer';
import { transformCategoriesToTable } from './functions/transformPromoCodesToTable';
import { syncCodesRemote } from './functions/syncPromoCodesRemote';


function Promocodes() {
    let navigate = useNavigate();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [categoriesState, setCategoriesState] = useState({
        codes: []
    });

    useEffect(() => {
        createPromoCodesListener({
            setCategoriesState
        })
    }, [])


    return (

        <div className='w-[100vw] flex flex-col h-[100vh]'>
            <Header
                selected='promo-codes'
            />

            <div className='flex cats-page-container flex-grow flex-row'>
                <div className={isEditorOpen ? 'flex flex-col w-2/3 h-[100%] border-r' : 'flex flex-col w-[100%] h-[100%]'}>
                    <div className='reviews-header ml-16'>
                        Promo Codes Panel
                    </div>
                    <div className='ml-16 flex mt-6 mb-4 justify-between mr-16'>
                        <div className='flex'>
                            <div className='tag sub-tag mr-2'> club name</div>
                            <div className='tag sub-tag mr-2'> intro</div>
                            <div className='tag sub-tag mr-2'> code</div>
                        </div>

                        <div className='items-center flex'>
                            {
                                (selectedCategories.length > 0)
                                && <>
                                    <Button
                                        text={
                                            isEditorOpen ? 'Close Editor' :
                                            'Edit Category'
                                        }
                                        size="small"
                                        type="secondary"
                                        onPress={() => {
                                            if (isEditorOpen) {
                                                setIsEditorOpen(false)
                                                return;
                                            }
                                            setIsEditorOpen(true)
                                            console.log("selectedCategories", selectedCategories)
                                            setSelectedCategoryIndex(selectedCategories[0])
                                        }}
                                    />
                                    <Button
                                        text='Delete Category'
                                        size="small"
                                        type="destructive"
                                        className='ml-4'
                                        onPress={
                                            () => {
                                                console.log("selectedCategories", selectedCategories)
                                                console.log("selectedCategoryIndex", selectedCategoryIndex) 
                                                setCategoriesState({
                                                    ...categoriesState,
                                                    Categories: categoriesState.Categories.filter((category, index) => {
                                                        return !selectedCategories.includes(index)
                                                    })
                                                })

                                                setSelectedCategories([])
                                       
                                            
                                            }}
                                    />
                                </>}

                            <Button
                                text='Create Code'
                                size="small"
                                type="primary"
                                className='ml-4'
                                onPress={
                                    () => {
                                        setIsEditorOpen(true)
                                        setCategoriesState({
                                            ...categoriesState,
                                            codes: [
                                                ...categoriesState.codes,
                                                {}
                                            ]
                                        })

                                        setSelectedCategoryIndex(categoriesState.codes.length)
                                    }}
                            />
                        </div>



                    </div>
                    <div className='ml-16 template-page-table-container flex flex-col flex-grow'>
                        <Table
                            headings={['Club Name', 'Intro Msg', 'Code']}
                            rows={transformCategoriesToTable({ categoriesState })}
                            isReviews={true}
                            tableContainerClassName='mr-16'
                            setSelectedElements={setSelectedCategories}
                            selectedElements={selectedCategories}
                            rowsHeight='calc(100vh - 370px)'
                            widths={[
                                180, 600, 250
                            ]}

                        />
                    </div>
                </div>

                {isEditorOpen && <div className='flex flex-col w-1/3 h-[100%]'>
                    <Form
                        className={'flex-grow ml-5'}
                    >
                        <FormField
                            title='Club Name'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='string, no spaces, unique'
                            formValue={categoriesState.codes[selectedCategoryIndex]?.club_name || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    codes: categoriesState.codes.map((code, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...code,
                                                club_name: formValue
                                            }
                                        }
                                        return code;
                                    })
                                })
                            }}
                        />
                         <FormField
                            title='Career Ids to Add'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='string, no spaces, unique'
                            formValue={categoriesState.codes[selectedCategoryIndex]?.career_ids.join(",") || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    codes: categoriesState.codes.map((code, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...code,
                                                career_ids: formValue.split(",").map((career_id) => career_id.trim())
                                            }
                                        }
                                        return code;
                                    })
                                })
                            }}
                        />
                        <FormField
                            title='Code Value'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='Healthcare HR'
                            formValue={categoriesState.codes[selectedCategoryIndex]?.code || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    codes: categoriesState.codes.map((code, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...code,
                                                code: formValue
                                            }
                                        }
                                        return code;
                                    })
                                })
                            }}
                        />
                        <TextField
                            title='Intro Message'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='Storage download URL'
                            textContent={categoriesState.codes[selectedCategoryIndex]?.promo_code_tag_line || ""}
                            setTextContent={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    codes: categoriesState.codes.map((code, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...code,
                                                promo_code_tag_line: formValue
                                            }
                                        }
                                        return code;
                                    })
                                })
                            }}
                        />
                   

                    </Form>

             
                </div>}
                

            </div>
            <Footer>
                  
                        <Button
                            text="Sync Codes"
                            type='secondary'
                            isAsync={true}
                            onPress={async () => {
                                await syncCodesRemote({
                                    categoriesState
                                })
                            }}
                            loadingText={"Syncing..."}
                        />


                    </Footer>
        </div>


    )
}

export default Promocodes;