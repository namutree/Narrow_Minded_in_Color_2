var w = screen.width;
	h= 800,
	imgW = 114,
	imgH = 86;

var male =0, 
	female =0;

var sData =[];
// console.log(w);

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

var xPos,
	xPosMale,
	xPosFemale;

//id,Original_id,Sel_r,Sel_g,Sel_b,sex,Ori_r,Ori_g,Ori_b,Sel_hue,Sel_sat,Sel_bri,Ori_hue,Ori_sat,Ori_bri,Bri_sub, bri_sub_order,Sat_sub,sat_sub_order
d3.csv("data_final_3.csv", function(error, data){
	var n = data.length;
	// console.log(n);

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
	// console.log('male:', male,' female:', female);

    xPos = d3.scale.ordinal()
        .domain(d3.range(0, sData.length))
        .rangeBands([0 + imgW , w - imgW/2], 0.1)

    xPosMale = d3.scale.ordinal()
    	.domain(d3.range(0, +male))
    	.rangeBands([0 + imgW , w - imgW/2], 0.1)
    xPosFemale = d3.scale.ordinal()
    	.domain(d3.range(0, +female))
    	.rangeBands([0 + imgW , w - imgW/2], 0.1)

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
		allBool = 	 false;
		maleBool = 	 true;
		femaleBool = false;
		sData.sort(function(a,b) {return (+a.sex)-(+b.sex);});
		giveIdNumber();
		reOrder();
		
	})
	d3.select('#female').on("click", function(){
		allBool = 	 false;
		maleBool = 	 false;
		femaleBool = true;
		sData.sort(function(a,b) {return (+b.sex)-(+a.sex);});
		giveIdNumber();
		reOrder();
		
	})
	d3.select('#all').on("click", function(){
		allBool = 	 true;
		maleBool = 	 false;
		femaleBool = false;
		giveIdNumber();
		reOrder();
	})

	function giveIdNumber(){
		var count =0;
		for(var i =0 ; i < sData.length ; i++){
	    	if(allBool)	 sData[i].id = i;

	    	if(maleBool){		    	
		    	if(sData[i].sex == 1 ){
		    		sData[i].id = count;
		    		count++;	
		    	}else sData[i].id = i+200;
	    	}
	    	if(femaleBool){
	    		if(sData[i].sex == 2 ){
		    		sData[i].id = count;
		    		count++;	
		    	}else sData[i].id = i+200;
	    	}
	    }
	}
	function reOrder(){
		//images
		makingPattern.transition()
			.attr('x', function(d){	
				 if(allBool){
					return xPos(+d.id) + imgW/2;
				}else if(maleBool){
					if (d.id < male) return xPosMale(+d.id) + imgW/2;
					else 	return -10;
				}else if(femaleBool){
					if (d.id < female) return xPosFemale(+d.id) + imgW/2;
					else 	return -10;
				}

				})
		patternRect.transition()
			.attr('x', function(d){ 
				if(allBool){
					return xPos(+d.id);
				}else if(maleBool){
					if (d.id < male) return xPosMale(+d.id); 
					else 	return -10;
				}else if(femaleBool){
					if (d.id < female) return xPosFemale(+d.id); 
					else 	return -10;
				}
			})
			.attr('width', function(d){
				if(allBool) {
					return xPos.rangeBand();
				}else if(maleBool) {
					if (d.id < male) return xPosMale.rangeBand();
					else return 0; 
				}else if(femaleBool){
					if (d.id < female) return xPosFemale.rangeBand();
					else return 0;
				}
			} )

		//oricolor
		oriColor.transition()
			.attr('x', function(d){ 
				if(allBool) {
					return xPos(+d.id);
				}else if(maleBool){
					if (d.id < male) return xPosMale(+d.id); 
					else 	return -10;
				}else if(femaleBool){
					if (d.id < female) return xPosFemale(+d.id); 
					else 	return -10;
				}
			})
			.attr('width', function(d){ 
				if(allBool) {
					return xPos.rangeBand();
				}else if(maleBool){
					if (d.id < male) return xPosMale.rangeBand(); 
					else 	return 0;
				}else if(femaleBool){
					if (d.id < female) return xPosFemale.rangeBand(); 
					else 	return 0;
				}
			})
		//picked color
		pickedColor.transition()
			.attr('x', function(d){ 
				if(allBool){
					return xPos(+d.id); 
				}else if(maleBool){
					if (d.id < male) return xPosMale(+d.id); 
					else 	return -10;
				}else if(femaleBool){
					if (d.id < female) return xPosFemale(+d.id); 
					else 	return -10;
				}
			})
			.attr('width', function(d){ 
				if(allBool) {
					return xPos.rangeBand();
				}else if(maleBool){
					if (d.id < male) return xPosMale.rangeBand(); 
					else 	return 0;
				}else if(femaleBool){
					if (d.id < female) return xPosFemale.rangeBand(); 
					else 	return 0;
				}
			})


		infoBox
			.attr('transform', function(d){
				var xxx,
					yyy;
				yyy = 10 + imgH +imgH;
				if(allBool){
					xxx = xPos(+d.id) - imgW/2;	
				}else if(maleBool){
					if (d.id < male) xxx = xPosMale(+d.id) - imgW/2;
					else xxx = -100;
				}else if(femaleBool){
					if (d.id < female) xxx = xPosFemale(+d.id) - imgW/2;
					else xxx = -100
				}
				return 'translate('+xxx+','+yyy+')';
			} )

		//color graph 
		color_graph1_c
			.attr('opacity', function(d){
				if(allBool){
					return 0.4;
				}else if(maleBool){
					if(d.sex == 1) return 0.4;
					else return 0;
				}else if(femaleBool){
					if(d.sex == 2) return 0.4;
					else return 0;
				}
			})
		color_graph2_c
			.attr('opacity', function(d){
				if(allBool){
					return 0.4;
				}else if(maleBool){
					if(d.sex == 1) return 0.4;
					else return 0;
				}else if(femaleBool){
					if(d.sex == 2) return 0.4;
					else return 0;
				}
			}) 

		sub_graph_c
			.attr('opacity', function(d){
				if(allBool){
					return 0.4;
				}else if(maleBool){
					if(d.sex == 1) return 0.4;
					else return 0;
				}else if(femaleBool){
					if(d.sex == 2) return 0.4;
					else return 0;
				}
			})
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

	// main(sData); //????? do I have to do this??

// function main(mainData){
//////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------creating each column starts--------------------------------------------//
	// for each collumn
	eachCollum = uppest.append('g').attr('id','pictures')
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
				return 'data/image/'+pic+'.jpg';
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
	var graph = uppest.append('g')
		.attr('id','graph')
		.attr('transform','translate('+w/25+','+h/2+')')
	var graphW = w/5,
		graphH = h/3;
	var graphX_color = d3.scale.linear()
		.domain([0, 60])
		.range([0,graphW]);
	var graphY_color = d3.scale.linear()
		.domain([40, 100])
		.range([graphH,0]);


	// color graph!!
	var color_graph1 = graph.append('g').attr('transform','translate(0,0)')
	var color_graph2 = graph.append('g').attr('transform','translate(0,0)')
	var color_graph1_c = color_graph1.selectAll('circle').data(sData)
		.enter().append('circle')
			.attr('id', function(d){
				return 'sel'+d.Original_id;
			})
			.attr('cx', function(d){
				return graphX_color(d.Sel_sat/255*100);
			})
			.attr('cy', function(d){
				return graphY_color(d.Sel_bri/255*100);
			})
			.attr('r', 4)
			.attr('fill', function(d){
				if(d.sex==1) return 'rgb(52,188,255)';
				if(d.sex==2) return 'rgb(231,87,85)';
			})
			.attr('opacity', 0.4)

	var color_graph2_c = color_graph2.selectAll('circle').data(sData)
		.enter().append('circle')
			.attr('id', function(d){
				return 'ori'+d.Original_id;
			})
			.attr('cx', function(d){
				return graphX_color(d.Ori_sat/255*100);
			})
			.attr('cy', function(d){
				return graphY_color(d.Ori_bri/255*100);
			})
			.attr('r', 4)
			.attr('fill', function(d){
				if(d.sex==1) return 'rgb(52,188,255)';
				if(d.sex==2) return 'rgb(231,87,85)';
			})
			.attr('opacity', 0.4)

	var sel_graph  = color_graph2.append('g')
	var sel_graphC = sel_graph.append('circle')
		.attr('opacity', 0)
	var sel_graphC2 = sel_graph.append('circle')
		.attr('opacity', 0)
	var sel_graphL = sel_graph.append('polyline')
		.attr('opacity', 0)
	var sel_graphT = sel_graph.append('text')
		.attr('class', 'graph_legendT')
		.attr('opacity', 0)

	var ori_graph  = color_graph2.append('g')
	var ori_graphC = ori_graph.append('circle')
		.attr('opacity', 0)
	var ori_graphC2 = ori_graph.append('circle')
		.attr('opacity', 0)
	var ori_graphL = ori_graph.append('polyline')
		.attr('opacity', 0)
	var ori_graphT = ori_graph.append('text')
		.attr('class', 'graph_legendT')
		.attr('opacity', 0)	

	var yAxis_CG = d3.svg.axis()
		.scale(graphY_color)
		.orient('left')
		.ticks(3)

	var yGuide_CG = color_graph1.append('g')
		yAxis_CG(yGuide_CG)
		yGuide_CG.selectAll('path')
			.style({fill:'none', stroke:'#cccccc'})
		yGuide_CG.selectAll('line')
			.style({stroke:'#cccccc'})
		yGuide_CG.selectAll('text').attr('class', 'tick_text')
			.style({fill:'white'})

	var xAxis_CG = d3.svg.axis()
		.scale(graphX_color)
		.orient('bottom')
		.ticks(3)
	var xGuide_CG = color_graph1.append('g')
		xAxis_CG(xGuide_CG)
		xGuide_CG.attr('transform','translate(0,'+graphH+')')
		xGuide_CG.selectAll('path')
			.style({fill: 'none', stroke: '#cccccc'})
		xGuide_CG.selectAll('line')
			.style({stroke: '#cccccc'})
		xGuide_CG.selectAll('text').attr('class', 'tick_text')
			.style({fill:'white'})

	color_graph1.append('text')
		.attr('class', 'graphText')
		.attr('transform','translate(5,'+(graphH+3)+')')
		.text('Saturation')
	color_graph1.append('text')
		.attr('class', 'graphText2')
		.attr('transform','translate(-3,'+(graphH-5)+')rotate(90)')
		.text('Brightness')

	// subtraction graph
	var graphX_sub = d3.scale.linear()
		.domain([-80,80])
		.range([graphW, 0]);
	var graphY_sub = d3.scale.linear()
		.domain([-80, 80])
		.range([0,graphH]);

	var sub_graph = graph.append('g').attr('transform','translate('+(w*6/25)+',0)')

	var sub_graphL_X = sub_graph.append('polyline') 
		.attr('points', '0,'+graphH/2+' '+graphW+','+graphH/2)
				.attr('fill', 'none')
				.attr('stroke', '#cccccc')
	var sub_graphL_Y = sub_graph.append('polyline') 
		.attr('points', graphW/2+',0'+' '+graphW/2+','+graphH)
				.attr('fill', 'none')
				.attr('stroke', '#cccccc')
	var sub_graph_T = sub_graph.append('g').attr('class','graphText')
	sub_graph_T.append('text')
		.text('Vivider')
		.attr('transform', 'translate('+(graphW+2)+','+graphH/2+')')
		.style('dominant-baseline', 'central')
	sub_graph_T.append('text')
		.text('Duller')
		.attr('transform', 'translate('+(-2)+','+graphH/2+')')
		.style('dominant-baseline', 'central')
		.style('text-anchor', 'end')
	sub_graph_T.append('text')
		.text('Brighter')
		.attr('transform', 'translate('+(graphW/2)+','+(-8)+')')
		.style('dominant-baseline', 'central')
		.style('text-anchor', 'middle')
	sub_graph_T.append('text')
		.text('Darker')
		.attr('transform', 'translate('+(graphW/2)+','+(graphH+8)+')')
		.style('dominant-baseline', 'central')
		.style('text-anchor', 'middle')


	var sub_graph_c = sub_graph.selectAll('circle').data(sData)
		.enter().append('circle')
		.attr('cx', function(d){
			return graphX_sub(+d.Sat_sub);
		})
		.attr('cy', function(d){
			return graphY_sub(+d.Bri_sub);
		})
		.attr('r', 4)
		.attr('fill', function(d){
			if(d.sex==1) return 'rgb(52,188,255)';
			if(d.sex==2) return 'rgb(231,87,85)';
		})
		.attr('opacity', 0.4)

	var sub_graph_indexC = sub_graph.append('circle')
		.attr('r', 4)
		.attr('opacity', 0)

	//PIE Chart//
	var m_brighter=0, m_bri_alike=0, m_darker=0,
		m_vivider=0,  m_sat_alike=0, m_duller=0,
		f_brighter=0, f_bri_alike=0, f_darker=0,
		f_vivider=0,  f_sat_alike=0, f_duller=0;

	for(var i=0 ; i <sData.length ; i++){
		
		if((sData[i].Sat_sub) >1) {
			if(sData[i].sex ==1) m_duller++;
			else f_duller++;
		}else if((sData[i].Sat_sub) >= -1) {
			if(sData[i].sex ==1) m_sat_alike++;
			else f_sat_alike++;
		}else {
			if(sData[i].sex ==1) m_vivider++;
			else f_vivider++;
		}
		if((sData[i].Bri_sub) >1) {
			if(sData[i].sex ==1) m_darker++;
			else f_darker++;
		}else if((sData[i].Bri_sub) >= -1){
			if(sData[i].sex ==1) m_bri_alike++;
			else f_bri_alike++;	
		}else {
			if(sData[i].sex ==1) m_brighter++;
			else f_brighter++;
		}  
	}

	var m_brightness = [m_brighter, m_bri_alike, m_darker];
	var f_brightness = [f_brighter, f_bri_alike, f_darker];
	var m_saturation = [m_vivider,  m_sat_alike, m_duller];
	var f_saturation = [f_vivider,  f_sat_alike, f_duller];
	
	var pie = d3.layout.pie()
	    .value(function(da) {
	        return da;
	    }).sort(null)
	var colorsM = d3.scale.ordinal()
        .range(['#8be3ff', '#1a93c7', '#1cb4ff'])
   	var colorsF = d3.scale.ordinal()
        .range([ '#e37f7e', '#b84340', '#e5504b'])

	var maleRaius = w/12;

	var arcM = d3.svg.arc()
	    .outerRadius(maleRaius)
	    .innerRadius(maleRaius-w/60)

   	var arcF = d3.svg.arc()
	    .outerRadius(maleRaius- (w/60-1) )
	    .innerRadius(maleRaius- (w/60*2) )

	var arcGraph = graph.append('g').attr('id', 'arcGraph');

	var bri_arcM = arcGraph.append('g').attr('transform', 'translate('+(w*29/50)+','+graphH/2+')rotate(-45)')
		.selectAll('path').data(pie(m_brightness))
		.enter().append('g')
	var bri_arcMM = bri_arcM.append('path')
		.attr('fill', function(d, i) {
			// console.log(d)
            return colorsM(i);
        })
		.attr('d', arcM)
		.attr('class','man')
		.attr('id', function(d,i){
			return 'bri'+i;
		})

	var bri_arcF = arcGraph.append('g').attr('transform', 'translate('+(w*29/50)+','+graphH/2+')rotate(-45)')
		.selectAll('path').data(pie(f_brightness))
		.enter().append('g')
	bri_arcF.append('path')
		.attr('fill', function(d, i) {
            // console.log(d)
            return colorsF(i);
        })
		.attr('d', arcF)
		.attr('class','wo')
		.attr('id', function(d,i){
			return 'briF'+i;
		})


	var bri_arcT = arcGraph.append('text')
		.attr('class','arcGraphT')
		.attr('transform', 'translate('+(w*29/50)+','+graphH/2+')')
		.text('Brightness')
	var bri_artT1 = arcGraph.append('text')
		.attr('class','arcGraphT')
		.attr('transform', 'translate('+(w*29/50)+','+(graphH/2-20)+')')
	var bri_artT2 = arcGraph.append('text')
		.attr('class','arcGraphT')
		.attr('transform', 'translate('+(w*29/50)+','+(graphH/2+20)+')')

	var sat_arcM = arcGraph.append('g').attr('transform', 'translate('+(w*41/50)+','+graphH/2+')rotate(-45)')
		.selectAll('path').data(pie(m_saturation))
		.enter().append('g')
	sat_arcM.append('path')
		.attr('fill', function(d, i) {
            return colorsM(i);
        })
		.attr('d', arcM)
		.attr('class','man')
		.attr('id', function(d,i){
			return 'sat'+i;
		})

	var sat_arcF = arcGraph.append('g').attr('transform', 'translate('+(w*41/50)+','+graphH/2+')rotate(-45)')
		.selectAll('path').data(pie(f_saturation))
		.enter().append('g')
	sat_arcF.append('path')
		.attr('fill', function(d, i) {
            return colorsF(i);
        })
		.attr('d', arcF)
		.attr('class','wo')
		.attr('id', function(d,i){
			return 'satF'+i;
		})
	var sat_arcT = arcGraph.append('text')
		.attr('class','arcGraphT')
		.attr('transform', 'translate('+(w*41/50)+','+graphH/2+')')
		.text('Saturation')
	var sat_artT1 = arcGraph.append('text')
		.attr('class','arcGraphT')
		.attr('transform', 'translate('+(w*41/50)+','+(graphH/2-20)+')')
	var sat_artT2 = arcGraph.append('text')
		.attr('class','arcGraphT')
		.attr('transform', 'translate('+(w*41/50)+','+(graphH/2+20)+')')
//------------- graph ends --------------------------------------//
///////////////////////////////////////////////////////////////////

// }

// graph on////////


var cl, idd;
d3.select('#graph').selectAll('path')
	.on("mouseover", function(datum){
	
		// console.log(datum)

		cl = d3.select(this).attr('class');
		idd = d3.select(this).attr('id') 
		
			if (idd == 'sat0') {
				sat_artT1.text('male').transition().attr('opacity', 1)
				sat_arcT.text('Vivider') 	
				sat_artT2.text( Math.round(43/male*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#c4f3ff')
			} else if (idd == 'sat1') {
				sat_artT1.text('male').transition().attr('opacity', 1)
				sat_arcT.text('Alike'); 	
				sat_artT2.text( Math.round(11/male*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#58abc6')
			}else if (idd == 'sat2') {
				sat_artT1.text('male').transition().attr('opacity', 1)
				sat_arcT.text('Duller');
				sat_artT2.text( Math.round(42/male*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#70d5ff')
			}
			
			if (idd == 'satF0'){
				sat_artT1.text('female').transition().attr('opacity', 1)
				sat_arcT.text('Vivider') 
				sat_artT2.text( Math.round(42/female*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#dfadac')
			}
			else if (idd == 'satF1'){
				sat_artT1.text('female').transition().attr('opacity', 1)
				sat_arcT.text('Alike'); 	
				sat_artT2.text( Math.round(8/female*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#b56766')
			}
			else if (idd == 'satF2'){
				sat_artT1.text('female').transition().attr('opacity', 1)
				sat_arcT.text('Duller');
				sat_artT2.text( Math.round(42/female*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#e37f7e')
			}

			if (idd == 'bri0'){
				bri_artT1.text('male').transition().attr('opacity', 1)
				bri_arcT.text('Brighter') 
				bri_artT2.text( Math.round(66/male*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#c4f3ff')
			}
			else if (idd == 'bri1'){
				bri_artT1.text('male').transition().attr('opacity', 1)
				bri_arcT.text('Alike'); 	
				bri_artT2.text( Math.round(5/male*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#58abc6')
			}
			else if (idd == 'bri2'){
				bri_artT1.text('male').transition().attr('opacity', 1)
				bri_arcT.text('Darker');
				bri_artT2.text( Math.round(25/male*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#70d5ff')
			}

			if (idd == 'briF0'){
				bri_artT1.text('female').transition().attr('opacity', 1)
				bri_arcT.text('Brighter') 
				bri_artT2.text( Math.round(67/female*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#dfadac')
			}
			else if (idd == 'briF1'){
				bri_artT1.text('female').transition().attr('opacity', 1)
				bri_arcT.text('Alike'); 	
				bri_artT2.text( Math.round(7/female*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#b56766')
			}
			else if (idd == 'briF2'){
				bri_artT1.text('female').transition().attr('opacity', 1)
				bri_arcT.text('Darker');
				bri_artT2.text( Math.round(18/female*1000)/10+'%').transition().attr('opacity', 1);
				d3.select('#'+idd).transition().attr('fill', '#e37f7e')
			}
	})
	.on('mouseout', function(datum){
		sat_arcT.text('Saturation')
		sat_artT1.transition().attr('opacity',0)
		sat_artT2.transition().attr('opacity',0)

		bri_arcT.text('Brightness')
		bri_artT1.transition().attr('opacity',0)
		bri_artT2.transition().attr('opacity',0)
		//blue original color #8be3ff, #1a93c7, #1cb4ff
		//red original color #e37f7e, #b84340, #e5504b

		if (idd == 'sat0') {
			d3.select('#'+idd).transition().attr('fill', '#8be3ff')
		} else if (idd == 'sat1') {
			d3.select('#'+idd).transition().attr('fill', '#1a93c7')
		}else if (idd == 'sat2') {
			d3.select('#'+idd).transition().attr('fill', '#1cb4ff')
		}
		if (idd == 'satF0'){
			d3.select('#'+idd).transition().attr('fill', '#e37f7e')
		}
		else if (idd == 'satF1'){
			d3.select('#'+idd).transition().attr('fill', '#b84340')
		}
		else if (idd == 'satF2'){
			d3.select('#'+idd).transition().attr('fill', '#e5504b')
		}
		if (idd == 'bri0') {
			d3.select('#'+idd).transition().attr('fill', '#8be3ff')
		} else if (idd == 'bri1') {
			d3.select('#'+idd).transition().attr('fill', '#1a93c7')
		}else if (idd == 'bri2') {
			d3.select('#'+idd).transition().attr('fill', '#1cb4ff')
		}
		if (idd == 'briF0'){
			d3.select('#'+idd).transition().attr('fill', '#e37f7e')
		}
		else if (idd == 'briF1'){
			d3.select('#'+idd).transition().attr('fill', '#b84340')
		}
		else if (idd == 'briF2'){
			d3.select('#'+idd).transition().attr('fill', '#e5504b')
		}

	})
	// .on('mousemove', function () {
	    
	//    var coordinates = [0, 0];
	// 	coordinates = d3.mouse(this);
	// 	var x = coordinates[0];
	// 	var y = coordinates[1];
	// 	console.log(x, y)
	// 	var dist = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) );
	// 	var theta = Math.atan(Math.abs(y/x));
	// 	var an = Math.PI/4;
	// 	var dx = dist*Math.cos(theta+an);
	// 	var dy = dist*Math.sin(theta+an);
	// 	arc_legend.attr('transform','translate('+(w*41/50+x+dx)+','+(graphH/2+y+dy ) +')') 
	// })

// /////////////////

///////////////////////////////////////////////////////////////////
//------------- "Mouse over and out" starts----------------------//
	d3.selectAll('.rects')
		.on("mouseover", function(data){
			// console.log(data.Original_id);
			frontIndexBoxOver();

			imgOver(data);
			oriBoxOver(data);
			picBoxOver(data);
			textInBoxOver(data);
				
			infoBoxOver(data);

			// console.log(data)

			color_graph1_c.transition()
				.attr('fill', '#555555')
			color_graph2_c.transition()
				.attr('fill', '#555555')

			var selX = graphX_color(data.Sel_sat/255*100),
				selY = graphY_color(data.Sel_bri/255*100);
			var oriX = graphX_color(data.Ori_sat/255*100),
				oriY = graphY_color(data.Ori_bri/255*100);

			sel_graphC
				.attr('cx', function(){
					return selX;
				})
				.attr('cy', function(){
					return selY;
				})
				.attr('r', 4)
				.transition()
				.attr('opacity', 1)
				.attr('fill', function(){
					return 'rgb('+data.Sel_r+','+data.Sel_g+','+data.Sel_b+')';
				})
			sel_graphC2
				.attr('cx', function(){
					return selX;
				})
				.attr('cy', function(){
					return selY;
				})
				.attr('r', 6)
				.transition()
				.attr('opacity', 1)
				.attr('fill', 'none')
				.attr('stroke', 'white')
			ori_graphC
				.attr('cx', function(){
					return oriX;
				})
				.attr('cy', function(){
					return oriY;
				})
				.attr('r', 4)
				.transition()
				.attr('opacity', 1)
				.attr('fill', function(){
					return 'rgb('+data.Ori_r+','+data.Ori_g+','+data.Ori_b+')';
				})
			ori_graphC2
				.attr('cx', function(){
					return oriX;
				})
				.attr('cy', function(){
					return oriY;
				})
				.attr('r', 6)
				.transition()
				.attr('opacity', 1)
				.attr('fill', 'none')
				.attr('stroke', 'white')

			var pie = Math.sin( Math.PI / 4);
			var pieX = pie,
				pieY = pie,
				extendX = 45;
			sel_graphL
				.attr('points', function(){
					
					if( selX < oriX ) {pieX = -pieX; extendX= -extendX;}
					if( selY < oriY ) pieY = - pieY;

					return (selX + pieX*6)+','+(selY + pieY*6)+' '+(selX + pieX*24)+','+(selY + pieY*24)+' '+(selX + pieX*24+extendX)+','+(selY + pieY*24);
				})
				.attr('fill', 'none')
				.attr('stroke', 'white')
				.transition()
				.attr('opacity', 1)
			sel_graphT
				.text('Picked')
				.attr('x',selX + pieX*24+extendX/2)
				.attr('y',selY + pieY*24)
				.transition()
				.attr('opacity', 1)

			ori_graphL
				.attr('points', function(){
					return (oriX - pieX*6)+','+(oriY - pieY*6)+' '+(oriX - pieX*24)+','+(oriY - pieY*24)+' '+(oriX - pieX*24-extendX)+','+(oriY - pieY*24);
				})
				.attr('fill', 'none')
				.attr('stroke', 'white')
				.transition()
				.attr('opacity', 1)
			ori_graphT
				.text('Original')
				.attr('x',oriX - pieX*24-extendX/2)
				.attr('y',oriY - pieY*24)
				.transition()
				.attr('opacity', 1)

		//subtraction graph
		sub_graph_c
			.transition()
			.duration(400)
			.ease("linear")
			.attr('r',3)
			.attr('opacity', function(d){

				if(allBool){
					return 0.3;
				}else if(maleBool){
					if(d.sex == 1) return 0.3;
					else return 0;
				}else if(femaleBool){
					if(d.sex == 2) return 0.3;
					else return 0;
				}	
			})

		sub_graph_indexC
			.attr('cx', graphX_sub(data.Sat_sub))
			.attr('cy', graphY_sub(data.Bri_sub))
			.attr('fill', function(d){
				if(data.sex==1) return 'rgb(52,188,255)';
				if(data.sex==2) return 'rgb(231,87,85)';
			})
			.transition()
			.duration(400)
			.ease("linear")
			.attr('r', 6)
			.attr('opacity', 1)

			
		})
		.on('mouseout', function(data){
			frontIndexBoxOut();

			imgOut();
			oriBoxOut();
			picBoxOut();	
			textInBoxOut();

			infoBoxOut();
			

			color_graph1_c.transition()
				.attr('fill', function(d){
					if(d.sex==1) return 'rgb(52,188,255)';
					if(d.sex==2) return 'rgb(231,87,85)';
				})
			color_graph2_c.transition()
				.attr('fill', function(d){
					if(d.sex==1) return 'rgb(52,188,255)';
					if(d.sex==2) return 'rgb(231,87,85)';
				})

			sel_graphC.transition()
				.attr('opacity',0)
			sel_graphC2.transition()
				.attr('opacity',0)
			ori_graphC.transition()
				.attr('opacity',0)
			ori_graphC2.transition()
				.attr('opacity',0)
			sel_graphL.transition()
				.attr('opacity',0)
			sel_graphT.transition()
				.attr('opacity',0)
			ori_graphL.transition()
				.attr('opacity',0)
			ori_graphT.transition()
				.attr('opacity',0)

			sub_graph_c.transition()
				.duration(400)
				.ease("linear")
				.attr('r',4)
				.attr('opacity', function(d){
				if(allBool){
					return 0.4;
				}else if(maleBool){
					if(d.sex == 1) return 0.4;
					else return 0;
				}else if(femaleBool){
					if(d.sex == 2) return 0.4;
					else return 0;
				}	
			})

			sub_graph_indexC.transition()
				.duration(400)
				.ease("linear")
				.attr('opacity', 0)
		})
//------------- "Mouse over and out" ends-------------------------------//
///////////////////////////////////////////////////////////////////////////

})

