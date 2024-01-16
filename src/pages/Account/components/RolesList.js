import react, { useState, useEffect } from 'react';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from "../../../firebase";
import { addRoles } from '../functions/addRoles';
import Role from './Role';
import Button from '../../../components/button/Button';
import Footer from '../../../components/footer/Footer';
import VerticalBox from '../../../components/verticalBox/VerticalBox';

const Roles = ({ authUser, setIsCategoryOpen }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([{ loading: true, key: 1 }, { loading: true, key: 2 }]);


    useEffect(() => {
        const fetchInterviewTemplateCategories = async () => {
            const interviewTemplateRoles = await getDocs(collection(db, 'roles'));
            console.log("interviewTemplateRoles", interviewTemplateRoles.docs);
            const allRoles =[]

            interviewTemplateRoles.docs.forEach(doc=>{
                console.log(doc.data());
                allRoles.push({
                    ...doc.data(), 
                    roleId:doc.id,
                })
            })

            setRoles(allRoles);

        };

        fetchInterviewTemplateCategories();
    }, []);


    return (
        <>


            <VerticalBox
            width='80vw'
            title={"Add another application"}
            >

                
                <div className='roles-container flex gap-[20px] flex-wrap p-3 justify-evenly'>
                    {roles.filter((role) => !role.roleIsComingSoon)
                    .map((role, index) => <Role key={index} role={role} roles={roles} setRoles={setRoles} />)}
                </div>
               
                    <Footer>
                    <Button
                        size="small"
                        type="secondary"
                        text="Close"
                        isAsync={false}
                        className='mr-4'
                        onPress={() => {
                            setIsCategoryOpen(false);
                        }}
                    >
                    </Button>
                    <Button
                        size="small"
                        type="primary"
                        text="Add Applications"
                        loadingText="Importing"
                        isAsync={true}
                        onPress={async () => {
                            setIsLoading(true);
                            const selectedRoles = roles.filter((role) => role.selected);

                            

                            for (const role of selectedRoles) {

                                const interviewObject = {
                                    interview_type: role.career_id,
                                    uid: authUser.uid
                                };

                                const response = await addRoles({
                                    uid: authUser.uid,
                                    roleIcon: role.roleIcon,
                                    roleId: role.roleId,
                                    roleName: role.roleName
                                
                                });
                               

                            }
                            setIsCategoryOpen(false)
                            setIsLoading(false);

                        }}
                    >
                    </Button>
                    </Footer>
            </VerticalBox>
        </>
    )
}

export default Roles;