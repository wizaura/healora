"use client";

import { useParams } from "next/navigation";
import ConditionEditor from "../shared/EditorMain";

export default function EditSubSpecialityPage() {

    const { subId } = useParams();

    
    return (
        <ConditionEditor
            id={subId}
            type="sub"
        />
    );
}