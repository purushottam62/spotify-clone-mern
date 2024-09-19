console.log("welcome to sotify");
let audioElement=new Audio('songs/hawayein.mp3');
// audioElement.play();
//initialise the variables
let songIndex=0;
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songNameOfSongs:"hawayein" , filePath:"songs/hawayein.mp3",coverPath:"images/hawayein.jpg"},
    {songNameOfSongs:"baarish ban jana" , filePath:"songs/baarish ban jaana.mp3",coverPath:"images/baarish ban jana.jpg"},
    {songNameOfSongs:"paanchi bole" , filePath:"songs/paanchi bole.mp3",coverPath:"images/paanchi bole.jpg"},
    {songNameOfSongs:"deewane ham nhi hote" , filePath:"songs/deewane hum nhi hote.mp3",coverPath:"images/deewane ham nhi hote.jpg"},
    {songNameOfSongs:"hari sakhi mangal gao ri" , filePath:"songs/hari sakhi mangal gao ri.mp3",coverPath:"images/hari sakhi magal gao ri.jpg"},
    {songNameOfSongs:"khairyat" , filePath:"songs/khairyiat.mp3",coverPath:"images/khairyat.jpg"},
    {songNameOfSongs:"paisa hai toh" , filePath:"songs/paisa hai toh.mp3",coverPath:"images/paisa hai toh.jpg"},
]
songLength=songs.length;
songItem.forEach((element, i)=>{
  
element.getElementsByTagName("img")[0].src=songs[i].coverPath; 
// element.getElementsByTagName()
 console.log("images came");
})
Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
         index=parseInt(e.target.id);  
        //   sPlay=e.target;
        console.log(e.target); 
      
        // initialTime=audioElement.currentTime
        if(audioElement.paused||audioElement.currentTime==0){ 
            
//             progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
// myProgressBar.value=progress;
//         })
// myProgressBar.addEventListener('change',()=>{
    // audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
// })
            // if(audioElement.currentTime==0){
            //     audioElement.currentTime=0;}
            //     else{audioElement.currentTime=progress}
              
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
          
        audioElement.src=songs[index].filePath
               audioElement.play();
       
        audioElement.play();
        // progress=(myProgressBar.value*audioElement.duration)/100;
        // audioElement.currentTime=progress;
        // audioElement.currentTime=parseFloat((myProgressBar.value*audioElement.duration)/100);
        document.getElementById("songName").innerHTML=songs[index].songNameOfSongs;
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');}
    
        else{
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
            // audioElement.currentTime=0;
            // audioElement.src=songs[index]. songNameOfSongs:"hawayein" , filePath;
            audioElement.pause();
            gif.style.opacity=0;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }
    })
    })
//play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause'); 
        // sPlay.classList.remove('fa-play')
        // sPlay.classList.add('fa-pause');
        gif.style.opacity=1;
document.getElementById(`${index}`).classList.remove('fa-play');
document.getElementById(`${index}`).classList.add('fa-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        
        // sPlay.classList.remove('fa-pause');
        // sPlay.classList.add('fa-play');
        gif.style.opacity=0;
        document.getElementById(`${index}`).classList.remove('fa-pause');
document.getElementById(`${index}`).classList.add('fa-play');
    }
})
// songItem.forEach((element)=>{
// element.addEventListener('click',(e)=>{
//     // console.log(e.target);
//     console.log(element);
//     // e is the event here and element is element of songItem
//     //e.target is element itself
//     element.classList.remove("fa-play");
//     element.classList.add("fa-pause");



// })
// })
//listen to events
audioElement.addEventListener('timeupdate',()=>{
//update seek bar
progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})
progress=(myProgressBar.value*audioElement.duration)/100;
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
element.classList.remove("fa-pause");     
element.classList.add("fa-play");

    })
}

document.getElementById("backward").addEventListener(('click'),()=>{
    if(index==0)index=0;
    else index-=1;
    audioElement.src=songs[index].filePath
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementById("songName").innerHTML=songs[index].songNameOfSongs;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    // sPlay.classList.remove('fa-play');
    // sPlay.classList.add('fa-pause');
    document.getElementById(`${index}`).classList.remove('fa-play');
document.getElementById(`${index}`).classList.add('fa-pause');
document.getElementById(`${index+1}`).classList.remove('fa-pause');
document.getElementById(`${index+1}`).classList.add('fa-play');

})
document.getElementById("forward").addEventListener(('click'),()=>{
    if(index==songLength-1)index=0;
    else index+=1;
    audioElement.src=songs[index].filePath
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementById("songName").innerHTML=songs[index].songNameOfSongs;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    // sPlay.classList.remove('fa-pause');
    // sPlay.classList.add('fa-play');
    document.getElementById(`${index-1}`).classList.remove('fa-pause');
document.getElementById(`${index-1}`).classList.add('fa-play');
    document.getElementById(`${index}`).classList.remove('fa-play');
document.getElementById(`${index}`).classList.add('fa-pause');


})