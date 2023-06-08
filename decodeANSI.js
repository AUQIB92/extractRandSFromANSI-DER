const prompt = require("prompt-sync")({ sigint: true });
async function decode(signature)
{
let signByteArray = Buffer.from(signature, 'hex');
 // unsignedTxn["signature"]=[signatureHex]

 let r 
 let s
  //console.log(" sig",unsignedTxn)
  if(signByteArray.length==71)
  {
//Add SIgnature to Txn Object
r= bytesToHexString(extract1R(signByteArray));
s= bytesToHexString(extract1S(signByteArray));
  }
  else{

    r= bytesToHexString(extract2R(signByteArray));
    s=bytesToHexString(extract2S(signByteArray));

  }
  return [r,s]
}
function   extract1R(signature)  {
  return signature.slice(4, 37);
  //return new BigInteger(Arrays.copyOfRange(signature, startR + 2, startR + 2 + lengthR));
}


function   extract1S(signature) {
       return signature.slice(39,71)

 //return new BigInteger(Arrays.copyOfRange(signature, startS + 2, startS + 2 + lengthS));
}

function   extract2R(signature)  {
    return signature.slice(4, 36);
    //return new BigInteger(Arrays.copyOfRange(signature, startR + 2, startR + 2 + lengthR));
 }
 
 function   extract2S(signature) {
         return signature.slice(38,70)
 
   //return new BigInteger(Arrays.copyOfRange(signature, startS + 2, startS + 2 + lengthS));
 }
 
   function bytesToHexString(bytes){
    if (!bytes){//w  w w .j  av  a  2 s .c o m
      return null;
    }
  
    bytes = new Uint8Array(bytes);
    var hexBytes = [];
  
    for (var i = 0; i < bytes.length; ++i) {
      var byteString = bytes[i].toString(16);
      if (byteString.length < 2){
        byteString = "0" + byteString;
      }
      hexBytes.push(byteString);
    }
    return hexBytes.join("");
  }

  const res =async()=>{  let  signature=prompt("Enter ASN.1 DER Encoded Signature ")
let [r,s]= await  decode(signature)
console.log("R =%s S=%s",r,s)
}
 res()