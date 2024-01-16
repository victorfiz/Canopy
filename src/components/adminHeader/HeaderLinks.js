import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';



function HeaderLinks({ selected }) {

    const navigate = useNavigate();

    const [suAccess, setSuAccess] = useState([])
    const { authUser, isLoading, signOut } = useAuth();
    const [showSpecialLinks, setShowSpecialLinks] = useState(false);

    useEffect(() => {

        const getSuAccess = async () => {
            const suAccessDocRef = doc(db, 'admin', 'suAccess');
            const docSnap = await getDoc(suAccessDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setSuAccess(data.uids);
            } else {
                console.log("No such document!");
            }
        }

        getSuAccess();

    }, []);

    useEffect(() => {
        if (authUser) {
            if (suAccess.includes(authUser.uid)) {
                setShowSpecialLinks(true)
            } else {
                setShowSpecialLinks(false)
            }
        }
    }, [authUser, suAccess]);

    return (

        <div className='flex header-links'>



            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2  ml-4 ${selected === 'templates' ? 'selected-page-opt color-[#ff0000]' : 'text-[#E7E6EA]'}`}
                    onClick={() => navigate("/templates")}
                > Interview Templates</div>
            }
            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'categories' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => navigate("/categories")}
                > Edit Categories</div>
            }
            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'generator' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => {
                        navigate("/create-generator/add_career_id")
                    }}
                >
                    Edit Generator
                </div>
            }
            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'promo-codes' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => {
                        navigate("/promocodes")
                    }}
                >
                    Promo Codes
                </div>
            }

            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'interviews' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => {
                        navigate("/interviews")
                    }}
                >
                    Interviews
                </div>
            }
            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'users' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => {
                        navigate("/users")
                    }}
                >
                    Users
                </div>
            }
            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'All Roles' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => {
                        navigate("/all-roles")
                    }}
                >
                    All Roles
                </div>
            }
            {
                showSpecialLinks &&
                <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'All Roles' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                    onClick={() => {
                        navigate("/document")
                    }}
                >
                    Document
                </div>
            }
            <div className={`admin-header-opt phone-hide pl-2 pr-2 ml-4  ${selected === 'back' ? 'selected-page-opt' : 'text-[#E7E6EA]'}`}
                onClick={() => {
                    navigate("/account")
                }}
            >
                Back to app
            </div>
        </div>



    );
}

export default HeaderLinks;

async function getUserDocument(data) {
    const { uid } = data;
    try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData;
        } else {
            console.log("No such document!");
        }
    } catch (err) {
        console.log("Error getting document:", err);
    }
}