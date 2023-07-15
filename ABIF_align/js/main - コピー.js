let codon = [];
codon[0] = ['TTT', 'TTC', 'TTA', 'TTG', 'TCT', 'TCC', 'TCA', 'TCG', 'TAT', 'TAC', 'TAA', 'TAG', 'TGT', 'TGC', 'TGA', 'TGG', 'CTT', 'CTC', 'CTA', 'CTG', 'CCT', 'CCC', 'CCA', 'CCG', 'CAT', 'CAC', 'CAA', 'CAG', 'CGT', 'CGC', 'CGA', 'CGG', 'ATT', 'ATC', 'ATA', 'ATG', 'ACT', 'ACC', 'ACA', 'ACG', 'AAT', 'AAC', 'AAA', 'AAG', 'AGT', 'AGC', 'AGA', 'AGG', 'GTT', 'GTC', 'GTA', 'GTG', 'GCT', 'GCC', 'GCA', 'GCG', 'GAT', 'GAC', 'GAA', 'GAG', 'GGT', 'GGC', 'GGA', 'GGG'];
codon[1] = ['F', 'F', 'L', 'L', 'S', 'S', 'S', 'S', 'Y', 'Y', '*', '*', 'C', 'C', '*', 'W', 'L', 'L', 'L', 'L', 'P', 'P', 'P', 'P', 'H', 'H', 'Q', 'Q', 'R', 'R', 'R', 'R', 'I', 'I', 'I', 'M', 'T', 'T', 'T', 'T', 'N', 'N', 'K', 'K', 'S', 'S', 'R', 'R', 'V', 'V', 'V', 'V', 'A', 'A', 'A', 'A', 'D', 'D', 'E', 'E', 'G', 'G', 'G', 'G'];
codon[2] = ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr', 'Tyr', '*', '*', 'Cys', 'Cys', '*', 'Trp', 'Leu', 'Leu', 'Leu', 'Leu', 'Pro', 'Pro', 'Pro', 'Pro', 'His', 'His', 'Gln', 'Gln', 'Arg', 'Arg', 'Arg', 'Arg', 'Ile', 'Ile', 'Ile', 'Met', 'Thr', 'Thr', 'Thr', 'Thr', 'Asn', 'Asn', 'Lys', 'Lys', 'Phe', 'Phe', 'Arg', 'Arf', 'Val', 'Val', 'Val', 'Val', 'Ala', 'Ala', 'Ala', 'Ala', 'Asp', 'Asp', 'Glu', 'Glu', 'Gly', 'Gly', 'Gly', 'Gly'];

let nuc_comp = [];
nuc_comp[0] = ["A", "T", "C", "G", "a", "t", "c", "g"];
nuc_comp[1] = ["T", "A", "G", "C", "t", "a", "g", "c"];

amino_weight = [];//0:アミノ酸　1:分子量　2:残基分子量（-水分子）
amino_weight[0] = ["A","R","N","D","C","E","Q","G","H","O","I","L","K","M","F","P","U","S","T","W","Y","V"]; 
amino_weight[1] = [89.10,174.20,132.12,133.11,121.16,147.13,146.15,75.07,155.16,131.13,131.18,131.18,146.19,149.21,165.19,115.13,139.11,105.09,119.12,204.23,181.19,117.15];
amino_weight[2] = [71.08,156.19,114.11,115.09,103.15,129.12,128.13,57.05,137.14,113.11,113.16,113.16,128.18,131.20,147.18,97.12,121.09,87.08,101.11,186.22,163.18,99.13]

let file_csv = document.getElementById("csv");
file_csv.addEventListener("change",readCSV);
let csv_arr;

window.addEventListener("resize",resizeWindow);

document.getElementById("translate").addEventListener("click",tButtonckick);
function tButtonckick(){
    console.log("a");
    let proteinSeq = translate(document.getElementById("seq").value);
    document.getElementById("protein").innerText = proteinSeq;
}


let proteinelem = document.getElementById("protein");
proteinelem.addEventListener("selectstart",seqselect);



function seqselect(){
    
    proteinelem.addEventListener("mousemove",function tmp (){
        let seq = String(document.getSelection());
        console.log("a");
        console.log(new Intl.NumberFormat('ja-JP').format(Math.round(protein_weight(seq)*100)/100));
        

        //マウスを離したときにEventlistenerを削除
        window.addEventListener("mouseup",function(){
            proteinelem.removeEventListener("mousemove",tmp);
        });
        
    });
    
} 



//こっからORFwindow初期設定
let width1 = document.getElementById("ORF_figure").clientWidth;
let height1 = width1/4;
console.log(document.getElementsByClassName("ORF_in")[0].clientWidth);
document.getElementById("ORF_figure").style.height = height1+"px";

document.getElementById("ORF_figure").style.paddingTop = height1*1/13+"px";

for(let i = 0;i<=document.getElementsByClassName("ORF_in").length-1;i++){
    document.getElementsByClassName("ORF_in")[i].style.height = height1*1/13+"px";
    document.getElementsByClassName("ORF_in")[i].style.marginBottom = height1*1/13+"px";
}






function resizeWindow(){
    let width1 = document.getElementById("ORF_figure").clientWidth;
    let height1 = width1/4;
    console.log(document.getElementsByClassName("ORF_in")[0].clientWidth);
    document.getElementById("ORF_figure").style.height = height1+"px";
    
    document.getElementById("ORF_figure").style.paddingTop = height1*1/13+"px";
    
    for(let i = 0;i<=document.getElementsByClassName("ORF_in").length-1;i++){
        document.getElementsByClassName("ORF_in")[i].style.height = height1*1/13+"px";
        document.getElementsByClassName("ORF_in")[i].style.marginBottom = height1*1/13+"px";
    }
    for(let i = 0;i<=document.getElementsByClassName("orf").length-1;i++){
        document.getElementsByClassName("orf")[i].style.height = height1*1/13+"px";
    }
}

/*
引数：peotein sequence
戻り値：タンパク質分子量 formatがerrorを履いた時は0
*/
function protein_weight(pro){
    let result=0;
    console.log(pro_format(pro)[0]);
    if(pro_format(pro)[0] == 1&&pro_format(pro)[1].length>0){
        pro = pro_format(pro)[1];
        pro = pro.split("");
        
        for(let i = 0;i<=pro.length-1;i++){
            result = result+amino_weight[2][amino_weight[0].indexOf(pro[i])];
            //console.log(amino_weight[0].indexOf(pro[i]));
        }
        result = result+18.02;
        console.log(result);
    }
    else{
        result = "-"
    }
    return result;
}


/*
*/
function nuc_format(seq) {
    //console.log("format");
    const Nucformat = /[^ATGCNatgcn]/;
    const Amiformat = /[^ARNDCQEGHILKMFPSTWYVBZX*arndcqeghilkmfpstwyvbzx*]/;

    //let alart = [];
    seq = seq.replace(/\n/g, "");
    seq = seq.replace(/\r\n/g, "");
    seq = seq.replace(/\s/g, "");//空白文字（半角スペース、\t、\n、\r、\f）すべて

    if (Nucformat.test(seq)) {
        console.log("   塩基配列ちゃうよ");
        //alart[0] = "それ塩基配列じゃない気がする…";
    }
    else {
        
        //alart[0] = "";
    }
    
    return seq;
}

/*
引数：アミノ酸配列（str）
戻り値：[-1or1,アミノ酸配列]
    -1:error
    1:正しい



*/
function pro_format(seq) {
    //console.log("format");
    let result;
    const Nucformat = /[^ATGCNatgcn]/;
    const Amiformat = /[^ARNDCQEGHILKMFPSTWYVBZX*arndcqeghilkmfpstwyvbzx*]/;

    //let alart = [];
    seq = seq.replace(/\n/g, "");
    seq = seq.replace(/\r\n/g, "");
    seq = seq.replace(/\s/g, "");//空白文字（半角スペース、\t、\n、\r、\f）すべて

    console.log("m:"+seq);

    if (Amiformat.test(seq)) {
        console.log("アミノ酸配列ちゃうよ");
        result = [-1,""]
        //alart[0] = "それ塩基配列じゃない気がする…";
    }
    else if(seq.indexOf("*")<seq.length-1&&seq.indexOf("*")!=-1){
        console.log("配列中に*が含まれています");
        result = [-1,""]

        //alart[0] = "";
    }
    else{
        seq = seq.replace("*","");
        result = [1,seq];
    }

    return result;
}




/*
    引数：fasta,min
    戻り値：fasta(ORF)
*/
function searchORFall_multifasta(fasta,min){
    let seqList = readFasta(fasta);
    let tmporf;
    //let resultseqList = [];
    //let m =0;
    let resultFasta="";
    console.log(seqList);
    for(let i=0;i<=seqList.length-1;i++){
        tmporf = searchORFall(seqList[i][1],min);
        console.log(i+":"+seqList[i][0]+"____"+tmporf);
        
        for(let n=0;n<=tmporf.length-1;n++){
            console.log(i+","+n,":"+tmporf[n]);
            resultFasta = resultFasta+">"+seqList[i][0]+"_"+tmporf[n][1]+"-"+tmporf[n][2]+"\n"+tmporf[n][3]+"\n";

        }
        
    }
    return resultFasta;
}

/*
引数：配列,最小
返り値：[0~5]->[start,end,ORF],[start,end,ORF]....

ORFと範囲を返す
*/

function searchORFall(nuc, min) {

    let orfList = [];
    let frame = ["+1", "+2", "+3", "-1", "-2", "-3"];

    let n=0;
    for (let i = 0; i <= frame.length - 1; i++) {
        console.log(frame[i]+" search_start");
        let tmp = searchORF(nuc, min, frame[i]);
        //console.log(frame[i]+":"+tmp);
        for(let m = 0;m<=tmp.length-1;m++){
            orfList[n]=tmp[m];
            n++
        }
        
    }

    console.log(orfList);
    return orfList;
}


/*
引数：塩基配列,最小,読み枠
返り値：ORF[[start,stop,orf][start,stop,orf]...]

読み枠は0,1,2
ORFと範囲を返す

[start,end,ORF]
[start,emd,ORF]で返す
*/
function searchORF(nuc, min, frame_str) {
    frame = Number(frame_str);
    //console.log("translate");
    let nuc_tmp = nuc;//塩基配列編集用
    let nuc_arr;//nucをコドンごとに分割した配列
    let orfLength = 0;//ORFの長さ
    let orf = [];

    let orf_num = 0;
    let orf_tmp;

    let orf_start;
    let orf_stop;

    nuc = nuc_format(nuc);


    if (nuc == null) {
        console.log("nullやで");
        nuc = "";
    }

    if (nuc.length >= 3) {

        if (frame > 0) {
            //読み枠が+1,+2,+3のとき
            nuc_tmp = nuc.slice(frame - 1);//読み枠に応じて先頭を削除
        }
        else {
            //読み枠が-1,-2,-3
            nuc_tmp = reverseNuc(nuc_tmp);
            nuc_tmp = nuc_tmp.slice((frame * -1) - 1);
        }

        nuc_arr = nuc_tmp.match(/.{3}/g);
        //console.log(nuc_arr);
    }
    else {
        nuc_arr = "";
    }

    //こっからORF探索開始
    for (let i = 0; i <= nuc_arr.length - 1; i++) {
        
        if (nuc_arr[i].toUpperCase() == "ATG" && orfLength == 0) {
            //開始コドンきたとき
            orfLength = orfLength + 3;
            orf_tmp = nuc_arr[i];
            //orf_tentP = "M";
            //console.log("start")
            if (frame > 0) {
                orf_start = (i * 3) + 1 + frame - 1;
            }
            else {
                orf_start = nuc.length - ((i * 3) + 1 + ((frame * -1) - 1) - 1);
            }

        }
        else if (nuc_arr[i].toUpperCase() == "TAA" || nuc_arr[i].toUpperCase() == "TAG" || nuc_arr[i].toUpperCase() == "TGA" && orfLength != 0) {
            //終止コドンきた＆ORF伸長中

            if (orfLength+3 >= min) {
                //ORFが最小値以上だったとき

                orf_tmp = orf_tmp + nuc_arr[i];

                if (frame > 0) {
                    orf_stop = (i * 3) + 3 + frame - 1;
                }
                else {
                    orf_stop = nuc.length - (((i * 3) + 3 + (frame * -1) - 1) - 1);
                }

                orf[orf_num] = [frame_str,orf_start, orf_stop, orf_tmp];//返り値の配列に格納

                orf_num++;//ORF number加算
            }

            //ここからカウント初期化
            orf_tmp = "";
            orfLength = 0;
            orf_start = 0;
            orf_stop = 0;


        }
        else if (orfLength != 0) {
            //ATG以降で終止コドンではないとき
            //ORF伸長中
            orfLength = orfLength + 3;
            orf_tmp = orf_tmp + nuc_arr[i];
            
        }


    }

    return orf;
    //console.log(orfP);

    //return nucarrP;
}

/*
引数：塩基配列(str)
返り値：rev配列(str)
*/
function reverseNuc(nuc) {
    //console.log("reverse");
    let nucrev;
    let nucrev_tmp = [];

    let nucmir = nuc.split("").reverse();
    for (let i = 0; i <= nucmir.length - 1; i++) {
        nucrev_tmp[i] = nuc_comp[1][nuc_comp[0].indexOf(nucmir[i])];
    }
    nucrev = nucrev_tmp.join("");
    //console.log(nucrev);
    return nucrev;
}

/*
引数：fasta(str)
    >から始まる必要あり
返り値：配列[[title(str),seq(str)][title,seq].....]
*/
function readFasta(fasta) {
    let seqList = [];
    let seqnum = -1;//+1したときに0から始まるように

    let fasta_arr = fasta.split("\n");
    console.log(fasta_arr);

    for (let i = 0; i <= fasta_arr.length - 1; i++) {
        if (fasta_arr[i].indexOf(">") == 0) {
            seqnum++;
            seqList[seqnum] = [];
            seqList[seqnum][0] = fasta_arr[i].slice(1);
            seqList[seqnum][1] = "";
        }
        else {
            seqList[seqnum][1] = seqList[seqnum][1] + fasta_arr[i];
        }
    }

    return seqList;
}

/*
引数：seqList[[title,seq][title,seq].....]
返り値：fasta(str)
*/
function exportFasta(seqList) {
    let fasta = "";
    for (let i = 0; i <= seqList.length - 1; i++) {
        fasta = fasta + ">" + seqList[i][0] + "\n" + seqList[i][1] + "\n"
    }
    //console.log(fasta);
    return fasta;

}

/*
引数：Genbank(str)
返り値：[[title(str),seq(str)][title,seq].....]
*/
function readGenbank(Genbank) {

}


/*
引数：seqList[[title,seq,...][title,seq].....]
返り値：Genbank(str)
*/
function exportGenbank(){

}

/*
引数：multifasta(protein)
返り値：multifasta(protein)
*/ 
function translate_multifasta(fasta){
    let seqList = readFasta(fasta);
    let result = "";
    for(let i=0;i<=seqList.length-1;i++){
        result = result+">"+seqList[i][0]+"\n"+translate(seqList[i][1])+"\n";
    }
    console.log(result);
}


/*
引数：nuc(str)
返り値：pro(str)
*/

function translate(nuc) {
    nuc = nuc_format(nuc);
    let pro;
    let pro_arr = [];
    nuc = nuc.toUpperCase();
    let nuc_arr = nuc.match(/.{3}/g);

    for (let i = 0; i <= nuc_arr.length - 1; i++) {
        pro_arr[i] = codon[1][codon[0].indexOf(nuc_arr[i])];
    }

    pro = pro_arr.join("");
    console.log(pro);
    return pro;
} 

/*
引数
id     :accession number
start   :開始位置
stop    :終了位置
strand  :1,2(逆の場合はこっち,開始>終了が逆でも2にしないとだめ) 
rettype :fasta,genbank
retmode :text,xmlとか

返り値：
fasta or genbank(str)
*/
function getseq_entrez(id,start,stop,strand,rettype,retmode){
    //console.log("a")
    let formdata =  new FormData();
    formdata.append("id",id);
    formdata.append("start",start);
    formdata.append("stop",stop);
    formdata.append("strand",strand);
    formdata.append("rettype",rettype);
    formdata.append("retmode",retmode);

    return $.ajax({
        type: "POST",
        url: "entrez_search.php",
        data: formdata,
        
        contentType: false,
        processData: false,
        
    })
}

/*
*/
function readCSV(e){
    console.log(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function() {
        //console.log(reader.result);
        let result = [];
        let tmp =  reader.result.split("\n");
        
        for(let i=0;i<=tmp.length-1;i++){
            console.log(tmp[i]);
            if(tmp[i].split(",").length>=2){
                result[i] = tmp[i].split(",");
                
            }
        }
        console.log(result);
        csv_arr = result;
        //nn(result);
        //return result;
        
    };
}

function nn(csv_arr){
   for(let i = 0;i<=3;i++){
        let m= getseq_entrez(csv_arr[i][1],csv_arr[i][8],csv_arr[i][9],1,"fasta","text");
   }  
}

function mm(start,end){
    
    let fastaList =[];
    
    for(let i = 0;i<=7;i++){
        if(csv_arr[i][14]>0){
            data = getseq_entrez(csv_arr[i][1],csv_arr[i][8]+start,csv_arr[i][9]+end,1,"fasta","text");
        }
        else {
            data = getseq_entrez(csv_arr[i][1],csv_arr[i][8]+end,csv_arr[i][9]+start,-1,"fasta","text");
        }

        
        
        data.then(
            
            function(data){
                //console.log(data);
                fastaList[i] = data;
                console.log(fastaList[i].length);
                if(fastaList.length==8){
                    console.log(fastaList);
                }
                
            }
            
        );  
    } 
   //console.log(m);
   
}
function mm2(){
    let fastaList =[];
    let multifasta ="";
    let n =0;

    let a = setInterval(
        function(){
            for(let i = n;i<=n+8;i++){
                
                //console.log(i);
                if(i<=csv_arr.length-1&&csv_arr[i].length>=3){
                    data = getseq_entrez(csv_arr[i][1],csv_arr[i][8],csv_arr[i][9],1,"fasta","text");
                
                    data.then(
                        function(data){
                            //console.log(data);
                            fastaList[i] = data;
                            console.log(fastaList.length);
                            if(fastaList.length==csv_arr.length){
                                
                                multifasta = fastaList.join("");
                                console.log(multifasta);
                                return fastaList;
                            } 
                        }
                        
                    );
                    //console.log(csv_arr[i][1]);
                }
                else{
                    clearInterval(a);
                }
                
            } 
            n=n+9;
        }
        ,1000
    );
    
   //console.log(m);
   
}

function mm3(startadd,stopadd){
    let fastaList =[];
    let multifasta ="";
    let n =0;

    let a = setInterval(
        function(){
            for(let i = n;i<=n+2;i++){
                
                //console.log(i);
                if(i<=csv_arr.length-1&&csv_arr[i].length>=3){
                    let id=csv_arr[i][1];
                    let start;
                    let stop;
                    let strand;
                    if(csv_arr[i][8]<csv_arr[i][9]){
                        start = Number(csv_arr[i][8])+startadd;
                        stop = Number(csv_arr[i][9])+stopadd;
                        strand=1;
                    }
                    else{
                        start = Number(csv_arr[i][8])+stopadd;
                        stop = Number(csv_arr[i][9])+startadd;
                        strand=2;
                    }
                
                    data = getseq_entrez(id,start,stop,strand,"fasta","text");
                
                    data.then(
                        function(data){
                            //console.log(data);
                            fastaList[i] = data;
                            console.log(i+":"+fastaList.length);
                            if(fastaList.length==csv_arr.length){
                                
                                multifasta = fastaList.join("");
                                console.log(multifasta);
                               // return fastaList;
                            } 
                        }
                        
                    );
                    //console.log(csv_arr[i][1]);
                }
                else{
                    clearInterval(a);
                }
                
            } 
            n=n+3;
        }
        ,1000
    );
    
   //console.log(m);
   
}

/*orflistと配列全長から図を作製する
*/
function create_ORF(orfList,seqSize){
    let width1 = document.getElementById("ORF_figure").clientWidth;
    let height1 = width1/4;

    let classORF = document.getElementsByClassName("orf");
    console.log(classORF.length);
    let classORF_length = classORF.length;//先にlengthとらないと削除できない
    for(let i = 0;i<=classORF_length-1;i++){
        console.log(i);
        classORF[0].remove();
    }
    
    for(let i=0;i<=orfList.length-1;i++){
        let orf = document.createElement("div");
        orf.classList.add("orf");//class名追加
        orf.setAttribute("id","orf"+i);//id設定　orfListの番号と同じ
        orf.style.height = height1*1/13+"px";
        orf.style.width = (Math.abs(orfList[i][2]-orfList[i][1])+1)*100/seqSize+"%";
        orf.style.marginLeft = (Math.min(orfList[i][2],orfList[i][1])-1)*100/seqSize+"%";
        console.log(orfList[i][0]);
        document.getElementById(orfList[i][0]+"").appendChild(orf);
    }
}


