<?php

$id = $_POST["id"];
$seq_start = $_POST["start"];
$seq_stop = $_POST["stop"];
$strand = $_POST["strand"];
$rettype = $_POST["rettype"];
$retmode = $_POST["retmode"];

$url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=$id&strand=$strand&seq_start=$seq_start&seq_stop=$seq_stop&rettype=$rettype&retmode=$retmode&tool=myphp1&email=s197529t%40st.go.tuat.ac.jp&api_key=2fe64c23030f4ba896f861104ca3782e5508";

$seq =file_get_contents($url);

echo $seq;


?>