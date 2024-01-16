import { db } from '../../../firebase'
import { query, orderBy, startAfter, limit, getDocs, doc, collection, } from "firebase/firestore";
import { formatTemplateCollection } from './formatTemplateCollection';

export async function getTemplatesByTimestamp({ 
    setTemplates, 
    startAfterTimestamp, 
    templatesState, 
    setTemplateIds, 
    
}) {

    const templatesRef = collection(db, 'interview_templates');
    console.log(startAfterTimestamp.current);
    let templatesQuery = query(
        templatesRef,
        orderBy("title", "asc"),
        limit(300)
    );

    try {
        const querySnapshot = await getDocs(templatesQuery);
        const templates = [];
        const templateIds = [];
        querySnapshot.forEach((doc) => {
            templates.push(doc.data());
            templateIds.push(doc.id);
        });

        setTemplateIds(templateIds);

        const {templatesRows} = formatTemplateCollection({ 
            templates
        })

        startAfterTimestamp.current = templates[0].timestamp


        let combinedRows = [...templatesState, ...templatesRows]


        setTemplates(combinedRows);


    } catch (error) {
        console.error("Error fetching templates", error);
    }
}





