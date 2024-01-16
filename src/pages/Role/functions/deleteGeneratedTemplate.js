import { getDoc, doc, addDoc, collection, deleteDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

export async function deleteGeneratedTemplate({
    interview_template_id,
}) {


    const interviewTemplateRef = doc(db, 'interview_templates', interview_template_id);

    await deleteDoc(interviewTemplateRef);

}