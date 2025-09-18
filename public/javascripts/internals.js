function getcollageid(value){

  let  course = document.getElementById('course').value
 const option = document.getElementById('collageid123')
    // console.log(course);
    // console.log(value); 
    $.ajax({

        
        url:'/getcollageid',
        data:{
            course : course,
            sem:value
        },
        method:'post',
        success :(respo,aswi)=>{
            console.log(respo);
            console.log(aswi);
            respo.forEach((item,index)=>{
                let op = document.createElement('option')
                op.text=item
                op.value=item
                option.add(op)
                
               
            });
            
        }

    })
}

function getsubject(){
    let  course = document.getElementById('course').value
    let  sem = document.getElementById('sem').value
    let option = document.getElementById('subject')
    
    $.ajax({

        
        url:'/getSubject',
        data:{
            course : course,
            sem:sem
        },
        method:'post',
        success :(respo)=>{
            // console.log(respo);
            // console.log(aswi);
            respo.forEach((item,index)=>{
                let op = document.createElement('option')
                op.text=item
                op.value=item
                option.add(op)
                
               
            });
            // console.log("i am herer in ajzx");
        }

    })
}


function getMark(subject){
    console.log(subject);
    console.log("i am here in get mark");
    const collageid = document.getElementById('collageid123').value
    
    $.ajax({

        
        url:'/getMark',
        data:{
            collageid:collageid,
            subject:subject
        },
        method:'post',
        success :(respo)=>{
            console.log(respo[7]);
            respo.forEach((item,index)=>{
                


                
                if(item[0]!='subject'){
                   asw= item[0]
                //    console.log(asw);
                    item[1]=Number(item[1])
                    console.log(item[1]);
                   document.getElementById(item[0]).value=item[1]
                }
                
             
           
               

            })
            
                
               
            
            console.log("i am herer in ajzx");
        }

    })
   
}