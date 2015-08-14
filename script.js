var w = screen.width;
	h= 800,
	imgW = 114,
	imgH = 86;

var male =0, 
	female =0;

var sData =[];
console.log(w);

var eachCollum
var makingPattern
var imgPat
var patternRect
var oriColor
var pickedColor
var textOri
var textPicked
var infoBox
var infoBoxBack
var arcSatPicked
var satArcP 
var arcCenter
var satArc
var arcSatOri
var satArcO
var arcBriPicked
var briArcP
var briArc
var arcBriOri
var briArcO
var viv_dul 
var bri_dar
var legend
var oriBox
var legendOriText
var pickedBox
var legendPicText

var allBool = true,
	maleBool = false,
	femaleBool = false;

//id,Original_id,Sel_r,Sel_g,Sel_b,sex,Ori_r,Ori_g,Ori_b,Sel_hue,Sel_sat,Sel_bri,Ori_hue,Ori_sat,Ori_bri,Bri_sub, bri_sub_order,Sat_sub,sat_sub_order
d3.csv("data_final_3.csv", function(error, data){
	var n = data.length;
	console.log(n);

	if (error) throw error;
	data.forEach(function(d){
		
		if (d.sex ==1) male ++;
		else female ++;

		sData.push({id: +d.id,
					sex: +d.sex, 
					Original_id: +d.Original_id, 
					Ori_r: +d.Ori_r,
					Ori_g: +d.Ori_g,
					Ori_b: +d.Ori_b,
					Sel_r: +d.Sel_r,
					Sel_g: +d.Sel_g,
					Sel_b: +d.Sel_b,
					Sel_sat: +d.Sel_sat, 
					Sel_bri: +d.Sel_bri, 
					Ori_bri: +d.Ori_bri, 
					Ori_sat: +d.Ori_sat, 
					Sat_sub: +d.Sat_sub, 
					Bri_sub: +d.Bri_sub
				});
    });
	console.log('male:', male,' female:', female);

    var xPos = d3.scale.ordinal()
        .domain(d3.range(0, sData.length))
        .rangeBands([0 + imgW , w - imgW/2], 0.1)

    var xPosMale = d3.scale.ordinal()
    	.domain(d3.range(0, +male))
    	.rangeBands([0 + imgW , w - imgW/2], 0.1)
    var xPosFemale = d3.scale.linear()
    	.domain([0, +female-1])
    	.range([0 + imgW , w - imgW/2])

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------- button Click starts (changing orders)-------------------------------------------------------//
    d3.select('#sat_sub').on("click", function(){
    	sData.sort(function(a,b) {return (+b.Sat_sub)-(+a.Sat_sub);});
		giveIdNumber();
		reOrder();
		maleBool = false;
	})

    d3.select('#sat_sub_reverse').on("click", function(){
    	sData.sort(function(a,b) {return (+a.Sat_sub)-(+b.Sat_sub);});
		giveIdNumber();
		reOrder();
		maleBool = false;
	})
	d3.select('#bri_sub').on("click", function(){
		sData.sort(function(a,b) {return (+b.Bri_sub)-(+a.Bri_sub);});
		giveIdNumber();
		reOrder();
		maleBool = false;
	})

    d3.select('#bri_sub_reverse').on("click", function(){
		sData.sort(function(a,b) {return (+a.Bri_sub)-(+b.Bri_sub);});
		giveIdNumber();
		reOrder();
		maleBool = false;
	})
	d3.select('#male').on("click", function(){
		sData.sort(function(a,b) {return (+a.sex)-(+b.sex);});
		giveIdNumber();
		reOrderMale();
		maleBool = true;
	})
	d3.select('#female').on("click", function(){
		sData.sort(function(a,b) {return (+b.sex)-(+a.sex);});
		giveIdNumber();
		reOrder();
		maleBool = false;
	})

	function giveIdNumber(){
		for(var i =0 ; i < sData.length ; i++){
	    	sData[i].id = i;
	    }
	}
	function reOrder(){
		//images
		makingPattern.transition()
			.attr('x', function(d){	return xPos(+d.id) + imgW/2;})
		patternRect.transition()
			.attr('x', function(d){ return xPos(+d.id); })
			.attr('width',  xPos.rangeBand())

		//oricolor
		oriColor.transition()
			.attr('x', function(d){ return xPos(+d.id); })
		//picked color
		pickedColor.transition()
			.attr('x', function(d){ return xPos(+d.id); })

		infoBox
			.attr('transform', function(d){
				var xxx = xPos(+d.id) - imgW/2;
				var yyy = 10 + imgH +imgH;
				return 'translate('+xxx+','+yyy+')';
			} )

	}
		function reOrderMale(){
		//images
		makingPattern.transition()
			.attr('x', function(d){	
				if (d.id < male) return xPosMale(+d.id) + imgW/2;
				else 	return -10;
			})
		patternRect.transition()
			.attr('x', function(d){ 
				if (d.id < male) return xPosMale(+d.id); 
				else 	return -10;
			})
			.attr('width',  function(d){
				if (d.id < male) return xPosMale.rangeBand();
				else return 0; 
			} )

		//oricolor
		oriColor.transition()
			.attr('x', function(d){ 
				if (d.id < male) return xPosMale(+d.id); 
				else 	return -10;
			})
			.attr('width',  function(d){
				if (d.id < male) return xPosMale.rangeBand();
				else return 0; 
			} )
		//picked color
		pickedColor.transition()
			.attr('x', function(d){ 
				if (d.id < male) return xPosMale(+d.id); 
				else 	return -10;
			})
			.attr('width',  function(d){
				if (d.id < male) return xPosMale.rangeBand();
				else return 0; 
			} )
		infoBox
			.attr('transform', function(d){
				var xxx = xPos(+d.id) - imgW/2;
				var yyy = 10 + imgH +imgH;
				return 'translate('+xxx+','+yyy+')';
			} )

	}
//-------------- button Click ends (changing orders)-------------------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------creating uppest level starts --------------------------------------------------//
  	var uppest = d3.select('#chart').append('svg')
		.style('background', 'rgb(0,0,0)')
		.attr('width', w)
		.attr('height', h)

//---------------------creating uppest svg ends --------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------front index boxes starts --------------------------------------------------//
	var frontIndex = uppest.append('g').attr('class','frontIndex')
	var FI_X1 = imgW/6,
		FI_X2 = imgW/6 + imgW*3/4,
		FI_Y = 10+imgH/12; //y = 10 + (imgH - imgH*5/6)/2
	var right_Br = frontIndex.append('g').attr('class','right_Br')

	var FI_img_L = frontIndex.append('polyline').attr('class','frontIndexL')
		.attr('points', '5,0 0,0 0,'+(imgH*5/6-2)+' 5,'+(imgH*5/6-2))
		.attr('transform','translate('+FI_X1+','+FI_Y+')')	 
	var FI_img_R = right_Br.append('polyline').attr('class','frontIndexL')
		.attr('points', '-5,0 0,0 0,'+(imgH*5/6-2)+' -5,'+(imgH*5/6-2))
		.attr('transform', 'translate('+FI_X2+','+FI_Y+')')
	var FI_img_T = frontIndex.append('text').attr('class','frontIndexT')
		.text('Image')
		.attr('transform', 'translate('+(FI_X1+FI_X2)/2+','+(10+imgH)/2+')')

	var FI_sex_L = frontIndex.append('polyline').attr('class','frontIndexL')
		.attr('points', '0,0 6,0')
		.attr('transform', 'translate('+(FI_X1-1)+','+(imgH+8)+')')
		// .style('stroke-width', 1)
	var FI_sex_R = right_Br.append('polyline').attr('class','frontIndexL')
		.attr('points', '-6,0 0,0')
		.attr('transform', 'translate('+(FI_X2+1)+','+(imgH+8)+')')
		// .style('stroke-width', 1)
	var FI_sex_T = frontIndex.append('text').attr('class','frontIndexT')
		.text('Sex')
		.attr('transform', 'translate('+(FI_X1+FI_X2)/2+','+(imgH+8)+')')

	var FI_ori_L = frontIndex.append('polyline').attr('class','frontIndexL')
		.attr('points', '5,0 0,0 0,'+imgH/2*5/6+' 5,'+imgH/2*5/6)
		.attr('transform', 'translate('+FI_X1+','+(10+ imgH*5/4- imgH*5/24)+')')	 //10+ imgH +(imgH/2- imgH/2*5/6)/2
	var FI_ori_R = right_Br.append('polyline').attr('class','frontIndexL')
		.attr('points', '-5,0 0,0 0,'+imgH/2*5/6+' -5,'+imgH/2*5/6)
		.attr('transform', 'translate('+FI_X2+','+(10+ imgH*5/4 - imgH*5/24)+')')
	var FI_ori_T = frontIndex.append('text').attr('class','frontIndexT')
		.text('Original')
		.attr('transform', 'translate('+(FI_X1+FI_X2)/2+','+(10+imgH*5/4-2)+')')//(10+imgH+10+imgH+imgH/2)/2
	var FI_ori_TB = frontIndex.append('text').attr('class','frontIndexTB')
		.text('Average Skin Tone')
		.attr('transform', 'translate('+(FI_X1+FI_X2)/2+','+(10+imgH*5/4+11)+')')//(10+imgH+10+imgH+imgH/2)/2
		
	var FI_pic_L = frontIndex.append('polyline').attr('class','frontIndexL')
		.attr('points', '5,0 0,0 0,'+imgH/2*5/6+' 5,'+imgH/2*5/6)
		.attr('transform', 'translate('+FI_X1+','+(10+ imgH*7/4- imgH*5/24)+')')	 //10+ imgH+imgH/2 +(imgH/2- imgH/2*5/6)/2
	var FI_pic_R = right_Br.append('polyline').attr('class','frontIndexL')
		.attr('points', '-5,0 0,0 0,'+imgH/2*5/6+' -5,'+imgH/2*5/6)
		.attr('transform', 'translate('+FI_X2+','+(10+ imgH*7/4- imgH*5/24)+')')
	var FI_pic_T = frontIndex.append('text').attr('class','frontIndexT')
		.text('User Picked')
		.attr('transform', 'translate('+(FI_X1+FI_X2)/2+','+(10+imgH*7/4-2)+')')//(10+imgH+imgH/2 + 10+imgH+imgH)/2
	var FI_ori_TB = frontIndex.append('text').attr('class','frontIndexTB')
		.text('Average Skin Tone')
		.attr('transform', 'translate('+(FI_X1+FI_X2)/2+','+(10+imgH*7/4+11)+')')//(10+imgH+10+imgH+imgH/2)/2
//---------------------front index boxes starts --------------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////

	main(sData); //????? do I have to do this??

function main(mainData){
//////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------creating each column starts--------------------------------------------//
	// for each collumn
	eachCollum = uppest.append('g').attr('id','pictures')
		.selectAll('g').data(mainData)
		.enter().append('g')
			.attr('id', function(d){
				return 'n'+d.Original_id;
			})
			.attr('class', 'rects')
//-----------------------creating each column ends--------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//------------- pictures start --------------------------------------//
	//crop images --> "http://bl.ocks.org/tonyfast/5b462f9545dacbe61b37"
	makingPattern = eachCollum.append('defs')
		.append('pattern')
		.attr('id', function(d){
			return 'p'+d.Original_id;
		})
		.attr('x', function(d){
			return xPos(+d.id) + imgW/2;
		})
		.attr('y', 10)
		.attr('patternUnits','userSpaceOnUse')
		.attr('width', imgW)
		.attr('height', imgH)
	imgPat = makingPattern.append('image')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', imgW)
			.attr('height', imgH)
			.attr('xlink:href', function(d){
				var pic = (d.Original_id);
				return 'data/imgs/'+pic+'.jpg';
			})

	patternRect = eachCollum.append('rect')
		.attr('class', 'ImgBox')
		.attr('width',  xPos.rangeBand())//imgSmW)
		.attr('height', imgH)
		.attr('x', function(d,i){
			return xPos(+d.id);
		})
		.attr('y', 10)
		.attr('fill', function(d){
			return 'url(#p'+d.Original_id+')';
		})
//------------- pictures ends --------------------------------------//
/////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//------------- Original Color Box starts--------------------------//
	oriColor = eachCollum.append('rect')
		.attr('class', 'oriColor')
		.attr('width', xPos.rangeBand())
		.attr('height', imgH/2)
		.attr('x', function(d){
			return xPos(+d.id);
		})
		.attr('y', 10 + imgH)
		.style('fill', function(d){
			var r = Math.floor(+d.Ori_r);
			var g = Math.floor(+d.Ori_g);
			var b = Math.floor(+d.Ori_b);
			return 'rgb( '+r+', '+g+', '+b+')';
		})
//------------- Original Color Box ends--------------------------//
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//------------- Picked Color Box starts--------------------------//
	pickedColor = eachCollum.append('rect')
		.attr('class', 'pickedColor')
		.attr('width', xPos.rangeBand())
		.attr('height', imgH/2)
		.attr('x', function(d){
			return xPos(+d.id);
		})
		.attr('y', 10 + imgH + imgH/2)
		.style('fill', function(d){
			var r = Math.floor(+d.Sel_r);
			var g = Math.floor(+d.Sel_g);
			var b = Math.floor(+d.Sel_b);
			return 'rgb( '+r+', '+g+', '+b+')';
		})
//------------- Picked Color Box ends--------------------------//
//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//------------- creating text box starts---------------------------//
	textOri = eachCollum.append('text')
		.attr('class', 'oriText')
		.style('font-size', '0px')
		.attr('y', 10 + imgH +imgH/2 - imgH/6)
		.text('Original')
		.attr('opacity',0)
	textPicked = eachCollum.append('text')
		.attr('class', 'pickedText')
		.attr('y', 10 + imgH +imgH - imgH/6)
		.text('Picked')
		.attr('opacity',0)
//------------- creating text box ends---------------------------//
////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//------------- Information box starts---------------------------//
	//info box
	infoBox = eachCollum.append('g').attr('class','infoBox')
		.attr('transform', function(d){
			var xxx = xPos(+d.id) - imgW/2;
			var yyy = 10 + imgH +imgH;
			return 'translate('+xxx+','+yyy+')';
		} )
		.attr('opacity',0)
	infoBoxBack = infoBox.append('rect')
		.attr('class', 'infoBoxBack')
		.attr('fill', 'rgb(43,43,43)')

	//saturation arc Picked
	arcSatPicked = d3.svg.arc()
	    .outerRadius(imgW/3.5+2)
		.innerRadius(imgW/3.5)
	    .startAngle(0)
	    .endAngle(0)
	satArcP = infoBox.append('path')
		.attr('d', arcSatPicked	)
		.attr('class', 'satArcP')
		.attr('fill', '#70beb5')
		.attr('transform', function(d){
			var xx = imgW/2;
			var yy = imgH*.5;
			return 'translate('+xx+','+yy+')';
		})

	//saturation arc Center
	arcCenter = d3.svg.arc()
	    .outerRadius(imgW/3.5 - 3)
		.innerRadius(imgW/3.5 - 3 -2)
	    .startAngle(0)
	    .endAngle(0)
	satArc = infoBox.append('path')
		.attr('d', arcCenter)
		.attr('class', 'satArc')
		.attr('fill', '#999999')
		.attr('transform', function(data){
				var xx =  imgW/2; 
				var yy = imgH*.5;
				return 'translate('+xx+','+yy+')';
			})

	//saturation arc Original
	arcSatOri = d3.svg.arc()
	    .outerRadius(imgW/3.5 - 8)
		.innerRadius(imgW/3.5 - 8 -2)
	    .startAngle(0)
	    .endAngle(0)
	satArcO = infoBox.append('path')
		.attr('d', arcSatOri)
		.attr('class', 'satArcO')
		.attr('fill', '#d7514c')
		.attr('transform', function(d){
				var xx = imgW/2; 
				var yy = imgH*.5;
				return 'translate('+xx+','+yy+')';
			})

	//brightness arc Picked
	arcBriPicked = d3.svg.arc()
	    .outerRadius(imgW/3.5+2)
		.innerRadius(imgW/3.5)
	    .startAngle(0)
	    .endAngle(0)
	briArcP = infoBox.append('path')
		.attr('d', arcBriPicked)
		.attr('class', 'briArcP')
		.attr('fill', '#70beb5')
		.attr('transform', function(d){
				var xx = imgW/2; 
				var yy = imgH*1.5;
				return 'translate('+xx+','+yy+')';
			})

	//brightness arc Center
	briArc = infoBox.append('path')
		.attr('d', arcCenter)
		.attr('class', 'briArc')
		.attr('fill', '#999999')
		.attr('transform', function(d){
				var xx = imgW/2; 
				var yy = imgH*1.5;
				return 'translate('+xx+','+yy+')';
			})

	//brightness arc Original
	arcBriOri = d3.svg.arc()
	    .outerRadius(imgW/3.5 - 8)
		.innerRadius(imgW/3.5 - 8 -2)
	    .startAngle(0)
	    .endAngle(0)
	briArcO = infoBox.append('path')
		.attr('d', arcBriOri)
		.attr('class', 'briArcO')
		.attr('fill', '#d7514c')
		.attr('transform', function(d){
				var xx = imgW/2; 
				var yy = imgH*1.5;
				return 'translate('+xx+','+yy+')';
			})

	//vivider/duller & brighter/darker  text
	viv_dul = infoBox.append('text').attr('class', 'viv_dul')
		.attr('x', imgW/2 )
		.attr('y',imgH*.5)
		.style('font-size', '0px')
	bri_dar = infoBox.append('text').attr('class', 'bri_dar')
		.attr('x', imgW/2)
		.attr('y', imgH*1.5)
		.style('font-size', '0px')
	
	//legend
	legend = infoBox.append('g').attr('class', 'legend')
	oriBox = legend.append('rect').attr('fill', '#d7514c')
		.attr('x', 0)
		.attr('y', imgH*2.3 - imgH/5)
	legendOriText = legend.append('text').attr('class', 'legendOriText')
		.attr('x', imgW/4 )
		.attr('y', imgH*2.3 - imgH/10)
		.text('Original')
	pickedBox = legend.append('rect').attr('fill', '#70beb5')
		.attr('x', imgW/2)
		.attr('y', imgH*2.3 - imgH/5)
	legendPicText = legend.append('text').attr('class', 'legendPicText')
		.attr('x', imgW*3/4 )
		.attr('y', imgH*2.3 - imgH/10)
		.text('Picked')
//------------- Information box ends---------------------------//
////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//------------- graph starts --------------------------------------//

//------------- graph ends --------------------------------------//
///////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////
//------------- "Mouse over and out" starts----------------------//
	d3.selectAll('.rects')
		.on("mouseover", function(data){
			// console.log(data.Original_id);
			frontIndexBoxOver();

			if(!maleBool){
				imgOver(data);
				oriBoxOver(data);
				picBoxOver(data);
				textInBoxOver(data);
			}
			if(maleBool){
				MimgOver(data);
				MoriBoxOver(data);
			}
			infoBoxOver(data);
		})
		.on('mouseout', function(data){
			frontIndexBoxOut();

			if(!maleBool){
				imgOut();
				oriBoxOut();
				picBoxOut();	
				textInBoxOut();
			}

			if(maleBool){
				MimgOut(data);
				MoriBoxOut();
			}
			
			infoBoxOut();
		})
//------------- "Mouse over and out" ends-------------------------------//
///////////////////////////////////////////////////////////////////////////

	function MimgOver(data){
		//img location
		d3.selectAll('.ImgBox')
			.transition()
			.attr('x', function(d){
				if (d.id < male){
					if (+d.id > +data.id) 			return xPosMale(+d.id) + imgW/2-xPosMale.rangeBand();
					else if (+d.id < +data.id) 		return xPosMale(+d.id) - imgW/2;
					else 							return xPosMale(+d.id) - imgW/2;
				}else return -100;
			})
		d3.selectAll('pattern')
			.transition()
			.attr('x', function(d,i){
				if (d.id < male){
					if (+d.id== +data.id) 	return xPosMale(+d.id) - imgW/2;
					else 					return xPosMale(+d.id) - imgW;
				}else return -100;
			})

		//image size
		d3.select('#n'+data.Original_id).select('rect')
			.attr('width', imgW);
	}
	function MimgOut(){
		d3.selectAll('.ImgBox')
			.transition()
			.attr('x', function(d){
				if (d.id < male) return xPosMale(+d.id);
				else 	return -100;
			})
		
		d3.selectAll('pattern')
			.transition()
			.attr('x', function(d){
				if (d.id < male) return xPosMale(+d.id) + imgW/2;
				else 	return -100;
			});

		d3.selectAll('.ImgBox')
			.attr('width', xPosMale.rangeBand());
	}
	function MoriBoxOver(data){
	//original color
		d3.selectAll('.oriColor')
			.transition()	
			.attr('width', function(d){

				if (+d.id == +data.id) 	return imgW;
				else 					return xPosMale.rangeBand();
			})
			.attr('x', function(d){
				if (d.id < male){
					if (+d.id > +data.id) 		return xPosMale(+d.id) + imgW/2-xPosMale.rangeBand();
					else if (+d.id < +data.id)	return xPosMale(+d.id) - imgW/2;
					else 						return xPosMale(+d.id) - imgW/2;
				}else return -100;
			})	
	}
	function MoriBoxOut(){
		d3.selectAll('.oriColor')
			.transition()
			.attr('width', xPosMale.rangeBand())
			.attr('x', function(d){
				if (d.id < male){
					return xPosMale(+d.id);
				}else return -100;
			})
	}



	//All
	function frontIndexBoxOver(){
		d3.select('.right_Br')
			.transition()
			.attr('transform', 'translate('+(-imgW/2)+',0)')
		d3.selectAll('.frontIndexT')
			.transition()
			.attr('opacity', 0)
		d3.selectAll('.frontIndexTB')
			.transition()
			.attr('opacity', 0)
	}

	function frontIndexBoxOut(){
		d3.select('.right_Br')
			.transition()
			.attr('transform', 'translate(0,0)')
		d3.selectAll('.frontIndexT')
			.transition()
			.attr('opacity', 1)
		d3.selectAll('.frontIndexTB')
			.transition()
			.attr('opacity', 1)
	}

	function imgOver(data){

		//img location
		d3.selectAll('.ImgBox')
			.transition()
			.attr('x', function(d){
				if (+d.id > +data.id) 			return xPos(+d.id) + imgW/2-xPos.rangeBand();
				else if (+d.id < +data.id) 		return xPos(+d.id) - imgW/2;
				else 							return xPos(+d.id) - imgW/2;
			})
		d3.selectAll('pattern')
			.transition()
			.attr('x', function(d,i){
				if (+d.id== +data.id) 	return xPos(+d.id) - imgW/2;
				else 					return xPos(+d.id) - imgW;
			})

		//image size
		d3.select('#n'+data.Original_id).select('rect')
			.attr('width', imgW);
	}
	function imgOut(){
		d3.selectAll('.ImgBox')
			.transition()
			.attr('x', function(d,i){
				return xPos(+d.id);
			})
		
		d3.selectAll('pattern')
			.transition()
			.attr('x', function(d,i){
				return xPos(+d.id) + imgW/2;
			});

		d3.selectAll('.ImgBox')
			.attr('width', xPos.rangeBand());
	}

	function oriBoxOver(data){
	//original color
		d3.selectAll('.oriColor')
			.transition()	
			.attr('width', function(d){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPos.rangeBand();
			})
			.attr('x', function(d){
				if (+d.id > +data.id) 		return xPos(+d.id) + imgW/2-xPos.rangeBand();
				else if (+d.id < +data.id)	return xPos(+d.id) - imgW/2;
				else 						return xPos(+d.id) - imgW/2;
			})	
	}
	function oriBoxOut(){
		d3.selectAll('.oriColor')
			.transition()
			.attr('width', xPos.rangeBand())
			.attr('x', function(d){
				return xPos(+d.id);
			})
	}
	function picBoxOver(data){
		//picked color
		d3.selectAll('.pickedColor')
			.transition()	
			.attr('width', function(d){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPos.rangeBand();
			})
			.attr('x', function(d){
				if (+d.id > +data.id) 		return xPos(+d.id) + imgW/2-xPos.rangeBand();
				else if (+d.id < +data.id) 	return xPos(+d.id) - imgW/2;
				else 						return xPos(+d.id) - imgW/2;
			})
	}
	function picBoxOut(){
		d3.selectAll('.pickedColor')
			.transition()
			.attr('width', xPos.rangeBand())
			.attr('x', function(d){
				return xPos(+d.id);
			})
	}
	function textInBoxOver(data){
		// text
		d3.select('#n'+data.Original_id).select('.oriText')
			.attr('x', function(data){	return xPos(+data.id);  })
			.transition()
			.style('font-size', imgH/4+'px')
			.attr('opacity', 1)
		d3.select('#n'+data.Original_id).select('.pickedText')
			.attr('x', function(data){	return xPos(+data.id);  })
			.transition()
			.style('font-size', imgH/4+'px')
			.attr('opacity', 1)
	}
	function textInBoxOut(){
		//text original & picked
		textOri.transition()
			.style('font-size', '0px')
			.attr('opacity', 0)
		textPicked.transition()
			.style('font-size', '0px')
			.attr('opacity', 0)
	}

	function infoBoxOver(data){
		d3.select('#n'+data.Original_id).select('.infoBox').transition().attr('opacity', 1);
		//infobox background
		d3.select('#n'+data.Original_id).select('.infoBoxBack')
			.attr('width', imgW)
			.attr('height', imgH*2.3)
		//----saturation arc series starts----------------//
		var satAngleP = ((+data.Sel_sat)/ 80 * Math.PI).toFixed(4);
		arcSatPicked.endAngle(satAngleP);
		d3.select('#n'+data.Original_id).select('.satArcP')
			.attr('d', arcSatPicked)

		arcCenter.endAngle((Math.PI*2).toFixed(4));
		d3.select('#n'+data.Original_id).select('.satArc')
			.attr('d', arcCenter)

		var satAngleO = ((+data.Ori_sat)/ 80 * Math.PI).toFixed(4);
		arcSatOri.endAngle(satAngleO);
		d3.select('#n'+data.Original_id).select('.satArcO')
			.attr('d', arcSatOri)
		//----saturation arc series ends----------------//
		
		//----brightness arc series starts----------------//
		var briAngleP = ((+data.Sel_bri)/ 150 * Math.PI).toFixed(4);
		arcBriPicked.endAngle(briAngleP);
		d3.select('#n'+data.Original_id).select('.briArcP')	
			.attr('d', arcBriPicked)

		d3.select('#n'+data.Original_id).select('.briArc')		
			.attr('d', arcCenter)

		var briAngleO = ((+data.Ori_bri)/ 150 * Math.PI).toFixed(4);
		arcBriOri.endAngle(briAngleO);
		d3.select('#n'+data.Original_id).select('.briArcO')
			.attr('d', arcBriOri)
		//----brightness arc series ends----------------//

		//vivider/duller & brighter/darker  text starts ---//
		d3.select('#n'+data.Original_id).select('.viv_dul')
			.transition()
			.style('font-size', imgH/8+'px')
			.text(function(data){
				if((+data.Sat_sub) >1) return 'duller';
				else if((+data.Sat_sub) >= -1) return 'alike';
				else return 'vivider'; 
			})

		d3.select('#n'+data.Original_id).select('.bri_dar')
			.transition()
			.style('font-size', imgH/8+'px')
			.text(function(){
				if((+data.Bri_sub) >1) return 'darker';
				else if((+data.Bri_sub) >= -1) return 'alike';
				else return 'brighter'; 
			})

		//vivider/duller & brighter/darker  text ends ---//

		//------- legend starts------------------//
		d3.select('#n'+data.Original_id).select('.legend').selectAll('rect')
			.transition()
			.attr('width', imgW/2)
			.attr('height', imgH/5)
		d3.select('#n'+data.Original_id).select('.legend').selectAll('text')
			.transition()
			.style('font-size', imgH/8+'px')
		//------- legend starts------------------//
	}

	function infoBoxOut(){
		//info box!!
		d3.select('.infoBox')
			.transition().attr('opacity', 0);
		
		//info box background
		infoBoxBack.transition()
			.attr('width', 0)

		//Arcs
		arcSatPicked.startAngle(0).endAngle(0);
		satArcP.attr('d', arcSatPicked)
			
		arcCenter.startAngle(0).endAngle(0)
		satArc.attr('d', arcCenter)
			
		arcSatOri.startAngle(0).endAngle(0);
		satArcO.attr('d', arcSatOri)
			
		arcBriPicked.startAngle(0).endAngle(0);
		briArcP.attr('d', arcBriPicked)
			
		briArc.attr('d', arcCenter)
			
		arcBriOri.startAngle(0).endAngle(0);
		briArcO.attr('d', arcBriOri)

		//vivder, brighter text
		viv_dul.transition().style('font-size', '0px')
		bri_dar.transition().style('font-size', '0px')
		//legend box
		oriBox
			.transition().attr('width', 0).attr('height', 0)
		pickedBox
			.transition().attr('width', 0).attr('height', 0)
		legendOriText
			.transition().style('font-size', '0px')
		legendPicText
			.transition().style('font-size', '0px')
	}
	
})




