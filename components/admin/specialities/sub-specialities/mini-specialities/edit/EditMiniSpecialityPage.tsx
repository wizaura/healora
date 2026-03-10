"use client";

import { useParams } from "next/navigation";
import ConditionEditor from "../../shared/EditorMain";

export default function EditMiniSpecialityPage() {

    const { miniId } = useParams();

    
    return (
        <ConditionEditor
            id={miniId}
            type="mini"
        />
    );
}