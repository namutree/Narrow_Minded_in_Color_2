var w = screen.width;
	h= 800,
	imgW = 64,
	imgH = 48;
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
		.style('background', 'rgb(230,230,230)')
		.attr('width', w)
		.attr('height', h)


	var eachRow = uppest.append('g').attr('id','colorRects')
		.selectAll('g').data(data)
		.enter().append('g')
			.attr('id', function(d){
				return 'n'+d.id;
			})
			.attr('class', 'rects')

	//crop images --> "http://bl.ocks.org/tonyfast/5b462f9545dacbe61b37"
	var test2 = eachRow.append('defs')
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
				return 'data/image/'+pic+'.jpg';
			})

	var test = eachRow.append('rect')
		.attr('class', 'ImgBox')
		.attr('width', imgSmW)
		.attr('height', imgH)
		.attr('x', function(d){
			//console.log(xPos(+d.id));
			return xPos(+d.id);
		})
		.attr('y', 10)
		.attr('fill', function(d){
			return 'url(#p'+d.Original_id+')';
		})


	d3.selectAll('.rects')
		.on("mouseover", function(data){

			//img location
			d3.selectAll('.ImgBox')
				.transition()//.duration(100)
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
			//pattern location
			// d3.select('#p'+data.Original_id)
			// 	.transition().duration(100)
			// 	.attr('x', xPos(+data.id)- imgW/2)
			//image size
			d3.select('#n'+data.id).select('rect')
				// .transition().duration(100)
				.attr('width', imgW);
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
					//(xPos(+data.id) + imgW/2)
				});

			// d3.select('#p'+data.Original_id)
			// .transition().duration(100)
			// 	.attr('x', (xPos(+data.id) + imgW/2));
			
			d3.select(this).select('rect')
			// .transition().duration(100)
				.attr('width', imgSmW);
		})

	//  //check the statistic every 0.3 sec!!
	// var IntervalTest = setInterval(function(){
	//     	//console.log('yoyo');
	//     	d3.selectAll('.ImgBox')
	// 			.transition()
	// 			.attr('x', function(d){
	// 				return xPos(+d.id);
	// 			})
	// 		d3.select('#p'+data.Original_id).transition().attr('x', (xPos(+data.id) + imgW/2));
	// 		//d3.select(this).select('rect').transition().attr('width', 5);

	//     },300)
})
















