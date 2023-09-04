import { Select, Button } from "@mantine/core"
import { useEffect, useState } from "react";
import { blockUser, getUsers, onStart } from "../queries/queries";
import { switchQuestion, setShow } from "../queries/queries";
import Questiondata from "../questions.json"


const Admin = () => {
    const [selectedUser, setSelectedUser] = useState("")
    const [data, setData] = useState<any>([])
    const handleBlock = async () => {
        await blockUser(selectedUser)
    }

    let questionNumber: number = 1

    const handleSwitchQuestion = async () => {
        if (questionNumber < Questiondata.questions.length) {
            questionNumber = questionNumber + 1
        }
        await switchQuestion(questionNumber)
    }

    const addData = async () => {
        const users = await getUsers()
        const data = users.map((user: any) => {
            return {
                label: user.name,
                value: user.id
            }
        })
        setData(data)
    }

    const handleShow = async () => {
        await setShow(true)
    }

    const handleStart = async () => {

        await onStart();
    }

    useEffect(() => {
        addData()
        console.log(selectedUser)
    }, [selectedUser])
    return (
        <div className="flex flex-col items-center">
            <h1>Admin</h1>
            <Select
                className="w-full"
                label="Choose user to block"
                data={data}
                searchable
                onChange={(value) => { setSelectedUser(value as string) }}
            />
            <div className="flex flex-col items-center w-[60%]">
                <Button size="md" variant="default" className="bg-teal-400 mt-24" onClick={() => {
                    console.log(selectedUser)
                    handleBlock()
                }}
                >Block User</Button>

                <Button size="md" variant="default" className="bg-teal-400 mt-24" onClick={() => {
                    // console.log(selectedUser)
                    // handleBlock()
                    handleStart()

                }}
                >Start trial Question</Button>

                <Button size="md" variant="default" className="bg-teal-400 mt-24"
                    onClick={() => {
                        handleSwitchQuestion()
                    }
                    }>
                    Switch Question
                </Button>

                <Button size="md" variant="default" className="bg-teal-400 mt-24"
                    onClick={() => {
                        console.log("show")
                        handleShow()
                    }
                    }>
                    Show LeaderBoard
                </Button>
            </div>

        </div>
    )
}

export default Admin