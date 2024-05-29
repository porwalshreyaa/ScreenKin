function hide(elem) {
    elem.style.visibility = 'hidden'
}
function reveal(elem){
    elem.style.visibility = 'visible'
}
const onClick = (event) => {
    if (event.target.nodeName === 'TEXTAREA') {
        const elem = event.target
        const flashCopy = document.getElementById('flashcopy');
        // console.log(elem);
        if (event.target.attributes.getNamedItem('readonly')) {    
            if (elem.value) {
                navigator.clipboard.writeText(elem.value);
                reveal(flashCopy)
                setTimeout(() => {
                    hide(flashCopy)
                  }, "1000");
            }
        // } else {
        //     console.log('No')
        //     if (!elem.innerText) {
        //         const text = navigator.clipboard.readText();
        //         elem.innerText = text;

        //     }
        }

    }
}
window.addEventListener('click', onClick);
