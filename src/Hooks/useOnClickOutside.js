import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => { 
            console.log("클릭한 위치", event.target);
            console.log("ref의 위치", ref.current);
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);


        // component unmount 되면 리스너를 없애줘야함
        // 클리어는 리턴 부분에다가 넣어주면 된다 함
        return () => {
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
        }
    }, []);

    return (
        <div>

        </div>
    )
}

export default useOnClickOutside
