const draghere = document.querySelector('.draghere');
const blackimage = document.querySelector('.blackimage');
const whiteimage = document.querySelector('.whiteimage');
const inputbutton = document.querySelector('#inputbutton');
const browsebutton = document.querySelector('#browsebutton');

draghere.addEventListener("dragover",(e)=>{
    e.preventDefault()
    
    if(!blackimage.classList.contains("hidden")){
        draghere.classList.add("hoveroverdraghere");
        blackimage.classList.add("hidden");
        whiteimage.classList.add("visible");
    }
});

draghere.addEventListener("dragleave",()=>{
    draghere.classList.remove("hoveroverdraghere");
    blackimage.classList.remove("hidden");
    whiteimage.classList.remove("visible");
});

draghere.addEventListener("drop",(e)=>{
    e.preventDefault()
    draghere.classList.remove("hoveroverdraghere");
    blackimage.classList.remove("hidden");
    whiteimage.classList.remove("visible");
    const files = e.dataTransfer.files;
    if(files.length){
        inputbutton.files = files;
    }
});

browsebutton.addEventListener("click",()=>{
    inputbutton.click();    
});
