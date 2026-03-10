import { useFieldArray } from "react-hook-form";
import { Input, SectionTitle, Textarea } from "./EditorMain";

export default function QAListSection({ form, name, title }: any) {

    const { control, register } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    return (

        <div className="space-y-6">

            <SectionTitle title={title} />

            {fields.map((field, index) => (

                <div
                    key={field.id}
                    className="border border-gray-200 p-6 rounded-lg space-y-4"
                >

                    <Input
                        label="Question"
                        {...register(`${name}.${index}.question`)}
                    />

                    <Textarea
                        label="Answer"
                        {...register(`${name}.${index}.answer`)}
                    />

                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 text-sm"
                    >
                        Remove
                    </button>

                </div>

            ))}

            <button
                type="button"
                onClick={() => append({ question: "", answer: "" })}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
            >
                + Add Question
            </button>

        </div>

    );
}