define(["highcharts-more"],function(a){var e={perform:function(a){this.setupDualPie(a)},setupDualPie:function(e){if(2==e.series.length){var r=e.series[0];r.center=["50%","50%"],r.size="60%",r.dataLabels=r.dataLabels||{},r.dataLabels.color="#FFFFFF",r.dataLabels.distance=-30;var t=e.series[1];t.center=["50%","50%"],t.innerSize="60%",t.size="90%";for(var o=a.getOptions().colors,i=0,n=0,s=0;s<r.data.length;++s){var l=r.data[s].color;l||(l=o[i],i=(i+1)%o.length,r.data[s].color=l);var d=r.data[s]._jrChildCount;if(d)for(var c=0;d>c;++c,++n)if(n<t.data.length&&!t.data[n].color){var f=.2-c/d/5;t.data[n].color=a.Color(l).brighten(f).get()}}}}};return e});