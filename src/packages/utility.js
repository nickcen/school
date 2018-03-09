export default {
  speak (msg, times = 1) {
    if(window.interval){
      clearInterval(window.interval)  
    }
    
    var utterThis = new window.SpeechSynthesisUtterance();
    utterThis.text = msg
    utterThis.lang = 'zh-cn'

    if(times > 1){
      var i = 0
      window.interval = setInterval(function() {
        window.speechSynthesis.speak(utterThis);
        i++;
        if(i >= times) clearInterval(window.interval); 
      }, 1500);  
    }else{
      window.speechSynthesis.speak(utterThis);
    }
  },
};
