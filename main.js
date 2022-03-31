//first commit
//second commit
// document.addEventListener('DOMContentLoaded', () => {
    
// 

chrome.runtime.onInstalled.addListener((reason) => {
       chrome.tabs.query({}, function(tabs) {
         let cachedObj = {}
         let allIds = []
         for(let i = 0; i < tabs.length; i++) {
          cachedObj[tabs[i].title] = tabs[i].id
          allIds.push(tabs[i].id)
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

            async function reload(id) {
                await chrome.tabs.reload(id);
              }


        const result = allIds.filter(x => !Object.values(ordered).includes(x))
           
           let i = 0;
       (function loopIt(i) {
        setTimeout(function(){
           move(ordered[orderedKeys[i]], i)
           reload(ordered[orderedKeys[i]])
           chrome.tabs.highlight({'tabs': i}, function() {})
           if(result[i] !== undefined) {
            chrome.tabs.remove(result[i])           
        }
        if(i < orderedKeys.length - 1)  loopIt(i+1)
       }, 300);
       })(i)

    


       
       

       

        //     async function reload(id) {
        //         await chrome.tabs.reload(id);
        //       }


        //  i = 0;                  

        //  (function loopItReload(i) {
        //     setTimeout(function(){
        //         reload(ordered[orderedKeys[i]])      
        //      if(i < orderedKeys.length - 1)  loopItReload(i+1)
        //    }, 300);
        //    })(i)
            
          
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

  

  