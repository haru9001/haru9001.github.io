function graphic_fasta(){
        let a =readFasta(file_now[0]);
        let fragment = document.createDocumentFragment();
        let classSeqbox = document.getElementsByClassName("seqbox");

        let classSeqbox_length = classSeqbox.length;//先にlengthとらないと削除できない
        for(let i = 0;i<=classSeqbox_length-1;i++){

            classSeqbox[0].remove();
        }

    for(let i=0;i<=a.length-1;i++){
        let seqbox = document.createElement("div");
        let seqall = document.createElement("div");
        let seqname = document.createElement("div");

        seqbox.setAttribute("class","seqbox");
        seqall.setAttribute("id",a[i][0].replace(/:/g,"_").replace(/\(/g,"_").replace(/\)/g,"_"));
        
        seqall.setAttribute("class","seqG");
        seqall.style.height = 10+"px";   
        let m = a[i][1].length;
        
        seqall.style.width = m*2+"px";

        seqname.innerText = a[i][0];
        seqbox.appendChild(seqname);
        seqbox.appendChild(seqall);
        fragment.appendChild(seqbox);
        

    }

    let ano = [];
    for(let i =0;i<=file_now2.length-1;i++){
        ano= ano.concat(interPro_array(file_now2[i]));
            
    }
       
        //let ano = interPro_array(file_now2);
        let ob = arrtoAssoc(a);
        let classAnno = document.getElementsByClassName("anno");
        //console.log(classAnno.length);
        let classAnno_length = classAnno.length;//先にlengthとらないと削除できない
        for(let i = 0;i<=classAnno_length-1;i++){
        // console.log(i);
            classAnno[0].remove();
        }
        
        for(let i=0;i<=ano.length-1;i++){
            if(ano[i][6]== "PHOBIUS"){
                //console.log("例外"+ano[i][3])
            }
            else{
                //      let elemlength = fragment.getElementById(ano[i][0]).clientWidth;
            let elemheight = 10;
            
            let Anno = document.createElement("div");
            Anno.classList.add("anno");//class名追加
            Anno.setAttribute("id",ano[i][3]);//id設定　orfListの番号と同じ
            Anno.setAttribute("name",ano[i][4])
            Anno.style.height = elemheight+"px";
            if(ano[i][3]=="PF13930"||ano[i][3]=="G3DSA:3.40.570.10"){
                Anno.style.backgroundColor="green";
            }
        // console.log(elemlength);
            //console.log(ano[i][1]+":"+ano[i][2]);
            //console.log((ano[i][1]-1)*elemlength/ob[ano[i][0]].length+":"+ano[i][2]*elemlength/ob[ano[i][0]].length);
            Anno.style.width = (ano[i][2]-ano[i][1]+1)*2+"px";
                
            Anno.style.marginLeft =(ano[i][1]-1)*2+"px";
            
            
            fragment.getElementById(ano[i][0].replace(/:/g,"_").replace(/\(/g,"_").replace(/\)/g,"_")).appendChild(Anno);
            }

        }

    let prop1 = prop(file_now3[0]);    
    //  let ob = arrtoAssoc(a);

        console.log(prop1);
        
        for(let i=0;i<=prop1.length-1;i++){
            
                    // let elemlength = fragment.getElementById(prop1[i][0]).clientWidth;
            let elemheight =10;
            
            let Anno = document.createElement("div");
            Anno.classList.add("anno");//class名追加
            Anno.setAttribute("id",prop1[i][2]);//id設定　orfListの番号と同じ
            Anno.setAttribute("name",prop1[i][3])
            Anno.style.height = elemheight+"px";
            
                Anno.style.backgroundColor="red";
            
        // console.log(elemlength);
            //console.log(ano[i][1]+":"+ano[i][2]);
            //console.log((ano[i][1]-1)*elemlength/ob[ano[i][0]].length+":"+ano[i][2]*elemlength/ob[ano[i][0]].length);
            Anno.style.width = 2+"px";
                
            Anno.style.marginLeft =prop1[i][1]*2+"px";
            //
            let j = prop1[i][0].replace(":","_").replace(/:/g,"_").replace(/\(/g,"_").replace(/\)/g,"_")
            console.log(fragment.getElementById(j));
            console.log(i);
        fragment.getElementById(j).appendChild(Anno);
            

        }


    let search1 = searchSeqAll(file_now[0],/C[^C]{3}C[^C]{3,15}C[^C]{3,15}C/);

    for(let i=0;i<=search1.length-1;i++){
            
                    // let elemlength = fragment.getElementById(search1[i][0]).clientWidth;
            let elemheight = 10;
            
            let Anno = document.createElement("div");
            Anno.classList.add("anno");//class名追加
            Anno.setAttribute("id",search1[i][2]);//id設定　orfListの番号と同じ
            Anno.setAttribute("name",search1[i][3])
            Anno.style.height = elemheight+"px";
            
                Anno.style.backgroundColor="silver";
            
        // console.log(elemlength);
            //console.log(ano[i][1]+":"+ano[i][2]);
            //console.log((ano[i][1]-1)*elemlength/ob[ano[i][0]].length+":"+ano[i][2]*elemlength/ob[ano[i][0]].length);
            Anno.style.width = (search1[i][2]-search1[i][1]+1)*2+"px";
                
            Anno.style.marginLeft =(search1[i][1]-1)*2+"px";
            
            
            fragment.getElementById(search1[i][0].replace(/:/g,"_").replace(/\(/g,"_").replace(/\)/g,"_")).appendChild(Anno);
            

        }

    let search2 = searchSeqAll(file_now[0],/C/);

    for(let i=0;i<=search2.length-1;i++){
            
                    // let elemlength = fragment.getElementById(search1[i][0]).clientWidth;
            let elemheight = 10;
            
            let Anno = document.createElement("div");
            Anno.classList.add("anno");//class名追加
            Anno.setAttribute("id",search2[i][2]);//id設定　orfListの番号と同じ
            Anno.setAttribute("name",search2[i][3])
            Anno.style.height = elemheight+"px";
            
                Anno.style.backgroundColor="DarkOrchid";
            
        // console.log(elemlength);
            //console.log(ano[i][1]+":"+ano[i][2]);
            //console.log((ano[i][1]-1)*elemlength/ob[ano[i][0]].length+":"+ano[i][2]*elemlength/ob[ano[i][0]].length);
            Anno.style.width = (search2[i][2]-search2[i][1]+1)*2+"px";
                
            Anno.style.marginLeft =(search2[i][1]-1)*2+"px";
        // console.log(fragment.getElementById(prop1[i][0]));
            
            fragment.getElementById(search2[i][0].replace(/:/g,"_").replace(/\(/g,"_").replace(/\)/g,"_")).appendChild(Anno);
            

        }
    if(search1[0][0]==prop1[0][0]){
        
    }
    else{
        console.log(search1[386][0].replace(/":"/g,"_").replace("(","_").replace(")","_"));
        console.log(prop1[1][0].replace(":","_").replace("(","_").replace(")","_"));
    }


    console.log(fragment.getElementById("148_OX352295.1:c27021064-27017748 Pammene aurita genome assembly, chromosome: 14_1001-2338"));
    document.getElementById("sequencelist").appendChild(fragment);
}