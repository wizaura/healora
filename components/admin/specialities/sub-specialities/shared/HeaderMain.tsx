import { Input, SectionTitle, Textarea } from "./EditorMain";

export default function HeaderMainSection({ form }: any) {

    const { register } = form;

    return (

        <div className="space-y-6">

            <SectionTitle title="Main Header Question" />

            <Input
                label="Question"
                {...register("headerMain.question")}
            />

            <Textarea
                label="Answer"
                {...register("headerMain.answer")}
            />

        </div>

    );
}