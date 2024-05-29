// document.getElementById('select').addEventListener('click', () => 
function changeScreen() {
    const role = document.getElementById('role').value;
    if (role === 'sender') {
      document.getElementById('sender').style.display = 'block';
      document.getElementById('receiver').style.display = 'none';
      document.getElementById('first').style.display = 'none';
      loadSender();
    } else {
      document.getElementById('receiver').style.display = 'block';
      document.getElementById('sender').style.display = 'none';
      document.getElementById('first').style.display = 'none';
      loadReceiver();
    };
    document.getElementById('role').style.display = 'none';
    document.getElementById('select').style.display = 'none';
  }
// );

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
