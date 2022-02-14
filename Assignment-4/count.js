(function(){
    //selects the elements we want
    let localbtn=document.querySelector('.local button');
    let sessionbtn=document.querySelector('#sessionStorage');
    let llabel=document.querySelector('.local label');
    let slabel=document.querySelector('.session label');
    let count=Number(localStorage.getItem('count'));
    //intializing label with local score value
    llabel.textContent=`Local Score :${count}`;
    //adding eventlistener
    localbtn.addEventListener('click',()=>{
        let count=Number(localStorage.getItem('count'));
        count++;
        localStorage.setItem('count',count);
        // count=Number(localStorage.getItem('count'));
        llabel.textContent=`Local Score :${count}`;
    })
    count=Number(sessionStorage.getItem('count'));
    //intializing label with local score value
    slabel.textContent=`Session Score :${count}`;
    sessionbtn.addEventListener('click',()=>{
        let count=Number(sessionStorage.getItem('count'));
        count++;
        sessionStorage.setItem('count',count);
        count=Number(sessionStorage.getItem('count'))
        slabel.textContent=`Session Score:${count}`;
    })

})();