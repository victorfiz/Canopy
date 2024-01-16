import { getDoc, doc, addDoc, collection } from "firebase/firestore";

import { db } from '../../../firebase'

export async function duplicateTemplate({ templateId }) {

    const templatesRef = doc(db, 'interview_templates', templateId);
    const templateDoc = await getDoc(templatesRef)

    console.log(templateDoc.data())

    if (templateDoc.exists()) {
        const newTemplateRef = await addDoc(collection(db, 'interview_templates'),{
             ...templateDoc.data(), 
             title: templateDoc.data().title + " (Copy)",
            })
    }

}