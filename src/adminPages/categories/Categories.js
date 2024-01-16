import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/adminHeader/Header';
import Table from '../../components/table/Table';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { createCategoryListener } from './functions/createCategoryListener';
import Form from '../../components/formField/Form';
import FormField from '../../components/formField/FormField';
import Footer from '../../components/footer/Footer';
import { transformCategoriesToTable } from './functions/transformCategoriesToTable';
import { syncCategoriesRemote } from './functions/syncCategoriesRemote';


function EditCategories() {
    let navigate = useNavigate();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [categoriesState, setCategoriesState] = useState({
        Categories: []
    });

    useEffect(() => {
        createCategoryListener({
            setCategoriesState
        })
    }, [])


    return (

        <div className='w-[100vw] flex flex-col h-[100vh]'>
            <Header
                selected='categories'
            />

            <div className='flex cats-page-container flex-grow flex-row'>
                <div className={isEditorOpen ? 'flex flex-col w-2/3 h-[100%] border-r' : 'flex flex-col w-[100%] h-[100%]'}>
                    <div className='reviews-header ml-16'>
                        Categories Panel
                    </div>
                    <div className='ml-16 flex mt-6 mb-4 justify-between mr-16'>
                        <div className='flex'>
                            <div className='tag sub-tag mr-2'> career id</div>
                            <div className='tag sub-tag mr-2'> logo</div>
                            <div className='tag sub-tag mr-2'> name</div>
                            <div className='tag sub-tag'> template count</div>
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
                                text='Create Category'
                                size="small"
                                type="primary"
                                className='ml-4'
                                onPress={
                                    () => {
                                        setIsEditorOpen(true)
                                        setCategoriesState({
                                            ...categoriesState,
                                            Categories: [
                                                ...categoriesState.Categories,
                                                {}
                                            ]
                                        })

                                        setSelectedCategoryIndex(categoriesState.Categories.length)
                                    }}
                            />
                        </div>



                    </div>
                    <div className='ml-16 template-page-table-container flex flex-col flex-grow'>
                        <Table
                            headings={['Career ID', 'Logo', 'Name', 'Template Count']}
                            rows={transformCategoriesToTable({ categoriesState })}
                            isReviews={true}
                            tableContainerClassName='mr-16'
                            setSelectedElements={setSelectedCategories}
                            selectedElements={selectedCategories}
                            rowsHeight='calc(100vh - 370px)'
                            widths={[
                                250, 300, 250, 150
                            ]}

                        />
                    </div>
                </div>

                {isEditorOpen && <div className='flex flex-col w-1/3 h-[100%]'>
                    <Form
                        className={'flex-grow ml-5'}
                    >
                        <FormField
                            title='Career ID (for DB search)'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='string, no spaces, unique'
                            formValue={categoriesState.Categories[selectedCategoryIndex]?.career_id || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    Categories: categoriesState.Categories.map((category, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...category,
                                                career_id: formValue
                                            }
                                        }
                                        return category;
                                    })
                                })
                            }}
                        />
                        <FormField
                            title='Name'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='Healthcare HR'
                            formValue={categoriesState.Categories[selectedCategoryIndex]?.name || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    Categories: categoriesState.Categories.map((category, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...category,
                                                name: formValue
                                            }
                                        }
                                        return category;
                                    })
                                })
                            }}
                        />
                        <FormField
                            title='Icon Image URL'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='Storage download URL'
                            formValue={categoriesState.Categories[selectedCategoryIndex]?.logo || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    Categories: categoriesState.Categories.map((category, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...category,
                                                logo: formValue
                                            }
                                        }
                                        return category;
                                    })
                                })
                            }}
                        />
                        <FormField
                            title='Category Counter'
                            containerClassName='mt-5'
                            width='300px'
                            placeholder='Storage download URL'
                            formValue={categoriesState.Categories[selectedCategoryIndex]?.number || ""}
                            setFormValue={(formValue) => {
                                setCategoriesState({
                                    ...categoriesState,
                                    Categories: categoriesState.Categories.map((category, index) => {
                                        if (index === selectedCategoryIndex) {
                                            return {
                                                ...category,
                                                number: formValue
                                            }
                                        }
                                        return category;
                                    })
                                })
                            }}
                        />

                    </Form>

             
                </div>}
                

            </div>
            <Footer>
                  
                        <Button
                            text="Sync Categories"
                            type='secondary'
                            isAsync={true}
                            onPress={async () => {
                                await syncCategoriesRemote({
                                    categoriesState
                                })
                            }}
                            loadingText={"Syncing..."}
                        />


                    </Footer>
        </div>


    )
}

export default EditCategories;