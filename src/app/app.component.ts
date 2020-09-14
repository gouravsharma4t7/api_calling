import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { FormsModule, FormGroup, FormBuilder }   from '@angular/forms';
import * as jsPDF from 'jspdf'
import * as _ from 'lodash'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  billSubmit:FormGroup;
  doc;
  today;
  options;

  waitList= ['100 Gm','200 Gm','500 Gm','1 kg'];
  selectWitList:any=[];
  gram100:any=[];

  productList = ['Mirc-Powder','Haldi-Powder','Dhaniya-Powder','Jeera','Souff']
  selectedProductList:any=[];
  mirchPow = false;
  haldiDhani = false;
  jeera = false;
  souff = false;


  rateList= ['520rs','200rs','150rs','100rs'];
  newList =[];
  newRateList = [];

  mirch:any=[];
  haldi:any=[];
  dhaniya:any=[];
  zira:any=[];

  wightQu:any=[];

  rateVal:any=[];
  newTotal:any=[];

  constructor(private api: ApiService, private fb: FormBuilder) {}
  
  ngOnInit(){
    this.billSubmit = this.fb.group({
      bName: '',
      bnum:'',
      adrs:'',
      phone: '',
      date: '',
      state: '',
      gstnumber: '',
      selectVal:''
    })
    this.newList.push(this.billSubmit.value.selectVal);
    console.log(this.newList);


  this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  this.today  = new Date();
}

// new code start

changingProduct(pro){
  this.selectedProductList.push(pro)
  console.log(this.selectedProductList)
  for(var i=0;i<=this.selectedProductList.length;i++){
    if(this.selectedProductList[i] == "Mirc-Powder"){
      alert(this.selectedProductList[i])
      this.haldiDhani = false;
      this.jeera = false;
      this.souff = false;
      this.mirchPow = true;
    }
    if(this.selectedProductList[i] == "Haldi-Powder"){
      alert(this.selectedProductList[i])
      this.mirchPow = false;
      this.jeera = false;
      this.haldiDhani = false;
      this.haldiDhani = true;
    }
    if(this.selectedProductList[i] == "Dhaniya-Powder"){
      alert(this.selectedProductList[i])
      this.mirchPow = false;
      this.jeera = false;
      this.haldiDhani = false;
      this.haldiDhani = true;
    }
    if(this.selectedProductList[i] == "jeera"){
      alert(this.selectedProductList[i])
      this.haldiDhani = false;
      this.mirchPow = false;
      this.souff = false;
      this.jeera = true;
    }
    if(this.selectedProductList[i] == "Souff"){
      alert(this.selectedProductList[i])
      this.haldiDhani = false;
      this.mirchPow = false;
      this.jeera = false;
      this.souff =  true;
    }
  }
}

changingValueMirch(va){
  if(va == "100 Gm"){
    // this.gram100 = "32 Rs";
    this.gram100.push("32 Rs");
  }
  if(va == "200 Gm"){
    // this.gram100 = "64 Rs";
    this.gram100.push("64 Rs");
  }
  if(va == "500 Gm"){
    // this.gram100 = "125 Rs";
    this.gram100.push("125 Rs");
  }
  if(va == "1 kg"){
    // this.gram100 = "240 Rs";
    this.gram100.push("240 Rs");
  }
  this.selectWitList.push(va);
  console.log(this.selectWitList);
  this.gram100;
}

changingValueHalDha(va){
  if(va == "100 Gm"){
    // this.gram100 = "25 Rs";
    this.gram100.push("25 Rs");
  }
  if(va == "200 Gm"){
    // this.gram100 = "45 Rs";
    this.gram100.push("45 Rs");
  }
  if(va == "500 Gm"){
    // this.gram100 = "85 Rs";
    this.gram100.push("85 Rs");
  }
  if(va == "1 kg"){
    // this.gram100 = "160 Rs";
    this.gram100.push("160 Rs");
  }
  this.selectWitList.push(va);
  console.log(this.selectWitList);
  this.gram100;
}

changingValueJeera(va){
  if(va == "100 Gm"){
    // this.gram100 = "25 Rs";
    this.gram100.push("28 Rs");
  }
  if(va == "200 Gm"){
    // this.gram100 = "45 Rs";
    this.gram100.push("46 Rs");
  }
  if(va == "500 Gm"){
    // this.gram100 = "85 Rs";
    this.gram100.push("110 Rs");
  }
  if(va == "1 kg"){
    // this.gram100 = "160 Rs";
    this.gram100.push("220 Rs");
  }
  this.selectWitList.push(va);
  console.log(this.selectWitList);
  this.gram100;
}

changingValueSouff(va){
  if(va == "100 Gm"){
    // this.gram100 = "25 Rs";
    this.gram100.push("18 Rs");
  }
  if(va == "200 Gm"){
    // this.gram100 = "45 Rs";
    this.gram100.push("30 Rs");
  }
  if(va == "500 Gm"){
    // this.gram100 = "85 Rs";
    this.gram100.push("65 Rs");
  }
  if(va == "1 kg"){
    // this.gram100 = "160 Rs";
    this.gram100.push("120 Rs");
  }
  this.selectWitList.push(va);
  console.log(this.selectWitList);
  this.gram100;
}


// new code end

  getValue(vl){
    this.newList.push(vl);
  console.log(this.newList);
  }

  getRate(val){
    this.newRateList.push(val);
    console.log(this.newRateList);
  }

  // mirch powder function
  mirchPowder(mi){
    this.mirch.push(mi);
    console.log(this.mirch);
  }

  //wight function
  wigthValue(wi){
    this.wightQu.push(wi);
    console.log(this.wightQu);
  }

  mirchPowderRate(rat){
    this.rateVal.push(rat);
      console.log(this.rateVal)
  }


  submitBill(){
    var doc = new jsPDF();

    doc.text(90, 10, 'Tax Invoice');
    doc.setLineDash([0, 0], 0);   // horizantal line 
    doc.line(0, 13, 250, 13);     // Horizantal line indexing 

    doc.setLineWidth(0.1);         // Vartical line 
    doc.line(101, 13, 101, 90);   //  Vartical line indexing 
    
    doc.text(10, 20, 'SHRI GOVIND FOODs UDYOG');     // fram name 

    doc.setFontSize(10);           // font size 
    doc.setFontStyle('italic');    // font style 
  
    doc.text(110, 20, 'Data');     // Date formate 
    doc.text(110, 25, this.today.toLocaleDateString("en-US", this.options));   // Date formate   

    doc.setLineWidth(0.1);         // vatrical line after date  
    doc.line(160, 13, 160, 90);    // vartical line indexing 

    doc.text(170,20, 'invoice no');
    doc.text(170,25, this.billSubmit.value.bnum.toString());


    doc.text(10, 25, '44, Prem Nagar - B');
    doc.text(10, 30, 'Agra Road, Jaipur');
    doc.text(10, 35, 'Contact  7230929900');
    doc.text(10, 40, 'whatsapp  7230929900');
    doc.text(10, 45, 'GSTIN/UIN  08COSPS5870Q1ZJ');

    doc.setLineDash([0, 0], 0);   // line size and style
    doc.line(0, 50, 250, 50);     // line indexing

    
    doc.text(110, 55, 'Bank');
    doc.text(110, 60, 'A/c No');
    doc.text(110, 65, 'IFCI CODE');

    doc.text(170, 55, 'Govind bank');
    doc.text(170, 60, 'xxxxxxxxxxx');
    doc.text(170, 65, 'Govind');


    doc.text(10, 55, 'Buyer');

    doc.setFontSize(20);

    doc.text(10, 63, this.billSubmit.value.bName);

    doc.setFontSize(10);
    doc.setFontStyle('italic');

    doc.text(10, 68, this.billSubmit.value.adrs);
    doc.text(10, 73, 'State                 :' + this.billSubmit.value.state);
    doc.text(10, 78, 'Contact             :' + this.billSubmit.value.phone.toString());
    doc.text(10, 83, 'GSTIN/UIN       :' + this.billSubmit.value.gstnumber.toString());
    
    doc.setLineDash([0, 0], 0);    //market line for prodict list 
    doc.line(0, 90, 250, 90);      // index 

    doc.text(2, 95, 'SI.NO');

    doc.setLineWidth(0.1);          // vartical line serial no an products 
    doc.line(15, 250, 15, 90); 

    doc.text(18, 95, 'Description of Goods');

    doc.setLineWidth(0.1);            // Vartical line  in market line
    doc.line(0, 100, 250, 100);    // serial no line 

    doc.setLineWidth(0.1);          // vartical line serial no an quantity 
    doc.line(60, 250, 60, 90); 
    
    doc.text(65, 95, 'Quantity');

    doc.setLineWidth(0.1);          // vartical line serial no quantiy
    doc.line(85, 250, 85, 90); 
    
    doc.text(90, 95, 'Rate');
    doc.text(95, 110, this.rateVal)
    
    doc.setLineWidth(0.1);          // vartical line serial no quantiy
    doc.line(110, 250, 110, 90); 
    
   doc.text(115, 95, 'Per');
   
   doc.setLineWidth(0.1);          // vartical line serial no quantiy
   doc.line(130, 250, 130, 90);
  
   doc.text(135, 95, 'Weight');
    
   doc.text(140, 110, this.wightQu);

   doc.setLineWidth(0.1);          // vartical line serial no quantiy
   doc.line(160, 250, 160, 90);

   doc.text(165, 95, 'Amount');

   doc.text(170, 110, this.rateVal)

    doc.text(23, 110, this.mirch);
    doc.text(70, 110, this.mirch.length.toString());

    doc.setLineDash([0, 0], 0);   // horizantal line  last line 
    doc.line(0, 250, 250, 250);     // Horizantal line indexing 

    doc.text(30, 245, 'Total');

    doc.text(70, 245, this.mirch.length.toString());

    var amount = parseInt(this.rateVal)

    for(var i=0;i<this.rateVal.length;i++){
      this.newTotal.push(parseInt(this.rateVal[i]));
    }
    var amountTotal = _.sum(this.newTotal);
    doc.text(175, 245, amountTotal.toString());

    doc.setLineDash([0, 0], 0);   // horizantal line  last line 
    doc.line(0, 240, 240, 240);     // Horizantal line indexing 

    doc.text(90, 260, 'CGST TAX');
    doc.text(90, 265, 'SGST TAX');

    // doc.text(100, 260, '9%');
      
    var gstVal = amountTotal*5/100;

    doc.text(120, 260, '5%');
    doc.text(120, 265, '5%');

    doc.text (140, 260,gstVal.toString());

    doc.text (140, 265,gstVal.toString());


    doc.text(90, 270, 'Amount');

    doc.text(5, 255, 'IDFC FIRST BANK RAJA PARK, JAIPUR');
    doc.text(5, 260, 'A/C No. :    10056223199');
    doc.text(5, 265, 'IFSC CODE :    IDFB0042129');









    doc.text(140, 270, amountTotal.toString() );

    doc.setLineDash([0, 0], 0);   // horizantal line  last line 
    doc.line(0, 275, 275, 275);     // Horizantal line indexing 

    doc.setLineWidth(0.1);          // vartical line serial no quantiy
    doc.line(160, 275, 160, 90);

    doc.text(165, 260, 'Total Amount with GST');

    doc.text(175, 270, (gstVal*2 + amountTotal).toString() );

    doc.text(150, 280, 'For SHRI GOVIND FOODS UDYOG');

    doc.text(160, 295, 'Authorised Signatory');

    doc.text(5, 273, 'TERMS');
    doc.text(5, 280, '1.  Interest @24% P.A will be charged if payment will not made within 7 days');
    doc.text(5, 285, '2.  Please pay by A/C payee cheque');
    doc.text(5, 290, '3.  Subjech to jaipur judsdiction only');
    doc.text(5, 295, '3.  AAj nagd kl udar ');








    doc.save('Bill.pdf')

  }



 







}


