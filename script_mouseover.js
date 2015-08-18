//All
function frontIndexBoxOver(){
	d3.select('.right_Br')
		.transition()
		.attr('transform', 'translate('+(-imgW*3/4+12)+',0)')
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
	
// allBool = true,
// maleBool = false,
// femaleBool = false;
function imgOver(data){
	//img location
	d3.selectAll('.ImgBox')
		.transition()
		.attr('x', function(d){
			if(allBool){
				if (+d.id > +data.id) 			return xPos(+d.id) + imgW/2-xPos.rangeBand();
				else if (+d.id < +data.id) 		return xPos(+d.id) - imgW/2;
				else 							return xPos(+d.id) - imgW/2;
			}else if(maleBool){
				if (d.id < male){
					if (+d.id > +data.id) 			return xPosMale(+d.id) + imgW/2-xPosMale.rangeBand();
					else if (+d.id < +data.id) 		return xPosMale(+d.id) - imgW/2;
					else 							return xPosMale(+d.id) - imgW/2;
				}else return -100;
			}else if(femaleBool){
				if (d.id < female){
					if (+d.id > +data.id) 			return xPosFemale(+d.id) + imgW/2-xPosMale.rangeBand();
					else if (+d.id < +data.id) 		return xPosFemale(+d.id) - imgW/2;
					else 							return xPosFemale(+d.id) - imgW/2;
				}else return -100;
			}
		})
	d3.selectAll('pattern')
		.transition()
		.attr('x', function(d,i){
			if(allBool){
				if (+d.id== +data.id) 	return xPos(+d.id) - imgW/2;
				else 					return xPos(+d.id) - imgW;
			}else if(maleBool){
				if (d.id < male){
					if (+d.id== +data.id) 	return xPosMale(+d.id) - imgW/2;
					else 					return xPosMale(+d.id) - imgW;
				}else return -100;
			}else if(femaleBool){
				if (d.id < female){
					if (+d.id== +data.id) 	return xPosFemale(+d.id) - imgW/2;
					else 					return xPosFemale(+d.id) - imgW;
				}else return -100;
			}
		})

	//image size
	d3.select('#n'+data.Original_id).select('rect')
		.attr('width', imgW);
}
function imgOut(){
	d3.selectAll('.ImgBox')
		.transition()
		.attr('x', function(d,i){
			if(allBool){
				return xPos(+d.id);
			}else if(maleBool){
				if (d.id < male) return xPosMale(+d.id);
				else 	return -100;
			}else if(femaleBool){
				if (d.id < female) return xPosFemale(+d.id);
				else 	return -100;
			}
		})
	
	d3.selectAll('pattern')
		.transition()
		.attr('x', function(d,i){
			if(allBool){
				return xPos(+d.id) + imgW/2;
			}else if(maleBool){
				if (d.id < male) return xPosMale(+d.id) + imgW/2;
				else 	return -100;
			}else if(female){
				if (d.id < female) return xPosFemale(+d.id) + imgW/2;
				else 	return -100;
			}
		});

	d3.selectAll('.ImgBox')
		.attr('width', function(){
			if(allBool) return xPos.rangeBand();
			else if (maleBool) return xPosMale.rangeBand();
			else if(femaleBool) return xPosFemale.rangeBand();
		})

}


function oriBoxOver(data){
//original color
	d3.selectAll('.oriColor')
		.transition()	
		.attr('width', function(d){
			if(allBool){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPos.rangeBand();
			}else if(maleBool){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPosMale.rangeBand();
			}else if(femaleBool){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPosFemale.rangeBand();
			}
		})
		.attr('x', function(d){
			if(allBool){
				if (+d.id > +data.id) 		return xPos(+d.id) + imgW/2-xPos.rangeBand();
				else if (+d.id < +data.id)	return xPos(+d.id) - imgW/2;
				else 						return xPos(+d.id) - imgW/2;
			}else if(maleBool){
				if (d.id < male){
					if (+d.id > +data.id) 		return xPosMale(+d.id) + imgW/2-xPosMale.rangeBand();
					else if (+d.id < +data.id)	return xPosMale(+d.id) - imgW/2;
					else 						return xPosMale(+d.id) - imgW/2;
				}else return -100;
			}else if(femaleBool){
				if (d.id < female){
					if (+d.id > +data.id) 		return xPosFemale(+d.id) + imgW/2-xPosFemale.rangeBand();
					else if (+d.id < +data.id)	return xPosFemale(+d.id) - imgW/2;
					else 						return xPosFemale(+d.id) - imgW/2;
				}else return -100;
			}
		})	
}
function oriBoxOut(){
	d3.selectAll('.oriColor')
		.transition()
		.attr('width', function(){
			if(allBool){
				return  xPos.rangeBand();
			}else if(maleBool){
				return xPosMale.rangeBand();
			}else if(femaleBool){
				return xPosFemale.rangeBand();
			}
		})
		.attr('x', function(d){
			if(allBool){
				return xPos(+d.id);
			}else if(maleBool){
				if (d.id < male)	return xPosMale(+d.id);
				else 				return -100;
			}else if(femaleBool){
				if (d.id < female)	return xPosFemale(+d.id);
				else 				return -100;
			}
		})
}
function picBoxOver(data){
	//picked color
	d3.selectAll('.pickedColor')
		.transition()	
		.attr('width', function(d){
			if(allBool){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPos.rangeBand();
			}else if(maleBool){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPosMale.rangeBand();
			}else if(femaleBool){
				if (+d.id == +data.id) 	return imgW;
				else 					return xPosFemale.rangeBand();
			}
		})
		.attr('x', function(d){
			if(allBool){
				if (+d.id > +data.id) 		return xPos(+d.id) + imgW/2-xPos.rangeBand();
				else if (+d.id < +data.id) 	return xPos(+d.id) - imgW/2;
				else 						return xPos(+d.id) - imgW/2;
			}else if(maleBool){
				if (d.id < male){
					if (+d.id > +data.id) 		return xPosMale(+d.id) + imgW/2-xPosMale.rangeBand();
					else if (+d.id < +data.id) 	return xPosMale(+d.id) - imgW/2;
					else 						return xPosMale(+d.id) - imgW/2;
				} else return -100;
			}else if(femaleBool){
				if (d.id < female){
					if (+d.id > +data.id) 		return xPosFemale(+d.id) + imgW/2-xPosFemale.rangeBand();
					else if (+d.id < +data.id) 	return xPosFemale(+d.id) - imgW/2;
					else 						return xPosFemale(+d.id) - imgW/2;
				} else return -100;
			}
		})
}
function picBoxOut(){
	d3.selectAll('.pickedColor')
		.transition()
		.attr('width', function(){
			if(allBool) 		return xPos.rangeBand();
			else if(maleBool) 	return xPosMale.rangeBand();
			else if(femaleBool) return xPosFemale.rangeBand();
		} )
		.attr('x', function(d){
			if(allBool){
				return xPos(+d.id);
			}else if(maleBool){
				if (d.id < male){
					return xPosMale(+d.id);
				}else return -100;
			}else if(femaleBool){
				if (d.id < female){
					return xPosFemale(+d.id);
				}else return -100;
			}
		})
}


function textInBoxOver(data){
	// text
	d3.select('#n'+data.Original_id).select('.oriText')
		.attr('x', function(d){	
			if(allBool){
				return xPos(+data.id);
			}else if(maleBool){
				if (d.id < male)	return xPosMale(+data.id);
				else -100; 
			}else if(femaleBool){
				if (d.id < female)	return xPosFemale(+data.id);
				else -100; 
			} 
		})
		.transition()
		.style('font-size', imgH/4+'px')
		.attr('opacity', 1)
	d3.select('#n'+data.Original_id).select('.pickedText')
		.attr('x', function(d){	
			if(allBool){
				return xPos(+data.id);
			}else if(maleBool){
				if (d.id < male) return xPosMale(+data.id);
				else return -100;  
			}else if(femaleBool){
				if (d.id < female) return xPosFemale(+data.id);
				else return -100;  
			}
		})
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
		.transition()
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