import { useEffect, useState } from "react"
import { DndList } from "../components/options/dragOptions"
import { RingProgress, Center, Button, Modal, TextInput, Loader } from '@mantine/core';
import useMeasure from "react-use-measure";
import { db } from "../firebase";
import Board from "../components/home/board";
import { Card, Text } from "@mantine/core"
import { v4 as uuidv4 } from 'uuid';
import { initUser, getUsers, updateUser } from "../queries/queries";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import questions from "../questions.json"
import { question, userType } from "../types";

const HomePage = () => {

    const [time, setTime] = useState(parseInt(localStorage.getItem("time")!) || 120);
    const [submitted, setSubmitted] = useState(false);

    const nav = useNavigate()
    const [openName, setOpenName] = useState(false);
    const [openBoard, setOpenBoard] = useState(false);

    const [ref, { width: leaderboardWidth }] = useMeasure({ debounce: 100 });


    const [data, setData] = useState<any>([]);

    const [name, setName] = useState("")

    const [start, setStart] = useState(false)
    const [evalScore, setEvalScore] = useState<number>(0)
    const [question, setQuestion] = useState<number>((parseInt(localStorage.getItem("question") as string) - 1) || 0)
    const [id, setId] = useState<string>(localStorage.getItem("id")!)
    const [options, setOptions] = useState<any>(questions.questions[question as number]?.options!)
    const [user, setUser] = useState<userType>({ id: "", name: "", score: 0, blocked: false, questions: [] })
    const [loading, setLoading] = useState(false)
    const [userScore, setUserScore] = useState(0)
    // let opts = questions.questions
    // let correctAnswer = opts[question as number]?.options.sort((a, b) => a.answerPosition - b.answerPosition)

    // console.log(correctAnswer, opts, questions.questions)


    useEffect(() => {
        if (!localStorage.getItem("time")) {
            localStorage.setItem("time", "120")
        }
        if (!localStorage.getItem("question")) {
            localStorage.setItem("question", "1")
        }
        if (localStorage.getItem("blocked")) {
            nav("/blocked")
        }
        if (!localStorage.getItem("name")) {
            setOpenName(true)
        }
        else {
            const realtimeUser = onSnapshot(doc(db, "users", id), (doc) => {
                if (doc.exists()) {
                    const data = doc.data()
                    if (data.block) {
                        console.log("block navigate")
                        nav("/blocked")
                        localStorage.setItem("blocked", "true")
                    }
                    setUserScore(data.score)
                    console.log(data)
                    setUser(data as userType)
                }
            }, (error) => {
                // ...
                console.log(error)
            });
            realtimeUser
        }

        const realtimeAdmin = onSnapshot(doc(db, "admin", "control"), async (doc) => {
            if (doc.exists()) {
                const data = doc.data()
                if (data.start) {
                    localStorage.setItem("time", "120")
                    // localStorage.removeItem("submitted")
                    setStart(true)
                }
                else {
                    setStart(false)
                }
                if (data.show && !openBoard) {
                    const dat = await getUsers();
                    dat.sort((a: any, b: any) => b.score - a.score)
                    const result = dat.map((user, index) => {
                        return {
                            id: user.id,
                            rank: index + 1,
                            value: user.score,
                            label: user.name
                        }
                    })
                    setData(result)
                    setOpenBoard(true)
                    console.log("entered open dudeeee")
                }
                setQuestion(data.question - 1)
                if(parseInt(localStorage.getItem("question") as string) !== data.question){
                    localStorage.removeItem("submitted")
                }
                localStorage.setItem("question", (data.question).toString())
                setOptions(questions.questions[(data.question - 1) as number]?.options!)
            }
        })
        realtimeAdmin
    }, [id])

    useEffect(() => {
        setOpenBoard(false)
        setSubmitted(localStorage.getItem("submitted") ? true : false)
        setTime(parseInt(localStorage.getItem("time") as string))


    }, [question])

    useEffect(() => {

        if (time <= 0) {
            localStorage.setItem("time", "120")
            setTime(120)
        }
        if (start && !loading && !submitted ) {
            const interval = setInterval(() => {
                if (submitted) {
                    localStorage.setItem("time", "120")
                    clearInterval(interval)
                    return
                }
                setTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        localStorage.setItem("time", "120")
                    }
                    localStorage.setItem("time", (prev - 2).toString())
                    return prev - 1
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [start, submitted])


    const handleChange = (event: any) => {
        setName(event.currentTarget.value);
    };

    const handleAnswerSubmit = async () => {
        const updatedQuestions: question[] = user.questions
        setLoading(true);
        updatedQuestions.push({ questionId: question, timeTaken: 120 - time })

        await updateUser(user.id, user.score + evalScore, updatedQuestions).then(() => {
            setLoading(false)
            localStorage.setItem("submitted", "true")
        })
        setEvalScore(0)
    }

    const handleNameSubmit = async () => {
        localStorage.setItem("name", name)
        const id: string = uuidv4()
        setLoading(true)
        localStorage.setItem("id", id)
        setId(id)
        setOpenName(false)

        await initUser(name, id).then(() => {
            setLoading(false)
        });
    }

    return (
        <div className="w-full h-screen flex pt-0 flex-col items-center bg-black">
            {
                loading && <div className="absolute z-10 w-full h-3/4">
                    <Center className="w-full h-full">
                        <div className="bg-rose p-12 flex flex-col items-center">
                            <Loader className="" size={"xl"} />
                            <Text className="text-xl">Loading Please wait</Text>
                        </div>
                    </Center>
                </div>
            }
            <Card className="flex flex-col md:w-[90%] md:h-[50%] w-[90%] md:gap-8 gap-2 items-center" >
                <div className="flex items-center justify-center w-full">
                <Text className="absolute left-2">Score: {userScore}</Text>
                <h1 className="text-rose font-bold md:text-3xl text-2xl">Question {question + 1}</h1>
                </div>
                <Text className="sm:text-2xl text-md font-bold overflow-scroll">
                    {questions.questions[question as number]?.question!}
                </Text>

                <RingProgress roundCaps size={window.innerHeight > 700 ? 150 : 80} thickness={10}
                    label={<Text className="md:text-4xl text-lg text-rose">{time}</Text>}
                    sections={[{ value: ((120 - time) / 12) * 10, color: "teal" }]}>
                </RingProgress>

                {/* {!submitted && <Text>{correctAnswer.map((e)=>e.name)}</Text>} */}
            </Card>
            <Modal centered opened={openName} transitionProps={{ transition: 'rotate-left' }} onClose={() => { }} title="We need your name to continue">
                <TextInput size="xl"
                    value={name}
                    maxLength={30}
                    onChange={handleChange}
                    label="Name"
                    placeholder="Enter your name"
                />
                <Text className="text-red-500 mb-20">Please refrain from using any offensive/rude names</Text>
                <Center>
                    <Button
                        onClick={handleNameSubmit}
                        className="bg-teal-500" size="md">Enter</Button>
                </Center>
            </Modal>
            <Modal opened={openBoard} size={"xl"} onClose={() => { setOpenBoard(false) }} title="Leaderboard" >
                <div ref={ref}>
                    <Board data={data}
                        width={leaderboardWidth} />
                </div>
            </Modal>
            <DndList start={start}
                setScore={setEvalScore} submitted={submitted} time={time} question={question}
                data={options} />
            <Button
                size="md"
                // data-disabled={false}
                onClick={() => {
                    if (!start || submitted || time === 0 ) {
                        return
                    }
                    setSubmitted(true)
                    localStorage.setItem("time", "120");
                    handleAnswerSubmit()
                }}
                className="text-lg rounded-full mt-1 click:bg-teal font-bold text-grape-900 bg-gradient-to-r from-rose to-chrysler_blue"
                variant="gradient">
                Submit
            </Button>
        </div>
    )
}

export default HomePage