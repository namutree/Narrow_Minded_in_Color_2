var w = 800,
	h = 1200
	boxW = 10,
	boxH = 5,
	boxGap = boxW+2
	imgW = 64,
	imgH = 48;
var sSub =[],
	bSub =[];
var table;
var male =0,
	female =0;
var statData=[];

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

    var yPos = d3.scale.linear()
    	.domain([0,+n-1])
    	.range([boxH*2 ,h-boxH-64])

    var yPos_Reverse = d3.scale.linear()
    	.domain([0,+n-1])
    	.range([h-boxH-64, boxH*2])

    var fillColorS = d3.scale.linear()
		.domain([d3.min(sSub), 0, d3.max(sSub)])
		.range([0, 0.5, 1])

	var fillColorB = d3.scale.linear()
		.domain([d3.min(bSub), 0, d3.max(bSub)])
		.range([1, 0.5, 0])

    //creating uppest level svg
  	var uppest = d3.select('#chart').append('svg')
		.style('background', 'white')//rgb(255,230,220)')
		.attr('width', w)
		.attr('height', h)

	var eachRow = uppest.append('g').attr('id','colorRects')
		.selectAll('g').data(data)
		.enter().append('g')
		.attr('id', function(d){
			return 'n'+d.id;
		})
		.attr('class', 'rects')

	eachRow.append('rect')
			.attr('class', 'sex')
			.attr('width', boxW)
			.attr('height', boxH)
			.attr('x', function(d){
				return 10;
			})
			.attr('y', function(d,i){
				return yPos(i);
			})
			.style('fill', function(d){
				if (d.sex == 1) return 'rgb(0,0,255)';
				else return 'rgb(255,0,0)'
			})
			.style('opacity', 0.7)

	eachRow.append('rect')
			.attr('class', 'ori_color')
			.attr('width', boxW)
			.attr('height', boxH)
			.attr('x', function(d){
				return 22;
			})
			.attr('y', function(d, i){
				return yPos(i) ;
			})
			.style('fill', function(d){
				
				var r = Math.floor(+d.Ori_r);
				var g = Math.floor(+d.Ori_g);
				var b = Math.floor(+d.Ori_b);
				return 'rgb( '+r+', '+g+', '+b+')';
			})

	eachRow.append('rect')
			.attr('class', 'sel_color')
			.attr('width', boxW)
			.attr('height', boxH)
			.attr('x', function(d){
				return 34;
			})
			.attr('y', function(d, i){
				return yPos(i) ;
			})
			.style('fill', function(d){
				
				var r = Math.floor(+d.Sel_r);
				var g = Math.floor(+d.Sel_g);
				var b = Math.floor(+d.Sel_b);
				return 'rgb( '+r+', '+g+', '+b+')';
			})

	eachRow.append('rect')
			.attr('class', 'sat_sub')
			.attr('width', boxW)
			.attr('height', boxH)
			.attr('x', function(d){
				return 56;
			})
			.attr('y', function(d, i){
				return yPos(i) ;
			})
			.style('fill', function(d){
				var sat_sub = + d.Sat_sub;
				c = d3.hsl(360, fillColorS(sat_sub), 0.5);
				
				return c;
			})

	eachRow.append('rect')
			.attr('class', 'bri_sub')
			.attr('width', boxW)
			.attr('height', boxH)
			.attr('x', function(d){
				return 68;
			})
			.attr('y', function(d, i){
				return yPos(i) ;
			})
			.style('fill', function(d){
				var bri_sub = + d.Bri_sub;
				c = d3.hsl(360,0,fillColorB(bri_sub));

				return c;
			})

	//--------- Making Arraow and Rect Btw arrows' g (the section) STARTS-----------// 
	var arrows = d3.select('svg')
		.append('g')
		.attr('id' ,'arrows')
	
	var arrowH = 20;
	var arrow1 = arrows.append('g')
		.attr('id','arrowA')
		.attr('transform' ,'translate(120,'+(yPos(data[0].id)-arrowH/2)+')')
	var arrow2 = arrows.append('g')
		.attr('id', 'arrowB')
		.attr('transform' ,'translate(120,'+(yPos(data[data.length-1].id) - arrowH/2 + boxH)+')')
	var rectBTarrows = arrows.append('rect')
		.attr('id', 'rectBTarrows')
		.attr('width', 31)
		.attr('height', function(){
			return yPos(data[data.length-1].id) - yPos(data[0].id) - arrowH + boxH -4;
		})
		.attr('x', 134)
		.attr('y', function(d, i){
			return yPos(data[0].id) + arrowH/2 + 2;
		})
		.style('fill', '#67775C')
		.style('opacity','0.2')
	//--------- Making Arraow and Rect Btw arrows' g (the section) ENDS-----------// 

	//---------- Making rullers STARTS--------------------------------------------//
	var rullers = d3.select('svg')
		.append('g')
		.attr('id' ,'rullers')
	var ticks = rullers.selectAll('g').data(data)
		.enter().append('g')
	ticks.append('line')
		.attr('class', 'ticks')
		.attr('x1', 167) 
		.attr('x2', 180) 
		.attr('y1', function(d,i){
			return yPos(i)+boxH/2;
		}) 
		.attr('y2', function(d,i){
			return yPos(i)+boxH/2;
		})  
		.attr("stroke-width", 1)
		.attr("stroke", "grey");
	ticks.append('text')
		.attr('class', 'brightness_text')
		.style('fill', 'black')
		.style('font', '6px sans-serif')
		.style('text-anchor', 'end')
		.attr('x', 190)
		.attr('y', function(d,i){
			return yPos(i)+boxH/2 +2;
		})
		.text(function(d){
			return d.Bri_sub;
		})
	ticks.append('text')
		.attr('class', 'brightness_text')
		.style('fill', 'red')
		.style('font', '6px sans-serif')
		.style('text-anchor', 'end')
		.attr('x', 205)
		.attr('y', function(d,i){
			return yPos(i)+boxH/2 +2;
		})
		.text(function(d){
			return Math.round(d.Sat_sub);
		})



// .attr('x', (100+67+67+67+67+imgW/2))
//             	.attr('y', textValue)
//             	.attr("dy", ".35em")
//             	.text(function(){
//             		var bri_per;
//             		if (fillColorB(bri_sub) > 0.52) bri_per = 'Brighter';
//             		else if(fillColorB(bri_sub) > 0.48 ) bri_per ='Almost Same';
//             		else bri_per ='Darker';
//             		return bri_per;
//             	})
//             	.style('opacity', 1)


	//---------- Making rullers ENDS--------------------------------------------//

	//----- Statistic starts -------------------------------//
	var statistic = d3.select('svg')
		.append('g')
		.attr('id','statistic')

	// bar drag...
	var transPosY, transPosYY;
	var transOtherPos;
	var brTopDrag = d3.behavior.drag()
		.on('dragstart', function () {
   			 console.log('Start Dragging Group');

   			 var fff = d3.select(this).attr('transform');
   			 var fff1 = fff.split(',');
   			 transPosY = fff1[1].split(')');
   			 transPosYY = +transPosY[0];

   			 var aaa = arrow2.attr('transform');
   			 var aaa1 = aaa.split(',');
   			 var aaa2 = aaa1[1].split(')');
   			 transOtherPos = +aaa2[0];
		})
	    .on('drag', function (d, i) {

		    transPosYY += +d3.event.dy;
		    //prevent from going over other arrow
		    if(transPosYY >= transOtherPos - arrowH) transPosYY = transOtherPos - arrowH;
		    if(transPosYY <= 0) transPosYY =0;
		    
		    d3.select(this).attr("transform", 'translate(120,'+transPosYY+')' );

		    var whereTx = transPosYY + transOtherPos;
		    statistic_text.attr('transform', 'translate(250,'+(whereTx)/2+')');

		    //rect Btw arrows
		    rectBTarrows.attr('y', transPosYY + arrowH + 2 )
		    rectBTarrows.attr('height', function(){
		    	var rectH = transOtherPos-transPosYY - arrowH -4;
		    	if( rectH <= 0 ) rectH =0;
		    	return rectH;
		    })
		});	

	var brBottomDrag = d3.behavior.drag()
		.on('dragstart', function (dt) {
   			 console.log('Start Dragging Group');

   			 var fff = d3.select(this).attr('transform');
   			 var fff1 = fff.split(',');
   			 transPosY = fff1[1].split(')');
   			 transPosYY = +transPosY[0];

   			 var aaa = arrow1.attr('transform');
   			 var aaa1 = aaa.split(',');
   			 var aaa2 = aaa1[1].split(')');
   			 transOtherPos = +aaa2[0];
		})
	    .on('drag', function (dt, i) {
		    transPosYY += d3.event.dy;
		    //prevent from going over other arrow
		    if(transPosYY <= transOtherPos + arrowH) transPosYY = transOtherPos + arrowH;
		    if(transPosYY >= h - arrowH) transPosYY = h - arrowH;
		    
		    d3.select(this).attr("transform", 'translate(120,'+transPosYY+')' );

		    var whereTx = transOtherPos+ transPosYY
		    statistic_text.attr('transform', 'translate(250,'+(whereTx)/2+')');

		    //rect Btw arrows
		    //rectBTarrows.attr('y', transPosYY + arrowH + 2 )
		    rectBTarrows.attr('height', function(){
		    	var rectH = transPosYY- transOtherPos - arrowH -4;
		    	if( rectH <= 0 ) rectH =0;
		    	return rectH;
		    })
		});


  	var statistic_text = statistic.append('foreignObject')
  		.attr('width', 200)
  		.attr('height', 150)
  		.attr('transform', 'translate(250,'+(yPos(data[0].id) + yPos(data[data.length-1].id)+boxH)/2+')')
     	.html(function(){
			return statistic_text_fill();
     		});
	//----- Statistic sends -------------------------------//

	
	//------------------ ARROWS: call drag and define Shapes STARTS--------------------------//
	arrow1.call(brTopDrag)
	arrow1.append('polygon')
		.attr('fill', 'none')
		.attr('stroke','#8BA47B')
		.attr('stroke-width','2')
		.attr('stroke-miterlimit', '10')
		.attr('points', '12.913,1 1.595,10.111 12.913,19.211, 45.596,19.211 45.596,1')

	arrow1.append('polygon')
		.attr('fill', '#A4CF8F')
		.attr('points', '15.26,3.548 6.518,10.11 15.26,16.676 41.757,16.67 41.757,3.542')

	arrow2.call(brBottomDrag)
	arrow2.append('polygon')
		.attr('fill', 'none')
		.attr('stroke','#8BA47B')
		.attr('stroke-width','2')
		.attr('stroke-miterlimit', '10')
		.attr('points', '12.913,1 1.595,10.111 12.913,19.211, 45.596,19.211 45.596,1')

	arrow2.append('polygon')
		.attr('fill', '#A4CF8F')
		.attr('points', '15.26,3.548 6.518,10.11 15.26,16.676 41.757,16.67 41.757,3.542')
	//------------------ ARROWS: call drag and define Shapes ENDS--------------------------//


	//----- 'POPPING IMAGES and BOXES' starts ------------//
	var popup = d3.select('svg')
		.append('g')
		.attr('id','popup')
	var popup_img = popup.append('svg:image')
		.attr('width', imgW+'px')
		.attr('height', imgH+'px')
		.style('opacity', 0)
	var popup_oriC = popup.append('rect')
		.attr('width', imgW+'px')
		.attr('height', imgH+'px')
		.style('opacity', 0)
	var popup_selC = popup.append('rect')
		.attr('width', imgW+'px')
		.attr('height', imgH+'px')
		.style('opacity', 0)
	var popup_sat = popup.append('rect')
		.attr('width', imgW+'px')
		.attr('height', imgH+'px')
		.style('opacity', 0)
	var popup_bri = popup.append('rect')
		.attr('width', imgW+'px')
		.attr('height', imgH+'px')
		.style('opacity', 0)
	var popup_chose = popup.append('text')
		.style('fill', 'black')
		.style('font', '14px sans-serif')
		.style('text-anchor', 'middle')
	var popup_textS = popup.append('text')
		.style('fill', 'black')
		.style('font', '10px sans-serif')
		.style('text-anchor', 'middle')
	var popup_textB = popup.append('text')
		.style('fill', 'black')
		.style('font', '10px sans-serif')
		.style('text-anchor', 'middle')

	d3.selectAll('.rects')
		.on('mouseover', function(d,i){
			
			var yValue = d3.select('#n'+d.id).select('.sex').attr('y');

			var r = Math.floor(+d.Ori_r);
			var g = Math.floor(+d.Ori_g);
			var b = Math.floor(+d.Ori_b);
			var pic = (d.Original_id);
			
			var r1 = Math.floor(+d.Sel_r);
			var g1 = Math.floor(+d.Sel_g);
			var b1 = Math.floor(+d.Sel_b);

			var sat_sub = + d.Sat_sub;
			
			c = d3.hsl(360, fillColorS(sat_sub), 0.5);

			var bri_sub = + d.Bri_sub;
			
			c1 = d3.hsl(360,0,fillColorB(bri_sub));
			
			var textValue = +yValue + imgH*2/3;

			popup_img
				.attr('xlink:href', 'data/image/'+pic+'.jpg')
				.transition()			
				.attr('x', 100)
            	.attr('y', yValue)
            	.style('opacity', 1);
            popup_oriC
	            .transition()
            	.attr('x', 100+67)
            	.attr('y', yValue)
            	.style('fill', 'rgb( '+r+', '+g+', '+b+')')
            	.style('opacity', 1)
            popup_selC
            	.transition()
            	.attr('x', 100+67+67)
            	.attr('y', yValue)
            	.style('fill', 'rgb( '+r1+', '+g1+', '+b1+')')
            	.style('opacity', 1)
            popup_sat
            	.transition()
            	.attr('x', 100+67+67+67)
            	.attr('y', yValue)
            	.style('fill', c)
            	.style('opacity', 1)
            popup_bri
            	.transition()
            	.attr('x', 100+67+67+67+67)
            	.attr('y', yValue)
            	.style('fill', c1)
            	.style('opacity', 1)
            popup_chose
            	.transition()
            	.attr('x', (100+67+67+67+imgW+3))
            	.attr('y', +yValue+9)
            	.attr("dy", ".35em")
            	.text('CHOSE')
            	.style('opacity', 1)
            popup_textS
            	.transition()
            	.attr('x', (100+67+67+67+imgW/2))
            	.attr('y', textValue)
            	.attr("dy", ".35em")
            	.text(function(){
            		var sat_per;
            		if (+fillColorS(sat_sub) > 0.52) sat_per = 'Vivider';
            		else if(+fillColorS(sat_sub) > 0.48) sat_per ='Almost Same';
            		else sat_per ='Duller';
            		return sat_per;
            	})
            	.style('opacity', 1)
            popup_textB
            	.transition()
            	.attr('x', (100+67+67+67+67+imgW/2))
            	.attr('y', textValue)
            	.attr("dy", ".35em")
            	.text(function(){
            		var bri_per;
            		if (fillColorB(bri_sub) > 0.52) bri_per = 'Brighter';
            		else if(fillColorB(bri_sub) > 0.48 ) bri_per ='Almost Same';
            		else bri_per ='Darker';
            		return bri_per;
            	})
            	.style('opacity', 1)
		})
		.on('mouseout', function(){
			popup_img
				.transition()
				.style('opacity', 0)
			popup_oriC
				.transition()
				.style('opacity', 0)
			popup_selC
				.transition()
				.style('opacity', 0)
			popup_sat
				.transition()
				.style('opacity', 0)
			popup_bri
				.transition()
				.style('opacity', 0)
			popup_chose
				.transition()
				.style('opacity', 0)
			popup_textS
				.transition()
				.style('opacity', 0)
			popup_textB
				.transition()
				.style('opacity', 0)
		})
	//--- 'POPPING IMAGES and BOXES' ends --------//

//---CLICK EVENT STARTS--------------------------------------------------------//

	//saturation subtraction ORDER
	d3.select('#sat_sub').on("click", function(){
		order_sat();
	})
	function order_sat(){
		d3.select('#colorRects').selectAll('g').transition()
			.duration(700)
        	.selectAll('rect')
        	.attr("y", function(d,i){
        		return yPos(+d.sat_sub_order);
        	})
	}

	//Saturation subtraction Reverse ORDER
	d3.select('#sat_sub_reverse').on("click", function(){
		order_sat_r();
	})
	function order_sat_r(){
		d3.select('#colorRects').selectAll('g').transition()
			.duration(700)
	        .selectAll('rect')
	        .attr("y", function(d,i){
	        	return yPos_Reverse(+d.sat_sub_order);
	        })

	}

	//Brightness subtraction ORDER
	d3.select('#bri_sub').on("click", function(){
		order_bri();
	})

	function order_bri(){
		d3.select('#colorRects').selectAll('g').transition()
			.duration(700)
	        .selectAll('rect')
	        .attr("y", function(d,i){
	        	return yPos(+d.bri_sub_order);
	        })
	}

	//Brightness subtraction Reverse ORDER
	d3.select('#bri_sub_reverse').on("click", function(){
		order_bri_r();
	})

	function order_bri_r(){
		d3.select('#colorRects').selectAll('g').transition()
			.duration(700)
	        .selectAll('rect')
	        .attr("y", function(d,i){
	        	return yPos_Reverse(+d.bri_sub_order);
	        })
	}


//---CLICK EVENT ENDS--------------------------------------------------------//

	//check the statistic every 0.3 sec!!
	var test = setInterval(function(){
	    	console.log('yoyo');
	    	statistic_text.html(function(){
		    	return statistic_text_fill();
		    });

	    },300)

	function statistic_text_fill(){
		
		var ttt = [];
     		for(var i =0  ; i < data.length ; i++){
     			var yyy = d3.select('#colorRects').select('#n'+i).select('.sex').attr('y');	
     			// i == id, yyy == y value
     			ttt.push([i, yyy]);
     		}
     		//            0   , 1    , 2        , 3
     		//statData--> d.id, d.sex, d.Sat_sub, d.Bri_sub
     		var mBri=0, mBSame =0, mDar=0, mViv=0, mSSame=0, mDul=0, fBri=0, fBSame =0, fDar=0, fViv=0, fSSame=0, fDul=0;
     		for (var i =0; i < statData.length ;i++){
     			
     			var includeCheck = false;
     			
     			for(var j=0 ; j < ttt.length ; j++){
     				if (ttt[j][0] == (+statData[i][0]) ){
     						
     					
     					var tl1 = arrow1.attr('transform');
   			 			var tl2 = tl1.split(',');
   			 			var tl3 = tl2[1].split(')');
     					var topLine = +tl3[0] + arrowH/2;


     					var bl1 = arrow2.attr('transform');
   			 			var bl2 = bl1.split(',');
   			 			var bl3 = bl2[1].split(')');
     					var bottomLine = +bl3[0] - arrowH/2;

     					if(ttt[j][1] <= (+bottomLine) && ttt[j][1] >= (+topLine))  {
     						includeCheck = true;
     					}
     				}
     			}

     			if(includeCheck){
	     			if(statData[i][1] == 1){
	     				//male & saturation
	     				if(fillColorS(statData[i][2]) > 0.51) mViv ++;
	     				else if (fillColorS(statData[i][2]) > 0.49) mSSame++;
	     				else mDul++;
	     				//male & brigtness
	     				if(fillColorB(statData[i][3]) > 0.51) mBri ++;
	     				else if (fillColorB(statData[i][3]) > 0.49) mBSame++;
	     				else mDar++;
	     			}
	     			if(statData[i][1] == 2){
	     				//female & saturation
	     				if(fillColorS(statData[i][2]) > 0.51) fViv ++;
	     				else if (fillColorS(statData[i][2]) > 0.49) fSSame++;
	     				else fDul++;
	     				//female & brigtness
	     				if(fillColorB(statData[i][3]) > 0.51) fBri ++;
	     				else if (fillColorB(statData[i][3]) > 0.49) fBSame++;
	     				else fDar++;
	     			}
	     		}
     		}
     		mViv   = Math.round(mViv/male*100);
     		mSSame = Math.round(mSSame/male*100);
     		mDul   = Math.round(mDul/male*100);
     		mBri   = Math.round(mBri/male*100);
     		mBSame = Math.round(mBSame/male*100);
     		fDar   = Math.round(fDar/female*100);
     		fViv   = Math.round(fViv/female*100);
     		fSSame = Math.round(fSSame/female*100);
     		fDul   = Math.round(fDul/female*100);
     		fBri   = Math.round(fBri/female*100);
     		fBSame = Math.round(fBSame/female*100);
     		fDar   = Math.round(fDar/female*100);

     		return '<div><p align="right">M: Chose Vivider '+mViv+'%<br>Almost Same '+mSSame+'%<br>Duller '+mDul+'%</p><p align="right">Chose Brighter '+mBri+'%<br>Almost Same '+mBSame+'%<br>Darker '+mDar+'%</p> <p align="right">F: Chose Vivider '+fViv+'%<br>Almost Same '+fSSame+'%<br>Duller '+fDul+'%</p><p align="right">Chose Brighter '+fBri+'%<br>Almost Same '+fBSame+'%<br>Darker '+fDar+'%</p>';
	}


})






