"use client";

import { useParams } from "next/navigation";
import ConditionEditor from "../sub-specialities/shared/EditorMain";

export default function EditSpecialityPage() {

    const { specialityId } = useParams();

    
    return (
        <ConditionEditor
            id={specialityId}
            type="speciality"
        />
    );
}