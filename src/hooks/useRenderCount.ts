import { useEffect, useRef } from "react";

export default function useRenderCount() {
    const count = useRef(1);
    //@ts-ignore
    useEffect(() => {
        count.current++;
    });
    return count.current;
}