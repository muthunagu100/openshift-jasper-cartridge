/*!
 * @license FusionCharts JavaScript Library
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 * @version fusioncharts/3.2.4-sr1.10100
 * @id fusionmaps.Rondonia.20.10-30-2012 08:25:25
 */
FusionCharts(["private","modules.renderer.highcharts-rondonia",function(){var p=this,k=p.hcLib,n=k.chartAPI,h=k.moduleCmdQueue,a=k.injectModuleDependency,i="M",j="L",c="Z",f="Q",b="left",q="right",t="center",v="middle",o="top",m="bottom",s="maps",l=false&&!/fusioncharts\.com$/i.test(location.hostname),r=!!n.geo,d,e,u,g;d=[{name:"Rondonia",revision:20,creditLabel:l,standaloneInit:true,baseWidth:380,baseHeight:320,baseScaleFactor:10,entities:{"BR.RO":{outlines:[[i,2784,457,f,2762,457,2727,490,2692,522,2686,522,2603,522,2580,509,2561,497,2558,471,2555,437,2553,434,2540,412,2515,398,2480,378,2478,377,2465,366,2429,324,2426,317,2406,260,2401,245,2368,246,2336,247,2331,234,2306,172,2301,167,2289,156,2265,139,2241,119,2218,84,2186,84,2157,78,2145,76,2113,63,2085,51,2064,51,j,1961,51,f,1929,49,1907,43,1887,38,1868,37,j,1874,37,f,1874,33,1848,39,1821,45,1810,51,1802,55,1780,75,1769,84,1764,106,1760,132,1755,146,1743,148,1740,150,1738,150,1730,162,1698,164,1698,185,1698,218,1664,232,1626,242,1616,247,1605,262,1604,263,1600,267,1584,272,1558,281,1558,306,1558,318,1569,339,1580,360,1580,372,1580,406,1570,417,1564,423,1535,434,1517,440,1490,448,1473,458,1476,487,1476,490,1476,492,1475,501,1468,515,1457,537,1444,549,1429,568,1422,576,1412,588,1390,588,1375,588,1319,581,1296,581,1285,589,1281,593,1271,608,1261,624,1230,626,1200,628,1132,624,1051,624,1051,681,1051,706,1072,777,1036,786,1027,813,1019,836,985,836,962,836,954,826,951,823,945,820,939,816,939,804,939,795,921,770,900,741,883,741,855,741,855,783,851,783,812,781,775,783,775,801,801,827,801,840,801,859,762,860,741,860,710,857,703,857,692,870,677,886,671,890,646,904,624,904,605,904,577,880,548,855,517,852,473,846,358,850,265,850,256,853,242,858,235,897,231,922,207,943,194,955,157,985,156,986,154,987,115,1009,87,1025,77,1030,73,1038,54,1059,54,1064,54,1094,80,1103,92,1107,129,1107,225,1093,238,1086,253,1080,270,1069,278,1065,290,1064,315,1063,326,1062,423,1059,450,1050,481,1045,500,1037,534,1021,544,1021,549,1022,549,1025,569,1025,592,1030,630,1025,654,1032,680,1039,699,1039,734,1039,744,1019,769,978,797,978,798,978,836,1025,841,1037,843,1086,842,1150,841,1173,841,1210,862,1247,869,1309,829,1337,821,1342,814,1361,808,1377,808,1384,793,1462,793,1474,j,795,1476,f,800,1481,814,1524,830,1577,838,1595,846,1612,855,1647,864,1683,864,1701,864,1726,847,1743,830,1759,830,1781,830,1797,836,1826,j,836,1904,f,838,1918,850,1943,862,1966,868,1973,884,1988,896,2002,920,2029,921,2039,922,2058,933,2067,956,2088,958,2090,986,2125,1005,2152,j,1005,2191,f,1014,2221,1019,2225,1035,2233,1060,2246,1077,2263,1104,2283,1124,2299,1155,2315,1187,2331,1198,2339,1204,2344,1214,2356,1224,2365,1237,2363,1280,2359,1296,2369,1306,2376,1316,2429,1321,2440,1327,2456,1332,2468,1346,2476,1420,2515,1426,2516,1462,2525,1502,2540,1525,2549,1546,2549,1564,2549,1568,2545,1575,2537,1583,2527,1598,2509,1649,2512,1653,2508,1699,2513,1750,2518,1773,2528,1804,2539,1831,2549,1836,2550,1848,2569,1859,2587,1863,2591,1863,2591,1863,2591,1872,2600,1877,2612,1885,2620,1913,2619,1943,2619,2016,2594,2028,2594,2050,2617,2068,2638,2071,2646,2079,2671,2093,2676,2118,2684,2122,2687,2144,2703,2184,2748,2222,2784,2259,2784,2262,2784,2277,2783,2287,2792,2298,2817,2307,2837,2318,2837,2325,2837,2337,2832,2349,2826,2368,2826,2381,2826,2384,2832,2389,2843,2403,2852,2412,2857,2429,2858,2479,2861,2480,2861,2519,2865,2547,2866,2557,2868,2565,2895,2571,2916,2637,3002,2641,3006,2657,3031,2672,3055,2683,3062,2688,3063,2705,3072,2725,3082,2745,3083,2766,3083,2781,3085,j,2901,3085,f,2919,3082,2961,3065,3063,3074,3138,3074,j,3140,3075,f,3175,3133,3229,3154,3284,3154,3292,3152,3314,3148,3340,3124,3362,3101,3370,3093,3383,3081,3405,3070,3455,3045,3474,3024,3481,3016,3486,2990,3489,2969,3499,2967,j,3525,2906,f,3520,2892,3533,2876,3541,2867,3552,2854,j,3553,2839,f,3554,2830,3564,2822,j,3589,2802,f,3594,2798,3657,2762,3654,2759,3653,2756,3652,2671,3655,2661,3660,2643,3700,2615,3709,2608,3745,2562,3756,2548,3756,2505,3756,2483,3754,2471,j,3756,2392,f,3756,2378,3740,2361,3726,2345,3729,2317,3735,2261,3730,2219,3730,2213,3718,2200,3704,2185,3700,2180,3681,2141,3668,2134,j,3659,2058,f,3659,2024,3667,2007,3671,1999,3685,1985,3711,1960,3711,1888,3711,1828,3710,1823,3701,1777,3656,1777,3652,1778,3648,1778,3641,1778,3628,1771,3613,1763,3607,1763,3566,1757,3549,1760,3530,1762,3505,1742,3471,1715,3453,1708,j,2976,1709,f,2880,1690,2880,1648,2900,1608,2900,1601,2895,1553,2895,1539,2895,1496,2905,1485,2910,1480,2916,1463,2921,1447,2921,1443,2922,1439,2889,1342,2856,1246,2856,1221,2856,1206,2860,1198,2864,1191,2865,1182,2864,1178,2864,1109,2864,1086,2854,1054,2854,1045,2875,1020,2895,996,2895,964,j,2892,927,f,2889,927,2887,927,2887,926,2887,925,2882,852,2875,837,2863,812,2850,795,2845,789,2845,774,2845,772,2845,758,2850,745,2873,745,2881,745,2884,749,2885,744,2887,729,2887,715,2876,703,2864,691,2864,676,2864,670,2868,659,2868,658,2865,655,j,2865,632,f,2871,613,2902,549,2902,525,2858,491,f,2815,457,2784,457,c]],label:"Rondonia",shortLabel:"RO",labelPosition:[190.5,159.5],labelAlignment:[t,v]}}}];g=d.length;if(r){while(g--){e=d[g];n(e.name.toLowerCase(),e,n.geo)}}else{while(g--){e=d[g];u=e.name.toLowerCase();a(s,u,1);h[s].unshift({cmd:"_call",obj:window,args:[function(w,x){if(!n.geo){p.raiseError(p.core,"12052314141","run","JavaScriptRenderer~Maps._call()",new Error("FusionCharts.HC.Maps.js is required in order to define vizualization"));return}n(w,x,n.geo)},[u,e],window]})}}}]);