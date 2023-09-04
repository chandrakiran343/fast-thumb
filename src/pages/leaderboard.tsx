import Board from "../components/home/board"
import { db } from "../firebase";
import { userType } from "../types";
import { collection, query,onSnapshot } from "firebase/firestore";
import useMeasure from "react-use-measure";
import { updateData } from "../components/data";
import { useEffect, useState } from "react";
const LeaderBoard = () => {

    const [ref, { width: leaderboardWidth }] = useMeasure({ debounce: 100 });

    const [data, setData] = useState<any>([]);
    const [users, setUsers] = useState<number>()

    useEffect(() => {

        let q = query(collection(db, "users"));


        const unsub = onSnapshot(q, (querySnapshot) => {
            const users: userType[] = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as userType);
            });

            console.log(users)

            users.sort((a: any, b: any) => b.score - a.score)
            let scoredUsers = users.filter((e)=>e.score > 0)
            const result = scoredUsers.map((user, index) => {
                return {
                    id: user.id,
                    rank: index + 1,
                    value: user.score,
                    label: user.name
                }
            })
            updateData(result)
            setData(result)
            setUsers(users.length)
        })
        unsub
    }, [])

    return (
        <div className="h-full bg-white flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl text-start text-chrysler_blue font-bold py-4">Fast Thumb</h1>
            <div className="w-[80%] flex justify-between">
                <h2 className="md:text-4xl text-md text-fandango font-bold pb-4">LeaderBoard</h2>
                <h2 className="md:text-3xl text-md text-rose font-bold ">Total participants are: {users}</h2>
            </div>
            <div className="w-full h-[85%] flex justify-center overflow-scroll">
                <div className="md:w-[50%] w-full md:p-2" ref={ref}>
                    <Board data={data}
                        width={leaderboardWidth} />
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard