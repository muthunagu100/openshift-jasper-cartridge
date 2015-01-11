!function(t,i){"function"==typeof define&&define.amd?define(["highcharts"],t):t(i.Highcharts)}(function(t){function i(t,i){return this.name=t.name||t,this.parent=i,this}function e(t){return parseInt(t,10)-.5}function r(t){for(var i=t.length,e=0;i--;)e+=t[i];return e}function s(t,i,e,r,o){var n,h=t.length;for(o||(o=0),e.depth||(e.depth=0);h--;)n=t[h],r&&(n.parent=r),n.categories?s(n.categories,i,e,n,o+1):a(i,n,r);e.depth=p(e.depth,o)}function a(t,e,r){for(t.unshift(new i(e,r));r;)r.leaves++||(r.leaves=1),r=r.parent}function o(t,i){t.push("M",e(i[0]),e(i[1]),"L",e(i[2]),e(i[3]))}function n(t,i){return t.getPosition(t.axis.horiz,i,t.axis.tickmarkOffset)}function h(t,i,e){for(var r,s=t.length;s--;)r=t[s][i],r&&h(r,i,e),e(t[s])}function l(t){function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function e(t){return"[object String]"===Object.prototype.toString.call(t)}var r,s;r=i(t)?[]:{};for(s in t)t.hasOwnProperty(s)&&(r[s]=e(t[s])?t[s]:l(t[s]));return r}var c=void 0,d=(Math.round,Math.min),p=Math.max,u=t.Axis.prototype,g=t.Tick.prototype,f=u.init,b=u.render,x=u.setCategories,y=g.getLabelSize,v=g.addLabel,G=g.destroy,k=g.render;return i.prototype.toString=function(){for(var t=[],i=this;i;)t.push(i.name),i=i.parent;return t.join(", ")},u.init=function(t,i){f.call(this,t,i),"object"==typeof i&&i.categories&&this.setupGroups(i)},u.setupGroups=function(t){var i,e=[],r={};i=l(t.categories),s(i,e,r),this.categoriesTree=i,this.categories=e,this.isGrouped=0!==r.depth,this.labelsDepth=r.depth,this.labelsSizes=[],this.labelsGridPath=[],this.tickLength=t.tickLength||this.tickLength||null,this.directionFactor=[-1,1,1,-1][this.side],this.options.lineWidth="undefined"==typeof t.lineWidth?1:t.lineWidth},u.render=function(){if(this.isGrouped&&(this.labelsGridPath=[]),this.originalTickLength===c&&(this.originalTickLength=this.options.tickLength),this.options.tickLength=this.isGrouped?.001:this.originalTickLength,b.call(this),!this.isGrouped)return void(this.labelsGrid&&this.labelsGrid.attr({visibility:"hidden"}));var t,i=this,e=i.options,r=i.top,s=i.left,a=s+i.width,n=r+i.height,l=i.hasVisibleSeries,d=i.labelsDepth,p=i.labelsGrid,u=i.horiz,g=i.labelsGridPath,f=e.drawHorizontalBorders===!1?d+1:0,x=i.opposite?u?r:a:u?n:s;for(i.userTickLength&&(d-=1),p||(p=i.labelsGrid=i.chart.renderer.path().attr({"stroke-width":e.lineWidth,stroke:e.lineColor}).add(i.axisGroup));d>=f;)x+=i.groupSize(f),t=u?[s,x,a,x]:[x,r,x,n],o(g,t),f++;p.attr({d:g,visibility:l?"visible":"hidden"}),i.labelGroup.attr({visibility:l?"visible":"hidden"}),h(i.categoriesTree,"categories",function(t){var e=t.tick;e&&(e.startAt+e.leaves-1<i.min||e.startAt>i.max?(e.label.hide(),e.destroyed=0):e.label.show())})},u.setCategories=function(t,i){this.categories&&this.cleanGroups(),this.setupGroups({categories:t}),this.categories=this.userOptions.categories=t,x.call(this,this.categories,i)},u.cleanGroups=function(){var t,i=this.ticks;for(t in i)i[t].parent;delete i[t].parent,h(this.categoriesTree,"categories",function(t){var i,e=t.tick;if(e){e.label.destroy();for(i in e)delete e[i];delete t.tick}}),this.labelsGrid=null},u.groupSize=function(t,i){var e=this.labelsSizes,s=this.directionFactor;return i!==c&&(e[t]=p(e[t]||0,i+10)),t===!0?r(e)*s:e[t]?e[t]*s:0},g.addLabel=function(){var t;v.call(this),this.axis.categories&&(t=this.axis.categories[this.pos])&&(t.name&&this.label&&this.label.attr("text",t.name),this.axis.isGrouped&&this.addGroupedLabels(t))},g.addGroupedLabels=function(t){for(var i,e=this,r=this.axis,s=r.chart,a=r.options.labels,o=a.useHTML,n=a.style,h={align:"center"},l=r.horiz?"height":"width",c=0;e;){if(c>0&&!t.tick){this.value=t.name;var d=a.formatter?a.formatter.call(this,t):t.name;i=s.renderer.text(d,0,0,o).attr(h).css(n).add(r.labelGroup),e.startAt=this.pos,e.childCount=t.categories.length,e.leaves=t.leaves,e.visible=this.childCount,e.label=i,t.tick=e}r.groupSize(c,e.label.getBBox()[l]),t=t.parent,e=t?e.parent=t.tick||{}:null,c++}},g.render=function(t,i,e){if(k.call(this,t,!1,e),this.axis.isGrouped&&this.axis.categories[this.pos]&&!(this.pos>this.axis.max)){var r,s,a,h,l=this,c=l,u=l.axis,g=l.pos,f=l.isFirst,b=u.max,x=u.min,y=u.horiz,v=(u.categories[g],u.labelsGridPath),G=u.groupSize(0),z=(u.tickLength||G,u.directionFactor,n(l,g)),S=y?z.y:z.x,m=u.chart.renderer.fontMetrics(u.options.labels.style.fontSize).b,L=1;for(f&&(r=y?[u.left,z.y,u.left,z.y+u.groupSize(!0)]:u.isXAxis?[z.x,u.top,z.x+u.groupSize(!0),u.top]:[z.x,u.top+u.len,z.x+u.groupSize(!0),u.top+u.len],o(v,r)),r=y?[z.x,z.y,z.x,z.y+G]:[z.x,z.y,z.x+G,z.y],o(v,r),G=S+G;c=c.parent;){var T=n(l,p(c.startAt-1,x-1)),A=n(l,d(c.startAt+c.leaves-1,b));h=c.label.getBBox(),s=u.groupSize(L),a=y?{x:(T.x+A.x)/2,y:G+s/2+m-h.height/2-4}:{x:G+s/2,y:(T.y+A.y-h.height)/2+m},c.label.attr(a),v&&(r=y?[A.x,G,A.x,G+s]:[G,A.y,G+s,A.y],o(v,r)),G+=s,L++}}},g.destroy=function(){for(var t=this;t=t.parent;)t.destroyed++||(t.destroyed=1);G.call(this)},g.getLabelSize=function(){return this.axis.isGrouped===!0?r(this.axis.labelsSizes):y.call(this)},t},this);