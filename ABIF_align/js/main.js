
let file1 = document.getElementById("file1");
file1.addEventListener("change", loadAllText);
let file_now = [];


//let file2 = document.getElementById("file2");
//file2.addEventListener("change", loadAllText);
//let file_now2 = [];

//let file3 = document.getElementById("file3");
//file3.addEventListener("change", loadAllText);
//let file_now3 = [];

let file4 = document.getElementById("file4");
file4.addEventListener("change", loadAllbinary);
let file_now4 = [];

let translateStatus = 0;
/**
 * 0:全配列
 * 1:ORF
*/

window.addEventListener("resize", resizeWindow);


//document.getElementById("translate").addEventListener("click", tButtonckick);
document.getElementById("button_align").addEventListener("click", alignButtonckick);
function tButtonckick() {
    console.log("a");
    let proteinSeq = translate(document.getElementById("seq").innerText);


    let focusnode = document.getSelection().focusNode;
    if ((focusnode.parentElement.id == "seq" || focusnode.parentElement.className == "orf_loc" || focusnode.id == "seq") && String(document.getSelection()).length > 0) {

        console.log("aaaa");
        proteinSeq = translate(String(document.getSelection()));

    }
    document.getElementById("protein").innerText = proteinSeq;
    console.log(document.getSelection().focusNode.parentElement.id);


}


//ーーーーーenter space禁止
//document.getElementById("protein").addEventListener("keydown", keycontrol);
//document.getElementById("seq").addEventListener("keydown", keycontrol);
function keycontrol(e) {

    if (e.key == "Enter" || e.key == " ") {

        e.preventDefault();
        console.log("改行できません");
    }
}
//------paste 改行の除去-////
/*
document.getElementById("seq").addEventListener("paste", function (e) {
    e.preventDefault();//paste禁止
    let nuc = nuc_format(e.clipboardData.getData("text"));//クリップボードのフォーマット処理

    document.getSelection().getRangeAt(0).insertNode(document.createTextNode(nuc));//カレット位置に挿入
});
*/
//------ここまで


//let proteinelem = document.getElementById("protein");
//proteinelem.addEventListener("mousedown", seqselect);
//proteinelem.addEventListener("click",seqselect)

//document.getElementById("orfSearch").addEventListener("click", orfSearch);


//--------ここから--------

function elem_range() {
    console.log("elemrange")
    document.getElementById("seq").innerText = document.getElementById("seq").innerText;//もとのspanの削除

    let range = document.getSelection().getRangeAt(0);
    let nuc_range = document.createRange();
    if (range.startOffset == range.endOffset) {
        //選択されてないとき
        console.log("0:選択されてません")
        document.getElementById("pro_range").innerText = range.startOffset + 1;
    }
    else if (document.getElementById("seq").innerText.length >= document.getElementById("protein").innerText.length * 3) {
        console.log("1:変更")
        document.getElementById("pro_range").innerText = range.startOffset + 1 + "-" + range.endOffset;

        nuc_range.setStart(document.getElementById("seq").firstChild, (range.startOffset * 3));
        nuc_range.setEnd(document.getElementById("seq").firstChild, (range.endOffset * 3));
        let element = document.createElement("span");
        element.className = "orf_loc";
        nuc_range.surroundContents(element);
        console.log(nuc_range);
    }
    else {
        console.log("2:その他")
    }
    console.log(range.startOffset + "-" + range.endOffset);
    let seq = String(document.getSelection());
    //console.log("a");
    //console.log(new Intl.NumberFormat('ja-JP').format(Math.round(protein_weight(seq)*100)/100));
    document.getElementById("Mw").innerText = new Intl.NumberFormat('ja-JP').format(Math.round(protein_weight(seq) * 100) / 100) + "Da";
    console.log(nuc_range);

}


function seqselect(e) {

    console.log("seqselect")
    elem_range();
    console.log("マウスダウン");
    proteinelem.addEventListener("mousemove", elem_range);
    window.addEventListener("mouseup", function tmp(e) {
        console.log("解除");
        proteinelem.removeEventListener("mousemove", elem_range);
        window.removeEventListener("mouseup", tmp);
        console.log(document.getSelection().getRangeAt(0));

        elem_range();
        //マウスを離したときにEventlistenerを削除
    });
}

//-------------ここまで


let orfList;
function orfSearch() {

    console.log("a");
    let seq = document.getElementById("seq").innerText;

    orfList = searchORFall(seq, document.getElementById("orfLength").value);
    create_ORF(orfList, seq.length);

}


/*
//こっからORFwindow初期設定
let width1 = document.getElementById("ORF_figure").clientWidth;
let height1 = width1 / 4;
//console.log(document.getElementsByClassName("ORF_in")[0].clientWidth);
//document.getElementById("ORF_figure").style.height = height1 + "px";

//document.getElementById("ORF_figure").style.paddingTop = height1 * 1 / 13 + "px";
*/
for (let i = 0; i <= document.getElementsByClassName("ORF_in").length - 1; i++) {
    document.getElementsByClassName("ORF_in")[i].style.height = height1 * 1 / 13 + "px";
    document.getElementsByClassName("ORF_in")[i].style.marginBottom = height1 * 1 / 13 + "px";
}


/*
document.getElementById("ORF_figure").addEventListener("click", function (e) {
    console.log(e.target.className);
    if (e.target.className == "orf") {

        for (let i = 0; i <= document.getElementsByClassName("orf").length - 1; i++) {
            document.getElementsByClassName("orf")[i].style.backgroundColor = "rgb(59, 59, 59)";
        }

        document.getElementById("seq").innerText = document.getElementById("seq").innerText;//もとのspanの削除

        let orfid = e.target.id;
        let orfloc = orfList[orfid.replace("orf", "")];
        let element = document.createElement("span");
        element.className = "orf_loc";

        let range = document.createRange();
        range.setStart(document.getElementById("seq").firstChild, Math.min(orfloc[1], orfloc[2]) - 1);
        range.setEnd(document.getElementById("seq").firstChild, Math.max(orfloc[1], orfloc[2]));
        document.getSelection().removeAllRanges();

        document.getSelection().addRange(range);

        //現状tostringでできてないのでだめ
        range.surroundContents(element);

        document.getElementById(orfid).style.backgroundColor = "red";

        document.getElementById("nuc_range").innerText = orfloc[1] + "-" + orfloc[2];

    }

})
*/


function resizeWindow() {
    let width1 = document.getElementById("ORF_figure").clientWidth;
    let height1 = width1 / 4;
    console.log(document.getElementsByClassName("ORF_in")[0].clientWidth);
    document.getElementById("ORF_figure").style.height = height1 + "px";

    document.getElementById("ORF_figure").style.paddingTop = height1 * 1 / 13 + "px";

    for (let i = 0; i <= document.getElementsByClassName("ORF_in").length - 1; i++) {
        document.getElementsByClassName("ORF_in")[i].style.height = height1 * 1 / 13 + "px";
        document.getElementsByClassName("ORF_in")[i].style.marginBottom = height1 * 1 / 13 + "px";
    }
    for (let i = 0; i <= document.getElementsByClassName("orf").length - 1; i++) {
        document.getElementsByClassName("orf")[i].style.height = height1 * 1 / 13 + "px";
    }
}

//--------------------------

function getseq_entrez(id, start, stop, strand, rettype, retmode) {
    //console.log("a")
    let formdata = new FormData();
    formdata.append("id", id);

    formdata.append("start", start);
    formdata.append("stop", stop);
    formdata.append("strand", strand);
    formdata.append("rettype", rettype);
    formdata.append("retmode", retmode);

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

function loadText(e) {
    console.log(e.target.id);
    let reader = new FileReader();
    console.log(e.target);
    reader.readAsText(e.target.files[0]);
    reader.onload = function () {
        //console.log(reader.result);
        if (e.target.id == "file1") {
            console.log("1///");
            file_now = reader.result;
        }
        /*else if (e.target.id == "file2") {
            console.log("2///");
            file_now2 = reader.result;
        }
        else if (e.target.id == "file3") {
            console.log("3///");
            file_now3 = reader.result;
        }*/


        console.log("load");
    }
}

async function loadAllText(e) {
    console.log(e.target.id);
    let reader = new FileReader();
    let num = e.target.files.length
    for (let i = 0; i <= num - 1; i++) {

        await new Promise(function (resolve) {
            reader.readAsText(e.target.files[i]);
            console.log(i + "取得")
            reader.onload = function () {
                if (e.target.id == "file1") {
                    console.log("1///");
                    file_now[i] = reader.result;
                    console.log(i + "書き込み")
                    resolve();
                }/*
                if (e.target.id == "file2") {
                    console.log("2///");
                    file_now2[i] = reader.result;
                    console.log(i + "書き込み")
                    resolve();
                }
                if (e.target.id == "file3") {
                    console.log("1///");
                    file_now3[i] = reader.result;
                    console.log(i + "書き込み")
                    resolve();
                }*/
            }
        });
    }
}

async function loadAllbinary(e) {
    console.log(e.target.id);
    let reader = new FileReader();
    let num = e.target.files.length
    for (let i = 0; i <= num - 1; i++) {

        await new Promise(function (resolve) {
            reader.readAsArrayBuffer(e.target.files[i]);
            console.log(i + "取得")
            reader.onload = function () {
                if (e.target.id == "file4") {
                    console.log("1///");
                    file_now4[i] = reader.result;
                    console.log(i + "書き込み")
                    resolve();
                }
            }
        });
    }
}


function readCSV(text) {


    //console.log(reader.result);
    let result = [];
    let tmp = text.split("\n");

    for (let i = 0; i <= tmp.length - 1; i++) {
        console.log(tmp[i]);
        if (tmp[i].split(",").length >= 2) {
            result[i] = tmp[i].split(",");

        }
    }
    console.log(result);
    hittable = result;
    //nn(result);
    return result;


}

function nn(hittable) {
    for (let i = 0; i <= 3; i++) {
        let m = getseq_entrez(hittable[i][1], hittable[i][8], hittable[i][9], 1, "fasta", "text");
    }
}

function mm(start, end) {

    let fastaList = [];

    for (let i = 0; i <= 7; i++) {
        if (hittable[i][14] > 0) {
            data = getseq_entrez(hittable[i][1], hittable[i][8] + start, hittable[i][9] + end, 1, "fasta", "text");
        }
        else {
            data = getseq_entrez(hittable[i][1], hittable[i][8] + end, hittable[i][9] + start, -1, "fasta", "text");
        }



        data.then(

            function (data) {
                //console.log(data);
                fastaList[i] = data;
                console.log(fastaList[i].length);
                if (fastaList.length == 8) {
                    console.log(fastaList);
                }

            }

        );
    }
    //console.log(m);

}
function mm2() {
    let fastaList = [];
    let multifasta = "";
    let n = 0;

    let a = setInterval(
        function () {
            for (let i = n; i <= n + 8; i++) {

                //console.log(i);
                if (i <= hittable.length - 1 && hittable[i].length >= 3) {
                    data = getseq_entrez(hittable[i][1], hittable[i][8], hittable[i][9], 1, "fasta", "text");

                    data.then(
                        function (data) {
                            //console.log(data);
                            fastaList[i] = data;
                            console.log(fastaList.length);
                            if (fastaList.length == hittable.length) {

                                multifasta = fastaList.join("");
                                console.log(multifasta);
                                return fastaList;
                            }
                        }

                    );
                    //console.log(hittable[i][1]);
                }
                else {
                    clearInterval(a);
                }

            }
            n = n + 9;
        }
        , 1000
    );

    //console.log(m);

}

function mm3(hittable, startadd, stopadd) {
    hittable = readCSV(file_now[0]);
    let fastaList = [];
    let multifasta = "";
    let n = 0;

    let m = 9;

    let a = setInterval(
        function () {
            for (let i = n; i <= n + m - 1; i++) {

                //console.log(i);
                if (i <= hittable.length - 1 && hittable[i].length >= 3) {
                    let id = hittable[i][1];
                    let start;
                    let stop;
                    let strand;
                    if (Number(hittable[i][8]) < Number(hittable[i][9])) {
                        start = Number(hittable[i][8]) + startadd;
                        stop = Number(hittable[i][9]) + stopadd;
                        strand = 1;

                        console.log(i);
                    }
                    else {
                        start = Number(hittable[i][9]) + startadd;
                        stop = Number(hittable[i][8]) + stopadd;
                        strand = 2;
                    }


                    data = getseq_entrez(id, start, stop, strand, "fasta", "text");

                    data.then(
                        function (data) {
                            //console.log(data);
                            fastaList[i] = data;
                            console.log(i + ":" + fastaList.length);
                            console.log(i + ":" + id + "," + start + "-" + stop + "/" + strand);
                            if (fastaList.length == hittable.length) {

                                multifasta = fastaList.join("");
                                console.log(multifasta);
                                //return multifasta;
                            }
                        }

                    );
                    //console.log(hittable[i][1]);
                }
                else {
                    clearInterval(a);
                }

            }
            n = n + m;
        }
        , 1000
    );

    //console.log(m);

}


function mm4(hittable, startadd, stopadd) {
    hittable = readCSV(file_now[0]);
    let fastaList = [];
    let multifasta = "";
    let n = 0;

    let a = setInterval(
        function () {
            for (let i = n; i <= n + 2; i++) {

                //console.log(i);
                if (i <= hittable.length - 1 && hittable[i].length >= 3) {
                    let id = hittable[i][1];
                    let start;
                    let stop;
                    let strand;
                    if (Number(hittable[i][8]) < Number(hittable[i][9])) {
                        start = Number(hittable[i][8]) + startadd;
                        stop = Number(hittable[i][9]) + stopadd;
                        strand = 1;

                        console.log(i);
                    }
                    else {
                        start = Number(hittable[i][9]) + startadd;
                        stop = Number(hittable[i][8]) + stopadd;
                        strand = 2;
                    }

                    console.log(i + ":" + id + "," + start + "-" + stop + "/" + strand);
                    data = getseq_entrez(id, start, stop, strand, "", "xml");

                    data.then(
                        function (data) {
                            //console.log(data);

                            const parser = new window.DOMParser();

                            console.log(data);
                            const xmlData = parser.parseFromString(data, "text/xml");
                            let organisum = xmlData.getElementsByTagName("GBSeq_organism")[0].textContent;
                            let accession = xmlData.getElementsByTagName("GBSeq_accession-version")[0].textContent
                            let data_start = xmlData.getElementsByTagName("GBReference_position")[0].textContent.split("..")[0];
                            let data_end = xmlData.getElementsByTagName("GBReference_position")[0].textContent.split("..")[1];
                            let moltype = xmlData.getElementsByTagName("GBSeq_moltype")[0].textContent;
                            let data_seq = xmlData.getElementsByTagName("GBSeq_sequence")[0].textContent;

                            console.log(data_start);
                            let single_fasta = ">" + organisum + "_" + accession + ":" + data_start + "-" + data_end + "_" + moltype + "\n" + data_seq + "\n" + "\n";


                            //console.log(single_fasta);
                            fastaList[i] = single_fasta;
                            console.log(i + ":" + fastaList.length);
                            console.log(i + ":" + id + "," + start + "-" + stop + "/" + strand);
                            if (fastaList.length == hittable.length) {

                                multifasta = fastaList.join("");
                                console.log(multifasta);
                                // return fastaList;
                            }
                        }

                    );
                    //console.log(hittable[i][1]);
                }
                else {
                    clearInterval(a);
                }

            }
            n = n + 3;
        }
        , 1000
    );

    //console.log(m);

}

/*orflistと配列全長から図を作製する
*/
function create_ORF(orfList, seqSize) {
    let width1 = document.getElementById("ORF_figure").clientWidth;
    let height1 = width1 / 4;

    let classORF = document.getElementsByClassName("orf");
    console.log(classORF.length);
    let classORF_length = classORF.length;//先にlengthとらないと削除できない
    for (let i = 0; i <= classORF_length - 1; i++) {
        console.log(i);
        classORF[0].remove();
    }

    for (let i = 0; i <= orfList.length - 1; i++) {
        let orf = document.createElement("div");
        orf.classList.add("orf");//class名追加
        orf.setAttribute("id", "orf" + i);//id設定　orfListの番号と同じ
        orf.style.height = height1 * 1 / 13 + "px";
        orf.style.width = (Math.abs(orfList[i][2] - orfList[i][1]) + 1) * 100 / seqSize + "%";
        orf.style.marginLeft = (Math.min(orfList[i][2], orfList[i][1]) - 1) * 100 / seqSize + "%";
        console.log(orfList[i][0]);
        document.getElementById(orfList[i][0] + "").appendChild(orf);
    }
}


/*
fastaのタイトル

*/

function fasta_tmp(title) {
    let result = [];
    let A = title.split(":");
    result[0] = A[0];
    let B = A[1].split(" ");
    let C = B[0].split("-");
    result[1] = Number(C[0].replace(/\D/g, ''));
    result[2] = Number(C[1]);
    result[3] = B[1];
    result[4] = B[2];


    if (B[1] == "TPA_asm" || B[1] == "TPA_exp" || B[1] == "TPA_inf" || B[1] == "TPA" || B[1] == "PREDICTED") {
        console.log(A[2]);
        result[3] = A[2].split(" ")[1];
        result[4] = A[2].split(" ")[2];
    }
    return result;
}


/*
引数：配列
返り値：csv（,が入っている値は""で囲んでる）

*/
function ArraytoCsv(arr) {
    let result = "";
    for (let i = 0; i <= arr.length - 1; i++) {
        for (let m = 0; m <= arr[i].length - 2; m++) {
            //まず最後の値の一個前まで
           // console.log(arr[i][m]);
            if (String(arr[i][m]).indexOf(",") == -1) {
                result = result + arr[i][m] + ",";
            }
            else {
                result = result + '"' + arr[i][m] + '"' + ",";//値に,が入っていた時
            }
        }
        //最後の値を入れて改行
        if (String(arr[i][arr[i].length - 1]).indexOf(",") == -1) {
            result = result + arr[i][arr[i].length - 1] + "\n";
        }
        else {
            result = result + '"' + arr[i][arr[i].length - 1] + '"' + "\n";
        }
    }
    console.log(result);
    return result;
}


/*
interproscanの結果(json)を配列になおす
引数：json
返り値：[[name,start,end,sig-accession,sig-name,seq,library]]


*/

function interPro_array(file) {

    let result = [];
    for (let i = 0; i <= JSON.parse(file).results.length - 1; i++) {
        let match = JSON.parse(file).results[i];

        //  console.log(i+":"+JSON.parse(file).results[i].xref[0].name);
        if (match.matches.length >= 1) {

            for (let m = 0; m <= match.matches.length - 1; m++) {
                let tmp = match.matches[m];
                //console.log(match.matches[m]);
                result.push(
                    [match.xref[0].name,
                    tmp.locations[0].start,
                    tmp.locations[0].end,
                    tmp.signature.accession,
                    tmp.signature.name,
                    match.sequence,
                    tmp.signature.signatureLibraryRelease.library,
                    ]
                );
                // result=result+match.xref[0].name+","+tmp.locations[0].start+","+tmp.locations[0].end+","+tmp.signature.accession+","+tmp.signature.name+"\n";

            }
        }
        else {
            console.log(i);
        }

    }
    console.log(result);
    return result;
}


function arrtoAssoc(arr) {
    let result = {};
    for (let i = 0; i <= arr.length - 1; i++) {
        result[arr[i][0]] = arr[i][1]

    }
    console.log(result);
    return result;
}


function downloadText(type) {

}


function readString(binary, start, length) {
    let data = new DataView(binary, start, length);

    return new TextDecoder().decode(data);
}

function readSint16(binary, start, length) {
    let data = new DataView(binary, start, length);
    return data.getUint16();
}

function readSint32(binary, start, length) {
    let data = new DataView(binary, start, length);
    return data.getUint32();
}

function readSint8(binary, start, length) {
    let data = new DataView(binary, start, length);
    return data.getUint8();
}

function readDirectory(binary, i, length) {
    let name;
    let number;
    let elementtype;
    let elementsize;
    let numelements;
    let datasize;
    let dataoffset;
    let datahandle;
    name = readString(binary, i, 4);//6~9
    i += 4;

    number = readSint32(binary, i, 4);//10~13
    i += 4;

    elementtype = readSint16(binary, i, 2);//14~15
    i += 2;

    elementsize = readSint16(binary, i, 2);//16~17
    i += 2;

    numelements = readSint32(binary, i, 4);//18~21
    i += 4;

    datasize = readSint32(binary, i, 4);//22~25
    i += 4;

    dataoffset = readSint32(binary, i, 4);//22~25
    i += 4;

    let fileStrcture = {
        name: name,
        number: number,
        elementtype: elementtype,
        elementsize: elementsize,
        numelements: numelements,
        datasize: datasize,
        dataoffset: dataoffset,
    }

    console.log("name:" + name);
    console.log("elementype:" + elementtype);
    console.log("elementSize:" + elementsize);
    console.log("numelements:" + numelements);
    console.log("datasize:" + datasize);

    return fileStrcture;

}


function readABIF(binary) {
    let result;
    let fileSignature;
    let version;
    let fileStrcture;
    let directory = {};


    let i = 0;
    fileSignature = readString(binary, i, 4);
    i += 4;

    if (fileSignature == "ABIF") {
        console.log("ABIFだよ～")

        version = readSint16(binary, i, 2);//4~5
        i += 2
        console.log("version:" + version);

        fileStrcture = readDirectory(binary, 6, 24);

        for (let i = 0; i <= fileStrcture.numelements - 1; i++) {
            console.log(i);
            let tmpdata = readDirectory(binary, fileStrcture.dataoffset + (i * 28), 28);
            directory[tmpdata.name + tmpdata.number] = tmpdata;
            //console.log(readDirectory(binary,128+((i-1)*28),28));
        }
        console.log(directory);
        let quality = new Uint8Array(binary, directory.PCON1.dataoffset, directory.PCON1.datasize);
        let sequence = readString(binary, directory.PBAS1.dataoffset, directory.PBAS1.datasize).split("");

        result = [sequence, quality];

    } else {
        console.log("これちゃうやん")
    }
    return result;
}

/**
 * 
 * @param {*} ABIF_result 
 * @param {*} quality 
 * @param {*} length 
 * @param {*} gap --許容されるgap
 * @returns 
 */
function filterABIF(ABIF_result,quality,length,gap) {
    let m = [];
    let arr;
    for (let i = 0; i <= ABIF_result[0].length - 1; i++) {
        if (ABIF_result[1][i] <= quality) {
            //m[i] = "-";
            m[i]=ABIF_result[0][i].toLowerCase();
        } else {
            m[i] = ABIF_result[0][i];
        }
    }
    gap=gap+1
    reg = new RegExp("[a-z]{"+gap+",}");
    arr = m.join("").split(reg);

    let result = [];
    for (let i = 0; i <= arr.length - 1; i++) {
        if (arr[i].length >= length) {
            result.push(arr[i]);
        }
    }
    return result;
}


function alignButtonckick(){

    console.log(file_now);
    console.log(file_now4);

    let ref=readFasta(file_now[0])[0][1];
    let c=[];
    for(let i=0;i<=file_now4.length-1;i++){
        let f=filterABIF(readABIF(file_now4[i]),20,10,1);
        for(let n=0;n<=f.length-1;n++){
            c.push(f[n]);
        }
    }
    let x1=assemblyAll(c,10);
    console.log(x1);
    let contig_text="contig\n";
    for(let i=0;i<=x1.length-1;i++){
        contig_text+=">"+(i+1)+"\n"+x1[i]+"\n";
    }
    document.getElementById("contig").innerText=contig_text;

    let x1_length=[];
    for(let i=0;i<=x1.length-1;i++){
            x1_length[i]=x1[i].length;
    }

    let alignment_text ="\n"+alignment_result(alignment(ref,x1[x1_length.indexOf(Math.max(...x1_length))]),70);
    console.log(alignment_text);
    document.getElementById("alignment").innerText=alignment_text;
}
/**
 * リファレンスありのアラインメント
 * @param {string} ref -リファレンス配列
 * @param {Array} seqresult -シーケンス結果
 * @returns {Array}
 * [0]ATG--CGTT----
 * [1]AT-----------
 * [2]--GATCGTT----
 */

function alignmentABIFref(ref,seqresult){
    //ローカルアラインメント->最大値でfilter->並べる
}

/**
 * リファレンスなしのアラインメント
 * @param {Array} seqresult -シーケンス結果
 * @returns {Array}
 * [0]ATG--CGTT----
 * [1]AT-----------
 * [2]--GATCGTT----
 */
function alignmentABIFnoref(seqresult){
    //ローカルアラインメント->最大 値でfilter->並べる
    

}



