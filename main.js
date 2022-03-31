//first commit
//second commit
// document.addEventListener('DOMContentLoaded', () => {
    
// 

chrome.runtime.onInstalled.addListener((reason) => {
       chrome.tabs.query({}, function(tabs) {
         let cachedObj = {}
         for(let i = 0; i < tabs.length; i++) {
          cachedObj[tabs[i].title] = tabs[i].id
         } 

         let newCachedObj = {}
         const keys = Object.keys(cachedObj)
         for(let i = 0; i < keys.length; i++) {
            newCachedObj[keys[i].toLowerCase().replace(/[^a-zA-Z]/g,"")] = cachedObj[keys[i]]
         }
         const orderedKeys = Object.keys(newCachedObj).sort()
         const ordered = orderedKeys.reduce(
            (obj, key) => { 
              obj[key] = newCachedObj[key]; 
              return obj;
            }, 
            {}
          );


        
          

          async function move(id, tabIndex) {
              await chrome.tabs.move(id, {index: tabIndex});
            }
            
            // for(let i = 0; i < orderedKeys.length; i++) {
            //     move(ordered[orderedKeys[i]], i)
            // }

           
           let i = 0;
       (function loopIt(i) {
        setTimeout(function(){
         move(ordered[orderedKeys[i]], i)      
         if(i < orderedKeys.length - 1)  loopIt(i+1)
       }, 500);
       })(i)

            async function reload(id) {
                await chrome.tabs.reload(id);
              }


         i = 0;                  

        function myLoop() {         
          setTimeout(function() {   
          reload(ordered[orderedKeys[i]]);   
          i++;                    
          if (i < orderedKeys.length) {           
            myLoop();             
         }                       
       }, 500)
        }

      myLoop(); 
            
          
       } );
       
       
     
// for(var i = 0; i < 5; i++){
//     (function(i){
//         setTimeout(function(){
//             console.log('value is ', i);
//         }, 3000);
//     })(i);
// }
    
});



// const unordered = {
//   'b': 'foo',
//   'c': 'bar',
//   'a': 'baz'
// };

// → '{"a":"baz","b":"foo","c":"bar"}'

  

  