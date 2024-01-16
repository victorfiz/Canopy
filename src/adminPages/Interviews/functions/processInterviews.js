import { query, collection, orderBy, limit, startAfter, startAt, getDocs } from 'firebase/firestore';
import { db } from "../../../firebase";
import { formatDate } from "./formatDate";
import { handleProcessInterviewDuration } from "./handleProcessInterviewDuration";

export async function processInterviews({
  setInterviews,
  setInterviewIds,
  lastVisibleRef,
  firstVisibleRef,
  directionRef,
  interviewsRef,
  interviewIds, 
  interviewIdsRef
}) {
  // Define the basic query to get interviews
  let queryRef = query(
    collection(db, 'interviews'),
    orderBy('timestamp', 'desc'),
    limit(30)
  );

  if (directionRef.current === 'next' && lastVisibleRef.current) {

    queryRef = query(queryRef, startAfter(lastVisibleRef.current));

  } else if (directionRef.current === 'prev' && firstVisibleRef.current) {

    queryRef = query(queryRef, startAt(firstVisibleRef.current));

  }

  const interviewDocs = await getDocs(queryRef);

  if (interviewDocs.empty) {
    console.log('No matching documents.');
    return;
  }

  const interviewsArray = [...interviewsRef.current];
  const newInterviewIds = [];
  let firstDoc = null;
  let lastDoc = null;

  // Iterate through the documents
  let index = 0;
  interviewDocs.forEach((doc) => {
    index++;
    // Capture the first and last document for pagination

    if (index == 0) firstDoc = doc;
    if (index == interviewDocs.size - 1) lastDoc = doc;

    // Destructure fields from document data
    const { title, timestamp, uid, email, transcription_evaluation, interview_duration } = doc.data();
    interviewsArray.push([
      title,
      formatDate(timestamp / 1000),
      email || uid,
      interview_duration ? handleProcessInterviewDuration({ duration: interview_duration }) : "--",
      transcription_evaluation ? "Yes" : "No"
    ]);

    newInterviewIds.push(doc.id);
  });

  // Update the state with interviews data and IDs
  setInterviews(interviewsArray);
  interviewsRef.current = interviewsArray;
  setInterviewIds([...interviewIdsRef.current, ...newInterviewIds]);
  interviewIdsRef.current = [...interviewIdsRef.current, ...newInterviewIds];

  // Update refs with the first and last visible documents
  console.log('firstDoc', firstDoc);
  lastVisibleRef.current = lastDoc;
  firstVisibleRef.current = firstDoc;
}
