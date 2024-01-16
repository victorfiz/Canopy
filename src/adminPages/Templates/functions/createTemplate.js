import { db } from '../../../firebase'
import { query, collection, startAfter, limit, getDoc, doc, deleteDoc, where, addDoc } from "firebase/firestore";
import { formatTemplateCollection } from './formatTemplateCollection';

export async function createTemplate() {

    //add a doc with a timestamp property to the interview_templates collection

    const templatesRef = collection(db, 'interview_templates');

    const timestamp = Date.now();

    const templateDoc = await addDoc(templatesRef, {
        timestamp
    });

    console.log(templateDoc.id)

    return {id: templateDoc.id}

}
