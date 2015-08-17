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

var xPos,
	xPosMale,
	xPosFemale;

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
  //   	allBool = 	 false;
		// maleBool = 	 true;
		// femaleBool = false;
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
	var graph = uppest.append('g')
		.attr('id','graph')
		.attr('transform','translate('+imgW+','+h/2+')')
	var graphW = w/5,
		graphH = h/3;
	var graphX_color = d3.scale.linear()
		.domain([0, 60])
		.range([0,graphW]);
	var graphY_color = d3.scale.linear()
		.domain([40, 100])
		.range([graphH,0]);
	var graphX_sub = d3.scale.linear()
		.domain([-255, 255])
		.range([0,graphW]);
	var graphY_sub = d3.scale.linear()
		.domain([-255, 255])
		.range([0,graphH]);


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
		.attr('opacity', 0)

	var ori_graph  = color_graph2.append('g')
	var ori_graphC = ori_graph.append('circle')
		.attr('opacity', 0)
	var ori_graphC2 = ori_graph.append('circle')
		.attr('opacity', 0)
	var ori_graphL = ori_graph.append('polyline')
		.attr('opacity', 0)
	var ori_graphT = ori_graph.append('text')
		.attr('opacity', 0)	

	var yAxis_CG = d3.svg.axis()
		.scale(graphY_color)
		.orient('left')
		.ticks(3)

	var yGuide_CG = color_graph1.append('g')
		yAxis_CG(yGuide_CG)
		yGuide_CG.selectAll('path')
			.style({fill:'none', stroke:'white'})
		yGuide_CG.selectAll('line')
			.style({stroke:'white'})
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
			.style({fill: 'none', stroke: 'white'})
		xGuide_CG.selectAll('line')
			.style({stroke: 'white'})
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







	var sub_graph
//------------- graph ends --------------------------------------//
///////////////////////////////////////////////////////////////////

// }

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
				.attr('fill', 'grey')
			color_graph2_c.transition()
				.attr('fill', 'grey')

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
			sel_graphL
				.attr('points', function(){
					var pie = Math.sin(Math.PI / 4);
					return (selX + pie*6)+','+(selY + pie*6)+' '+(selX + pie*24)+','+(selY + pie*24)+' '+(selX + pie*24+45)+','+(selY + pie*24);
				})
				.attr('opacity', 1)
				.attr('fill', 'none')
				.attr('stroke', 'white')
			// sel_graphT
				

			
// frontIndex.append('polyline').attr('class','frontIndexL')
// 		.attr('points', '5,0 0,0 0,'+(imgH*5/6-2)+' 5,'+(imgH*5/6-2))
// 		.attr('transform','translate('+FI_X1+','+FI_Y+')')	

			
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
		})
//------------- "Mouse over and out" ends-------------------------------//
///////////////////////////////////////////////////////////////////////////

})








