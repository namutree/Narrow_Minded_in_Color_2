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



// mouse over and out check!
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


		})
		.on('mouseout', function(data){
			d3.selectAll('.ImgBox')
				.transition()//.duration(100)
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
		})


})
















