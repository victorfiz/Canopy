import { db } from '../../../firebase'
import { query, orderBy, startAfter, limit, getDocs, doc, collection, where } from "firebase/firestore";
import { formatTemplateCollection } from './formatTemplateCollection';

export async function getTemplatesByTag ({
    queryValue, 
    setTemplates,
}){

    

    
    const templatesRef = collection(db, 'interview_templates');
    let templatesQuery = query(
        templatesRef,
        where("tags", "array-contains", queryValue),
        limit(30)
    );


    const querySnapshot = await getDocs(templatesQuery);

    const templates = [];
    querySnapshot.forEach((doc) => {
        templates.push(doc.data());
    });
    console.log(templates)


    const {templatesRows} = formatTemplateCollection({ 
        templates
    })

    setTemplates(templatesRows);
    
}