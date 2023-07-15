let codon = [];
codon[0] = ['TTT', 'TTC', 'TTA', 'TTG', 'TCT', 'TCC', 'TCA', 'TCG', 'TAT', 'TAC', 'TAA', 'TAG', 'TGT', 'TGC', 'TGA', 'TGG', 'CTT', 'CTC', 'CTA', 'CTG', 'CCT', 'CCC', 'CCA', 'CCG', 'CAT', 'CAC', 'CAA', 'CAG', 'CGT', 'CGC', 'CGA', 'CGG', 'ATT', 'ATC', 'ATA', 'ATG', 'ACT', 'ACC', 'ACA', 'ACG', 'AAT', 'AAC', 'AAA', 'AAG', 'AGT', 'AGC', 'AGA', 'AGG', 'GTT', 'GTC', 'GTA', 'GTG', 'GCT', 'GCC', 'GCA', 'GCG', 'GAT', 'GAC', 'GAA', 'GAG', 'GGT', 'GGC', 'GGA', 'GGG'];
codon[1] = ['F', 'F', 'L', 'L', 'S', 'S', 'S', 'S', 'Y', 'Y', '*', '*', 'C', 'C', '*', 'W', 'L', 'L', 'L', 'L', 'P', 'P', 'P', 'P', 'H', 'H', 'Q', 'Q', 'R', 'R', 'R', 'R', 'I', 'I', 'I', 'M', 'T', 'T', 'T', 'T', 'N', 'N', 'K', 'K', 'S', 'S', 'R', 'R', 'V', 'V', 'V', 'V', 'A', 'A', 'A', 'A', 'D', 'D', 'E', 'E', 'G', 'G', 'G', 'G'];
codon[2] = ['Phe', 'Phe', 'Leu', 'Leu', 'Ser', 'Ser', 'Ser', 'Ser', 'Tyr', 'Tyr', '*', '*', 'Cys', 'Cys', '*', 'Trp', 'Leu', 'Leu', 'Leu', 'Leu', 'Pro', 'Pro', 'Pro', 'Pro', 'His', 'His', 'Gln', 'Gln', 'Arg', 'Arg', 'Arg', 'Arg', 'Ile', 'Ile', 'Ile', 'Met', 'Thr', 'Thr', 'Thr', 'Thr', 'Asn', 'Asn', 'Lys', 'Lys', 'Phe', 'Phe', 'Arg', 'Arf', 'Val', 'Val', 'Val', 'Val', 'Ala', 'Ala', 'Ala', 'Ala', 'Asp', 'Asp', 'Glu', 'Glu', 'Gly', 'Gly', 'Gly', 'Gly'];

let nuc_comp = [];
nuc_comp[0] = ["A", "T", "C", "G", "a", "t", "c", "g"];
nuc_comp[1] = ["T", "A", "G", "C", "t", "a", "g", "c"];

amino_weight = [];//0:アミノ酸　1:分子量　2:残基分子量（-水分子）
amino_weight[0] = ["A", "R", "N", "D", "C", "E", "Q", "G", "H", "O", "I", "L", "K", "M", "F", "P", "U", "S", "T", "W", "Y", "V"];
amino_weight[1] = [89.1, 174.2, 132.12, 133.11, 121.16, 147.13, 146.15, 75.07, 155.16, 131.13, 131.18, 131.18, 146.19, 149.21, 165.19, 115.13, 139.11, 105.09, 119.12, 204.23, 181.19, 117.15];
amino_weight[2] = [71.08, 156.19, 114.11, 115.09, 103.15, 129.12, 128.13, 57.05, 137.14, 113.11, 113.16, 113.16, 128.18, 131.2, 147.18, 97.12, 121.09, 87.08, 101.11, 186.22, 163.18, 99.13]



/*
引数：peotein sequence
戻り値：タンパク質分子量 formatがerrorを履いた時は0
*/

/**
 * 
 * @param {string} pro -アミノ酸配列
 * @returns {number} タンパク質の分子量(Da) 
 */
function protein_weight(pro) {
    let result = 0;
    //console.log(pro_format(pro)[1].length);
    if (pro_format(pro) != 0 && pro_format(pro) != 1) {

        //配列が正しい
        pro = pro_format(pro);
        pro = pro.split("");

        for (let i = 0; i <= pro.length - 1; i++) {
            result = result + amino_weight[2][amino_weight[0].indexOf(pro[i])];
            //console.log(amino_weight[0].indexOf(pro[i]));
        }
        result = result + 18.02;
        //console.log(result);
    }
    else {
        //配列が誤っているとき　または0の時
        result = 0;
    }
    return result;
}


/**
 * 塩基配列のフォーマット
 * @param {string} seq -文字列
 * @returns {string} 特殊文字削除後の文字列
 */
function nuc_format(seq) {
    //console.log("format");
    const Nucformat = /[^ATGCNatgcn]/;

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
    1:correct

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

    //console.log("m:"+seq);

    if (Amiformat.test(seq)) {
        console.log("アミノ酸配列ちゃうよ");
        result = "0"
        //alart[0] = "それ塩基配列じゃない気がする…";
    }
    else if (seq.indexOf("*") < seq.length - 1 && seq.indexOf("*") != -1) {
        console.log("配列中に*が含まれています");
        result = "1"

        //alart[0] = "";
    }
    else {
        seq = seq.replace("*", "");
        result = seq;
    }

    return result;
}




/*
    引数：fasta,min
    戻り値：fasta(ORF)
*/
function searchORFall_multifasta(fasta, min) {
    let seqList = readFasta(fasta);
    let tmporf;
    //let resultseqList = [];
    //let m =0;
    let resultFasta = "";
    console.log(seqList);
    for (let i = 0; i <= seqList.length - 1; i++) {
        tmporf = searchORFall(seqList[i][1], min);
        console.log(i + ":" + seqList[i][0] + "____" + tmporf);

        for (let n = 0; n <= tmporf.length - 1; n++) {
            console.log(i + "," + n, ":" + tmporf[n]);
            resultFasta = resultFasta + ">" + i + "-" + n + "_" + seqList[i][0] + "_" + tmporf[n][1] + "-" + tmporf[n][2] + "\n" + tmporf[n][3] + "\n";

        }

    }
    console.log(resultFasta);
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

    let n = 0;
    for (let i = 0; i <= frame.length - 1; i++) {
        console.log(frame[i] + " search_start");
        let tmp = searchORF(nuc, min, frame[i]);
        //console.log(frame[i]+":"+tmp);
        for (let m = 0; m <= tmp.length - 1; m++) {
            orfList[n] = tmp[m];
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

            if (orfLength + 3 >= min) {
                //ORFが最小値以上だったとき

                orf_tmp = orf_tmp + nuc_arr[i];

                if (frame > 0) {
                    orf_stop = (i * 3) + 3 + frame - 1;
                }
                else {
                    orf_stop = nuc.length - (((i * 3) + 3 + (frame * -1) - 1) - 1);
                }

                orf[orf_num] = [frame_str, orf_start, orf_stop, orf_tmp];//返り値の配列に格納

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


/**
 * reverseする
 * @param {string} nuc -塩基配列
 * @returns {string} 塩基配列で返す
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
/**
 * fastaを配列に変換
 * @param {string} fasta -塩基配列
 * @returns {string} 配列[[title(str),seq(str)][title,seq].....]
 */
function readFasta(fasta) {
    let seqList = [];
    let seqnum = -1;//+1したときに0から始まるように

    let fasta_arr = fasta.split(/\r\n|\n/);
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
配列をfastaに変換
引数：seqList[[title,seq][title,seq].....]
返り値：fasta(str)
*/
/**
 * seqListをfastaに変換
 * @param {*} seqList -塩基またはアミノ酸配列の二次元配列
 * @returns fasta
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
function exportGenbank() {

}



/**
 * multifastaの塩基配列を翻訳する
 * @param {string} fasta -multifastaも可
 * @returns {string} proteinFastaで返す
 */
function translate_multifasta(fasta) {
    let seqList = readFasta(fasta);
    let result = "";
    for (let i = 0; i <= seqList.length - 1; i++) {
        result = result + ">" + i + "_" + seqList[i][0] + "\n" + translate(seqList[i][1]) + "\n";
    }
    console.log(result);
    return result;
}




/**
 * 塩基配列を翻訳する
 * @param {string} nuc -塩基配列
 * @returns {string} アミノ酸配列
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


/**
 * -文字列を検索して配列で返す
 * -文字列がかぶってるときは前のを返す
 * @param {string} seq -塩基配列orアミノ酸配列
 * @param {string} query -検索配列、正規表現ok
 * @returns 配列[[start,end,一致配列]]
 */
function searchSeq(seq, query) {
    let re = new RegExp(query, "gi");
    let seqmatch = seq.matchAll(re);
    let result = []
    let tmp = Array.from(seqmatch);

    for (let i = 0; i <= tmp.length - 1; i++) {
        result[i] = [tmp[i].index + 1, tmp[i].index + tmp[i][0].length, tmp[i][0]]
    }

    //console.log(result);
    return result;
}

/**
 * multifastaから文字列を検索する 
 * @param {string} fasta -multifasta
 * @param {*} query -検索配列　正規表現ok
 * @returns 配列[[fastaのtitle, start, end ,一致配列]]
 */
function searchSeqAll(fasta, query) {
    let result = [];
    let arr = readFasta(fasta);
    for (let i = 0; i <= arr.length - 1; i++) {
        let tmparr = searchSeq(arr[i][1], query);

        for (let m = 0; m <= tmparr.length - 1; m++) {
            result.push([arr[i][0], tmparr[m][0], tmparr[m][1], tmparr[m][2]]);
        }
    }

    return result;
}


/*
引数:prop 1.0の結果
返り値：[[title,切断部位(アミノ酸番号),切断位置詳細,確率,*Prop*]]
*/
/**
 * propの結果から0.5以上のものを返す
 * @param {string} file -propのresult(画像なし)
 * @returns 配列 [[title,切断部位(アミノ酸番号),切断位置詳細,確率,*Prop*]]//0.5以上を返すよ
 */
function prop(file) {
    let line = file.split(/\r\n/);//一行ずつ読み取り
    let result = [];
    for (let i = 0; i <= line.length - 1; i++) {
        if (line[i].slice(-6) == "*ProP*") {
            result.push(line[i].split(/\s+/));//空白で分割した結果の配列をresultに追加               
        }
    }
    return result;
}




function tmhmm(file) {
    let result = [];
    let list = readFasta(file);
    for (let i = 0; i <= list.length - 1; i++) {
        result[i] = [];
        result[i][0] = list[i][0];
        result[i][1] = list[i][1].slice(0, list[i].length - 1);
    }
    return result;
}


function Anno_graphic(seq) {

}

function alignmentABIFnoref(seqlist) {
    //ローカルアラインメント->最大 値でfilter->並べる
    for (let i = 0; i <= seqlist.length - 1; i++) {

    }

}


function alignment(a, b) {
    let match = 1;
    let mismatch = -1;
    let gap = -2;


    let scoreTable = [];
    //配列のセット
    for (let n = 0; n <= a.length; n++) {
        scoreTable[n] = [];
        for (let m = 0; m <= b.length; m++) {
            scoreTable[n][m] = 0;
        }
    }

    let arrowTable = [];
    for (let n = 0; n <= a.length; n++) {
        arrowTable[n] = [];
        for (let m = 0; m <= b.length; m++) {
            arrowTable[n][m] = 0;
        }
    }


    for (let al = 1; al <= a.length; al++) {
        for (let bl = 1; bl <= b.length; bl++) {
            let score = [];
            let maxscore;

            if (a[al - 1] == b[bl - 1]&&(a[al-1]!="~"&&a[al-1]!="~")) {
                score[0] = scoreTable[al - 1][bl - 1] + match;
                score[1] = scoreTable[al - 1][bl] + gap;
                score[2] = scoreTable[al][bl - 1] + gap;
            } else if(a[al-1]=="~"||a[al-1]=="~"){
                score[0] = -1;
                score[1] = -1;
                score[2] = -1;
            }else {
                score[0] = scoreTable[al - 1][bl - 1] + mismatch;
                score[1] = scoreTable[al - 1][bl] + gap;
                score[2] = scoreTable[al][bl - 1] + gap;
            }

            maxscore = Math.max(...score, 0);//スコアの最大値
            arrowTable[al][bl] = score.indexOf(maxscore);//該当するものがない場合は-1
            scoreTable[al][bl] = maxscore;
        }
    }
    //scoretableから最大値と座標検索

    let max_a = [];
    let max_b = [];
    let max_value = [];

    for (let i = 0; i <= scoreTable.length - 1; i++) {
        max_value[i] = Math.max(...scoreTable[i]);
        max_a[i] = i;
        max_b[i] = scoreTable[i].indexOf(max_value[i]);
    }
    let max = [];//[最大値,a,b]

    max[0] = Math.max(...max_value);
    max[1] = max_value.indexOf(max[0]);
    max[2] = max_b[max[1]];

    //------------------------
    
    //---トレースバック-------

    let al = max[1];
    let bl = max[2];
    let rev_result = [];
    rev_result[0] = [];
    rev_result[1] = [];
    rev_result[2] = [];
    rev_result[3] = [];
    while (scoreTable[al][bl] > 0) {
        if (arrowTable[al][bl] == 0) {
            rev_result[0].unshift(a[al - 1]);
            rev_result[1].unshift(b[bl - 1]);
            rev_result[2].unshift(al-1+",");
            rev_result[3].unshift(bl-1+",");
            al--;
            bl--;

        } else if (arrowTable[al][bl] == 1) {
            rev_result[0].unshift(a[al - 1]);
            rev_result[1].unshift("-");
            rev_result[2].unshift(al-1+",");
            rev_result[3].unshift(" "+",");
            al--;
        } else if (arrowTable[al][bl] == 2) {
            rev_result[0].unshift("-");
            rev_result[1].unshift(b[bl - 1]);
            rev_result[2].unshift(" "+",");
            rev_result[3].unshift(bl-1+",");
            bl--;
        }

    }
    rev_result[0] = rev_result[0].join("");
    rev_result[1] = rev_result[1].join("");
    rev_result[2] = rev_result[2].join("");
    rev_result[3] = rev_result[3].join("");

    return rev_result;
}

function alignment_part(){
   
}

function align_multi(arr){
    for(let i=0;i<=arr.length-1;i++){
        let tmp=arr[i][2].split(",")
        let s=tmp[0];
        let e=tmp[tmp.length-2]

        
        
    }
}

function alignment_result(alin_result,line){
    let result="";
    let num=line;
    
    let tmp="";
    for(let n=0;n<=alin_result[0].length-1;n++){
        if(alin_result[0][n]==alin_result[1][n]){
            tmp+="|";
        } else if(alin_result[0][n]!=alin_result[1][n]&&alin_result[0][n]!="-"&&alin_result[1][n]!="-"){
            tmp+=".";
        }else{
            tmp+=" "
        }
    }


    let a_start;
    let a_end;
    let b_start;
    let b_end;

    for(let i=0;i<=Math.floor(alin_result[0].length/num);i++){
        if(i<Math.floor(alin_result[0].length/num)){
            a_start=Number(alin_result[2].split(",").slice(i*num,(i*num)+1))+1;
            asl=a_start.toString().length;
            console.log(asl);
            
            for(let i=0;i<=6-(asl-1);i++){
                
                a_start+="\u00A0";
            }
            
            a_end=Number(alin_result[2].split(",").slice(num*(i+1),(num*(i+1))+1));
            ael=a_end.toString().length
            for(let i=0;i<=6-(ael-1);i++){
                a_end+="\u00A0";
            }
            b_start=Number(alin_result[3].split(",").slice(i*num,(i*num)+1))+1;
            bsl=b_start.toString().length;
            console.log(bsl);
            for(let i=0;i<=6-(bsl-1);i++){
                b_start+="\u00A0";
            }

            b_end=Number(alin_result[3].split(",").slice(num*(i+1),(num*(i+1)+1)));
            bel=b_end.toString().length
            for(let i=0;i<=6-(bel-1);i++){
                b_end+="\u00A0";
            }

            result+=a_start;
            result+=alin_result[0].slice(i*num,(num*(i+1)));
            result+="\u00A0";
            result+=a_end;
            result+="\n\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
            result+=tmp.slice(i*num,(num*(i+1)));
            result+="\n";
            result+=b_start;
            result+=alin_result[1].slice(i*num,(num*(i+1)));
            result+="\u00A0";
            result+=b_end;
            result+="\n";
            
            result+="\n\n";
        }else{

            a_start=Number(alin_result[2].split(",").slice(i*num,(i*num)+1))+1;
            asl=a_start.toString().length;
            console.log(asl);
            
            for(let i=0;i<=6-(asl-1);i++){
                
                a_start+="\u00A0";
            }
            
            a_end=Number(alin_result[2].split(",")[alin_result[0].length-1])+1;
            ael=a_end.toString().length
            for(let i=0;i<=6-(ael-1);i++){
                a_end+="\u00A0";
            }
            b_start=Number(alin_result[3].split(",").slice(i*num,(i*num)+1))+1;
            bsl=b_start.toString().length;
            console.log(bsl);
            for(let i=0;i<=6-(bsl-1);i++){
                b_start+="\u00A0";
            }

            b_end=Number(alin_result[3].split(",")[alin_result[0].length-1])+1;
            bel=b_end.toString().length
            for(let i=0;i<=6-(bel-1);i++){
                b_end+="\u00A0";
            }


            result+=a_start
            result+=alin_result[0].slice(i*num,(num*(i+1)));
            result+="\u00A0";
            result+=a_end
            result+="\n\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
            result+=tmp.slice(i*num,(num*(i+1)));
            result+="\n";
            result+=b_start
            result+=alin_result[1].slice(i*num,(num*(i+1)));
            result+="\u00A0";
            result+=b_end
            result+="\n";
            
            result+="\n\n";
        }
        
    }
    

    return result;
}

function assembly(a, b, overlap) {
    let match = 1;
    let mismatch = -1;
    let gap = -2;

    let scoreTable = [];
    //配列のセット
    for (let n = 0; n <= a.length; n++) {
        scoreTable[n] = [];
        for (let m = 0; m <= b.length; m++) {
            scoreTable[n][m] = 0;
        }
    }

    let arrowTable = [];
    for (let n = 0; n <= a.length; n++) {
        arrowTable[n] = [];
        for (let m = 0; m <= b.length; m++) {
            arrowTable[n][m] = 0;
        }
    }

    for (let al = 1; al <= a.length; al++) {
        for (let bl = 1; bl <= b.length; bl++) {
            let score = [];
            let maxscore;
            

            if (a[al - 1] == b[bl - 1] &&(a[al - 1].search(/[a-z]/)==-1&&b[bl - 1].search(/[a-z]/)==-1)) {
                score[0] = scoreTable[al - 1][bl - 1] + match;
                score[1] = scoreTable[al - 1][bl] + gap;
                score[2] = scoreTable[al][bl - 1] + gap;
            }else if(a[al - 1].toUpperCase()==b[bl-1].toUpperCase()){
                score[0] = scoreTable[al - 1][bl - 1] + match;
                score[1] = scoreTable[al - 1][bl] + gap;
                score[2] = scoreTable[al][bl - 1] + gap;
            }
/*
            if (a[al - 1] == b[bl - 1] || a[al - 1] == "-" || b[bl - 1] == "-") {
                score[0] = scoreTable[al - 1][bl - 1] + match;
                score[1] = 0;
                score[2] = 0;


            }  */
           else {
                score[0] = 0;
                score[1] = 0;
                score[2] = 0;

            }
            maxscore = Math.max(...score, 0);

            arrowTable[al][bl] = score.indexOf(maxscore);
            if (maxscore == 0) {
                arrowTable[al][bl] = -1;
            } else if (maxscore == 1 && (al > 1 && bl > 1)) {//a,bいずれかの[1]以外、かつmaxscoreが1のとき（）
                arrowTable[al][bl] = -1;
                maxscore = 0;
            } else if (maxscore < 0) {
                maxscore = 0;
            }
            scoreTable[al][bl] = maxscore;
        }
    }

    //端をそろえる
    for (let al = 0; al <= a.length; al++) {
        for (let bl = 0; bl <= b.length; bl++) {
            if (al == 0 || (al == a.length && arrowTable[al][bl] != 0)) {
                arrowTable[al][bl] = 2;
            } else if (bl == 0 || (bl == b.length && arrowTable[al][bl] != 0)) {
                arrowTable[al][bl] = 1;
            }
        }
    }

    //   |col  -row    右と下の最大
    let col = [];
    let colmax;
    for (let i = 0; i <= scoreTable.length - 1; i++) {
        col.push(scoreTable[i][scoreTable[0].length - 1])
    }
    colmax = Math.max(...col)

    let row = scoreTable[scoreTable.length - 1]
    let rowmax = Math.max(...row);


    let rev_result = [];

    if (Math.max(rowmax, colmax) < overlap) {
        rev_result = "";
    } else {
        if (rowmax > colmax) {
            arrowTable[arrowTable.length - 1][arrowTable[0].length - 1] = 2;
        } else if (rowmax < colmax) {
            arrowTable[arrowTable.length - 1][arrowTable[0].length - 1] = 1;
        } else if (rowmax == colmax) {
            arrowTable[arrowTable.length - 1][arrowTable[0].length - 1] = 0;
        }

        let al = arrowTable.length - 1;
        let bl = arrowTable[0].length - 1;

        while (al > 0 || bl > 0) {
            if (arrowTable[al][bl] == 0) {
                if (a[al - 1] == "-") {
                    rev_result.unshift(b[bl - 1]);
                } else if (b[bl - 1] == "-") {
                    rev_result.unshift(a[al - 1]);
                } else {
                    rev_result.unshift(a[al - 1]);
                }
                al--;
                bl--;

            } else if (arrowTable[al][bl] == 1) {
                rev_result.unshift(a[al - 1]);
                al--;
            } else if (arrowTable[al][bl] == 2) {
                rev_result.unshift(b[bl - 1]);
                bl--;
            }
        }
        rev_result = rev_result.join("");
    }
    return rev_result;
}

function assemblyAll(arr, overlap) {
    
    let result = [];
    //result[0]=arr[0];
    let i = 1;
    let n = 0;
    while (arr.length > n + i) {
        while (arr.length > n + i) {
          /*  console.log("n:" + n);
            console.log("i:" + i);
            console.log(arr);*/
            let tmp;
            let tmp1 = assembly(arr[n], arr[n + i], overlap);
            let tmp2 = assembly(arr[n], reverseNuc(arr[n + i]), overlap);
            if (tmp1.length >= tmp2.length) {
                tmp = tmp1;
            } else {
                tmp = tmp2;
            }

            //console.log(tmp);
            if (tmp != "") {
               
                arr.splice(n + i, 1);
                arr.splice(n, 1);
                //console.log(arr);
                arr.unshift(tmp);
                i = 1;
                n = 0;

            } else {
                i++
            }
            console.log(n);
            
           
            /*
            console.log("n:" + n);
            console.log("i:" + i);
            console.log(arr);
            console.log("--------------");
*/

        }
        
        
        i = 1;
        n++;
    }

    result = arr;
    return result;
}

function assemblyAll_auto(quality,max_length,gap,overlap){
    let contig=[];
    for(let i=0;i<=file_now4.length-1;i++){
        let filter_seq=filterABIF(readABIF(file_now4[i]),quality,max_length,gap);
        for(let n=0;n<=filter_seq.length-1;n++){
            contig.push(filter_seq[n]);
        }
    }
    let x1=assemblyAll(contig,overlap);
    console.log(x1);
}




function ref_alignment(ref, alignlist) {
    ref=readFasta(ref)[0][1];

}


/*
let ar=a.split("");
for(let m=al;m<=max[1]-1;m++){
    ar[m]="=";
}
let br=b.split("");
for(let m=bl;m<=max[1]-1;m++){
    br[m]="=";
}
a2=ar.join("");
b2=br.join("");
*/

/*
let a =readFasta(file_now);

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
    seqall.setAttribute("id",a[i][0]);
    
    seqall.setAttribute("class","seqG");
    seqall.style.height = 10+"px";   
    let m = a[i][1].length;
    
    seqall.style.width = m*2+"px";

    seqname.innerText = a[i][0];
    seqbox.appendChild(seqname);
    seqbox.appendChild(seqall);
    document.getElementById("sequencelist").appendChild(seqbox);

}





let ano = interPro_array(file_now2);
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
                    let elemlength = document.getElementById(ano[i][0]).clientWidth;
        let elemheight = document.getElementById(ano[i][0]).clientHeight;
        
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
        Anno.style.width = (ano[i][2]-ano[i][1]+1)*elemlength/ob[ano[i][0]].length+"px";
            
        Anno.style.marginLeft =(ano[i][1]-1)*elemlength/ob[ano[i][0]].length+"px";
        
        
        document.getElementById(ano[i][0]).appendChild(Anno);
        }

    }

let prop1 = prop(file_now3);    
  //  let ob = arrtoAssoc(a);

    
    
    for(let i=0;i<=prop1.length-1;i++){
        
                    let elemlength = document.getElementById(prop1[i][0]).clientWidth;
        let elemheight = document.getElementById(prop1[i][0]).clientHeight;
        
        let Anno = document.createElement("div");
        Anno.classList.add("anno");//class名追加
        Anno.setAttribute("id",prop1[i][2]);//id設定　orfListの番号と同じ
        Anno.setAttribute("name",prop1[i][3])
        Anno.style.height = elemheight+"px";
        
            Anno.style.backgroundColor="red";
        
       // console.log(elemlength);
        //console.log(ano[i][1]+":"+ano[i][2]);
        //console.log((ano[i][1]-1)*elemlength/ob[ano[i][0]].length+":"+ano[i][2]*elemlength/ob[ano[i][0]].length);
        Anno.style.width = 4+"px";
            
        Anno.style.marginLeft =(prop1[i][1])*elemlength/ob[prop1[i][0]].length+"px";
        
        
        document.getElementById(prop1[i][0]).appendChild(Anno);
        

    }

let search1 = searchSeqAll(file_now,/C[^C]{3}C[^C]{3,15}C[^C]{3,15}C/);

for(let i=0;i<=search1.length-1;i++){
        
                    let elemlength = document.getElementById(search1[i][0]).clientWidth;
        let elemheight = document.getElementById(search1[i][0]).clientHeight;
        
        let Anno = document.createElement("div");
        Anno.classList.add("anno");//class名追加
        Anno.setAttribute("id",search1[i][2]);//id設定　orfListの番号と同じ
        Anno.setAttribute("name",search1[i][3])
        Anno.style.height = elemheight+"px";
        
            Anno.style.backgroundColor="silver";
        
       // console.log(elemlength);
        //console.log(ano[i][1]+":"+ano[i][2]);
        //console.log((ano[i][1]-1)*elemlength/ob[ano[i][0]].length+":"+ano[i][2]*elemlength/ob[ano[i][0]].length);
        Anno.style.width = (search1[i][2]-search1[i][1]+1)*elemlength/ob[search1[i][0]].length+"px";
            
        Anno.style.marginLeft =(search1[i][1]-1)*elemlength/ob[search1[i][0]].length+"px";
        
        
        document.getElementById(search1[i][0]).appendChild(Anno);
        

    }

    */
