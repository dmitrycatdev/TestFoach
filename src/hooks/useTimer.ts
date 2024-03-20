import { useEffect, useState } from "react";

const useTimer = (maxSeconds: number, callback?: () => void) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function reset() {
        setSeconds(0);
        setIsActive(true);
    }

    useEffect(() => {
        let timerId: any = null;

        if (seconds >= maxSeconds) {
            callback?.();
            reset();
        } else if (isActive) {
            timerId = setInterval(() => {
                setSeconds((sec) => sec + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(timerId);
        }
        return () => clearInterval(timerId);
    }, [isActive, seconds]);

    function toggle(active: boolean) {
        setIsActive(active);
    }
    

    return { seconds, toggle, reset };
};

export default useTimer;
