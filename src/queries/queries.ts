import { db } from "../firebase";
import { collection, getDocs, query, getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { question, userType } from "../types";


export const initUser = async (name: string, id: string): Promise<Boolean> => {

    try {
        const user: userType = {
            name: name,
            id: id,
            score: 0,
            questions: []
        }
        await setDoc(doc(db, "users", id), user);
        return true;
    }
    catch (e) {
        return false;
    }
}

export const updateUser = async (id: string, score: number, questions: question[]): Promise<Boolean> => {
    try {

        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            score: score,
            questions: questions,
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

export const getUser = async (id: string): Promise<userType> => {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as userType;
        } else {
            throw new Error("No such document!");
        }
    }
    catch (e: any) {
        throw new Error(e);
    }
}

export const getUsers = async (): Promise<userType[]> => {
    try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const users: userType[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as userType);
        });
        return users;
    }
    catch (e: any) {
        throw new Error(e);
    }
}

export const switchQuestion = async (questionNumber: number): Promise<Boolean> => {
    try {
        const docRef = doc(db, "admin", "control");
        await updateDoc(docRef, {
            question: questionNumber,
            load: true,
            start: true,
            show:false
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

export const setShow = async (state: boolean): Promise<Boolean> => {
    try {
        const docRef = doc(db, "admin", "control");
        await updateDoc(docRef, {
            show: state,
            start:false
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

export const onStart = async (): Promise<Boolean> => {
    try {
        const docRef = doc(db, "admin", "control");
        await updateDoc(docRef, {
            start: true
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

export const startQuestion = async (): Promise<Boolean> => {
    try {
        const docRef = doc(db, "admin", "control");
        await updateDoc(docRef, {
            start: true,
            show:false
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

export const blockUser = async (id: string): Promise<Boolean> => {
    try {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            block: true
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

// export const updateAnswer = async(userId: string, questionNumber:number):Promise<Boolean> => {
//     try{
//         const docRef = doc(db, "admin","control");
//         // await updateDoc(docRef, {
//     }
//     catch(e){
//         return false;
//     }