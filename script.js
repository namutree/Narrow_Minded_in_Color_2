var w = screen.width;
	h= 800
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
	console.log(n);

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
    	.range([0 ,h])

    //creating uppest level svg
  	var uppest = d3.select('#chart').append('svg')
		.style('background', 'rgb(255,230,220)')//)
		.attr('width', w)
		.attr('height', h)


	var eachRow = uppest.append('g').attr('id','colorRects')
		.selectAll('g').data(data)
		.enter().append('g')
		.attr('id', function(d){
			return 'n'+d.id;
		})
		.attr('class', 'rects')


	var test2 = eachRow.append('defs')
		.append('pattern')
		.attr('id', function(d){
			return d.Original_id;
		})
		.attr('x', 0)
		.attr('y', 0)
		.attr('patternUnits','userSpaceOnUse')
		.attr('width', 40)
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
		.attr('width', 3)
		.attr('height', imgH)
		.attr('x', function(d){
			return xPos(+d.id);
		})
		.attr('y', 10)
		.attr('fill', function(d){
			return 'url(#'+d.Original_id+')';
		})


	test.on("mouseover", function(){
		console.log('dd');
		test.attr('width', 30);
	})
	.on('mouseout', function(){
		test.attr('width', 3);
	})
 // <defs>
 //    <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="200" width="200">
 //      <image x="0" y="0" height="200" width="200" xlink:href="http://lorempixel.com/100/100" type="image/png"></image>
 //    </pattern>
// <circle id='top' cx="80" cy="80" r="80" fill="url(#image)" fill-opacity=".6"/>
//   <circle id='top' cx="240" cy="80" r="80" fill="url(#image2)"/>

//   	.attr('width', boxW)
// 	.attr('height', boxH)
// 	.attr('x', function(d){
// 		return 10;
// 	})
// 	.attr('y', function(d,i){
// 		return yPos(i);
// 	})
// 	.style('fill', function(d){
// 		if (d.sex == 1) return 'rgb(0,0,255)';
// 		else return 'rgb(255,0,0)'
// 	})
// 	.style('opacity', 0.7)

})
















