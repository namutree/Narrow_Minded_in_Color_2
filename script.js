var w = screen.width;
	h= 800,
	imgW = 114,
	imgH = 86;
var sSub =[],
	bSub =[];
var male =0,
	female =0;
var statData=[];
console.log(w);

//id,Original_id,Sel_r,Sel_g,Sel_b,sex,Ori_r,Ori_g,Ori_b,Sel_hue,Sel_sat,Sel_bri,Ori_hue,Ori_sat,Ori_bri,Bri_sub, bri_sub_order,Sat_sub,sat_sub_order
d3.csv("data_final_3.csv", function(error, data){
	var n = data.length;
	//console.log(n);
	var imgSmW = Math.floor((w-imgW*2)/n);
	if (imgSmW < 2) imgSmW =2;
	else if (imgSmW > 6) imgSmW = 6;
	console.log(imgSmW, (w)/n);

	if (error) throw error;
	data.forEach(function(d){
		sSub.push(+d.Sat_sub);
		bSub.push(+d.Bri_sub);
		
		if (d.sex ==1) male ++;
		else female ++;

		statData.push([d.id, d.sex, d.Sat_sub, d.Bri_sub]);

    });

	var xPos = d3.scale.linear()
    	.domain([0, +n-1])
    	.range([0 +imgW/2 , w- imgW/2])


    //creating uppest level svg
  	var uppest = d3.select('#chart').append('svg')
		.style('background', 'rgb(0,0,0)')
		.attr('width', w)
		.attr('height', h)

	// for each collumn
	var eachCollum = uppest.append('g').attr('id','pictures')
		.selectAll('g').data(data)
		.enter().append('g')
			.attr('id', function(d){
				return 'n'+d.id;
			})
			.attr('class', 'rects')

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
			.append('image')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', imgW)
			.attr('height', imgH)
			.attr('xlink:href', function(d){
				var pic = (d.Original_id);
				return 'data/images/'+pic+'.jpg';
			})

	var patternRect = eachCollum.append('rect')
		.attr('class', 'ImgBox')
		.attr('width', imgSmW)
		.attr('height', imgH)
		.attr('x', function(d){
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
		.attr('class', 'oriColor')
		.attr('width', imgSmW)
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
			// return 'rgb(255,0,0)'
		})
//------------- Original Color Box ends--------------------------//
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
//------------- Picked Color Box starts--------------------------//
	var pickedColor = eachCollum.append('rect')
		.attr('class', 'pickedColor')
		.attr('width', imgSmW)
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
			// return 'rgb(255,0,0)'
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
		.attr('d', arcSatPicked)
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

////////////////////////////////////////////////////////////////////////////
//------------- "Mouse over and out" starts-------------------------------//
	d3.selectAll('.rects')
		.on("mouseover", function(data){
			//img location
			d3.selectAll('.ImgBox')
				.transition()
				.attr('x', function(d){
					if (+d.id > +data.id) {
						return xPos(+d.id) + imgW/2-imgSmW;
					}else if (+d.id < +data.id) {
						return xPos(+d.id) - imgW/2;
					}
					else {
						return xPos(+d.id)- imgW/2;
					}
				})
			d3.selectAll('pattern')
				.transition()
				.attr('x', function(d){
					if (+d.id == +data.id) {
						return xPos(+data.id)- imgW/2;
					}
					else {
						return xPos(+d.id) - imgW;
					}
				})
	
			//image size
			d3.select('#n'+data.id).select('rect')
				// .transition().duration(100)
				.attr('width', imgW);


			//original color
			d3.selectAll('.oriColor')
				.transition()	
				.attr('width', function(d){
					if (+d.id == +data.id) {
						return imgW;
					}
					else {
						return imgSmW;
					}
				})
				.attr('x', function(d){
					if (+d.id > +data.id) {
						return xPos(+d.id) + imgW/2-imgSmW;
					}else if (+d.id < +data.id) {
						return xPos(+d.id) - imgW/2;
					}
					else {
						return xPos(+d.id) - imgW/2;
					}
				})

			//picked color
			d3.selectAll('.pickedColor')
				.transition()	
				.attr('width', function(d){
					if (+d.id == +data.id) 	return imgW;
					else 					return imgSmW;
					
				})
				.attr('x', function(d){
					if (+d.id > +data.id) {
						return xPos(+d.id) + imgW/2-imgSmW;
					}else if (+d.id < +data.id) {
						return xPos(+d.id) - imgW/2;
					}
					else {
						return xPos(+d.id) - imgW/2;
					}
				})
			
			// text
			d3.select('#n'+data.id).select('.oriText')
				.attr('x', function(data){	return xPos(+data.id);  })
				.transition()
				.style('font-size', imgH/4+'px')
				.attr('opacity', 1)
			d3.select('#n'+data.id).select('.pickedText')
				.attr('x', function(data){	return xPos(+data.id);  })
				.transition()
				.style('font-size', imgH/4+'px')
				.attr('opacity', 1)

			// --------- infoBox starts ------------------//
			//infobox background
			d3.select('#n'+data.id).select('.infoBoxBack')
				.attr('x', function(data){	return xPos(+data.id) - imgW/2;  })
				.attr('width', imgW)
				.attr('height', imgH*2.3)
				.transition()
				.attr('opacity', 1)
			//----saturation arc series starts----------------//
			var satAngleP = ((+data.Sel_sat)/ 80 * Math.PI).toFixed(4);
			console.log(satAngleP);
			arcSatPicked.endAngle(satAngleP);
			d3.select('#n'+data.id).select('.satArcP')
				.transition()
				.attr('transform', function(data){
					var xx = xPos(data.id); 
					var yy = 10+ imgH*2.5;
					return 'translate('+xx+','+yy+')';
				})
				.attr('d', arcSatPicked)
				.attr('opacity', 1)

			arcCenter.endAngle((Math.PI*2).toFixed(4));
			d3.select('#n'+data.id).select('.satArc')
				.transition()
				.attr('transform', function(data){
					var xx = xPos(data.id); 
					var yy = 10+ imgH*2.5;
					return 'translate('+xx+','+yy+')';
				})
				.attr('d', arcCenter)
				.attr('opacity', 1)

			var satAngleO = ((+data.Ori_sat)/ 80 * Math.PI).toFixed(4);
			arcSatOri.endAngle(satAngleO);
			d3.select('#n'+data.id).select('.satArcO')
				.transition()
				.attr('transform', function(data){
					var xx = xPos(data.id); 
					var yy = 10+ imgH*2.5;
					return 'translate('+xx+','+yy+')';
				})
				.attr('d', arcSatOri)
				.attr('opacity', 1)
			//----saturation arc series ends----------------//
			
			//----brightness arc series starts----------------//
			var briAngleP = ((+data.Sel_bri)/ 150 * Math.PI).toFixed(4);
			arcBriPicked.endAngle(briAngleP);
			d3.select('#n'+data.id).select('.briArcP')
				.transition()
				.attr('transform', function(data){
					var xx = xPos(data.id); 
					var yy = 10+ imgH*3.5;
					return 'translate('+xx+','+yy+')';
				})
				.attr('d', arcBriPicked)
				.attr('opacity', 1)

			d3.select('#n'+data.id).select('.briArc')
				.transition()
				.attr('transform', function(data){
					var xx = xPos(data.id); 
					var yy = 10+ imgH*3.5;
					return 'translate('+xx+','+yy+')';
				})
				.attr('d', arcCenter)
				.attr('opacity', 1)

			var briAngleO = ((+data.Ori_bri)/ 150 * Math.PI).toFixed(4);
			console.log(data.Ori_bri)
			console.log(briAngleO);
			arcBriOri.endAngle(briAngleO);
			d3.select('#n'+data.id).select('.briArcO')
				.transition()
				.attr('transform', function(data){
					var xx = xPos(data.id); 
					var yy = 10+ imgH*3.5;
					return 'translate('+xx+','+yy+')';
				})
				.attr('d', arcBriOri)
				.attr('opacity', 1)
			//----brightness arc series ends----------------//
//id,Original_id,Sel_r,Sel_g,Sel_b,sex,Ori_r,Ori_g,Ori_b,Sel_hue,Sel_sat,Sel_bri,Ori_hue,Ori_sat,Ori_bri,Bri_sub, bri_sub_order,Sat_sub,sat_sub_order
			//vivider/duller & brighter/darker  text starts ---//
			d3.select('#n'+data.id).select('.viv_dul')
				.style('font-size', imgH/8+'px')
				.text(function(data){
					if((+data.Sat_sub) >0) return 'duller';
					else if((+data.Sat_sub) == 0) return 'same';
					else return 'vivider'; 
				})
				.attr('opacity', 1)

			d3.select('#n'+data.id).select('.bri_dar')
				.style('font-size', imgH/8+'px')
				.text(function(){
					if((+data.Bri_sub) >0) return 'darker';
					else if((+data.Bri_sub) == 0) return 'same';
					else return 'brighter'; 
				})
				.attr('opacity', 1)

			//vivider/duller & brighter/darker  text ends ---//

	// //vivider/duller & brighter/darker  text
	// var viv_dul = infoBox.append('text').attr('class', 'viv_dul')
	// 	.attr('x', function(d){	return xPos(+d.id);  })
	// 	.attr('y', 10+ imgH*2.5)
	// 	.attr('opacity',0).style('font-size', '0px')
	// var bri_dar = infoBox.append('text').attr('class', 'bri_dar')
	// 	.attr('x', function(d){	return xPos(+d.id);  })
	// 	.attr('y', 10+ imgH*3.5)
	// 	.attr('opacity',0).style('font-size', '0px')

			//------- legend starts------------------//
			d3.select('#n'+data.id).select('.legend').selectAll('rect')
				.transition()
				.attr('width', imgW/2)
				.attr('height', imgH/5)
				.attr('y', 10 + imgH +imgH + imgH*2.3 - imgH/5)
				.attr('opacity', 1)
			d3.select('#n'+data.id).select('.legend').selectAll('text')
				.transition()
				.attr('y', 10 + imgH +imgH + imgH*2.3 - 5)
				.style('font-size', imgH/8+'px')
				.attr('opacity', 1)
			//------- legend starts------------------//


			// --------- infoBox ends ------------------//
		})
		.on('mouseout', function(data){

			viv_dul.attr('opacity',0)
			bri_dar.attr('opacity',0)

			d3.selectAll('.ImgBox')
				.transition()
				.attr('x', function(d){
					return xPos(+d.id);
				})
			
			d3.selectAll('pattern')
				.transition()
				.attr('x', function(d){
					return xPos(+d.id) + imgW/2;
				});

			d3.select(this).select('rect')
			// .transition().duration(100)
				.attr('width', imgSmW);


			d3.selectAll('.oriColor')
				.transition()
				.attr('width', imgSmW)
				.attr('x', function(d){
					return xPos(+d.id);
				})

			d3.selectAll('.pickedColor')
				.transition()
				.attr('width', imgSmW)
				.attr('x', function(d){
					return xPos(+d.id);
				})

			//text original & picked
			textOri.transition()
				.style('font-size', '0px')
				.attr('opacity', 0)
			textPicked.transition()
				.style('font-size', '0px')
				.attr('opacity', 0)

			//info box-----------------//
			//info box background
			infoBoxBack.transition()
				.attr('opacity',0)
				.attr('width', 0)

			//Arcs
			arcSatPicked.endAngle(0);
			satArcP.transition()
				.attr('opacity',0).attr('d', arcSatPicked)

			arcCenter.endAngle(0)
			satArc.transition()
				.attr('opacity', 0).attr('d', arcCenter)
				
			arcSatOri.endAngle(0);
			satArcO.transition()
				.attr('d', arcSatOri).attr('opacity', 0)

			arcBriPicked.endAngle(0);
			briArcP.transition()
				.attr('opacity',0).attr('d', arcBriPicked)

			briArc.transition()
				.attr('opacity', 0).attr('d', arcCenter)
				
			arcBriOri.endAngle(0);
			briArcO.transition()
				.attr('d', arcBriOri).attr('opacity', 0)

			//legend box
			oriBox
				.transition().attr('width', 0).attr('height', 0).attr('opacity',0)
			pickedBox
				.transition().attr('width', 0).attr('height', 0).attr('opacity',0)
			legendOriText
				.transition().style('font-size', '0px').attr('opacity',0)
			legendPicText
				.transition().style('font-size', '0px').attr('opacity',0)
		})
//------------- "Mouse over and out" ends-------------------------------//
///////////////////////////////////////////////////////////////////////////

})
















