import { db } from '../../../firebase'
import { query, orderBy, startAfter, limit, getDoc, doc, deleteDoc, where } from "firebase/firestore";
import { formatTemplateCollection } from './formatTemplateCollection';

export async function deleteTemplate({
    templateId,
    setTemplates, 
    setTemplateIds,
    templateIds, 
    templates
}) {


    const templatesRef = doc(db, 'interview_templates', templateId);

    console.log('templateId', templateId);

    await deleteDoc(templatesRef);

    //find the index of the template id in the templateIds array

 

   





}