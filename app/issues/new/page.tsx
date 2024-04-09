// import IssueForm from "@/app/issues/_components/IssueForm";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>
    })
const NewIssuePage = () => {
    return (
        <IssueForm />
    )
}
export default NewIssuePage;
