import { useFieldArray } from "react-hook-form";
import { Input, SectionTitle } from "./EditorMain";

export default function QuickFactsSection({ form }: any) {

    const { control, register } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "quickFacts"
    });

    return (

        <div className="space-y-6">

            <SectionTitle title="Quick Facts (max 6)" />

            {fields.map((field, index) => (

                <div key={field.id} className="flex gap-4 items-end">

                    <div className="flex-1">
                        <Input
                            label={`Fact ${index + 1}`}
                            {...register(`quickFacts.${index}.value`)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 text-sm pb-3"
                    >
                        Remove
                    </button>

                </div>

            ))}

            {fields.length < 6 && (

                <button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
                >
                    + Add Quick Fact
                </button>

            )}

        </div>

    );
}