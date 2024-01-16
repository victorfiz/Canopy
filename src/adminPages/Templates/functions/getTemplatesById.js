import { db } from '../../../firebase'
import { query, orderBy, startAfter, limit, getDoc, doc, collection, where } from "firebase/firestore";
import { formatTemplateCollection } from './formatTemplateCollection';

export async function getTemplatesById({
    queryValue,
    setTemplates,
}) {




    const templatesRef = doc(db, 'interview_templates', queryValue);



    const templateDoc = await getDoc(templatesRef);

    const templates = [];

    templates.push(templateDoc.data());

    console.log(templates)


    const { templatesRows } = formatTemplateCollection({
        templates
    })

    setTemplates(templatesRows);

}