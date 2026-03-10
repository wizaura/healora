import { Input, SectionTitle, Textarea } from "./EditorMain";

export default function BasicInfoSection({ form }: any) {

    const { register } = form;

    return (

        <div className="space-y-6">

            <SectionTitle title="Basic Information" />

            <Input
                label="Name"
                {...register("name")}
            />

            <Input
                label="Slug"
                {...register("slug")}
            />

            <Textarea
                label="Description"
                {...register("description")}
            />

        </div>

    );
}