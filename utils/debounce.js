export function debounce(funcToCall,delay){
    let timerId = null;

    return (...args)=>{
        clearTimeout(timerId);

        timerId = setTimeout(()=>{
            funcToCall(...args)
        },delay);
    }
}