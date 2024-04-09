'use client'
import {Select} from "@radix-ui/themes";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Issue, User} from "@prisma/client";
import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
const AssigneeSelect = ({ issue }: {issue: Issue}) => {

    const { data: users, error, isLoading } = useQuery<any>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, //60s
        retry: 3
    });
    if (isLoading) return <p>Loading...</p>
    if (error) return null;

    const assignIssue = (userId: string) => {
        axios
            .patch(`/api/issues/${issue.id}`, {assignedToUserId: userId || null})
            .catch(() => {
                toast.error('changes could not be saved');
            })
    }
    // const [users, setUsers] = useState<any>([]);
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get('/api/users');
    //         setUsers(data);
    //     }
    //     fetchUsers();
    //
    // },[])
    return (
        <>
            <Select.Root onValueChange={assignIssue} defaultValue={issue.assignedToUserId || " "}>
                <Select.Trigger  placeholder="Assign..."/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value=" ">Unassigned</Select.Item>
                        {users?.map((user: any) => {
                            return <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
                        })}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}
export default AssigneeSelect;
