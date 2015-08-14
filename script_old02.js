var w = screen.width;
	h= 800,
	imgW = 114,
	imgH = 86;

var male =0, 
	female =0;

var sData =[], 
	sDataA=[],
	sDataM =[],
	sDataF =[];
console.log(w);

//id,Original_id,Sel_r,Sel_g,Sel_b,sex,Ori_r,Ori_g,Ori_b,Sel_hue,Sel_sat,Sel_bri,Ori_hue,Ori_sat,Ori_bri,Bri_sub, bri_sub_order,Sat_sub,sat_sub_order
d3.csv("data_final_3.csv", function(error, data){
	var n = data.length;
	console.log(n);
	// var imgSmW = Math.floor((w-imgW*2)/n);
	// if (imgSmW < 2) imgSmW =2;
	// else if (imgSmW > 6) imgSmW = 6;
	// console.log(imgSmW, (w)/n);

	if (error) throw error;
	data.forEach(function(d){
		
		if (d.sex ==1) male ++;
		else female ++;

		sDataA.push({id: +d.id,
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
		if(d.sex == 1 ) sDataM.push({id: +d.id,
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
		else sDataF.push({id: +d.id,
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

	sData = sDataA;

    // var xPos = d3.scale.linear()
    // 	.domain([0, +n-1])
    // 	.range([0 + imgW , w - imgW/2])

    var xPos = d3.scale.ordinal()
        .domain(d3.range(0, sData.length))
        .rangeBands([0 + imgW , w - imgW/2], 0.1)

    var xPosMale = d3.scale.linear()
    	.domain([0, +male-1])
    	.range([0 + imgW , w - imgW/2])
    var xPosFemale = d3.scale.linear()
    	.domain([0, +female-1])
    	.range([0 + imgW , w - imgW/2])

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------- button Click starts (changing orders)-------------------------------------------------------//
    d3.select('#sat_sub').on("click", function(){
    	sData.sort(function(a,b) {return (+b.Sat_sub)-(+a.Sat_sub);});
		giveIdNumber();
		reOrder();
	})

    d3.select('#sat_sub_reverse').on("click", function(){
    	sData.sort(function(a,b) {return (+a.Sat_sub)-(+b.Sat_sub);});
		giveIdNumber();
		reOrder();
	})
	d3.select('#bri_sub').on("click", function(){
		sData.sort(function(a,b) {return (+b.Bri_sub)-(+a.Bri_sub);});
		giveIdNumber();
		reOrder();
	})

    d3.select('#bri_sub_reverse').on("click", function(){
		sData.sort(function(a,b) {return (+a.Bri_sub)-(+b.Bri_sub);});
		giveIdNumber();
		reOrder();
	})
	d3.select('#male').on("click", function(){
		//sData = sDataM;
		sData.sort(function(a,b) {return (+a.sex)-(+b.sex);});
		//xPos.domain(d3.range(0, sData.length))
		// imgSmW = 10
		giveIdNumber();
		reOrder();

		// console.log(sData)
		// console.log(sDataM)
	})
	d3.select('#female').on("click", function(){
		sData.sort(function(a,b) {return (+b.sex)-(+a.sex);});
		giveIdNumber();
		reOrder();
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
			.attr('x', function(d){ 
				return xPos(+d.id); })

		//oricolor
		oriColor.transition()
			.attr('x', function(d){ return xPos(+d.id); })
		//picked color
		pickedColor.transition()
			.attr('x', function(d){ return xPos(+d.id); })


	//vivider/birghter text
	viv_dul
		.attr('x', function(d){	return xPos(+d.id);  })

	bri_dar
		.attr('x', function(d){	return xPos(+d.id);  })
		
	//legend
	oriBox
		.attr('x', function(d){	return xPos(+d.id) - imgW/2;  })
	legendOriText
		.attr('x', function(d){	return xPos(+d.id) - imgW/4;  })
	pickedBox
		.attr('x', function(d){	return xPos(+d.id);  })
	legendPicText
		.attr('x', function(d){	return xPos(+d.id) + imgW/4;  })
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
//main(sData);
//function main(mainData){
//////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------creating each column starts--------------------------------------------//
	// for each collumn
	var eachCollum = uppest.append('g').attr('id','pictures')
		.selectAll('g').data(sData)
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
	var makingPattern = eachCollum.append('defs')
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
	var imgPat = makingPattern.append('image')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', imgW)
			.attr('height', imgH)
			.attr('xlink:href', function(d){
				var pic = (d.Original_id);
				return 'data/imgs/'+pic+'.jpg';
			})

	var patternRect = eachCollum.append('rect')
		// .transition()
		// .delay(function(d){
		// 	return d.id *10;			
		// })
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
	var oriColor = eachCollum.append('rect')
		// .transition()
		// .delay(function(d){
		// 	return d.id *10;			
		// })
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
	var pickedColor = eachCollum.append('rect')
		// .transition()
		// .delay(function(d){
		// 	return d.id *10;			
		// })
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
	var textOri = eachCollum.append('text')
		.attr('class', 'oriText')
		.style('font-size', '0px')
		.attr('y', 10 + imgH +imgH/2 - imgH/6)
		.text('Original')
		.attr('opacity',0)
	var textPicked = eachCollum.append('text')
		.attr('class', 'pickedText')
		.attr('y', 10 + imgH +imgH - imgH/6)
		.text('Picked')
		.attr('opacity',0)
//------------- creating text box ends---------------------------//
////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//------------- Information box starts---------------------------//
	//info box
	var infoBox = eachCollum.append('g').attr('class','infoBox')
	var infoBoxBack = infoBox.append('rect')
		.attr('class', 'infoBoxBack')
		.attr('fill', 'rgb(43,43,43)')
		.attr('y', 10 + imgH +imgH )

	//saturation arc Picked
	var arcSatPicked = d3.svg.arc()
	    .outerRadius(imgW/3.5+2)
		.innerRadius(imgW/3.5)
	    .startAngle(0)
	    .endAngle(0)
	var satArcP = infoBox.append('path')
		.attr('d', arcSatPicked	)
		.attr('class', 'satArcP')
		.attr('fill', '#70beb5')

	//saturation arc Center
	var arcCenter = d3.svg.arc()
	    .outerRadius(imgW/3.5 - 3)
		.innerRadius(imgW/3.5 - 3 -2)
	    .startAngle(0)
	    .endAngle(0)
	var satArc = infoBox.append('path')
		.attr('d', arcCenter)
		.attr('class', 'satArc')
		.attr('fill', '#999999')

	//saturation arc Original
	var arcSatOri = d3.svg.arc()
	    .outerRadius(imgW/3.5 - 8)
		.innerRadius(imgW/3.5 - 8 -2)
	    .startAngle(0)
	    .endAngle(0)
	var satArcO = infoBox.append('path')
		.attr('d', arcSatOri)
		.attr('class', 'satArcO')
		.attr('fill', '#d7514c')

	//brightness arc Picked
	var arcBriPicked = d3.svg.arc()
	    .outerRadius(imgW/3.5+2)
		.innerRadius(imgW/3.5)
	    .startAngle(0)
	    .endAngle(0)
	var briArcP = infoBox.append('path')
		.attr('d', arcBriPicked)
		.attr('class', 'briArcP')
		.attr('fill', '#70beb5')

	//brightness arc Center
	var briArc = infoBox.append('path')
		.attr('d', arcCenter)
		.attr('class', 'briArc')
		.attr('fill', '#999999')

	//brightness arc Original
	var arcBriOri = d3.svg.arc()
	    .outerRadius(imgW/3.5 - 8)
		.innerRadius(imgW/3.5 - 8 -2)
	    .startAngle(0)
	    .endAngle(0)
	var briArcO = infoBox.append('path')
		.attr('d', arcBriOri)
		.attr('class', 'briArcO')
		.attr('fill', '#d7514c')

	//vivider/duller & brighter/darker  text
	var viv_dul = infoBox.append('text').attr('class', 'viv_dul')
		.attr('x', function(d){	return xPos(+d.id);  })
		.attr('y', 10+ imgH*2.5 + imgH/8/2)
		.attr('opacity',0).style('font-size', '0px')
	var bri_dar = infoBox.append('text').attr('class', 'bri_dar')
		.attr('x', function(d){	return xPos(+d.id);  })
		.attr('y', 10+ imgH*3.5 + imgH/8/2)
		.attr('opacity',0).style('font-size', '0px')
	
	//legend
	var legend = infoBox.append('g').attr('class', 'legend')
	var oriBox = legend.append('rect').attr('fill', '#d7514c')
		.attr('x', function(d){	return xPos(+d.id) - imgW/2;  })
	var legendOriText = legend.append('text').attr('class', 'legendOriText')
		.attr('x', function(d){	return xPos(+d.id) - imgW/4;  })
		.text('Original').attr('opacity',0)
	var pickedBox = legend.append('rect').attr('fill', '#70beb5')
		.attr('x', function(d){	return xPos(+d.id);  })
	var legendPicText = legend.append('text').attr('class', 'legendPicText')
		.attr('x', function(d){	return xPos(+d.id) + imgW/4;  })
		.text('Picked').attr('opacity',0)
//------------- Information box ends---------------------------//
////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//------------- graph starts --------------------------------------//

//------------- graph ends --------------------------------------//
///////////////////////////////////////////////////////////////////

//}

///////////////////////////////////////////////////////////////////
//------------- "Mouse over and out" starts----------------------//
	d3.selectAll('.rects')
		.on("mouseover", function(data){
			// console.log(data.id);
			frontIndexBoxOver();

			imgOver(data);
			oriBoxOver(data);
			picBoxOver(data);
			textInBoxOver(data);
			
			infoBoxOver(data);
		})
		.on('mouseout', function(data){
			frontIndexBoxOut();

			imgOut();
			oriBoxOut();
			picBoxOut();	
			textInBoxOut();
			
			infoBoxOut();
		})
//------------- "Mouse over and out" ends-------------------------------//
///////////////////////////////////////////////////////////////////////////

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
		//infobox background
		d3.select('#n'+data.Original_id).select('.infoBoxBack')
			.attr('x', function(d){ 	return xPos(+d.id) - imgW/2;  })
			.attr('width', imgW)
			.attr('height', imgH*2.3)
			.transition()
			.attr('opacity', 1)
		//----saturation arc series starts----------------//
		var satAngleP = ((+data.Sel_sat)/ 80 * Math.PI).toFixed(4);
		// console.log(satAngleP);
		arcSatPicked.endAngle(satAngleP);
		d3.select('#n'+data.Original_id).select('.satArcP')
			.attr('transform', function(data){
				var xx = xPos(data.id); 
				var yy = 10+ imgH*2.5;
				return 'translate('+xx+','+yy+')';
			})
			.attr('d', arcSatPicked)
			.transition()
			.attr('opacity', 1)

		arcCenter.endAngle((Math.PI*2).toFixed(4));
		d3.select('#n'+data.Original_id).select('.satArc')
			.attr('transform', function(data){
				var xx = xPos(data.id); 
				var yy = 10+ imgH*2.5;
				return 'translate('+xx+','+yy+')';
			})
			.attr('d', arcCenter)
			.transition()
			.attr('opacity', 1)

		var satAngleO = ((+data.Ori_sat)/ 80 * Math.PI).toFixed(4);
		arcSatOri.endAngle(satAngleO);
		d3.select('#n'+data.Original_id).select('.satArcO')
			.attr('transform', function(data){
				var xx = xPos(data.id); 
				var yy = 10+ imgH*2.5;
				return 'translate('+xx+','+yy+')';
			})
			.attr('d', arcSatOri)
			.transition()
			.attr('opacity', 1)
		//----saturation arc series ends----------------//
		
		//----brightness arc series starts----------------//
		var briAngleP = ((+data.Sel_bri)/ 150 * Math.PI).toFixed(4);
		arcBriPicked.endAngle(briAngleP);
		d3.select('#n'+data.Original_id).select('.briArcP')
			.attr('transform', function(data){
				var xx = xPos(data.id); 
				var yy = 10+ imgH*3.5;
				return 'translate('+xx+','+yy+')';
			})
			.attr('d', arcBriPicked)
			.transition()
			.attr('opacity', 1)

		d3.select('#n'+data.Original_id).select('.briArc')
			.attr('transform', function(data){
				var xx = xPos(data.id); 
				var yy = 10+ imgH*3.5;
				return 'translate('+xx+','+yy+')';
			})
			.attr('d', arcCenter)
			.transition()
			.attr('opacity', 1)

		var briAngleO = ((+data.Ori_bri)/ 150 * Math.PI).toFixed(4);
		arcBriOri.endAngle(briAngleO);
		d3.select('#n'+data.Original_id).select('.briArcO')
			.attr('transform', function(data){
				var xx = xPos(data.id); 
				var yy = 10+ imgH*3.5;
				return 'translate('+xx+','+yy+')';
			})
			.attr('d', arcBriOri)
			.transition()
			.attr('opacity', 1)
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
			.attr('opacity', 1)

		d3.select('#n'+data.Original_id).select('.bri_dar')
			.transition()
			.style('font-size', imgH/8+'px')
			.text(function(){
				if((+data.Bri_sub) >1) return 'darker';
				else if((+data.Bri_sub) >= -1) return 'alike';
				else return 'brighter'; 
			})
			.attr('opacity', 1)

		//vivider/duller & brighter/darker  text ends ---//

		//------- legend starts------------------//
		d3.select('#n'+data.Original_id).select('.legend').selectAll('rect')
			.transition()
			.attr('width', imgW/2)
			.attr('height', imgH/5)
			.attr('y', 10 + imgH +imgH + imgH*2.3 - imgH/5)
			.attr('opacity', 1)
		d3.select('#n'+data.Original_id).select('.legend').selectAll('text')
			.transition()
			.attr('y', 10 + imgH +imgH + imgH*2.3 - 5)
			.style('font-size', imgH/8+'px')
			.attr('opacity', 1)
		//------- legend starts------------------//
	}

	function infoBoxOut(){
		//info box background
		infoBoxBack.transition()
			.attr('opacity',0)
			.attr('width', 0)

		//Arcs
		arcSatPicked.startAngle(0).endAngle(0);
		satArcP
			.attr('d', arcSatPicked)
			.transition().attr('opacity',0)

		arcCenter.startAngle(0).endAngle(0)
		satArc
			.attr('d', arcCenter)
			.transition().attr('opacity',0)
			
		arcSatOri.startAngle(0).endAngle(0);
		satArcO
			.attr('d', arcSatOri)
			.transition().attr('opacity',0)

		arcBriPicked.startAngle(0).endAngle(0);
		briArcP
			.attr('opacity',0).attr('d', arcBriPicked)

		briArc
			.attr('d', arcCenter)
			.transition().attr('opacity',0)
			
		arcBriOri.startAngle(0).endAngle(0);
		briArcO
			.attr('d', arcBriOri)
			.transition().attr('opacity',0)

		//vivder, brighter text
		viv_dul.transition().attr('opacity',0).style('font-size', '0px')
		bri_dar.transition().attr('opacity',0).style('font-size', '0px')

		//legend box
		oriBox
			.transition().attr('width', 0).attr('height', 0).attr('opacity',0)
		pickedBox
			.transition().attr('width', 0).attr('height', 0).attr('opacity',0)
		legendOriText
			.transition().style('font-size', '0px').attr('opacity',0)
		legendPicText
			.transition().style('font-size', '0px').attr('opacity',0)
	}
})




