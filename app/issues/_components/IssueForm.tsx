'use client';
import {Button, Callout, TextField, Text, Spinner} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import {Issue} from "@prisma/client";
import { issueSchema } from "@/app/validationSchemas/createIssueSchema";
import SimpleMDE from 'react-simplemde-editor';
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: {issue?: Issue}) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });

    const[error, setError] = useState('');
    const[isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (issue) {
                await axios.patch('/api/issues/' + issue.id, data);
            } else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues');
            router.refresh();
        } catch (e) {
            setError('An unexpected error occurred');
            setIsSubmitting(false);
        }
    })

    return (
        <div className="max-w-xl ">
            { error &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
            <form className="space-y-3"
                  onSubmit={onSubmit}>

                <TextField.Root defaultValue={issue?.title}  placeholder ='Title' {...register('title')}>
                    <TextField.Slot/>
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    control={control}
                    name="description"
                    defaultValue={issue?.description}
                    render={({field}) => <SimpleMDE placeholder="Description" {...field}/> }
                />
                <ErrorMessage>{errors.description?.message} </ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}
export default IssueForm;
